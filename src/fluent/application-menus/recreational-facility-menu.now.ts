import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Create the main application menu
export const recreationalFacilityMenu = ApplicationMenu({
  $id: Now.ID['recreational_facility_menu'],
  title: 'Recreational Facilities',
  hint: 'Manage recreational facility bookings, amenities, and staff',
  description: 'Complete management system for recreational facility operations',
  active: true,
  order: 100
})

// Create amenities module
export const amenitiesModule = Record({
  $id: Now.ID['amenities_module'],
  table: 'sys_app_module',
  data: {
    title: 'Amenities',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'x_466904_recreatio_amenities',
    hint: 'Manage recreational facility amenities',
    description: 'View and manage all recreational amenities',
    active: true,
    order: 100,
  },
})

// Create booking slots module
export const bookingSlotsModule = Record({
  $id: Now.ID['booking_slots_module'],
  table: 'sys_app_module',
  data: {
    title: 'Booking Slots',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'x_466904_recreatio_booking_slots',
    hint: 'Manage facility bookings',
    description: 'View and manage all booking slots',
    active: true,
    order: 200,
  },
})

// Create staff module
export const staffModule = Record({
  $id: Now.ID['staff_module'],
  table: 'sys_app_module',
  data: {
    title: 'Staff Management',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'x_466904_recreatio_staff',
    hint: 'Manage facility staff',
    description: 'View and manage staff members',
    active: true,
    order: 300,
  },
})

// Create comments module
export const commentsModule = Record({
  $id: Now.ID['comments_module'],
  table: 'sys_app_module',
  data: {
    title: 'Comments',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'x_466904_recreatio_comments',
    hint: 'View booking comments and feedback',
    description: 'Manage customer comments and feedback',
    active: true,
    order: 400,
  },
})

// Create separator for portal section
export const portalSeparator = Record({
  $id: Now.ID['portal_separator'],
  table: 'sys_app_module',
  data: {
    title: 'Self-Service Portal',
    application: recreationalFacilityMenu.$id,
    link_type: 'SEPARATOR',
    active: true,
    order: 500,
  },
})

// Create booking portal module
export const bookingPortalModule = Record({
  $id: Now.ID['booking_portal_module'],
  table: 'sys_app_module',
  data: {
    title: 'Booking Portal',
    application: recreationalFacilityMenu.$id,
    link_type: 'DIRECT',
    query: 'x_466904_recreatio_booking_portal.do',
    hint: 'Self-service booking portal for customers',
    description: 'Customer portal for making facility bookings',
    active: true,
    order: 600,
  },
})

// Create separator for administration section
export const adminSeparator = Record({
  $id: Now.ID['admin_separator'],
  table: 'sys_app_module',
  data: {
    title: 'Administration',
    application: recreationalFacilityMenu.$id,
    link_type: 'SEPARATOR',
    active: true,
    order: 700,
  },
})

// Create test data generator module
export const testDataModule = Record({
  $id: Now.ID['test_data_module'],
  table: 'sys_app_module',
  data: {
    title: 'Generate Test Data',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'sys_scheduled_script',
    query: 'sys_app.scope=x_466904_recreatio^name=Recreational Facility Test Data Generator',
    hint: 'Generate test data for the application',
    description: 'Run the scheduled script to generate sample data',
    active: true,
    order: 800,
  },
})

// Create REST API documentation module
export const apiDocsModule = Record({
  $id: Now.ID['api_docs_module'],
  table: 'sys_app_module',
  data: {
    title: 'REST API Documentation',
    application: recreationalFacilityMenu.$id,
    link_type: 'LIST',
    name: 'sys_ws_definition',
    query: 'sys_app.scope=x_466904_recreatio',
    hint: 'View REST API documentation',
    description: 'Documentation for external API integration',
    active: true,
    order: 900,
  },
})