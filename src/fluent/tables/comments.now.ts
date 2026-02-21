import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

// Table for additional comments on booking slots
export const x_466904_recreatio_comments = Table({
  name: 'x_466904_recreatio_comments',
  label: 'Booking Comments',
  schema: {
    booking_slot: ReferenceColumn({
      label: 'Booking Slot',
      referenceTable: 'x_466904_recreatio_booking_slots',
      mandatory: true,
    }),
    comment_text: StringColumn({
      label: 'Comment',
      mandatory: true,
      maxLength: 2000,
    }),
    comment_type: StringColumn({
      label: 'Comment Type',
      choices: {
        general: { label: 'General', sequence: 0 },
        special_request: { label: 'Special Request', sequence: 1 },
        maintenance_issue: { label: 'Maintenance Issue', sequence: 2 },
        customer_feedback: { label: 'Customer Feedback', sequence: 3 },
        staff_note: { label: 'Staff Note', sequence: 4 },
      },
      dropdown: 'dropdown_with_none',
      default: 'general',
    }),
    author_name: StringColumn({
      label: 'Author Name',
      maxLength: 100,
    }),
    author_email: StringColumn({
      label: 'Author Email',
      maxLength: 100,
    }),
    is_public: BooleanColumn({
      label: 'Public Comment',
      default: true,
    }),
  },
  display: 'comment_text',
  allow_web_service_access: true,
  actions: ['create', 'read', 'update', 'delete'],
  accessible_from: 'public',
})