import React, { Component } from 'react';
import Footer from './Footer';
import MovieBox from "./MovieBox";

class Home extends Component{
    newMovies = [];
    upComingMovies = [];
    render()
    { 
        return (
            <div>
                <h1>New Releases</h1>
                <div className="movies">
                    {this.newMovies.map((movie) => {
                        <MovieBox movie={movie} />
                     })}
                </div>
                <h1>Upcoming Movies</h1>
                <div className="movies">
                    {this.upComingMovies.map((movie) => {
                        <MovieBox  movie={movie} />
                    })}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;