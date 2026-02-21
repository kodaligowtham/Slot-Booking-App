import '@servicenow/sdk/global'

// Import all tables
import './tables/amenities.now'
import './tables/booking-slots.now'
import './tables/staff.now'
import './tables/comments.now'

// Import sample data
import './sample-data/amenities-data.now'
import './sample-data/staff-data.now'
import './sample-data/booking-data.now'

// Import all REST APIs
import './scripted-rest-apis/booking-api.now'
import './scripted-rest-apis/comments-api.now'

// Import UI Pages
import './ui-pages/booking-portal.now'

// Import scheduled scripts
import './scheduled-scripts/test-data-generator.now'

// Import application menus
import './application-menus/recreational-facility-menu.now'