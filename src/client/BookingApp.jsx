import React, { useState, useEffect, useMemo } from 'react';
import { BookingService } from './services/BookingService.js';
import AmenitiesList from './components/AmenitiesList.jsx';
import BookingForm from './components/BookingForm.jsx';
import BookingList from './components/BookingList.jsx';
import './BookingApp.css';

export default function BookingApp() {
  const [activeTab, setActiveTab] = useState('amenities');
  const [amenities, setAmenities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  
  const bookingService = useMemo(() => new BookingService(), []);
  
  useEffect(() => {
    loadAmenities();
    loadBookings();
  }, []);
  
  const loadAmenities = async () => {
    try {
      setLoading(true);
      const amenitiesData = await bookingService.getAmenities();
      setAmenities(amenitiesData);
    } catch (error) {
      console.error('Error loading amenities:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadBookings = async () => {
    try {
      const bookingsData = await bookingService.getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };
  
  const handleBookingCreated = () => {
    loadBookings();
    setActiveTab('bookings');
  };
  
  const handleAmenitySelect = (amenity) => {
    setSelectedAmenity(amenity);
    setActiveTab('book');
  };
  
  return (
    <div className="booking-app">
      <header className="app-header">
        <h1>Recreational Facility Booking Portal</h1>
        <p>Book your favorite amenities and enjoy our recreational facilities</p>
      </header>
      
      <nav className="app-nav">
        <button 
          className={activeTab === 'amenities' ? 'active' : ''}
          onClick={() => setActiveTab('amenities')}
        >
          Browse Amenities
        </button>
        <button 
          className={activeTab === 'book' ? 'active' : ''}
          onClick={() => setActiveTab('book')}
        >
          Make Booking
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          View Bookings
        </button>
      </nav>
      
      <main className="app-content">
        {loading && <div className="loading">Loading...</div>}
        
        {activeTab === 'amenities' && (
          <AmenitiesList 
            amenities={amenities} 
            onAmenitySelect={handleAmenitySelect}
          />
        )}
        
        {activeTab === 'book' && (
          <BookingForm 
            amenities={amenities}
            selectedAmenity={selectedAmenity}
            onBookingCreated={handleBookingCreated}
            bookingService={bookingService}
          />
        )}
        
        {activeTab === 'bookings' && (
          <BookingList 
            bookings={bookings}
            onRefresh={loadBookings}
            bookingService={bookingService}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2024 Recreational Facility Management System</p>
      </footer>
    </div>
  );
}