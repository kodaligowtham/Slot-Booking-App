import { gs } from '@servicenow/glide'
import { BookingNotificationHandler } from '../script-includes/booking-notification-handler.js'

// Enhanced business rule with comprehensive error handling and validation
try {
    // Validate that we have a current record
    if (!current || !current.isValidRecord()) {
        gs.error('❌ Business rule triggered without valid current record');
        return;
    }
    
    // Double-check the condition logic
    var shouldProcess = false;
    var actionType = 'unknown';
    
    if (typeof action !== 'undefined') {
        if (action === 'insert') {
            shouldProcess = true;
            actionType = 'created';
            gs.info(`📝 Processing new booking notification: ${current.number}`);
        } else if (action === 'update') {
            // Validate we have previous record for comparison
            if (!previous || !previous.isValidRecord()) {
                gs.warn('⚠️ Update action without valid previous record, treating as insert');
                shouldProcess = true;
                actionType = 'created';
            } else {
                // Check for meaningful changes
                var statusChanged = current.booking_status.toString() !== previous.booking_status.toString();
                var timeChanged = current.start_time.toString() !== previous.start_time.toString() || 
                                current.end_time.toString() !== previous.end_time.toString();
                var facilityChanged = current.amenity.toString() !== previous.amenity.toString();
                var customerChanged = current.customer_name.toString() !== previous.customer_name.toString() ||
                                    current.customer_email.toString() !== previous.customer_email.toString();
                
                if (statusChanged || timeChanged || facilityChanged || customerChanged) {
                    shouldProcess = true;
                    actionType = 'updated';
                    gs.info(`📝 Processing booking update notification: ${current.number} (${statusChanged ? 'status,' : ''}${timeChanged ? 'time,' : ''}${facilityChanged ? 'facility,' : ''}${customerChanged ? 'customer' : ''})`);
                } else {
                    gs.debug(`🔄 Skipping notification for ${current.number} - no significant changes detected`);
                    return;
                }
            }
        }
    } else {
        gs.error('❌ Business rule action is undefined');
        return;
    }
    
    if (!shouldProcess) {
        gs.debug('🔄 Notification processing skipped based on conditions');
        return;
    }
    
    // Validate required fields before processing
    var requiredFields = ['number', 'customer_name', 'amenity'];
    var missingFields = [];
    
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!current[field] || current[field].toString().trim() === '') {
            missingFields.push(field);
        }
    }
    
    if (missingFields.length > 0) {
        gs.error(`❌ Cannot process notification for ${current.number} - missing required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Initialize notification handler with error handling
    var notificationHandler;
    try {
        notificationHandler = new BookingNotificationHandler();
        if (!notificationHandler) {
            gs.error('❌ Failed to initialize BookingNotificationHandler');
            return;
        }
    } catch (handlerError) {
        gs.error(`❌ Error initializing notification handler: ${handlerError.message}`);
        return;
    }
    
    // Process notifications asynchronously to avoid blocking the main transaction
    try {
        // Create a clone of the current record for async processing
        var bookingData = {
            number: current.number.toString(),
            customer_name: current.customer_name.toString(),
            customer_email: current.customer_email.toString(),
            customer_phone: current.customer_phone.toString(),
            amenity: current.amenity.toString(),
            start_time: current.start_time.toString(),
            end_time: current.end_time.toString(),
            total_cost: current.total_cost.toString(),
            booking_status: current.booking_status.toString(),
            payment_status: current.payment_status.toString(),
            data_source: current.data_source.toString(),
            sys_id: current.sys_id.toString()
        };
        
        // Queue async notification processing
        gs.eventQueue('x_466904_recreatio.process_booking_notification', current, actionType);
        
        // Also do immediate processing for critical notifications
        if (actionType === 'created' || (actionType === 'updated' && current.booking_status.toString() === 'confirmed')) {
            gs.info(`⚡ Processing immediate notification for critical booking event: ${current.number}`);
            
            var result = notificationHandler.processNotification(current, actionType);
            
            if (result && result.success) {
                gs.info(`✅ Immediate notifications processed successfully for ${current.number} in ${result.processingTime || 0}ms`);
                if (result.results && result.results.success.length > 0) {
                    gs.info(`📊 Successful channels: ${result.results.success.join(', ')}`);
                }
                if (result.results && result.results.failures.length > 0) {
                    gs.warn(`⚠️ Failed channels: ${result.results.failures.join(', ')}`);
                }
            } else {
                gs.error(`❌ Immediate notification processing failed for ${current.number}: ${result ? result.error : 'Unknown error'}`);
                if (result && result.criticalError) {
                    gs.error('🚨 Critical notification error - manual intervention may be required');
                }
            }
        } else {
            gs.info(`📨 Notification queued for async processing: ${current.number}`);
        }
        
    } catch (processingError) {
        gs.error(`❌ Error in notification processing: ${processingError.message}`);
        gs.error(`❌ Stack: ${processingError.stack || 'No stack available'}`);
        
        // Try to send at least an email notification as fallback
        try {
            gs.info('🔄 Attempting fallback email notification...');
            notificationHandler._sendEmailNotifications(current, actionType);
            gs.info('✅ Fallback email notification sent');
        } catch (fallbackError) {
            gs.error(`❌ Fallback notification also failed: ${fallbackError.message}`);
        }
    }
    
} catch (businessRuleError) {
    gs.error(`❌ Critical business rule error: ${businessRuleError.message}`);
    gs.error(`❌ Business rule stack: ${businessRuleError.stack || 'No stack available'}`);
    
    // Log the incident for monitoring
    gs.eventQueue('x_466904_recreatio.notification_system_error', current || null, businessRuleError.message);
}