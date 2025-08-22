import React, { useEffect, useState } from 'react';
import CastBox from './CastBox';
import CrewBox from './CrewBox';
import { getCast, getCrew,getMovie } from '../sdk/moviesnow';

function MovieDetails(props)
{

    const [descriptionData, setDescriptionData] = useState('');
    const [castsData, setCastsData] = useState([]);
    const [crewData, setCrewData] = useState([]);

    useEffect(() => {     
        let descriptionData = getMovie(props.movie).description;
        let castsData = getCast(props.movie);
        let crewData = getCrew(props.movie);

        setDescriptionData(descriptionData);
        setCastsData(castsData);
        setCrewData(crewData);
    }, [props.movie]);

    return (
            <div className="movie-details">
                <div className="about">
                    <h2>Plot</h2>
                    <p>{descriptionData}</p>
                </div>
                <div className="castrow">
                <h2>Cast</h2>
                    {castsData.map((cast) => 
                        <CastBox cast={cast} key={cast.name}/>
                    )}
                </div>
                <div className="castrow">
                <h2>Crew</h2>
                    {crewData.map(crew => 
                        <CrewBox crew={crew} key={crew.name}/>
                    )}
                </div>
            </div>
        );
    
}
export default MovieDetails;