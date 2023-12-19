import React, { Component } from 'react';

class MovieBox extends Component
{   
    render() {
        return (
            <div className="movieBox">
                <button name="moviename">
                    <div className="movie">
                        <img src={process.env.PUBLIC_URL+this.props.movie.image} alt=""/>
                        <div className="submov">
                            <span><i className="fa fa-heart"></i>likes</span>
                            <p>{this.props.movie.likes}</p>
                        </div>
                    </div>
                </button>
                <h4>{this.props.movie.moviename}</h4>
                <p>{this.props.movie.genre}</p>
            </div>
        );
    }
}

export default MovieBox;