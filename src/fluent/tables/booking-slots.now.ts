import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, DateTimeColumn, ReferenceColumn, DecimalColumn } from '@servicenow/sdk/core'

// Table for booking slots
export const x_466904_recreatio_booking_slots = Table({
  name: 'x_466904_recreatio_booking_slots',
  label: 'Booking Slots',
  extends: 'task',
  schema: {
    amenity: ReferenceColumn({
      label: 'Amenity',
      referenceTable: 'x_466904_recreatio_amenities',
      mandatory: true,
    }),
    start_time: DateTimeColumn({
      label: 'Start Time',
      mandatory: true,
    }),
    end_time: DateTimeColumn({
      label: 'End Time',
      mandatory: true,
    }),
    booking_type: StringColumn({
      label: 'Booking Type',
      mandatory: true,
      choices: {
        individual_amenity: { label: 'Individual Amenity', sequence: 0 },
        entire_arena: { label: 'Entire Arena', sequence: 1 },
      },
      dropdown: 'dropdown_with_none',
    }),
    customer_name: StringColumn({
      label: 'Customer Name',
      mandatory: true,
      maxLength: 100,
    }),
    customer_email: StringColumn({
      label: 'Customer Email',
      mandatory: true,
      maxLength: 100,
    }),
    customer_phone: StringColumn({
      label: 'Customer Phone',
      mandatory: true,
      maxLength: 20,
    }),
    total_cost: DecimalColumn({
      label: 'Total Cost',
      mandatory: true,
    }),
    booking_status: StringColumn({
      label: 'Booking Status',
      mandatory: true,
      choices: {
        pending: { label: 'Pending', sequence: 0 },
        confirmed: { label: 'Confirmed', sequence: 1 },
        cancelled: { label: 'Cancelled', sequence: 2 },
        completed: { label: 'Completed', sequence: 3 },
      },
      dropdown: 'dropdown_with_none',
      default: 'pending',
    }),
    payment_status: StringColumn({
      label: 'Payment Status',
      choices: {
        pending: { label: 'Pending', sequence: 0 },
        paid: { label: 'Paid', sequence: 1 },
        refunded: { label: 'Refunded', sequence: 2 },
      },
      dropdown: 'dropdown_with_none',
      default: 'pending',
    }),
    booked_by_staff: BooleanColumn({
      label: 'Booked by Staff',
      default: false,
    }),
    staff_member: ReferenceColumn({
      label: 'Staff Member',
      referenceTable: 'x_466904_recreatio_staff',
    }),
    source: StringColumn({
      label: 'Source',
      choices: {
        web_portal: { label: 'Web Portal', sequence: 0 },
        mobile_app: { label: 'Mobile App', sequence: 1 },
        phone_call: { label: 'Phone Call', sequence: 2 },
        walk_in: { label: 'Walk-in', sequence: 3 },
        external_api: { label: 'External API', sequence: 4 },
      },
      dropdown: 'dropdown_with_none',
      default: 'web_portal',
    }),
    additional_comments: StringColumn({
      label: 'Additional Comments',
      maxLength: 1000,
    }),
  },
  display: 'customer_name',
  allow_web_service_access: true,
  actions: ['create', 'read', 'update', 'delete'],
  accessible_from: 'public',
})