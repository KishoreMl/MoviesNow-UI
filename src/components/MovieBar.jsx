import React from 'react';
import { Link } from 'react-router-dom';
function MovieBar(props)
{
    return (
        <div className="movieBar">
            <h2>{props.ticket.movie}</h2>
            <span>{props.ticket.print}</span>
            <span>{props.ticket.theatre}</span>
            <span><i className="far fa-clock"></i>{props.ticket.time}</span>

            <Link to={"/bookingsummary/"+props.ticketId}>
                <button onClick={props.onBook} className="book" type="submit" form="book">
                    Book Tickets
                </button>
            </Link>

        </div>
    );
}

export default MovieBar;
    