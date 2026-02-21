import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, DateColumn } from '@servicenow/sdk/core'

// Table for staff details
export const x_466904_recreatio_staff = Table({
  name: 'x_466904_recreatio_staff',
  label: 'Staff',
  extends: 'task',
  schema: {
    staff_id: StringColumn({
      label: 'Staff ID',
      mandatory: true,
      maxLength: 20,
    }),
    first_name: StringColumn({
      label: 'First Name',
      mandatory: true,
      maxLength: 50,
    }),
    last_name: StringColumn({
      label: 'Last Name',
      mandatory: true,
      maxLength: 50,
    }),
    email: StringColumn({
      label: 'Email',
      mandatory: true,
      maxLength: 100,
    }),
    phone: StringColumn({
      label: 'Phone',
      mandatory: true,
      maxLength: 20,
    }),
    position: StringColumn({
      label: 'Position',
      mandatory: true,
      choices: {
        manager: { label: 'Manager', sequence: 0 },
        supervisor: { label: 'Supervisor', sequence: 1 },
        attendant: { label: 'Attendant', sequence: 2 },
        maintenance: { label: 'Maintenance', sequence: 3 },
        security: { label: 'Security', sequence: 4 },
      },
      dropdown: 'dropdown_with_none',
    }),
    department: StringColumn({
      label: 'Department',
      choices: {
        operations: { label: 'Operations', sequence: 0 },
        maintenance: { label: 'Maintenance', sequence: 1 },
        customer_service: { label: 'Customer Service', sequence: 2 },
        administration: { label: 'Administration', sequence: 3 },
      },
      dropdown: 'dropdown_with_none',
    }),
    hire_date: DateColumn({
      label: 'Hire Date',
      mandatory: true,
    }),
    is_active: BooleanColumn({
      label: 'Active',
      default: true,
    }),
    shift_start: StringColumn({
      label: 'Shift Start Time',
      maxLength: 10,
    }),
    shift_end: StringColumn({
      label: 'Shift End Time',
      maxLength: 10,
    }),
    emergency_contact_name: StringColumn({
      label: 'Emergency Contact Name',
      maxLength: 100,
    }),
    emergency_contact_phone: StringColumn({
      label: 'Emergency Contact Phone',
      maxLength: 20,
    }),
  },
  display: 'staff_id',
  allow_web_service_access: true,
  actions: ['create', 'read', 'update', 'delete'],
  accessible_from: 'public',
})