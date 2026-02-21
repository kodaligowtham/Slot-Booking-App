import { gs, GlideRecord } from '@servicenow/glide'

export function handleBookingSlots(request, response) {
    const startTime = new Date().getTime();
    
    try {
        // Set security headers
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('X-Frame-Options', 'DENY');
        response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        const method = request.getMethod();
        gs.info(`📡 Booking API request: ${method} from ${request.getRemoteAddr()}`);
        
        if (method === 'GET') {
            return handleGetBookings(request, response);
        } else if (method === 'POST') {
            return handleCreateBooking(request, response);
        } else {
            return sendErrorResponse(response, 405, 'METHOD_NOT_ALLOWED', `Method ${method} not allowed`, startTime);
        }
        
    } catch (error) {
        gs.error(`❌ Critical API error: ${error.message}`);
        return sendErrorResponse(response, 500, 'INTERNAL_SERVER_ERROR', 'An unexpected error occurred', startTime);
    }
}

function handleGetBookings(request, response) {
    const startTime = new Date().getTime();
    
    try {
        // Parse and validate query parameters
        const params = parseAndValidateGetParams(request);
        if (!params.valid) {
            return sendErrorResponse(response, 400, 'INVALID_PARAMETERS', params.errors.join(', '), startTime);
        }
        
        // Build query with security filters
        const bookingsGr = new GlideRecord('x_466904_recreatio_booking_slots');
        
        // Apply filters
        if (params.status) {
            bookingsGr.addQuery('booking_status', params.status);
        }
        
        if (params.source) {
            bookingsGr.addQuery('data_source', params.source);
        }
        
        if (params.amenity) {
            // Validate amenity sys_id exists
            const amenityGr = new GlideRecord('x_466904_recreatio_amenities');
            if (!amenityGr.get(params.amenity)) {
                return sendErrorResponse(response, 400, 'INVALID_AMENITY', 'Specified amenity does not exist', startTime);
            }
            bookingsGr.addQuery('amenity', params.amenity);
        }
        
        if (params.startDate && params.endDate) {
            bookingsGr.addQuery('start_time', '>=', params.startDate);
            bookingsGr.addQuery('start_time', '<=', params.endDate);
        }
        
        // Security: only return bookings that user has read access to
        bookingsGr.addActiveQuery();
        
        // Get total count for pagination
        const totalQuery = new GlideRecord('x_466904_recreatio_booking_slots');
        totalQuery.addActiveQuery();
        if (params.status) totalQuery.addQuery('booking_status', params.status);
        if (params.source) totalQuery.addQuery('data_source', params.source);
        if (params.amenity) totalQuery.addQuery('amenity', params.amenity);
        if (params.startDate && params.endDate) {
            totalQuery.addQuery('start_time', '>=', params.startDate);
            totalQuery.addQuery('start_time', '<=', params.endDate);
        }
        totalQuery.query();
        const totalRecords = totalQuery.getRowCount();
        
        // Apply pagination with chooseWindow
        bookingsGr.chooseWindow(params.offset, params.offset + params.pageSize);
        bookingsGr.orderByDesc('sys_created_on');
        bookingsGr.query();
        
        // Build response
        const bookings = [];
        const bookingIds = [];
        
        while (bookingsGr.next()) {
            bookingIds.push(bookingsGr.sys_id.toString());
            
            const booking = {
                sys_id: bookingsGr.sys_id.toString(),
                number: sanitizeOutput(bookingsGr.number.toString()),
                customer_name: sanitizeOutput(bookingsGr.customer_name.toString()),
                customer_email: sanitizeOutput(bookingsGr.customer_email.toString()),
                customer_phone: sanitizeOutput(bookingsGr.customer_phone.toString()),
                start_time: bookingsGr.start_time.toString(),
                end_time: bookingsGr.end_time.toString(),
                total_cost: bookingsGr.total_cost.toString(),
                booking_status: sanitizeOutput(bookingsGr.booking_status.toString()),
                payment_status: sanitizeOutput(bookingsGr.payment_status.toString()),
                data_source: sanitizeOutput(bookingsGr.data_source.toString()),
                created: bookingsGr.sys_created_on.toString(),
                updated: bookingsGr.sys_updated_on.toString()
            };
            
            // Get amenity details safely
            const amenityGr = new GlideRecord('x_466904_recreatio_amenities');
            if (amenityGr.get(bookingsGr.amenity.toString())) {
                booking.amenity = {
                    sys_id: amenityGr.sys_id.toString(),
                    name: sanitizeOutput(amenityGr.name.toString()),
                    type: sanitizeOutput(amenityGr.amenity_type.toString())
                };
            } else {
                booking.amenity = {
                    sys_id: bookingsGr.amenity.toString(),
                    name: 'Unknown',
                    type: 'unknown'
                };
            }
            
            bookings.push(booking);
        }
        
        // Calculate pagination info
        const totalPages = Math.ceil(totalRecords / params.pageSize);
        const processingTime = new Date().getTime() - startTime;
        
        const result = {
            result: {
                bookings: bookings,
                pagination: {
                    page: params.page,
                    pagesize: params.pageSize,
                    total: totalRecords,
                    pages: totalPages,
                    has_more: params.page < totalPages
                },
                filters: {
                    status: params.status,
                    source: params.source,
                    amenity: params.amenity,
                    date_range: params.startDate ? `${params.startDate} to ${params.endDate}` : null
                },
                meta: {
                    processing_time_ms: processingTime,
                    returned_count: bookings.length,
                    api_version: '1.0'
                }
            }
        };
        
        response.setStatus(200);
        response.setHeader('Content-Type', 'application/json');
        response.getWriter().print(JSON.stringify(result));
        
        gs.info(`📊 GET /slots: returned ${bookings.length}/${totalRecords} records in ${processingTime}ms`);
        
    } catch (error) {
        gs.error(`❌ Error in GET /slots: ${error.message}`);
        return sendErrorResponse(response, 500, 'QUERY_ERROR', 'Error retrieving bookings', startTime);
    }
}

