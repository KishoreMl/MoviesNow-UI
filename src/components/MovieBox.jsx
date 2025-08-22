import React from 'react';

function MovieBox(props)
{   
    return (
            <div className="movieBox">
                <button name="moviename">
                    <div className="movie">
                        <img src={process.env.PUBLIC_URL+props.movie.image} alt=""/>
                        <div className="submov">
                            <span><i className="fa fa-heart"></i>likes</span>
                            <p>{props.movie.likes}</p>
                        </div>
                    </div>
                </button>
                    <h4>{props.movie.moviename}</h4>
                <p>{props.movie.genre}</p>
            </div>
        );
    }

export default MovieBox;