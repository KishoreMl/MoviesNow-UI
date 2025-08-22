import React, { useState, useEffect } from 'react';
import { getTicket } from '../sdk/moviesnow';
import bookedImage from '../Images/booked.png';

function Ticket(props)
{
    const [ticket, setTicket] = useState(props.ticket);

    useEffect(() => {
        setTicket(getTicket(props.ticket.ticketId));
    }, []);

    return (
            <div className="ticket">
                <div className="ticket-img">
                    <img src={ticket.movieimage}  alt=""/>
                </div>
                <h2> {ticket.moviename} ({ticket.print})</h2>
                <p><b>LANGUAGE:</b> {ticket.language} </p>
                <p> {ticket.theatrename} , {ticket.location}</p>
                <p><b>SEATS: </b>
                    {ticket.seats.map(seat => 
                        <span>{seat},</span>
                    )}
                </p>
                    <p><b>DATE:</b> {ticket.date}</p>
                <p><b>TIME:</b> {ticket.time}</p>
                <p><b>TOTAL PRICE:</b> Rs.{ticket.total}</p>

                <img id="booked" src={bookedImage} alt="" />
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
                <div className="dot4"></div>
                <div className="dot5"></div>
                <div className="dot6"></div>
                <div className="dot7"></div>
        
            </div>
        );
}

export default Ticket;