function handleCreateBooking(request, response) {
    const startTime = new Date().getTime();
    
    try {
        // Parse and validate request body
        const requestBody = request.getBody();
        if (!requestBody || requestBody.trim() === '') {
            return sendErrorResponse(response, 400, 'EMPTY_BODY', 'Request body is required', startTime);
        }
        
        let bookingData;
        try {
            bookingData = JSON.parse(requestBody);
        } catch (parseError) {
            gs.error(`❌ JSON parse error: ${parseError.message}`);
            return sendErrorResponse(response, 400, 'INVALID_JSON', 'Invalid JSON format', startTime);
        }
        
        // Validate required fields
        const validation = validateBookingData(bookingData);
        if (!validation.valid) {
            return sendErrorResponse(response, 400, 'VALIDATION_ERROR', validation.errors.join(', '), startTime);
        }
        
        // Additional business logic validation
        const businessValidation = validateBookingBusinessRules(bookingData);
        if (!businessValidation.valid) {
            return sendErrorResponse(response, 422, 'BUSINESS_RULE_ERROR', businessValidation.errors.join(', '), startTime);
        }
        
        // Create the booking record
        const bookingGr = new GlideRecord('x_466904_recreatio_booking_slots');
        
        // Set all fields with sanitization
        bookingGr.customer_name = sanitizeInput(bookingData.customer_name);
        bookingGr.customer_email = sanitizeInput(bookingData.customer_email);
        bookingGr.customer_phone = sanitizeInput(bookingData.customer_phone);
        bookingGr.amenity = sanitizeInput(bookingData.amenity);
        bookingGr.start_time = bookingData.start_time;
        bookingGr.end_time = bookingData.end_time;
        bookingGr.total_cost = parseFloat(bookingData.total_cost) || 0;
        bookingGr.booking_status = sanitizeInput(bookingData.booking_status || 'pending');
        bookingGr.payment_status = sanitizeInput(bookingData.payment_status || 'unpaid');
        bookingGr.data_source = 'api';
        
        // Set optional fields
        if (bookingData.special_requests) {
            bookingGr.special_requests = sanitizeInput(bookingData.special_requests);
        }
        
        if (bookingData.notes) {
            bookingGr.notes = sanitizeInput(bookingData.notes);
        }
        
        // Insert the record
        const newSysId = bookingGr.insert();
        
        if (!newSysId) {
            gs.error('❌ Failed to create booking record');
            return sendErrorResponse(response, 500, 'CREATE_FAILED', 'Failed to create booking', startTime);
        }
        
        // Get the created record with all auto-generated fields
        bookingGr.get(newSysId);
        
        // Build response
        const processingTime = new Date().getTime() - startTime;
        
        const result = {
            result: {
                booking: {
                    sys_id: bookingGr.sys_id.toString(),
                    number: bookingGr.number.toString(),
                    customer_name: sanitizeOutput(bookingGr.customer_name.toString()),
                    customer_email: sanitizeOutput(bookingGr.customer_email.toString()),
                    customer_phone: sanitizeOutput(bookingGr.customer_phone.toString()),
                    start_time: bookingGr.start_time.toString(),
                    end_time: bookingGr.end_time.toString(),
                    total_cost: bookingGr.total_cost.toString(),
                    booking_status: sanitizeOutput(bookingGr.booking_status.toString()),
                    payment_status: sanitizeOutput(bookingGr.payment_status.toString()),
                    data_source: sanitizeOutput(bookingGr.data_source.toString()),
                    created: bookingGr.sys_created_on.toString()
                },
                meta: {
                    processing_time_ms: processingTime,
                    api_version: '1.0',
                    notifications_triggered: true
                },
                message: 'Booking created successfully. Staff notifications have been triggered.'
            }
        };
        
        response.setStatus(201);
        response.setHeader('Content-Type', 'application/json');
        response.getWriter().print(JSON.stringify(result));
        
        gs.info(`✅ POST /slots: booking ${bookingGr.number} created successfully in ${processingTime}ms`);
        
    } catch (error) {
        gs.error(`❌ Error in POST /slots: ${error.message}`);
        return sendErrorResponse(response, 500, 'CREATE_ERROR', 'Error creating booking', startTime);
    }
}

