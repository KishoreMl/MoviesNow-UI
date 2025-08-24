import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import MovieBox from "./MovieCard.tsx";
import MovieData from '../mockData/movies.json';
import { Movie } from '../model';
const Home: React.FC = () => {

    const [newMovies, setNewMovies] = useState<Movie[]>([]);
    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const movies = MovieData.movies;
        setNewMovies(movies as Movie[]);
        // setNewMovies(movies.filter((movie) => movie.bookingsOpen === true));
        // setUpComingMovies(movies.filter((movie) => movie.bookingsOpen === false));
    }, []); 

    return (
            <div>
                <h1>New Releases</h1>
                <div className="movies">
                    {newMovies.map((movie) => 
                        <MovieBox {...movie}  />
                     )}
                </div>
                {/* <h1>Upcoming Movies</h1>
                <div className="movies">
                    {upComingMovies.map((movie) => {
                        <MovieBox  movie={movie} onMovieSelect={onMovieSelect} />
                    })}
                </div> */}
                <Footer/>
            </div>
        );
    }

export default Home;