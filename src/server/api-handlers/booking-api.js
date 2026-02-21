import { gs, GlideRecord } from '@servicenow/glide'
import { RESTAPIRequest, RESTAPIResponse } from '@servicenow/glide/sn_ws_int'

/**
 * REST API handler for booking slots with pagination
 * Supports GET (with pagination) and POST operations
 */
export function handleBookingSlots(request, response) {
  try {
    const method = request.getMethod()
    
    if (method === 'GET') {
      return getBookingSlots(request, response)
    } else if (method === 'POST') {
      return createBookingSlot(request, response)
    } else {
      response.setStatus(405)
      response.getWriter().write(JSON.stringify({
        error: 'Method not allowed',
        message: 'Only GET and POST methods are supported'
      }))
    }
  } catch (error) {
    gs.error('Error in handleBookingSlots: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }))
  }
}

/**
 * Get booking slots with pagination
 */
function getBookingSlots(request, response) {
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

    const gr = new GlideRecord('x_466904_recreatio_booking_slots')
    
    // Apply filters if provided
    const source = request.getQueryParameter('source')
    if (source) {
      gr.addQuery('source', source)
    }
    
    const status = request.getQueryParameter('booking_status')
    if (status) {
      gr.addQuery('booking_status', status)
    }
    
    // Count total records
    gr.query()
    const totalRecords = gr.getRowCount()
    
    // Calculate pagination
    const totalPages = Math.ceil(totalRecords / pageSize)
    const startIndex = (page - 1) * pageSize
    
    // Query with pagination using chooseWindow
    const paginatedGr = new GlideRecord('x_466904_recreatio_booking_slots')
    
    // Re-apply the same filters
    if (source) {
      paginatedGr.addQuery('source', source)
    }
    if (status) {
      paginatedGr.addQuery('booking_status', status)
    }
    
    paginatedGr.orderByDesc('sys_created_on')
    paginatedGr.chooseWindow(startIndex, startIndex + pageSize)
    paginatedGr.query()
    
    const results = []
    while (paginatedGr.next()) {
      results.push({
        sys_id: paginatedGr.getUniqueValue(),
        number: paginatedGr.getDisplayValue('number'),
        amenity: {
          sys_id: paginatedGr.getValue('amenity'),
          display_value: paginatedGr.getDisplayValue('amenity')
        },
        start_time: paginatedGr.getValue('start_time'),
        end_time: paginatedGr.getValue('end_time'),
        booking_type: paginatedGr.getValue('booking_type'),
        customer_name: paginatedGr.getValue('customer_name'),
        customer_email: paginatedGr.getValue('customer_email'),
        customer_phone: paginatedGr.getValue('customer_phone'),
        total_cost: paginatedGr.getValue('total_cost'),
        booking_status: paginatedGr.getValue('booking_status'),
        payment_status: paginatedGr.getValue('payment_status'),
        source: paginatedGr.getValue('source'),
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
    gs.error('Error in getBookingSlots: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Failed to retrieve booking slots',
      message: error.message
    }))
  }
}

/**
 * Create new booking slot
 */
function createBookingSlot(request, response) {
  try {
    const requestBody = request.getRequestBody()
    const data = JSON.parse(requestBody)
    
    // Validate required fields
    const requiredFields = ['amenity', 'start_time', 'end_time', 'customer_name', 'customer_email', 'customer_phone']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      response.setStatus(400)
      response.getWriter().write(JSON.stringify({
        error: 'Missing required fields',
        missing_fields: missingFields
      }))
      return
    }
    
    const gr = new GlideRecord('x_466904_recreatio_booking_slots')
    gr.initialize()
    
    // Set values from request
    gr.setValue('amenity', data.amenity)
    gr.setValue('start_time', data.start_time)
    gr.setValue('end_time', data.end_time)
    gr.setValue('booking_type', data.booking_type || 'individual_amenity')
    gr.setValue('customer_name', data.customer_name)
    gr.setValue('customer_email', data.customer_email)
    gr.setValue('customer_phone', data.customer_phone)
    gr.setValue('total_cost', data.total_cost || '0')
    gr.setValue('booking_status', data.booking_status || 'pending')
    gr.setValue('payment_status', data.payment_status || 'pending')
    gr.setValue('source', 'external_api')
    gr.setValue('additional_comments', data.additional_comments || '')
    
    const sysId = gr.insert()
    
    if (sysId) {
      const createdRecord = new GlideRecord('x_466904_recreatio_booking_slots')
      if (createdRecord.get(sysId)) {
        const result = {
          sys_id: sysId,
          number: createdRecord.getDisplayValue('number'),
          amenity: {
            sys_id: createdRecord.getValue('amenity'),
            display_value: createdRecord.getDisplayValue('amenity')
          },
          start_time: createdRecord.getValue('start_time'),
          end_time: createdRecord.getValue('end_time'),
          booking_type: createdRecord.getValue('booking_type'),
          customer_name: createdRecord.getValue('customer_name'),
          customer_email: createdRecord.getValue('customer_email'),
          customer_phone: createdRecord.getValue('customer_phone'),
          total_cost: createdRecord.getValue('total_cost'),
          booking_status: createdRecord.getValue('booking_status'),
          payment_status: createdRecord.getValue('payment_status'),
          source: createdRecord.getValue('source'),
          sys_created_on: createdRecord.getValue('sys_created_on')
        }
        
        response.setStatus(201)
        response.setHeader('Content-Type', 'application/json')
        response.getWriter().write(JSON.stringify({ result: result }))
      }
    } else {
      response.setStatus(500)
      response.getWriter().write(JSON.stringify({
        error: 'Failed to create booking slot'
      }))
    }
    
  } catch (error) {
    gs.error('Error in createBookingSlot: ' + error.message)
    response.setStatus(500)
    response.getWriter().write(JSON.stringify({
      error: 'Failed to create booking slot',
      message: error.message
    }))
  }
}