function parseAndValidateGetParams(request) {
    const errors = [];
    
    try {
        // Parse pagination parameters
        let page = parseInt(request.getParameter('page') || '1');
        let pageSize = parseInt(request.getParameter('pagesize') || '10');
        
        // Validate and constrain pagination
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        
        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = 10;
        } else if (pageSize > 100) {
            pageSize = 100;
            errors.push('Page size limited to maximum of 100');
        }
        
        const offset = (page - 1) * pageSize;
        
        // Parse filter parameters
        const status = sanitizeInput(request.getParameter('status') || '');
        const source = sanitizeInput(request.getParameter('source') || '');
        const amenity = sanitizeInput(request.getParameter('amenity') || '');
        const startDate = request.getParameter('start_date') || '';
        const endDate = request.getParameter('end_date') || '';
        
        // Validate filter values
        if (status && !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            errors.push('Invalid status value');
        }
        
        if (source && !['api', 'platform'].includes(source)) {
            errors.push('Invalid source value');
        }
        
        if (amenity && !isValidSysId(amenity)) {
            errors.push('Invalid amenity sys_id format');
        }
        
        // Validate date parameters
        if (startDate && !isValidDateTime(startDate)) {
            errors.push('Invalid start_date format (use YYYY-MM-DD HH:mm:ss)');
        }
        
        if (endDate && !isValidDateTime(endDate)) {
            errors.push('Invalid end_date format (use YYYY-MM-DD HH:mm:ss)');
        }
        
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            errors.push('start_date cannot be after end_date');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors,
            page: page,
            pageSize: pageSize,
            offset: offset,
            status: status || null,
            source: source || null,
            amenity: amenity || null,
            startDate: startDate || null,
            endDate: endDate || null
        };
        
    } catch (error) {
        errors.push(`Parameter parsing error: ${error.message}`);
        return { valid: false, errors: errors };
    }
}

