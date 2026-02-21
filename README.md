# Recreational Facility Slot Booking System - Complete Documentation

## Overview

The Recreational Facility Slot Booking System is a comprehensive ServiceNow application designed to manage bookings for recreational facilities including swimming pools, walking tracks, shuttle courts, football grounds, cricket grounds, and golf courses. The system provides both self-service portal capabilities and staff management tools with external API integration.

## Application Details

- **Application Name**: Recreational Facility Slot Booking
- **Scope**: x_466904_recreatio  
- **Scope ID**: 911ee899c3763210474eb91ed40131a3
- **Instance URL**: https://dev189585.service-now.com

## Table Structures

### 1. Amenities Table (x_466904_recreatio_amenities)
**Purpose**: Stores information about recreational facility amenities
**Extends**: task table

| Field Name | Type | Description | Mandatory |
|------------|------|-------------|-----------|
| amenity_name | String | Name of the amenity | Yes |
| amenity_type | Choice | Type (swimming_pool, walking_track, etc.) | Yes |
| capacity | Integer | Maximum capacity of people | Yes |
| hourly_rate | Decimal | Cost per hour for booking | Yes |
| is_available | Boolean | Availability status | No |
| location | String | Physical location description | No |
| description | String | Detailed description | No |
| maintenance_notes | String | Maintenance related notes | No |

**Access URL**: https://dev189585.service-now.com/x_466904_recreatio_amenities_list.do

### 2. Booking Slots Table (x_466904_recreatio_booking_slots)  
**Purpose**: Manages all facility bookings
**Extends**: task table

| Field Name | Type | Description | Mandatory |
|------------|------|-------------|-----------|
| amenity | Reference | Reference to amenities table | Yes |
| start_time | DateTime | Booking start time | Yes |
| end_time | DateTime | Booking end time | Yes |
| booking_type | Choice | individual_amenity or entire_arena | Yes |
| customer_name | String | Customer's full name | Yes |
| customer_email | String | Customer's email address | Yes |
| customer_phone | String | Customer's phone number | Yes |
| total_cost | Decimal | Total booking cost | Yes |
| booking_status | Choice | pending, confirmed, cancelled, completed | Yes |
| payment_status | Choice | pending, paid, refunded | No |
| booked_by_staff | Boolean | Whether booked by staff member | No |
| staff_member | Reference | Reference to staff table | No |
| source | Choice | Booking source (web_portal, external_api, etc.) | No |
| additional_comments | String | Additional booking comments | No |

**Access URL**: https://dev189585.service-now.com/x_466904_recreatio_booking_slots_list.do

### 3. Staff Table (x_466904_recreatio_staff)
**Purpose**: Manages facility staff information and shift rosters
**Extends**: task table

| Field Name | Type | Description | Mandatory |
|------------|------|-------------|-----------|
| staff_id | String | Unique staff identifier | Yes |
| first_name | String | First name | Yes |
| last_name | String | Last name | Yes |
| email | String | Email address | Yes |
| phone | String | Phone number | Yes |
| position | Choice | manager, supervisor, attendant, etc. | Yes |
| department | Choice | operations, maintenance, etc. | No |
| hire_date | Date | Date of hiring | Yes |
| is_active | Boolean | Active status | No |
| shift_start | String | Shift start time | No |
| shift_end | String | Shift end time | No |
| emergency_contact_name | String | Emergency contact name | No |
| emergency_contact_phone | String | Emergency contact phone | No |

**Access URL**: https://dev189585.service-now.com/x_466904_recreatio_staff_list.do

### 4. Comments Table (x_466904_recreatio_comments)
**Purpose**: Stores additional comments and feedback for bookings

| Field Name | Type | Description | Mandatory |
|------------|------|-------------|-----------|
| booking_slot | Reference | Reference to booking slots table | Yes |
| comment_text | String | Comment content (max 2000 chars) | Yes |
| comment_type | Choice | general, special_request, etc. | No |
| author_name | String | Comment author name | No |
| author_email | String | Comment author email | No |
| is_public | Boolean | Whether comment is public | No |

