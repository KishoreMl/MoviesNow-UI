import React, { useState, useEffect } from 'react';
import TimeSlot from '../TimeSlot/TimeSlot.tsx';
import mockTheatreShows from '../../mockData/theatreShows.json';
import { TheatreShow } from '../../model.ts';
import './TheatrePage.css';

const TheatrePage = ({ movieId, selectedDate }) => {
    const [theatreShows, setTheatreShows] = useState<TheatreShow[]>([]);

    useEffect(() => {
        setTheatreShows(mockTheatreShows.shows as TheatreShow[]);
    }, [movieId, selectedDate]);

    return (
        <div className="theatre-page">
            <div className="theatre-page-header">
                <h1>Madharasi - (Tamil)</h1>
                <div className='movie-info-container'>
                    <span>Movie runtime: 2h 48m</span>
                    <span>UA 16+</span>
                    <span>Action</span>
                </div>
            </div>
            <div className="theatre-list">
                {theatreShows.map((theatre) => (
                    <div key={theatre.id} className="theatre-card">
                        <div className="theatre-header">
                            <div className="theatre-info">
                                <div className="theatre-logo">
                                    <div className="cinema-icon">🎬</div>
                                </div>
                                <div className="theatre-details">
                                    <h3 className="theatre-name">{theatre.name}</h3>
                                    <p className="theatre-location">{theatre.location}</p>
                                    <div className="theatre-meta">
                                        <span className="info-icon">ℹ️</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="time-slots">
                            {theatre.slots.map((slot, index) => (
                                <TimeSlot key={index} slot={slot} />
                            ))}
                        </div>

                        <div className="theatre-footer">
                            <div className="cancellation-policy">
                                {!theatre.cancellable && (
                                    <span className="non-cancellable">Non-cancellable</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TheatrePage;
