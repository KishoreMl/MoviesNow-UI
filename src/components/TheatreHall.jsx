import React from 'react';
import Seats from './Seats';

function TheatreHall(props) {

    return (
            <Seats
                onseatselect={props.onSelectedSeats}  
                theatrename={props.theatrename}>
            </Seats>
        );
}

export default TheatreHall;