import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'
import { generateTestData } from '../../server/data-generator.js'

// Create scheduled script using Record API since ScheduledScript may not be available in this version
export const testDataGenerator = Record({
  $id: Now.ID['test_data_generator'],
  table: 'sys_scheduled_script',
  data: {
    name: 'Recreational Facility Test Data Generator',
    description: 'Generates sample data for the recreational facility booking system including amenities, staff, bookings, and comments',
    script: generateTestData,
    active: true,
    run_type: 'once',
    condition: 'true',
    run_start: '2024-12-20 12:00:00', // Future date - can be modified by admin
    run_time: '2024-12-20 12:00:00',
  },
})