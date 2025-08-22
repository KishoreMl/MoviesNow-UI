import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox";
import { Link } from 'react-router-dom';
import { getAllMovies } from "../sdk/moviesnow";

function MovieRow()
{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let moviesData = getAllMovies().map(movie => movie);
        setMovies(moviesData);
    }, []); 

        return (
            <div className="movRow">
                {movies.map(movie => 
                    <Link to={"/movie/" + movie.moviename}>
                        <MovieBox key={movie.moviename} Movie={movie} />
                    </Link>  
                )}     
            </div>  
        );
        
}

export default MovieRow;