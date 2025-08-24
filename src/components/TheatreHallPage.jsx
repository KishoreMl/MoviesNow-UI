import React, { useState, useEffect } from "react";
import MovieBar from './MovieBar';
import Seats from './Seats';
import { getTicket,updateTicket } from "../sdk/moviesnow";

function TheatreHallPage(props) {
    
    const [ticket, setTicket] = useState({
        time: props.match.params.time,
        ticketId: props.match.params.ticketId,
    });
    
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const ticket = getTicket(props.match.params.ticketId);
        setTicket({ ...ticket, ticket });
    }, []);
        

    useEffect(() => {
        const ticket = getTicket(props.match.params.ticketId);
        setTicket({ ...ticket, ticket });
    }, []);

    function onSelectSeat(seats) {
        setSelectedSeats(seats);
    }

    function onBookTicket() {
        updateTicket(ticket.ticketId, ticket);
    }

    return (
        <div>
            <MovieBar 
                ticket={ticket}
                onBook={onBookTicket}
            />
            <Seats
                onseatselect={props.onSelectedSeats}  
                theatrename={props.theatrename}>
            </Seats>
        </div>
    );
}

export default TheatreHallPage;
    