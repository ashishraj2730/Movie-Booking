import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        // Filter bookings for the current user
        const userBookings = allBookings.filter(b => b.userId === user.email);
        // Sort by booking time (newest first)
        userBookings.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
        setBookings(userBookings);
    }, [user.email]);

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ticket /> My Bookings
            </h1>

            {bookings.length > 0 ? (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {bookings.map(booking => (
                        <div key={booking.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', borderLeft: '5px solid var(--primary)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{booking.movieTitle}</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-secondary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={18} /> {booking.cinemaName}, {booking.city}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={18} /> {booking.date}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={18} /> {booking.time}
                                </span>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', alignSelf: 'flex-end' }}>
                                Booked on: {new Date(booking.bookingTime).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <Ticket size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>No bookings found</h3>
                    <p style={{ marginBottom: '2rem' }}>You haven't booked any movies yet.</p>
                    <Link to="/dashboard" className="btn btn-primary">Browse Movies</Link>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
