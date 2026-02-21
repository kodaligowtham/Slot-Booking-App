import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { handleComments } from '../../server/api-handlers/comments-api.js'

// Scripted REST API for Comments
RestApi({
  $id: Now.ID['comments_api'],
  name: 'Booking Comments API',
  service_id: 'booking_comments',
  short_description: 'REST API for managing comments on booking slots with pagination support',
  active: true,
  enforce_acl: [], // Using OAuth 2.0 or Basic Authentication
  routes: [
    {
      $id: Now.ID['comments_route'],
      name: 'Booking Comments',
      path: '/comments',
      method: 'GET',
      script: handleComments,
      short_description: 'Get comments with pagination. Supports query parameters: page, pagesize, booking_slot, comment_type, is_public',
      produces: 'application/json',
      authorization: true,
      authentication: true,
      version: 1,
      parameters: [
        {
          $id: Now.ID['comments_page_param'],
          name: 'page'
        },
        {
          $id: Now.ID['comments_pagesize_param'],
          name: 'pagesize'
        },
        {
          $id: Now.ID['booking_slot_param'],
          name: 'booking_slot'
        },
        {
          $id: Now.ID['comment_type_param'],
          name: 'comment_type'
        },
        {
          $id: Now.ID['is_public_param'],
          name: 'is_public'
        }
      ]
    },
    {
      $id: Now.ID['create_comment_route'],
      name: 'Create Comment',
      path: '/comments',
      method: 'POST',
      script: handleComments,
      short_description: 'Create a new comment on a booking slot',
      consumes: 'application/json',
      produces: 'application/json',
      authorization: true,
      authentication: true,
      version: 1,
      request_example: `{
  "booking_slot": "sys_id_of_booking_slot",
  "comment_text": "This is a comment about the booking",
  "comment_type": "general",
  "author_name": "John Doe",
  "author_email": "john.doe@example.com",
  "is_public": true
}`
    }
  ],
  versions: [
    {
      $id: Now.ID['comments_v1'],
      version: 1
    }
  ]
})