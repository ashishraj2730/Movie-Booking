import React, { useState, useEffect } from 'react';
import { movies } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { Search } from 'lucide-react';

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Kolkata", "Chandigarh"];

const Dashboard = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(movies);

    useEffect(() => {
        let result = movies;

        if (selectedCity) {
            result = result.filter(movie => movie.cities.includes(selectedCity));
        }

        if (searchQuery) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMovies(result);
    }, [selectedCity, searchQuery]);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Now Showing</h2>

                <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '600px' }}>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={{ flex: 1, minWidth: '150px' }}
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <div style={{ position: 'relative', flex: 2 }}>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    </div>
                </div>
            </div>

            {filteredMovies.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <h3>No movies found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
