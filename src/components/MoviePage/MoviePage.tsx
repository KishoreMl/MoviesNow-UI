import React from 'react';
import CrewBox from '../CrewBox.tsx';
import './MoviePage.css';
import { Movie } from '../../model';
const MoviePage: React.FC<Movie> = ({ coverImageUrl, imageUrl, name, format, language, releaseDate, genre, certification, likes, about, crew }) => {

    const castMembers = crew.filter(crew => crew.type === "CAST");
    const crewMembers = crew.filter(crew => crew.type === "CREW");

    return (
        <div className="movie-page">
            <div className="movdet" style={{ backgroundImage: `url(${coverImageUrl})`}} >
                <div className="background"></div>
                <div className="movie1">
                    <img src={imageUrl} alt=""/>
                </div>
                <div className="desc">
                    <h2>{name}</h2>
                    <span>{format}</span>
                    <span>{language}</span>
                    <p>{releaseDate}  <i className='fa fa-circle' id="dot"/>  {genre}  <i className='fa fa-circle' id="dot"/>  { certification}  <i className='fa fa-circle' id="dot"/>  { releaseDate}</p>
                    <p><i className="fa fa-thumbs-up"></i>{likes}% Intrested</p>
                    <button >Book Tickets</button>
                </div> 
            </div>
            <div className="movie-details">
                <div className="about">
                    <h2>About the movie</h2>
                    <p>{about}</p>
                </div>
                <div className="castrow">
                <h2>Cast</h2>
                    {castMembers.map((cast) => 
                        <CrewBox {...cast} />
                    )}
                </div>  
                <div className="castrow">
                <h2>Crew</h2>
                    {crewMembers.map((crew) => 
                        <CrewBox {...crew} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MoviePage;