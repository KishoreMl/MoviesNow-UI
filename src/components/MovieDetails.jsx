import React, { Component } from 'react';
import CastBox from './CastBox';
import CrewBox from './CrewBox';
import { getCast, getCrew,getMovie } from '../sdk/moviesnow';

class MovieDetails extends Component
{
    description = '';
    casts = [];
    crew = [];

    componentDidMount() {     
        this.description = getMovie(this.props.movie).description;    
        this.casts = getCast(this.props.movie);
        this.crew = getCrew(this.props.movie);
    }

    render() {
        return (
            <div className="movie-details">
                <div className="about">
                    <h2>Plot</h2>
                    <p>{this.description}</p>
                </div>
                <div className="castrow">
                <h2>Cast</h2>
                    {this.casts.map((cast) => 
                        <CastBox cast={cast} key={cast.name}/>
                    )}
                </div>
                <div className="castrow">
                <h2>Crew</h2>
                    {this.crew.map(crew => 
                        <CrewBox crew={crew} key={crew.name}/>
                    )}
                </div>
            </div>
        );
    }
}
export default MovieDetails;