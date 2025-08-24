import React from 'react';
import { Movie } from '../model';

const MovieCard: React.FC<Movie> = ({id, name, genre,  likes, imageUrl}) => {
    
    return (
            <div className="movieBox">
                <button name="moviename">
                    <div className="movie">
                        <img src={imageUrl} alt=""/>
                        <div className="submov">
                            <span><i className="fa fa-heart"></i>likes</span>
                            <p>{likes}</p>
                        </div>
                    </div>
                </button>
                <h4>{name}</h4>
                <p>{genre}</p>
            </div>
        );
    }

export default MovieCard;