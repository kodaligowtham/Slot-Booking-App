import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Amenities Records
export const amenity1 = Record({
  $id: Now.ID['amenity_1'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Olympic Swimming Pool',
    amenity_type: 'swimming_pool',
    capacity: 50,
    hourly_rate: 25.00,
    is_available: true,
    location: 'Building A - Level 1',
    description: 'Professional Olympic-sized swimming pool with lane dividers and diving board',
    maintenance_notes: 'Pool cleaning scheduled weekly on Sundays'
  }
})

export const amenity2 = Record({
  $id: Now.ID['amenity_2'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Kids Swimming Pool',
    amenity_type: 'swimming_pool',
    capacity: 20,
    hourly_rate: 15.00,
    is_available: true,
    location: 'Building A - Level 1',
    description: 'Shallow swimming pool designed for children and beginners',
    maintenance_notes: 'Daily water testing and cleaning'
  }
})

export const amenity3 = Record({
  $id: Now.ID['amenity_3'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Main Walking Track',
    amenity_type: 'walking_track',
    capacity: 100,
    hourly_rate: 5.00,
    is_available: true,
    location: 'Outdoor - East Side',
    description: '1.5 km outdoor walking/jogging track with rubber surface',
    maintenance_notes: 'Surface inspection monthly'
  }
})

export const amenity4 = Record({
  $id: Now.ID['amenity_4'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Badminton Court 1',
    amenity_type: 'shuttle_court',
    capacity: 4,
    hourly_rate: 30.00,
    is_available: true,
    location: 'Building C - Court 1',
    description: 'Professional badminton court with wooden flooring and proper lighting',
    maintenance_notes: 'Net height checked weekly'
  }
})

export const amenity5 = Record({
  $id: Now.ID['amenity_5'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Badminton Court 2',
    amenity_type: 'shuttle_court',
    capacity: 4,
    hourly_rate: 30.00,
    is_available: true,
    location: 'Building C - Court 2',
    description: 'Professional badminton court with wooden flooring and proper lighting',
    maintenance_notes: 'Net height checked weekly'
  }
})

export const amenity6 = Record({
  $id: Now.ID['amenity_6'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Main Football Ground',
    amenity_type: 'football_ground',
    capacity: 22,
    hourly_rate: 100.00,
    is_available: true,
    location: 'Outdoor - Central Field',
    description: 'Full-size football ground with grass field and goal posts',
    maintenance_notes: 'Grass cutting and line marking weekly'
  }
})

export const amenity7 = Record({
  $id: Now.ID['amenity_7'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Cricket Ground A',
    amenity_type: 'cricket_ground',
    capacity: 22,
    hourly_rate: 120.00,
    is_available: true,
    location: 'Outdoor - South Ground',
    description: 'Professional cricket ground with turf pitch and pavilion',
    maintenance_notes: 'Pitch rolling and maintenance twice weekly'
  }
})

export const amenity8 = Record({
  $id: Now.ID['amenity_8'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: '18-Hole Golf Course',
    amenity_type: 'golf_course',
    capacity: 80,
    hourly_rate: 200.00,
    is_available: true,
    location: 'Outdoor - Golf Complex',
    description: 'Championship 18-hole golf course with clubhouse and pro shop',
    maintenance_notes: 'Green maintenance daily, fairway mowing twice weekly'
  }
})

export const amenity9 = Record({
  $id: Now.ID['amenity_9'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Indoor Walking Track',
    amenity_type: 'walking_track',
    capacity: 30,
    hourly_rate: 8.00,
    is_available: true,
    location: 'Building B - Level 2',
    description: 'Climate-controlled indoor walking track - 400m loop',
    maintenance_notes: 'HVAC maintenance monthly'
  }
})

export const amenity10 = Record({
  $id: Now.ID['amenity_10'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: '9-Hole Golf Course',
    amenity_type: 'golf_course',
    capacity: 40,
    hourly_rate: 150.00,
    is_available: true,
    location: 'Outdoor - Mini Golf',
    description: 'Executive 9-hole golf course perfect for beginners and practice',
    maintenance_notes: 'Green maintenance every other day'
  }
})

export const amenity11 = Record({
  $id: Now.ID['amenity_11'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Practice Football Ground',
    amenity_type: 'football_ground',
    capacity: 14,
    hourly_rate: 75.00,
    is_available: true,
    location: 'Outdoor - North Field',
    description: 'Smaller football ground ideal for practice sessions and youth games',
    maintenance_notes: 'Line marking weekly'
  }
})

export const amenity12 = Record({
  $id: Now.ID['amenity_12'],
  table: 'x_466904_recreatio_amenities',
  data: {
    amenity_name: 'Cricket Practice Net',
    amenity_type: 'cricket_ground',
    capacity: 6,
    hourly_rate: 40.00,
    is_available: true,
    location: 'Outdoor - Practice Area',
    description: 'Cricket practice nets for batting and bowling practice',
    maintenance_notes: 'Net inspection and repair monthly'
  }
})