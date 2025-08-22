import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import MovieBox from "./MovieBox";
import { getAllMovies } from '../sdk/moviesnow';

function Home() {

    const [newMovies, setNewMovies] = useState([]);
    const [upComingMovies, setUpComingMovies] = useState([]);

    useEffect(() => {
        const movies = getAllMovies();
        setNewMovies(movies.filter((movie) => movie.bookingsOpen === true));
        setUpComingMovies(movies.filter((movie) => movie.bookingsOpen === false));
    }, []); 

    function onMovieSelect(movie)
    {
        console.log(movie);
    }

    return (
            <div>
                <h1>New Releases</h1>
                <div className="movies">
                    {newMovies.map((movie) => {
                        <MovieBox movie={movie} onMovieSelect={onMovieSelect} />
                     })}
                </div>
                <h1>Upcoming Movies</h1>
                <div className="movies">
                    {upComingMovies.map((movie) => {
                        <MovieBox  movie={movie} onMovieSelect={onMovieSelect} />
                    })}
                </div>
                <Footer/>
            </div>
        );
    }

export default Home;