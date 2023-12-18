import React, { Component } from 'react';
import TheatreRow from './TheatreRow';
import { getAllTheatres } from '../sdk/moviesnow';

class TheatreGrid extends Component
{
    theatres = []
   
    componentDidMount() {
        this.theatres = getAllTheatres();
    }

    render() {
        return (
            <div className="theatreGrid">
                {this.theatres.map(theatre =>
                    <TheatreRow
                        Theatre={theatre}
                        date={this.props.date}
                        key={theatre}
                        movieId={this.props.movieId}
                    />
                )}  
            </div>
        )
    }
}

export default TheatreGrid;