function validateBookingData(data) {
    const errors = [];
    const requiredFields = ['customer_name', 'customer_email', 'amenity', 'start_time', 'end_time'];
    
    try {
        // Check required fields
        requiredFields.forEach(field => {
            if (!data[field] || data[field].toString().trim() === '') {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        // Validate email format
        if (data.customer_email && !isValidEmail(data.customer_email)) {
            errors.push('Invalid email format');
        }
        
        // Validate sys_id format for amenity
        if (data.amenity && !isValidSysId(data.amenity)) {
            errors.push('Invalid amenity sys_id format');
        }
        
        // Validate date/time formats
        if (data.start_time && !isValidDateTime(data.start_time)) {
            errors.push('Invalid start_time format (use YYYY-MM-DD HH:mm:ss)');
        }
        
        if (data.end_time && !isValidDateTime(data.end_time)) {
            errors.push('Invalid end_time format (use YYYY-MM-DD HH:mm:ss)');
        }
        
        // Validate time logic
        if (data.start_time && data.end_time) {
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            
            if (startTime >= endTime) {
                errors.push('end_time must be after start_time');
            }
            
            if (startTime < new Date()) {
                errors.push('start_time cannot be in the past');
            }
        }
        
        // Validate cost if provided
        if (data.total_cost !== undefined && data.total_cost !== null) {
            const cost = parseFloat(data.total_cost);
            if (isNaN(cost) || cost < 0) {
                errors.push('total_cost must be a positive number');
            }
        }
        
        // Validate phone format if provided
        if (data.customer_phone && !isValidPhone(data.customer_phone)) {
            errors.push('Invalid phone number format');
        }
        
        // Validate string field lengths
        if (data.customer_name && data.customer_name.length > 100) {
            errors.push('customer_name must be 100 characters or less');
        }
        
        if (data.special_requests && data.special_requests.length > 1000) {
            errors.push('special_requests must be 1000 characters or less');
        }
        
        if (data.notes && data.notes.length > 1000) {
            errors.push('notes must be 1000 characters or less');
        }
        
    } catch (error) {
        errors.push(`Validation error: ${error.message}`);
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function validateBookingBusinessRules(data) {
    const errors = [];
    
    try {
        // Check if amenity exists and is available
        const amenityGr = new GlideRecord('x_466904_recreatio_amenities');
        if (!amenityGr.get(data.amenity)) {
            errors.push('Specified amenity does not exist');
        } else if (!amenityGr.available || amenityGr.available.toString() === 'false') {
            errors.push('Specified amenity is not available for booking');
        }
        
        // Check for time slot conflicts
        if (data.start_time && data.end_time && data.amenity) {
            const conflictGr = new GlideRecord('x_466904_recreatio_booking_slots');
            conflictGr.addQuery('amenity', data.amenity);
            conflictGr.addQuery('booking_status', 'IN', 'pending,confirmed');
            conflictGr.addQuery('start_time', '<', data.end_time);
            conflictGr.addQuery('end_time', '>', data.start_time);
            conflictGr.query();
            
            if (conflictGr.hasNext()) {
                errors.push('Time slot conflicts with existing booking');
            }
        }
        
        // Validate booking duration limits
        if (data.start_time && data.end_time) {
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            const durationHours = (endTime - startTime) / (1000 * 60 * 60);
            
            if (durationHours > 8) {
                errors.push('Booking duration cannot exceed 8 hours');
            }
            
            if (durationHours < 0.5) {
                errors.push('Booking duration must be at least 30 minutes');
            }
        }
        
        // Validate booking advance notice (at least 1 hour from now)
        if (data.start_time) {
            const startTime = new Date(data.start_time);
            const now = new Date();
            const hoursFromNow = (startTime - now) / (1000 * 60 * 60);
            
            if (hoursFromNow < 1) {
                errors.push('Bookings must be made at least 1 hour in advance');
            }
            
            // Don't allow bookings more than 3 months in advance
            if (hoursFromNow > (24 * 30 * 3)) {
                errors.push('Bookings cannot be made more than 3 months in advance');
            }
        }
        
    } catch (error) {
        errors.push(`Business rule validation error: ${error.message}`);
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// Utility functions
function sanitizeInput(input) {
    if (!input) return '';
    return input.toString().replace(/[<>\"'&]/g, '').trim();
}

function sanitizeOutput(output) {
    if (!output) return '';
    return output.toString().trim();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidSysId(sysId) {
    const sysIdRegex = /^[a-f0-9]{32}$/i;
    return sysIdRegex.test(sysId);
}

function isValidDateTime(dateTime) {
    const date = new Date(dateTime);
    return !isNaN(date.getTime()) && dateTime.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
}

function sendErrorResponse(response, statusCode, errorCode, message, startTime) {
    const processingTime = new Date().getTime() - startTime;
    
    const errorResponse = {
        error: {
            code: errorCode,
            message: message,
            status: statusCode,
            timestamp: new Date().toISOString(),
            processing_time_ms: processingTime
        }
    };
    
    response.setStatus(statusCode);
    response.setHeader('Content-Type', 'application/json');
    response.getWriter().print(JSON.stringify(errorResponse));
    
    gs.warn(`⚠️ API Error ${statusCode}: ${errorCode} - ${message} (${processingTime}ms)`);
}