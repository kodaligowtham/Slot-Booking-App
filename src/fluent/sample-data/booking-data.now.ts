import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Booking Records (Note: These will reference the amenity records by their generated sys_ids)
export const booking1 = Record({
  $id: Now.ID['booking_1'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-25 09:00:00',
    end_time: '2024-12-25 11:00:00',
    booking_type: 'individual_amenity',
    customer_name: 'Alice Johnson',
    customer_email: 'alice.johnson@email.com',
    customer_phone: '555-1001',
    total_cost: 50.00,
    booking_status: 'confirmed',
    payment_status: 'paid',
    source: 'web_portal',
    additional_comments: 'Morning swim session for fitness training'
  }
})

export const booking2 = Record({
  $id: Now.ID['booking_2'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-26 14:00:00',
    end_time: '2024-12-26 15:00:00',
    booking_type: 'individual_amenity',
    customer_name: 'Bob Smith',
    customer_email: 'bob.smith@email.com',
    customer_phone: '555-1002',
    total_cost: 30.00,
    booking_status: 'confirmed',
    payment_status: 'paid',
    source: 'external_api',
    additional_comments: 'Badminton match with friends'
  }
})

export const booking3 = Record({
  $id: Now.ID['booking_3'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-27 16:00:00',
    end_time: '2024-12-27 18:00:00',
    booking_type: 'entire_arena',
    customer_name: 'Carol Davis',
    customer_email: 'carol.davis@email.com',
    customer_phone: '555-1003',
    total_cost: 200.00,
    booking_status: 'pending',
    payment_status: 'pending',
    source: 'phone_call',
    additional_comments: 'Company team building football match'
  }
})

export const booking4 = Record({
  $id: Now.ID['booking_4'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-28 08:00:00',
    end_time: '2024-12-28 12:00:00',
    booking_type: 'individual_amenity',
    customer_name: 'David Wilson',
    customer_email: 'david.wilson@email.com',
    customer_phone: '555-1004',
    total_cost: 800.00,
    booking_status: 'confirmed',
    payment_status: 'paid',
    source: 'web_portal',
    additional_comments: 'Golf tournament practice round'
  }
})

export const booking5 = Record({
  $id: Now.ID['booking_5'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-29 07:00:00',
    end_time: '2024-12-29 08:30:00',
    booking_type: 'individual_amenity',
    customer_name: 'Eva Brown',
    customer_email: 'eva.brown@email.com',
    customer_phone: '555-1005',
    total_cost: 12.00,
    booking_status: 'completed',
    payment_status: 'paid',
    source: 'mobile_app',
    additional_comments: 'Morning walk for health and fitness'
  }
})

export const booking6 = Record({
  $id: Now.ID['booking_6'],
  table: 'x_466904_recreatio_booking_slots',
  data: {
    start_time: '2024-12-30 19:00:00',
    end_time: '2024-12-30 21:00:00',
    booking_type: 'individual_amenity',
    customer_name: 'Frank Miller',
    customer_email: 'frank.miller@email.com',
    customer_phone: '555-1006',
    total_cost: 240.00,
    booking_status: 'confirmed',
    payment_status: 'paid',
    source: 'walk_in',
    additional_comments: 'Evening cricket practice session'
  }
})