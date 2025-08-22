import React from 'react';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import Footer from './Footer';

function MoviePage(props) {
        return ( 
            <div>
                <Movie movie={props.match.params.id}/>
                <MovieDetails movie={props.match.params.id} />
                <Footer/>
            </div>
        );
}

export default MoviePage;