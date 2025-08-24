import React from 'react';
import MovieContainer from './MovieContainer.tsx';
import MovieDetails from './MovieDetails.tsx';
import MovieData from '../mockData/movies.json';
// import Footer from './Footer';

function MoviePage(props) {
        return ( 
            <div>
                <MovieContainer {...MovieData.movies[0]} />
                <MovieDetails {...MovieData.movies[0]} />
            </div>
        );
}

export default MoviePage;