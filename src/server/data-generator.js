import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

/**
 * Generates test data for the recreational facility booking system
 * Creates sample amenities, staff, and booking records
 */
export function generateTestData() {
  try {
    gs.info('Starting test data generation for Recreational Facility Booking System')
    
    let recordsCreated = 0
    
    // Create sample amenities if they don't exist
    recordsCreated += createSampleAmenities()
    
    // Create sample staff if they don't exist
    recordsCreated += createSampleStaff()
    
    // Create sample booking slots
    recordsCreated += createSampleBookingSlots()
    
    // Create sample comments
    recordsCreated += createSampleComments()
    
    gs.info('Test data generation completed. Total records created: ' + recordsCreated)
    
    return recordsCreated
    
  } catch (error) {
    gs.error('Error in generateTestData: ' + error.message)
    return 0
  }
}

/**
 * Create sample amenities
 */
function createSampleAmenities() {
  let created = 0
  
  const amenities = [
    { name: 'Olympic Swimming Pool', type: 'swimming_pool', capacity: 50, rate: 25.00, location: 'Building A - Level 1' },
    { name: 'Kids Swimming Pool', type: 'swimming_pool', capacity: 20, rate: 15.00, location: 'Building A - Level 1' },
    { name: 'Main Walking Track', type: 'walking_track', capacity: 100, rate: 5.00, location: 'Outdoor - East Side' },
    { name: 'Indoor Walking Track', type: 'walking_track', capacity: 30, rate: 8.00, location: 'Building B - Level 2' },
    { name: 'Badminton Court 1', type: 'shuttle_court', capacity: 4, rate: 30.00, location: 'Building C - Court 1' },
    { name: 'Badminton Court 2', type: 'shuttle_court', capacity: 4, rate: 30.00, location: 'Building C - Court 2' },
    { name: 'Main Football Ground', type: 'football_ground', capacity: 22, rate: 100.00, location: 'Outdoor - Central Field' },
    { name: 'Practice Football Ground', type: 'football_ground', capacity: 14, rate: 75.00, location: 'Outdoor - North Field' },
    { name: 'Cricket Ground A', type: 'cricket_ground', capacity: 22, rate: 120.00, location: 'Outdoor - South Ground' },
    { name: 'Cricket Practice Net', type: 'cricket_ground', capacity: 6, rate: 40.00, location: 'Outdoor - Practice Area' },
    { name: '18-Hole Golf Course', type: 'golf_course', capacity: 80, rate: 200.00, location: 'Outdoor - Golf Complex' },
    { name: '9-Hole Golf Course', type: 'golf_course', capacity: 40, rate: 150.00, location: 'Outdoor - Mini Golf' }
  ]
  
  amenities.forEach(amenity => {
    const gr = new GlideRecord('x_466904_recreatio_amenities')
    gr.addQuery('amenity_name', amenity.name)
    gr.query()
    
    if (!gr.hasNext()) {
      gr.initialize()
      gr.setValue('amenity_name', amenity.name)
      gr.setValue('amenity_type', amenity.type)
      gr.setValue('capacity', amenity.capacity)
      gr.setValue('hourly_rate', amenity.rate)
      gr.setValue('is_available', true)
      gr.setValue('location', amenity.location)
      gr.setValue('description', 'Sample ' + amenity.name + ' facility for recreational activities')
      
      if (gr.insert()) {
        created++
      }
    }
  })
  
  gs.info('Created ' + created + ' sample amenities')
  return created
}

/**
 * Create sample staff members
 */
