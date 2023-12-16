import React, { Component } from 'react';
import CastBox from './CastBox';
import CrewBox from './CrewBox';

class MovieDetails extends Component
{
    description = '';
    casts = [];
    crew = [];

    componentDidMount() {
        
        axios.get("http://localhost:5000/movie/" + this.props.movie)
            .then(response => {
                this.description = response.data.description;
            })
            .catch(function (err) {
                console.log(err);
            })
        
        axios.get("http://localhost:5000/cast/" + this.props.movie)
            .then(response => {
                this.casts = response.data.cast;
            })
            .catch(function (err) {
                console.log(err);
            })
        
        axios.get("http://localhost:5000/crew/" + this.props.movie)
            .then(response => {
                this.crew = response.data;
            })
            .catch(function (err){
                console.log(err);
            })
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