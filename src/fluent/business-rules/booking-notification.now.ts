import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br_booking_notification'],
    name: 'Booking Notification Handler',
    table: 'x_466904_recreatio_booking_slots',
    when: 'after',
    action: ['insert', 'update'],
    script: Now.include('../../server/business-rules/booking-notification-handler.js'),
    order: 100,
    active: true,
    condition: `
        // Only trigger notifications for meaningful changes
        var shouldTrigger = false;
        
        try {
            if (action === 'insert') {
                // Always trigger on new bookings
                shouldTrigger = true;
                gs.info('🔄 Booking notification trigger: New booking created - ' + current.number);
            } else if (action === 'update') {
                // Only trigger on status changes or important field updates
                var statusChanged = current.booking_status.toString() !== previous.booking_status.toString();
                var timeChanged = current.start_time.toString() !== previous.start_time.toString() || 
                                current.end_time.toString() !== previous.end_time.toString();
                var facilityChanged = current.amenity.toString() !== previous.amenity.toString();
                
                shouldTrigger = statusChanged || timeChanged || facilityChanged;
                
                if (shouldTrigger) {
                    gs.info('🔄 Booking notification trigger: Important booking update - ' + current.number);
                } else {
                    gs.debug('🔄 Booking notification skipped: No significant changes - ' + current.number);
                }
            }
        } catch (error) {
            gs.error('❌ Error in booking notification condition: ' + error.message);
            shouldTrigger = false;
        }
        
        shouldTrigger;
    `,
})