import React, { useState } from 'react';
import TheatreRow from './TheatreRow';
import { getAllTheatres } from '../sdk/moviesnow';

function TheatreGrid(props)
{
    const [theatres, setTheatres] = useState([]);
   
    useEffect(() => {
        setTheatres(getAllTheatres());
    }, []);

    return (
      
            <div className="theatreGrid">   
                {theatres.map(theatre =>
                    <TheatreRow
                        Theatre={theatre}
                        date={this.props.date}
                        key={theatre}
                        movieId={this.props.movieId}
                    />
                )}  
            </div>
        )
}

export default TheatreGrid;