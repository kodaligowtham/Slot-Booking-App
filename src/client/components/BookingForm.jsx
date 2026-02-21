import React, { useState, useEffect } from 'react';

export default function BookingForm({ amenities, selectedAmenity, onBookingCreated, bookingService }) {
  const [formData, setFormData] = useState({
    amenity: selectedAmenity?.sys_id || '',
    booking_type: 'individual_amenity',
    start_time: '',
    end_time: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    additional_comments: ''
  });
  
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    if (selectedAmenity) {
      setFormData(prev => ({ ...prev, amenity: selectedAmenity.sys_id }));
    }
  }, [selectedAmenity]);

  useEffect(() => {
    // Calculate estimated cost when amenity or times change
    if (formData.amenity && formData.start_time && formData.end_time) {
      const selectedAmenityData = amenities.find(a => {
        const sysId = typeof a.sys_id === 'object' ? a.sys_id.value : a.sys_id;
        return sysId === formData.amenity;
      });
      
      if (selectedAmenityData) {
        const rate = typeof selectedAmenityData.hourly_rate === 'object' 
          ? selectedAmenityData.hourly_rate.display_value 
          : selectedAmenityData.hourly_rate;
        const cost = bookingService.calculateCost(rate, formData.start_time, formData.end_time);
        setEstimatedCost(parseFloat(cost));
      }
    }
  }, [formData.amenity, formData.start_time, formData.end_time, amenities, bookingService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = bookingService.validateBookingData({
        ...formData,
        total_cost: estimatedCost.toString()
      });
      
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Submit booking
      const bookingData = {
        ...formData,
        total_cost: estimatedCost.toString(),
        booking_status: 'pending',
        payment_status: 'pending',
        source: 'web_portal'
      };

      await bookingService.createBooking(bookingData);
      
      // Reset form and notify parent
      setFormData({
        amenity: '',
        booking_type: 'individual_amenity',
        start_time: '',
        end_time: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        additional_comments: ''
      });
      
      setEstimatedCost(0);
      alert('Booking created successfully!');
      onBookingCreated();

    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors([error.message || 'Failed to create booking. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 16);

  return (
    <div className="booking-form-container">
      <h2>Make a Reservation</h2>
      <p>Fill out the form below to book your preferred amenity</p>

      {errors.length > 0 && (
        <div className="error-messages">
          <h4>Please fix the following errors:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amenity">Select Amenity *</label>
            <select
              id="amenity"
              name="amenity"
              value={formData.amenity}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Choose an amenity --</option>
              {amenities.map(amenity => {
                const amenityName = typeof amenity.amenity_name === 'object' 
                  ? amenity.amenity_name.display_value 
                  : amenity.amenity_name;
                const hourlyRate = typeof amenity.hourly_rate === 'object'
                  ? amenity.hourly_rate.display_value
                  : amenity.hourly_rate;
                const sysId = typeof amenity.sys_id === 'object'
                  ? amenity.sys_id.value
                  : amenity.sys_id;
                
                return (
                  <option key={sysId} value={sysId}>
                    {amenityName} - ${parseFloat(hourlyRate).toFixed(2)}/hour
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="booking_type">Booking Type *</label>
            <select
              id="booking_type"
              name="booking_type"
              value={formData.booking_type}
              onChange={handleInputChange}
              required
            >
              <option value="individual_amenity">Individual Amenity</option>
              <option value="entire_arena">Entire Arena</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_time">Start Time *</label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              min={minDate}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_time">End Time *</label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              min={formData.start_time || minDate}
              required
            />
          </div>
        </div>

        {estimatedCost > 0 && (
          <div className="cost-estimate">
            <h3>Estimated Cost: ${estimatedCost.toFixed(2)}</h3>
          </div>
        )}

        <div className="customer-details">
          <h3>Customer Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customer_name">Full Name *</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer_email">Email Address *</label>
              <input
                type="email"
                id="customer_email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customer_phone">Phone Number *</label>
            <input
              type="tel"
              id="customer_phone"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="additional_comments">Additional Comments</label>
            <textarea
              id="additional_comments"
              name="additional_comments"
              value={formData.additional_comments}
              onChange={handleInputChange}
              placeholder="Any special requirements or comments..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .booking-form-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .booking-form-container h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .booking-form-container > p {
          color: #666;
          margin-bottom: 2rem;
        }

        .error-messages {
          background-color: #fee;
          border: 1px solid #fcc;
          border-radius: 5px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .error-messages h4 {
          color: #c33;
          margin: 0 0 0.5rem 0;
        }

        .error-messages ul {
          color: #c33;
          margin: 0;
          padding-left: 1.5rem;
        }

        .booking-form {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .cost-estimate {
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin: 1.5rem 0;
        }

        .cost-estimate h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        .customer-details {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #f0f0f0;
        }

        .customer-details h3 {
          color: #333;
          margin-bottom: 1.5rem;
        }

        .form-actions {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f0f0f0;
          text-align: center;
        }

        .submit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 3rem;
          border-radius: 5px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
          transform: translateY(-2px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .booking-form {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}