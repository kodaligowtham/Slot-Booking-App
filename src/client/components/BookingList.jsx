import React, { useState } from 'react';

export default function BookingList({ bookings, onRefresh, bookingService }) {
  const [filter, setFilter] = useState('all');
  const [searchEmail, setSearchEmail] = useState('');
  const [expandedBooking, setExpandedBooking] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#27ae60',
      cancelled: '#e74c3c',
      completed: '#95a5a6'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      cancelled: '❌',
      completed: '🏁'
    };
    return icons[status] || '❓';
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingStatus = typeof booking.booking_status === 'object' 
      ? booking.booking_status.display_value 
      : booking.booking_status;
    const customerEmail = typeof booking.customer_email === 'object'
      ? booking.customer_email.display_value
      : booking.customer_email;

    const matchesFilter = filter === 'all' || bookingStatus === filter;
    const matchesSearch = !searchEmail || 
      customerEmail.toLowerCase().includes(searchEmail.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingService.updateBooking(bookingId, { booking_status: newStatus });
      onRefresh();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking status');
    }
  };

  const toggleBookingDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="booking-list-container">
      <div className="list-header">
        <h2>Booking Management</h2>
        <p>View and manage all facility bookings</p>
      </div>

      <div className="controls">
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="email-search">Search by Email:</label>
            <input
              id="email-search"
              type="text"
              placeholder="Enter customer email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
          </div>

          <button onClick={onRefresh} className="refresh-button">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="booking-stats">
        <div className="stat-item">
          <span className="stat-number">{bookings.length}</span>
          <span className="stat-label">Total Bookings</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredBookings.length}</span>
          <span className="stat-label">Filtered Results</span>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found matching your criteria.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map(booking => {
            const sysId = typeof booking.sys_id === 'object' ? booking.sys_id.value : booking.sys_id;
            const number = typeof booking.number === 'object' ? booking.number.display_value : booking.number;
            const amenityName = typeof booking.amenity === 'object' ? booking.amenity.display_value : booking.amenity;
            const customerName = typeof booking.customer_name === 'object' ? booking.customer_name.display_value : booking.customer_name;
            const customerEmail = typeof booking.customer_email === 'object' ? booking.customer_email.display_value : booking.customer_email;
            const customerPhone = typeof booking.customer_phone === 'object' ? booking.customer_phone.display_value : booking.customer_phone;
            const bookingStatus = typeof booking.booking_status === 'object' ? booking.booking_status.display_value : booking.booking_status;
            const paymentStatus = typeof booking.payment_status === 'object' ? booking.payment_status.display_value : booking.payment_status;
            const startTime = typeof booking.start_time === 'object' ? booking.start_time.display_value : booking.start_time;
            const endTime = typeof booking.end_time === 'object' ? booking.end_time.display_value : booking.end_time;
            const totalCost = typeof booking.total_cost === 'object' ? booking.total_cost.display_value : booking.total_cost;
            const bookingType = typeof booking.booking_type === 'object' ? booking.booking_type.display_value : booking.booking_type;
            const source = typeof booking.source === 'object' ? booking.source.display_value : booking.source;

            return (
              <div key={sysId} className="booking-card">
                <div className="booking-header" onClick={() => toggleBookingDetails(sysId)}>
                  <div className="booking-id">
                    <span className="booking-number">#{number}</span>
                    <span className="booking-amenity">{amenityName}</span>
                  </div>
                  <div className="booking-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(bookingStatus) }}
                    >
                      {getStatusIcon(bookingStatus)} {bookingStatus}
                    </span>
                  </div>
                </div>

                <div className="booking-summary">
                  <div className="customer-info">
                    <strong>{customerName}</strong>
                    <span>{customerEmail}</span>
                  </div>
                  <div className="booking-time">
                    <div>{formatDateTime(startTime)}</div>
                    <div>to {formatDateTime(endTime)}</div>
                  </div>
                  <div className="booking-cost">
                    <strong>${parseFloat(totalCost || 0).toFixed(2)}</strong>
                  </div>
                </div>

                {expandedBooking === sysId && (
                  <div className="booking-details">
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>Booking Type:</label>
                        <span>{bookingType?.replace('_', ' ')}</span>
                      </div>
                      <div className="detail-item">
                        <label>Payment Status:</label>
                        <span className={`payment-${paymentStatus}`}>{paymentStatus}</span>
                      </div>
                      <div className="detail-item">
                        <label>Phone:</label>
                        <span>{customerPhone}</span>
                      </div>
                      <div className="detail-item">
                        <label>Source:</label>
                        <span>{source?.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="booking-actions">
                      {bookingStatus === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(sysId, 'confirmed')}
                            className="action-button confirm"
                          >
                            ✅ Confirm
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(sysId, 'cancelled')}
                            className="action-button cancel"
                          >
                            ❌ Cancel
                          </button>
                        </>
                      )}
                      {bookingStatus === 'confirmed' && (
                        <button 
                          onClick={() => handleStatusUpdate(sysId, 'completed')}
                          className="action-button complete"
                        >
                          🏁 Complete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .booking-list-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .list-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .list-header p {
          color: #666;
          margin-bottom: 2rem;
        }

        .controls {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
          align-items: end;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 200px;
        }

        .filter-group label {
          font-weight: 600;
          color: #333;
        }

        .filter-group select,
        .filter-group input {
          padding: 0.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 1rem;
        }

        .refresh-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          height: fit-content;
        }

        .booking-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          background: white;
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex: 1;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .bookings-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .booking-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .booking-card:hover {
          transform: translateY(-2px);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #f8f9fa;
          cursor: pointer;
          border-bottom: 1px solid #e0e0e0;
        }

        .booking-id {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .booking-number {
          font-weight: 700;
          color: #667eea;
        }

        .booking-amenity {
          color: #666;
          font-size: 0.9rem;
        }

        .status-badge {
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .booking-summary {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr;
          gap: 1rem;
          padding: 1rem 1.5rem;
          align-items: center;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .customer-info strong {
          color: #333;
        }

        .customer-info span {
          color: #666;
          font-size: 0.9rem;
        }

        .booking-time {
          font-size: 0.9rem;
          color: #666;
        }

        .booking-cost {
          text-align: right;
          font-size: 1.2rem;
          color: #27ae60;
        }

        .booking-details {
          border-top: 1px solid #e0e0e0;
          padding: 1.5rem;
          background: #f8f9fa;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-item label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .detail-item span {
          color: #666;
          text-transform: capitalize;
        }

        .payment-paid {
          color: #27ae60;
          font-weight: 600;
        }

        .payment-pending {
          color: #f39c12;
          font-weight: 600;
        }

        .payment-refunded {
          color: #e74c3c;
          font-weight: 600;
        }

        .booking-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-button.confirm {
          background: #27ae60;
          color: white;
        }

        .action-button.cancel {
          background: #e74c3c;
          color: white;
        }

        .action-button.complete {
          background: #95a5a6;
          color: white;
        }

        .action-button:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .no-bookings {
          text-align: center;
          padding: 3rem;
          color: #666;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .filter-controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-group {
            min-width: auto;
          }
          
          .booking-summary {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .booking-cost {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}