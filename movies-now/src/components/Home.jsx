import React, { Component } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import MovieBox from "./MovieBox";

class Home extends Component{
    newMovies = [];
    upComingMovies = [];
    
    render()
    { 
        return (
            <div >
                <NavBar />
                <h1>New Releases</h1>
                <div class="movies">
                    {this.newMovies.map((movie) => {
                        <MovieBox movie={movie} />
                     })}
                </div>
                <h1>Upcoming Movies</h1>
                <div class="movies">
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