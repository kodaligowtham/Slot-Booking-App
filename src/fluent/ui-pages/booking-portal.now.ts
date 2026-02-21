import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import bookingPortalHtml from '../../client/index.html'

// UI Page for the recreational facility booking portal
export const recreationalBookingPortal = UiPage({
  $id: Now.ID['recreational_booking_portal'],
  endpoint: 'x_466904_recreatio_booking_portal.do',
  description: 'Self-service portal for booking recreational facility amenities',
  category: 'general',
  html: bookingPortalHtml,
  direct: true
})