**Access URL**: https://dev189585.service-now.com/x_466904_recreatio_comments_list.do

## REST API Documentation

### Authentication
All REST APIs support OAuth 2.0 and Basic Authentication. Ensure proper authentication headers are included in requests.

### API Base URLs
- **Booking Slots API**: `/api/x_466904_recreatio/recreational_booking_slots/v1/slots`
- **Comments API**: `/api/x_466904_recreatio/booking_comments/v1/comments`

### Booking Slots API

#### 1. Get Booking Slots (GET)
**Endpoint**: `GET /api/x_466904_recreatio/recreational_booking_slots/v1/slots`

**Query Parameters**:
- `page` (optional): Page number for pagination (default: 1)
- `pagesize` (optional): Records per page (default: 10, max: 1000)
- `source` (optional): Filter by booking source (web_portal, mobile_app, phone_call, walk_in, external_api)
- `booking_status` (optional): Filter by booking status (pending, confirmed, cancelled, completed)

**Example Request**:
```bash
curl -X GET "https://dev189585.service-now.com/api/x_466904_recreatio/recreational_booking_slots/v1/slots?page=1&pagesize=20&source=external_api" \
  -H "Accept: application/json" \
  -u "username:password"
```

**Example Response**:
```json
{
  "result": [
    {
      "sys_id": "abc123...",
      "number": "BSL0001001",
      "amenity": {
        "sys_id": "def456...",
        "display_value": "Olympic Swimming Pool"
      },
      "start_time": "2024-07-30 09:00:00",
      "end_time": "2024-07-30 11:00:00",
      "booking_type": "individual_amenity",
      "customer_name": "John Doe",
      "customer_email": "john.doe@example.com",
      "customer_phone": "+1-555-0123",
      "total_cost": "50.00",
      "booking_status": "confirmed",
      "payment_status": "paid",
      "source": "external_api",
      "sys_created_on": "2024-07-25 14:30:00",
      "sys_updated_on": "2024-07-25 15:45:00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalRecords": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

#### 2. Create Booking Slot (POST)
**Endpoint**: `POST /api/x_466904_recreatio/recreational_booking_slots/v1/slots`

**Request Body**:
```json
{
  "amenity": "sys_id_of_amenity",
  "start_time": "2024-07-30 09:00:00",
  "end_time": "2024-07-30 11:00:00",
  "booking_type": "individual_amenity",
  "customer_name": "John Doe",
  "customer_email": "john.doe@example.com",
  "customer_phone": "+1-555-0123",
  "total_cost": "50.00",
  "booking_status": "pending",
  "payment_status": "pending",
  "additional_comments": "Special requirements for the booking"
}
```

**Example Request**:
```bash
curl -X POST "https://dev189585.service-now.com/api/x_466904_recreatio/recreational_booking_slots/v1/slots" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u "username:password" \
  -d '{
    "amenity": "abc123def456...",
    "start_time": "2024-07-30 09:00:00",
    "end_time": "2024-07-30 11:00:00",
    "booking_type": "individual_amenity",
    "customer_name": "John Doe",
    "customer_email": "john.doe@example.com",
    "customer_phone": "+1-555-0123",
    "total_cost": "50.00",
    "additional_comments": "Pool booking for morning swim"
  }'
