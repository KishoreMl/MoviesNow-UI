import React from 'react';

function Seat(props) {
    
    return (
            <button id={props.className}
                onClick={() => props.onClick()} >
                {props.sid+1}
            </button>
        );
    }

export default Seat;