function createSampleStaff() {
  let created = 0
  
  const staff = [
    { id: 'STAFF001', firstName: 'John', lastName: 'Manager', email: 'john.manager@facility.com', phone: '555-0101', position: 'manager', department: 'operations' },
    { id: 'STAFF002', firstName: 'Sarah', lastName: 'Supervisor', email: 'sarah.supervisor@facility.com', phone: '555-0102', position: 'supervisor', department: 'operations' },
    { id: 'STAFF003', firstName: 'Mike', lastName: 'Attendant', email: 'mike.attendant@facility.com', phone: '555-0103', position: 'attendant', department: 'customer_service' },
    { id: 'STAFF004', firstName: 'Lisa', lastName: 'Maintenance', email: 'lisa.maintenance@facility.com', phone: '555-0104', position: 'maintenance', department: 'maintenance' },
    { id: 'STAFF005', firstName: 'David', lastName: 'Security', email: 'david.security@facility.com', phone: '555-0105', position: 'security', department: 'operations' }
  ]
  
  staff.forEach(member => {
    const gr = new GlideRecord('x_466904_recreatio_staff')
    gr.addQuery('staff_id', member.id)
    gr.query()
    
    if (!gr.hasNext()) {
      gr.initialize()
      gr.setValue('staff_id', member.id)
      gr.setValue('first_name', member.firstName)
      gr.setValue('last_name', member.lastName)
      gr.setValue('email', member.email)
      gr.setValue('phone', member.phone)
      gr.setValue('position', member.position)
      gr.setValue('department', member.department)
      gr.setValue('hire_date', '2024-01-01')
      gr.setValue('is_active', true)
      gr.setValue('shift_start', '08:00')
      gr.setValue('shift_end', '17:00')
      
      if (gr.insert()) {
        created++
      }
    }
  })
  
  gs.info('Created ' + created + ' sample staff members')
  return created
}

/**
 * Create sample booking slots
 */
function createSampleBookingSlots() {
  let created = 0
  const targetRecords = 2000
  
  // Get available amenities
  const amenitiesGr = new GlideRecord('x_466904_recreatio_amenities')
  amenitiesGr.query()
  const amenities = []
  
  while (amenitiesGr.next()) {
    amenities.push({
      sys_id: amenitiesGr.getUniqueValue(),
      name: amenitiesGr.getValue('amenity_name'),
      rate: parseFloat(amenitiesGr.getValue('hourly_rate'))
    })
  }
  
  if (amenities.length === 0) {
    gs.warn('No amenities found. Creating amenities first.')
    return 0
  }
  
  // Get staff members
  const staffGr = new GlideRecord('x_466904_recreatio_staff')
  staffGr.query()
  const staff = []
  
  while (staffGr.next()) {
    staff.push(staffGr.getUniqueValue())
  }
  
  const customers = [
    { name: 'Alice Johnson', email: 'alice.johnson@email.com', phone: '555-1001' },
    { name: 'Bob Smith', email: 'bob.smith@email.com', phone: '555-1002' },
    { name: 'Carol Davis', email: 'carol.davis@email.com', phone: '555-1003' },
    { name: 'David Wilson', email: 'david.wilson@email.com', phone: '555-1004' },
    { name: 'Eva Brown', email: 'eva.brown@email.com', phone: '555-1005' },
    { name: 'Frank Miller', email: 'frank.miller@email.com', phone: '555-1006' },
    { name: 'Grace Lee', email: 'grace.lee@email.com', phone: '555-1007' },
    { name: 'Henry Taylor', email: 'henry.taylor@email.com', phone: '555-1008' }
  ]
  
  const bookingTypes = ['individual_amenity', 'entire_arena']
  const statuses = ['pending', 'confirmed', 'cancelled', 'completed']
  const paymentStatuses = ['pending', 'paid', 'refunded']
  const sources = ['web_portal', 'mobile_app', 'phone_call', 'walk_in', 'external_api']
  
  // Generate bookings for the past 90 days and next 30 days
  const currentDate = new GlideDateTime()
  const startDate = new GlideDateTime()
  startDate.addDaysLocalTime(-90)
  
  for (let i = 0; i < targetRecords; i++) {
    try {
      const gr = new GlideRecord('x_466904_recreatio_booking_slots')
      gr.initialize()
      
      // Random amenity
      const amenity = amenities[Math.floor(Math.random() * amenities.length)]
      
      // Random date within range
      const randomDays = Math.floor(Math.random() * 120) // -90 to +30 days
      const bookingDate = new GlideDateTime()
      bookingDate.addDaysLocalTime(randomDays - 90)
      
      // Random time slots (8 AM to 8 PM)
      const startHour = Math.floor(Math.random() * 12) + 8 // 8 to 19
      const duration = Math.floor(Math.random() * 3) + 1 // 1 to 3 hours
      
      const startTime = new GlideDateTime()
      startTime.setValue(bookingDate.getValue())
      startTime.addSeconds(startHour * 3600)
      
      const endTime = new GlideDateTime()
      endTime.setValue(startTime.getValue())
      endTime.addSeconds(duration * 3600)
      
      // Random customer
      const customer = customers[Math.floor(Math.random() * customers.length)]
      
      // Calculate cost (amenity rate * duration)
      const totalCost = amenity.rate * duration
      
      gr.setValue('amenity', amenity.sys_id)
      gr.setValue('start_time', startTime.getValue())
      gr.setValue('end_time', endTime.getValue())
      gr.setValue('booking_type', bookingTypes[Math.floor(Math.random() * bookingTypes.length)])
      gr.setValue('customer_name', customer.name)
      gr.setValue('customer_email', customer.email)
      gr.setValue('customer_phone', customer.phone)
      gr.setValue('total_cost', totalCost.toFixed(2))
      gr.setValue('booking_status', statuses[Math.floor(Math.random() * statuses.length)])
      gr.setValue('payment_status', paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)])
      gr.setValue('source', sources[Math.floor(Math.random() * sources.length)])
      
      // Randomly assign staff for some bookings
      if (staff.length > 0 && Math.random() < 0.3) {
        gr.setValue('booked_by_staff', true)
        gr.setValue('staff_member', staff[Math.floor(Math.random() * staff.length)])
      }
      
      if (Math.random() < 0.4) {
        gr.setValue('additional_comments', 'Sample booking #' + (i + 1) + ' - Generated test data')
      }
      
      if (gr.insert()) {
        created++
      }
      
      // Progress logging every 100 records
      if (i % 100 === 0) {
        gs.info('Generated ' + i + ' booking records so far...')
      }
      
    } catch (error) {
      gs.error('Error creating booking record #' + i + ': ' + error.message)
    }
  }
  
  gs.info('Created ' + created + ' sample booking slots')
  return created
}