```

**Example Response**:
```json
{
  "result": {
    "sys_id": "new123abc456...",
    "number": "BSL0001002",
    "amenity": {
      "sys_id": "abc123def456...",
      "display_value": "Olympic Swimming Pool"
    },
    "start_time": "2024-07-30 09:00:00",
    "end_time": "2024-07-30 11:00:00",
    "booking_type": "individual_amenity",
    "customer_name": "John Doe",
    "customer_email": "john.doe@example.com",
    "customer_phone": "+1-555-0123",
    "total_cost": "50.00",
    "booking_status": "pending",
    "payment_status": "pending",
    "source": "external_api",
    "sys_created_on": "2024-07-30 08:15:00"
  }
}
```

### Comments API

#### 1. Get Comments (GET)
**Endpoint**: `GET /api/x_466904_recreatio/booking_comments/v1/comments`

**Query Parameters**:
- `page` (optional): Page number for pagination (default: 1)  
- `pagesize` (optional): Records per page (default: 10, max: 1000)
- `booking_slot` (optional): Filter by booking slot sys_id
- `comment_type` (optional): Filter by comment type (general, special_request, maintenance_issue, customer_feedback, staff_note)
- `is_public` (optional): Filter by public visibility (true/false)

**Example Request**:
```bash
curl -X GET "https://dev189585.service-now.com/api/x_466904_recreatio/booking_comments/v1/comments?booking_slot=abc123&is_public=true" \
  -H "Accept: application/json" \
  -u "username:password"
