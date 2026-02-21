import React from 'react';

export default function AmenitiesList({ amenities, onAmenitySelect }) {
  const getAmenityIcon = (type) => {
    const icons = {
      swimming_pool: '🏊‍♀️',
      walking_track: '🏃‍♂️',
      shuttle_court: '🏸',
      football_ground: '⚽',
      cricket_ground: '🏏',
      golf_course: '⛳'
    };
    return icons[type] || '🏢';
  };
  
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}/hour`;
  };
  
  if (amenities.length === 0) {
    return (
      <div className="amenities-empty">
        <p>No amenities available at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="amenities-container">
      <h2>Available Amenities</h2>
      <p>Choose from our premium recreational facilities</p>
      
      <div className="amenities-grid">
        {amenities.map(amenity => {
          const amenityName = typeof amenity.amenity_name === 'object' 
            ? amenity.amenity_name.display_value 
            : amenity.amenity_name;
          const amenityType = typeof amenity.amenity_type === 'object'
            ? amenity.amenity_type.display_value
            : amenity.amenity_type;
          const capacity = typeof amenity.capacity === 'object'
            ? amenity.capacity.display_value
            : amenity.capacity;
          const hourlyRate = typeof amenity.hourly_rate === 'object'
            ? amenity.hourly_rate.display_value
            : amenity.hourly_rate;
          const location = typeof amenity.location === 'object'
            ? amenity.location.display_value
            : amenity.location;
          const description = typeof amenity.description === 'object'
            ? amenity.description.display_value
            : amenity.description;
          const sysId = typeof amenity.sys_id === 'object'
            ? amenity.sys_id.value
            : amenity.sys_id;
            
          return (
            <div key={sysId} className="amenity-card">
              <div className="amenity-header">
                <span className="amenity-icon">{getAmenityIcon(amenityType)}</span>
                <h3>{amenityName}</h3>
              </div>
              
              <div className="amenity-details">
                <p className="amenity-type">{amenityType.replace('_', ' ').toUpperCase()}</p>
                <p className="amenity-capacity">Capacity: {capacity} people</p>
                <p className="amenity-price">{formatPrice(hourlyRate)}</p>
                {location && <p className="amenity-location">📍 {location}</p>}
                {description && <p className="amenity-description">{description}</p>}
              </div>
              
              <div className="amenity-actions">
                <button 
                  className="book-button"
                  onClick={() => onAmenitySelect({
                    sys_id: sysId,
                    amenity_name: amenityName,
                    amenity_type: amenityType,
                    hourly_rate: hourlyRate,
                    capacity: capacity,
                    location: location
                  })}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        .amenities-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .amenities-container h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .amenities-container > p {
          color: #666;
          margin-bottom: 2rem;
        }
        
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .amenity-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e0e0e0;
        }
        
        .amenity-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        
        .amenity-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 1rem;
        }
        
        .amenity-icon {
          font-size: 2rem;
          margin-right: 0.75rem;
        }
        
        .amenity-header h3 {
          margin: 0;
          color: #333;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .amenity-details p {
          margin: 0.5rem 0;
          color: #666;
        }
        
        .amenity-type {
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
          text-transform: capitalize;
        }
        
        .amenity-capacity {
          font-weight: 500;
          color: #555;
        }
        
        .amenity-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #27ae60;
        }
        
        .amenity-location {
          color: #888;
          font-size: 0.9rem;
        }
        
        .amenity-description {
          color: #777;
          font-size: 0.9rem;
          margin-top: 1rem;
          line-height: 1.4;
        }
        
        .amenity-actions {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }
        
        .book-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .book-button:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
          transform: translateY(-2px);
        }
        
        .amenities-empty {
          text-align: center;
          padding: 3rem;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .amenities-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .amenity-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}