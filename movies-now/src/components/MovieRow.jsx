import React, { Component } from "react";
import MovieBox from "./MovieBox";
import { Link } from 'react-router-dom';
import { getAllMovies } from "../sdk/moviesnow";

class MovieRow extends Component
{
    movies = [];

    componentDidMount() {
        this.movies = getAllMovies().map(movie => movie);
    }

    render() { 
        return (
            <div className="movRow">
                {this.state.movies.map(movie => 
                    <Link to={"/movie/" + movie.moviename}>
                        <MovieBox key={movie.moviename} Movie={movie} />
                    </Link>  
                )}     
            </div>
        );
    }
}

export default MovieRow;