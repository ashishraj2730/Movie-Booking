import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

const CinemaCard = ({ cinema, movieId }) => {
    return (
        <Link
            to={`/book/${movieId}/${cinema.id}`}
            className="card"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                borderLeft: '4px solid var(--primary)'
            }}
        >
            <div>
                <h3 style={{ marginBottom: '0.5rem' }}>{cinema.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} />
                    <span>{cinema.location}, {cinema.city}</span>
                </div>
            </div>
            <ChevronRight size={24} color="var(--primary)" />
        </Link>
    );
};

export default CinemaCard;