/**
 * Create sample comments
 */
function createSampleComments() {
  let created = 0
  
  // Get some recent booking slots to add comments to
  const bookingGr = new GlideRecord('x_466904_recreatio_booking_slots')
  bookingGr.orderByDesc('sys_created_on')
  bookingGr.setLimit(50)
  bookingGr.query()
  
  const commentTexts = [
    'Great facility, very clean and well-maintained.',
    'Could use better lighting in the evening hours.',
    'Excellent customer service from the staff.',
    'Equipment needs some maintenance work.',
    'Perfect for our team training session.',
    'Would recommend this facility to others.',
    'Booking process was very smooth.',
    'Staff was very helpful and accommodating.',
    'Facility exceeded our expectations.',
    'Minor issues with the changing rooms.'
  ]
  
  const commentTypes = ['general', 'special_request', 'maintenance_issue', 'customer_feedback', 'staff_note']
  
  while (bookingGr.next() && created < 200) {
    // Add 1-3 comments per booking (randomly)
    const numComments = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < numComments; i++) {
      const commentGr = new GlideRecord('x_466904_recreatio_comments')
      commentGr.initialize()
      
      commentGr.setValue('booking_slot', bookingGr.getUniqueValue())
      commentGr.setValue('comment_text', commentTexts[Math.floor(Math.random() * commentTexts.length)])
      commentGr.setValue('comment_type', commentTypes[Math.floor(Math.random() * commentTypes.length)])
      commentGr.setValue('author_name', 'Sample User ' + (created + 1))
      commentGr.setValue('author_email', 'user' + (created + 1) + '@example.com')
      commentGr.setValue('is_public', Math.random() > 0.2) // 80% public comments
      
      if (commentGr.insert()) {
        created++
      }
    }
  }
  
  gs.info('Created ' + created + ' sample comments')
  return created
}