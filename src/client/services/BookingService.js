/**
 * Service class for handling booking-related API operations
 */
export class BookingService {
  constructor() {
    this.amenitiesTable = "x_466904_recreatio_amenities";
    this.bookingsTable = "x_466904_recreatio_booking_slots";
    this.commentsTable = "x_466904_recreatio_comments";
  }
  
  /**
   * Get all available amenities
   */
  async getAmenities() {
    try {
      const searchParams = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_query: 'is_available=true^ORDERBYamenity_name'
      });
      
      const response = await fetch(`/api/now/table/${this.amenitiesTable}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to fetch amenities: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching amenities:', error);
      throw error;
    }
  }
  
  /**
   * Get booking slots with optional filtering
   */
  async getBookings(filters = {}) {
    try {
      const searchParams = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_limit: '50'
      });
      
      // Add filters
      let query = 'ORDERBYDESCsys_created_on';
      if (filters.customer_email) {
        query = `customer_email=${filters.customer_email}^${query}`;
      }
      if (filters.booking_status) {
        query = `booking_status=${filters.booking_status}^${query}`;
      }
      
      searchParams.set('sysparm_query', query);
      
      const response = await fetch(`/api/now/table/${this.bookingsTable}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to fetch bookings: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }
  
  /**
   * Create a new booking
   */
  async createBooking(bookingData) {
    try {
      const response = await fetch(`/api/now/table/${this.bookingsTable}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to create booking: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
  
  /**
   * Update a booking
   */
  async updateBooking(sysId, updateData) {
    try {
      const response = await fetch(`/api/now/table/${this.bookingsTable}/${sysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to update booking: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }
  
  /**
   * Get comments for a booking
   */
  async getComments(bookingSysId) {
    try {
      const searchParams = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_query: `booking_slot=${bookingSysId}^is_public=true^ORDERBYDESCsys_created_on`
      });
      
      const response = await fetch(`/api/now/table/${this.commentsTable}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to fetch comments: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
  
  /**
   * Add a comment to a booking
   */
  async addComment(commentData) {
    try {
      const response = await fetch(`/api/now/table/${this.commentsTable}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(commentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Failed to add comment: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
  
  /**
   * Calculate booking cost based on amenity rate and duration
   */
  calculateCost(hourlyRate, startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.abs(end - start) / (1000 * 60 * 60);
    return (parseFloat(hourlyRate) * durationHours).toFixed(2);
  }
  
  /**
   * Format date and time for display
   */
  formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  }
  
  /**
   * Validate booking data
   */
  validateBookingData(bookingData) {
    const errors = [];
    
    if (!bookingData.amenity) errors.push('Amenity is required');
    if (!bookingData.start_time) errors.push('Start time is required');
    if (!bookingData.end_time) errors.push('End time is required');
    if (!bookingData.customer_name) errors.push('Customer name is required');
    if (!bookingData.customer_email) errors.push('Customer email is required');
    if (!bookingData.customer_phone) errors.push('Customer phone is required');
    
    // Validate email format
    if (bookingData.customer_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.customer_email)) {
      errors.push('Invalid email format');
    }
    
    // Validate time range
    if (bookingData.start_time && bookingData.end_time) {
      const start = new Date(bookingData.start_time);
      const end = new Date(bookingData.end_time);
      
      if (start >= end) {
        errors.push('End time must be after start time');
      }
      
      if (start < new Date()) {
        errors.push('Start time cannot be in the past');
      }
    }
    
    return errors;
  }
}