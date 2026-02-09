import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies, cinemas, showtimes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const Booking = () => {
    const { movieId, cinemaId } = useParams();
    const { user } = useAuth();

    const [movie, setMovie] = useState(null);
    const [cinema, setCinema] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [dates, setDates] = useState([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const foundMovie = movies.find(m => m.id === parseInt(movieId));
        const foundCinema = cinemas.find(c => c.id === parseInt(cinemaId));
        setMovie(foundMovie);
        setCinema(foundCinema);

        // Generate next 3 days
        const today = new Date();
        const nextDays = [];
        for (let i = 0; i < 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            nextDays.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        }
        setDates(nextDays);
        setSelectedDate(nextDays[0]); // Default to today
    }, [movieId, cinemaId]);

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) return;

        const booking = {
            id: Date.now(),
            userId: user.email,
            movieTitle: movie.title,
            cinemaName: cinema.name,
            cinemaLocation: cinema.location,
            city: cinema.city,
            date: selectedDate,
            time: selectedTime,
            bookingTime: new Date().toISOString()
        };

        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));

        setBookingSuccess(true);
    };

    if (!movie || !cinema) return <div className="container">Loading...</div>;

    if (bookingSuccess) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1rem' }} />
                <h1>Booking Confirmed!</h1>
                <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>Your ticket has been successfully booked.</p>

                <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', textAlign: 'left' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Ticket Details</h3>
                    <p><strong>Movie:</strong> {movie.title}</p>
                    <p><strong>Cinema:</strong> {cinema.name}</p>
                    <p><strong>Location:</strong> {cinema.location}, {cinema.city}</p>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                </div>

                <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Select Show Timing</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Summary</h3>
                        <h2 style={{ marginBottom: '0.5rem' }}>{movie.title}</h2>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPinIcon /> {cinema.name}, {cinema.location}
                        </p>
                    </div>
                </div>

                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <Calendar size={20} /> Select Date
                        </h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {dates.map(date => (
                                <button
                                    key={date}
                                    onClick={() => setSelectedDate(date)}
                                    className={`btn ${selectedDate === date ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <Clock size={20} /> Select Time
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
                            {showtimes.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleBooking}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                        disabled={!selectedDate || !selectedTime}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

const MapPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default Booking;
