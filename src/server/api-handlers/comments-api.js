import { gs, GlideRecord } from '@servicenow/glide'
import { RESTAPIRequest, RESTAPIResponse } from '@servicenow/glide/sn_ws_int'

/**
 * REST API handler for comments with pagination
 * Supports GET (with pagination) and POST operations
 */
export function handleComments(request, response) {
  try {
    const method = request.getMethod()
    
    if (method === 'GET') {
      return getComments(request, response)
    } else if (method === 'POST') {
      return createComment(request, response)
    } else {
      response.setStatus(405)
      response.getWriter().write(JSON.stringify({
        error: 'Method not allowed',
        message: 'Only GET and POST methods are supported'
      }))
    }
  } catch (error) {
    gs.error('Error in handleComments: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }))
  }
}

/**
 * Get comments with pagination
 */
function getComments(request, response) {
  try {
    // Get pagination parameters
    const page = parseInt(request.getQueryParameter('page') || '1', 10)
    const pageSize = parseInt(request.getQueryParameter('pagesize') || '10', 10)
    
    // Validate pagination parameters
    if (page < 1 || pageSize < 1 || pageSize > 1000) {
      response.setStatus(400)
      response.getWriter().write(JSON.stringify({
        error: 'Invalid pagination parameters',
        message: 'Page must be >= 1, pagesize must be between 1 and 1000'
      }))
      return
    }

    const gr = new GlideRecord('x_466904_recreatio_comments')
    
    // Apply filters if provided
    const bookingSlot = request.getQueryParameter('booking_slot')
    if (bookingSlot) {
      gr.addQuery('booking_slot', bookingSlot)
    }
    
    const commentType = request.getQueryParameter('comment_type')
    if (commentType) {
      gr.addQuery('comment_type', commentType)
    }
    
    const isPublic = request.getQueryParameter('is_public')
    if (isPublic !== null && isPublic !== undefined) {
      gr.addQuery('is_public', isPublic === 'true')
    }
    
    // Count total records
    gr.query()
    const totalRecords = gr.getRowCount()
    
    // Calculate pagination
    const totalPages = Math.ceil(totalRecords / pageSize)
    const startIndex = (page - 1) * pageSize
    
    // Query with pagination using chooseWindow
    const paginatedGr = new GlideRecord('x_466904_recreatio_comments')
    
    // Re-apply the same filters
    if (bookingSlot) {
      paginatedGr.addQuery('booking_slot', bookingSlot)
    }
    if (commentType) {
      paginatedGr.addQuery('comment_type', commentType)
    }
    if (isPublic !== null && isPublic !== undefined) {
      paginatedGr.addQuery('is_public', isPublic === 'true')
    }
    
    paginatedGr.orderByDesc('sys_created_on')
    paginatedGr.chooseWindow(startIndex, startIndex + pageSize)
    paginatedGr.query()
    
    const results = []
    while (paginatedGr.next()) {
      results.push({
        sys_id: paginatedGr.getUniqueValue(),
        booking_slot: {
          sys_id: paginatedGr.getValue('booking_slot'),
          display_value: paginatedGr.getDisplayValue('booking_slot')
        },
        comment_text: paginatedGr.getValue('comment_text'),
        comment_type: paginatedGr.getValue('comment_type'),
        author_name: paginatedGr.getValue('author_name'),
        author_email: paginatedGr.getValue('author_email'),
        is_public: paginatedGr.getValue('is_public'),
        sys_created_on: paginatedGr.getValue('sys_created_on'),
        sys_updated_on: paginatedGr.getValue('sys_updated_on')
      })
    }
    
    const responseData = {
      result: results,
      pagination: {
        page: page,
        pageSize: pageSize,
        totalRecords: totalRecords,
        totalPages: totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    }
    
    response.setStatus(200)
    response.setHeader('Content-Type', 'application/json')
    response.getWriter().write(JSON.stringify(responseData))
    
  } catch (error) {
    gs.error('Error in getComments: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Failed to retrieve comments',
      message: error.message
    }))
  }
}

/**
 * Create new comment
 */
function createComment(request, response) {
  try {
    const requestBody = request.getRequestBody()
    const data = JSON.parse(requestBody)
    
    // Validate required fields
    const requiredFields = ['booking_slot', 'comment_text']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      response.setStatus(400)
      response.getWriter().write(JSON.stringify({
        error: 'Missing required fields',
        missing_fields: missingFields
      }))
      return
    }
    
    // Validate that the booking slot exists
    const bookingGr = new GlideRecord('x_466904_recreatio_booking_slots')
    if (!bookingGr.get(data.booking_slot)) {
      response.setStatus(400)
      response.getWriter().write(JSON.stringify({
        error: 'Invalid booking slot',
        message: 'The specified booking slot does not exist'
      }))
      return
    }
    
    const gr = new GlideRecord('x_466904_recreatio_comments')
    gr.initialize()
    
    // Set values from request
    gr.setValue('booking_slot', data.booking_slot)
    gr.setValue('comment_text', data.comment_text)
    gr.setValue('comment_type', data.comment_type || 'general')
    gr.setValue('author_name', data.author_name || '')
    gr.setValue('author_email', data.author_email || '')
    gr.setValue('is_public', data.is_public !== undefined ? data.is_public : true)
    
    const sysId = gr.insert()
    
    if (sysId) {
      const createdRecord = new GlideRecord('x_466904_recreatio_comments')
      if (createdRecord.get(sysId)) {
        const result = {
          sys_id: sysId,
          booking_slot: {
            sys_id: createdRecord.getValue('booking_slot'),
            display_value: createdRecord.getDisplayValue('booking_slot')
          },
          comment_text: createdRecord.getValue('comment_text'),
          comment_type: createdRecord.getValue('comment_type'),
          author_name: createdRecord.getValue('author_name'),
          author_email: createdRecord.getValue('author_email'),
          is_public: createdRecord.getValue('is_public'),
          sys_created_on: createdRecord.getValue('sys_created_on')
        }
        
        response.setStatus(201)
        response.setHeader('Content-Type', 'application/json')
        response.getWriter().write(JSON.stringify({ result: result }))
      }
    } else {
      response.setStatus(500)
      response.getWriter().write(JSON.stringify({
        error: 'Failed to create comment'
      }))
    }
    
  } catch (error) {
    gs.error('Error in createComment: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Failed to create comment',
      message: error.message
    }))
  }
}