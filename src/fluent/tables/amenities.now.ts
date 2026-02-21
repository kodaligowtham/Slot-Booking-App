import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, IntegerColumn, DecimalColumn } from '@servicenow/sdk/core'

// Table for recreational facility amenities
export const x_466904_recreatio_amenities = Table({
  name: 'x_466904_recreatio_amenities',
  label: 'Amenities',
  extends: 'task',
  schema: {
    amenity_name: StringColumn({
      label: 'Amenity Name',
      mandatory: true,
      maxLength: 100,
    }),
    amenity_type: StringColumn({
      label: 'Amenity Type',
      mandatory: true,
      choices: {
        swimming_pool: { label: 'Swimming Pool', sequence: 0 },
        walking_track: { label: 'Walking Track', sequence: 1 },
        shuttle_court: { label: 'Shuttle Court', sequence: 2 },
        football_ground: { label: 'Football Ground', sequence: 3 },
        cricket_ground: { label: 'Cricket Ground', sequence: 4 },
        golf_course: { label: 'Golf Course', sequence: 5 },
      },
      dropdown: 'dropdown_with_none',
    }),
    capacity: IntegerColumn({
      label: 'Capacity',
      mandatory: true,
    }),
    hourly_rate: DecimalColumn({
      label: 'Hourly Rate',
      mandatory: true,
    }),
    is_available: BooleanColumn({
      label: 'Available',
      default: true,
    }),
    location: StringColumn({
      label: 'Location',
      maxLength: 255,
    }),
    description: StringColumn({
      label: 'Description',
      maxLength: 1000,
    }),
    maintenance_notes: StringColumn({
      label: 'Maintenance Notes',
      maxLength: 1000,
    }),
  },
  display: 'amenity_name',
  allow_web_service_access: true,
  actions: ['create', 'read', 'update', 'delete'],
  accessible_from: 'public',
})