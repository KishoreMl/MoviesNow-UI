import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../Images/Spiderman.jpg';
import cover from '../Images/SpidermanCover.jpg';
import { getMovie } from '../sdk/moviesnow';


function Movie(props) {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        setMovie(getMovie(props.movie));
    }, []);
    
    return (
        <div className="movdet" style={{ backgroundImage: `url(${cover})`}} >
            <div className="background"></div>
            <div className="movie1">
                <img src={img} alt=""/>
            </div>
            <div className="desc">
                <h2>{movie.moviename}</h2>
                <span>{ movie.print}</span>
                <span>{ movie.language}</span>
                <p>{ movie.runtime}  <i className='fa fa-circle' id="dot"/>  { movie.genre}  <i className='fa fa-circle' id="dot"/>  { movie.certification}  <i className='fa fa-circle' id="dot"/>  { movie.releasedate}</p>
                <p><i className="fa fa-thumbs-up"></i>{ movie.likes}% Intrested</p>
                <Link to={'/theaters/'+movie.moviename}><button >Book Tickets</button></Link>
            </div> 
        </div>
        );
    
}
export default Movie;