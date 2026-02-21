import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { handleBookingSlots } from '../../server/api-handlers/booking-api.js'

// Scripted REST API for Booking Slots
RestApi({
  $id: Now.ID['booking_slots_api'],
  name: 'Recreational Facility Booking Slots API',
  service_id: 'recreational_booking_slots',
  short_description: 'REST API for managing recreational facility booking slots with pagination support',
  active: true,
  enforce_acl: [], // Using OAuth 2.0 or Basic Authentication
  routes: [
    {
      $id: Now.ID['booking_slots_route'],
      name: 'Booking Slots',
      path: '/slots',
      method: 'GET',
      script: handleBookingSlots,
      short_description: 'Get booking slots with pagination. Supports query parameters: page, pagesize, source, booking_status',
      produces: 'application/json',
      authorization: true,
      authentication: true,
      version: 1,
      parameters: [
        {
          $id: Now.ID['page_param'],
          name: 'page'
        },
        {
          $id: Now.ID['pagesize_param'], 
          name: 'pagesize'
        },
        {
          $id: Now.ID['source_param'],
          name: 'source'
        },
        {
          $id: Now.ID['status_param'],
          name: 'booking_status'
        }
      ]
    },
    {
      $id: Now.ID['create_booking_route'],
      name: 'Create Booking Slot',
      path: '/slots',
      method: 'POST',
      script: handleBookingSlots,
      short_description: 'Create a new booking slot',
      consumes: 'application/json',
      produces: 'application/json',
      authorization: true,
      authentication: true,
      version: 1,
      request_example: `{
  "amenity": "sys_id_of_amenity",
  "start_time": "2024-07-30 09:00:00",
  "end_time": "2024-07-30 11:00:00",
  "booking_type": "individual_amenity",
  "customer_name": "John Doe",
  "customer_email": "john.doe@example.com",
  "customer_phone": "+1-555-0123",
  "total_cost": "50.00",
  "booking_status": "pending",
  "payment_status": "pending",
  "additional_comments": "Special requirements for the booking"
}`
    }
  ],
  versions: [
    {
      $id: Now.ID['booking_v1'],
      version: 1
    }
  ]
})