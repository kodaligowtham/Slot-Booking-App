import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Staff Records
export const staff1 = Record({
  $id: Now.ID['staff_1'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF001',
    first_name: 'John',
    last_name: 'Manager',
    email: 'john.manager@facility.com',
    phone: '555-0101',
    position: 'manager',
    department: 'operations',
    hire_date: '2024-01-01',
    is_active: true,
    shift_start: '08:00',
    shift_end: '17:00',
    emergency_contact_name: 'Jane Manager',
    emergency_contact_phone: '555-0111'
  }
})

export const staff2 = Record({
  $id: Now.ID['staff_2'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF002',
    first_name: 'Sarah',
    last_name: 'Supervisor',
    email: 'sarah.supervisor@facility.com',
    phone: '555-0102',
    position: 'supervisor',
    department: 'operations',
    hire_date: '2024-02-15',
    is_active: true,
    shift_start: '09:00',
    shift_end: '18:00',
    emergency_contact_name: 'Mike Supervisor',
    emergency_contact_phone: '555-0112'
  }
})

export const staff3 = Record({
  $id: Now.ID['staff_3'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF003',
    first_name: 'Mike',
    last_name: 'Attendant',
    email: 'mike.attendant@facility.com',
    phone: '555-0103',
    position: 'attendant',
    department: 'customer_service',
    hire_date: '2024-03-01',
    is_active: true,
    shift_start: '07:00',
    shift_end: '16:00',
    emergency_contact_name: 'Lisa Attendant',
    emergency_contact_phone: '555-0113'
  }
})

export const staff4 = Record({
  $id: Now.ID['staff_4'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF004',
    first_name: 'Lisa',
    last_name: 'Maintenance',
    email: 'lisa.maintenance@facility.com',
    phone: '555-0104',
    position: 'maintenance',
    department: 'maintenance',
    hire_date: '2024-01-15',
    is_active: true,
    shift_start: '06:00',
    shift_end: '15:00',
    emergency_contact_name: 'Tom Maintenance',
    emergency_contact_phone: '555-0114'
  }
})

export const staff5 = Record({
  $id: Now.ID['staff_5'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF005',
    first_name: 'David',
    last_name: 'Security',
    email: 'david.security@facility.com',
    phone: '555-0105',
    position: 'security',
    department: 'operations',
    hire_date: '2024-02-01',
    is_active: true,
    shift_start: '18:00',
    shift_end: '06:00',
    emergency_contact_name: 'Carol Security',
    emergency_contact_phone: '555-0115'
  }
})

export const staff6 = Record({
  $id: Now.ID['staff_6'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF006',
    first_name: 'Emma',
    last_name: 'Johnson',
    email: 'emma.johnson@facility.com',
    phone: '555-0106',
    position: 'attendant',
    department: 'customer_service',
    hire_date: '2024-04-01',
    is_active: true,
    shift_start: '10:00',
    shift_end: '19:00',
    emergency_contact_name: 'Robert Johnson',
    emergency_contact_phone: '555-0116'
  }
})

export const staff7 = Record({
  $id: Now.ID['staff_7'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF007',
    first_name: 'Carlos',
    last_name: 'Rodriguez',
    email: 'carlos.rodriguez@facility.com',
    phone: '555-0107',
    position: 'maintenance',
    department: 'maintenance',
    hire_date: '2024-03-15',
    is_active: true,
    shift_start: '14:00',
    shift_end: '22:00',
    emergency_contact_name: 'Maria Rodriguez',
    emergency_contact_phone: '555-0117'
  }
})

export const staff8 = Record({
  $id: Now.ID['staff_8'],
  table: 'x_466904_recreatio_staff',
  data: {
    staff_id: 'STAFF008',
    first_name: 'Jennifer',
    last_name: 'Chen',
    email: 'jennifer.chen@facility.com',
    phone: '555-0108',
    position: 'supervisor',
    department: 'customer_service',
    hire_date: '2024-01-20',
    is_active: true,
    shift_start: '11:00',
    shift_end: '20:00',
    emergency_contact_name: 'Kevin Chen',
    emergency_contact_phone: '555-0118'
  }
})