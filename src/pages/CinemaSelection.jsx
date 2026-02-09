import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies, cinemas } from '../data/mockData';
import CinemaCard from '../components/CinemaCard';
import { MapPin, Calendar } from 'lucide-react';

const CinemaSelection = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [selectedCity, setSelectedCity] = useState('');
    const [availableCinemas, setAvailableCinemas] = useState([]);

    useEffect(() => {
        const foundMovie = movies.find(m => m.id === parseInt(movieId));
        if (foundMovie) {
            setMovie(foundMovie);
            // Default to first city available for this movie if not set
            if (!selectedCity && foundMovie.cities.length > 0) {
                setSelectedCity(foundMovie.cities[0]);
            }
        } else {
            navigate('/dashboard');
        }
    }, [movieId, navigate]);

    useEffect(() => {
        if (movie && selectedCity) {
            // Filter cinemas that are in the selected city AND allow the movie
            // In our mock logic, we assume if a movie lists a city, all cinemas in that city show it.
            // A more complex mock would reference specific cinemaIDs in the movie object.
            const filtered = cinemas.filter(c => c.city === selectedCity);
            setAvailableCinemas(filtered);
        }
    }, [movie, selectedCity]);

    if (!movie) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: '200px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                />
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{movie.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        <span>{movie.year}</span>
                        <span>{movie.genre}</span>
                        <span>{movie.language}</span>
                        <span style={{ color: '#ffc107', fontWeight: 'bold' }}>★ {movie.rating}</span>
                    </div>
                    <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{movie.description}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar /> Select Cinema
                </h2>

                <div style={{ display: 'flex', items: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Filter by City:</span>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={{ width: 'auto' }}
                    >
                        {movie.cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {availableCinemas.length > 0 ? (
                    availableCinemas.map(cinema => (
                        <CinemaCard key={cinema.id} cinema={cinema} movieId={movie.id} />
                    ))
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
                        No cinemas available in {selectedCity} for this movie.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CinemaSelection;
