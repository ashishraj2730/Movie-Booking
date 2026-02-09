import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ position: 'relative', paddingTop: '150%' }}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', color: '#ffc107' }}>
                    <Star size={16} fill="#ffc107" />
                    {movie.rating}
                </div>
            </div>
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{movie.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <span>{movie.year}</span>
                    <span>{movie.language}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {movie.description}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {movie.cities.slice(0, 2).map(city => (
                        <span key={city} style={{ fontSize: '0.8rem', backgroundColor: 'var(--background)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                            {city}
                        </span>
                    ))}
                    {movie.cities.length > 2 && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+{movie.cities.length - 2} more</span>}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