```

**Example Response**:
```json
{
  "result": [
    {
      "sys_id": "comment123...",
      "booking_slot": {
        "sys_id": "abc123...",
        "display_value": "BSL0001001 - John Doe"
      },
      "comment_text": "Great facility, very clean and well-maintained.",
      "comment_type": "customer_feedback",
      "author_name": "John Doe",
      "author_email": "john.doe@example.com",
      "is_public": "true",
      "sys_created_on": "2024-07-30 12:00:00",
      "sys_updated_on": "2024-07-30 12:00:00"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalRecords": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

#### 2. Create Comment (POST)
**Endpoint**: `POST /api/x_466904_recreatio/booking_comments/v1/comments`

**Request Body**:
```json
{
  "booking_slot": "sys_id_of_booking_slot",
  "comment_text": "This is a comment about the booking",
  "comment_type": "general",
  "author_name": "John Doe",
  "author_email": "john.doe@example.com",
  "is_public": true
}
```

**Example Request**:
```bash
curl -X POST "https://dev189585.service-now.com/api/x_466904_recreatio/booking_comments/v1/comments" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u "username:password" \
  -d '{
    "booking_slot": "abc123def456...",
    "comment_text": "Pool was excellent, very clean facilities",
    "comment_type": "customer_feedback",
    "author_name": "John Doe",
    "author_email": "john.doe@example.com",
    "is_public": true
  }'
```

**Example Response**:
```json
{
  "result": {
    "sys_id": "comment456...",
    "booking_slot": {
      "sys_id": "abc123def456...",
      "display_value": "BSL0001001 - John Doe"
    },
    "comment_text": "Pool was excellent, very clean facilities",
    "comment_type": "customer_feedback", 
    "author_name": "John Doe",
    "author_email": "john.doe@example.com",
    "is_public": "true",
    "sys_created_on": "2024-07-30 13:20:00"
  }
}
```

## Self-Service Portal

**URL**: https://dev189585.service-now.com/x_466904_recreatio_booking_portal.do

The self-service portal provides customers and staff with an intuitive React-based interface for:

### Features:
1. **Browse Amenities**: View all available facilities with details, capacity, and pricing
2. **Make Bookings**: Create new bookings with real-time cost calculation  
3. **View Bookings**: Browse existing bookings with filtering and status management
4. **Responsive Design**: Works on desktop and mobile devices
5. **Real-time Validation**: Form validation and error handling

### Portal Capabilities:
- **Customer Self-Service**: Customers can book amenities directly
- **Staff Service**: Staff can book on behalf of customers
- **Booking Management**: View, filter, and manage bookings
- **Cost Calculation**: Automatic calculation based on duration and rates

## Application Navigation Menu

Access the application through ServiceNow's application navigator:

**Main Menu**: Recreational Facilities
- **Amenities**: Manage facility amenities
- **Booking Slots**: Manage facility bookings  
- **Staff Management**: Manage staff members
- **Comments**: View customer comments and feedback
- **Self-Service Portal** (Section)
  - **Booking Portal**: Customer self-service portal
- **Administration** (Section)  
  - **Generate Test Data**: Create sample data
  - **REST API Documentation**: View API documentation

## Test Data Generation

The system includes a scheduled script for generating comprehensive test data:

**Features**:
- Creates 12 sample amenities (all facility types)
- Generates 5 sample staff members 
- Creates 2000 booking records with realistic data patterns
- Adds 200+ sample comments
- Auto-numbers all records appropriately
- Covers past 90 days and future 30 days for bookings

**To Run**:
1. Navigate to **Recreational Facilities > Administration > Generate Test Data**
2. Find the "Recreational Facility Test Data Generator" scheduled script
3. Click "Run Now" to execute immediately
4. Check execution logs for completion status

## Data Segregation & Integration Features

### Source Tracking
All booking records include a `source` field that distinguishes:
- **web_portal**: Self-service portal bookings
- **external_api**: API integration bookings  
- **mobile_app**: Mobile application bookings
- **phone_call**: Staff phone bookings
- **walk_in**: Walk-in customer bookings

### API Authentication
- **OAuth 2.0**: Supported for secure external integrations
- **Basic Authentication**: Username/password authentication
- **Token-based**: Uses ServiceNow authentication tokens

### External Application Integration
The REST APIs are designed for external applications with:
- Comprehensive pagination using `chooseWindow` method
- Proper error handling and status codes
- Detailed response metadata
- Rate limiting protection
- Cross-origin request support

## Error Handling & Validation

### API Error Responses
All APIs provide detailed error information:

**400 Bad Request Example**:
```json
{
  "error": "Missing required fields",
  "missing_fields": ["customer_name", "customer_email"]
}
```

**500 Internal Server Error Example**:
```json
{
  "error": "Internal server error", 
  "message": "Database connection failed"
}
```

### Form Validation
The self-service portal includes:
- Real-time field validation
- Email format checking  
- Date range validation
- Required field enforcement
- Custom validation messages

## Performance Features

### Pagination Implementation
- Uses ServiceNow's `chooseWindow()` method for efficient large dataset handling
- Configurable page sizes (max 1000 records)
- Total record counting for navigation
- Optimized queries with proper indexing

### Database Optimization
- Proper table extensions (task table)
- Indexed fields for common searches
- Efficient reference field usage
- Optimized query patterns

## Security & Access Control

### Table-Level Security
- All tables configured for web service access
- Proper access controls (create, read, update, delete)
- Cross-scope access configuration
- Public accessibility for external integrations

### Portal Security
- ServiceNow authentication integration
- User token-based requests
- Secure API endpoints
- XSS protection built-in

## Deployment Information

**Application Status**: ✅ Successfully Deployed  
**Instance**: https://dev189585.service-now.com  
**Deployment Date**: Current session
**Build Status**: Successful
**All Components**: Operational

## Support & Maintenance

### Log Monitoring
- Server-side errors logged to ServiceNow system logs
- API request/response logging
- User activity tracking
- Performance monitoring

### Maintenance Tasks
- Regular test data cleanup
- Performance monitoring  
- Security updates
- API endpoint monitoring
- Database optimization

## Future Enhancement Opportunities

1. **Mobile App Integration**: Native mobile application
2. **Payment Gateway**: Online payment processing
3. **Calendar Integration**: Outlook/Google Calendar sync
4. **SMS Notifications**: Booking confirmations via SMS
5. **Reporting Dashboard**: Advanced analytics and reporting
6. **Resource Conflicts**: Real-time availability checking
7. **Recurring Bookings**: Support for recurring facility bookings
8. **Advanced Scheduling**: Resource optimization algorithms

---

**This completes the comprehensive documentation for the Recreational Facility Slot Booking System. The application is now fully operational and ready for use!**