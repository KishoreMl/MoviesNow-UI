import React, { Component } from 'react';
import bookedImage from '../Images/booked.png';

class Ticket extends Component
{
    render() {
        return (
            <div className="ticket">
                <div className="ticket-img">
                    <img src=""  alt=""/>
                </div>
                <h2> {this.props.ticket.moviename} ({this.props.ticket.print})</h2>
                <p><b>LANGUAGE:</b> {this.props.ticket.language} </p>
                <p> {this.props.ticket.theatrename} , {this.props.ticket.location}</p>
                <p><b>SEATS: </b>
                    {this.props.ticket.seats.map(seat => 
                        <span>{seat},</span>
                    )}
                </p>
                <p><b>DATE:</b> {this.ticket.date}</p>
                <p><b>TIME:</b> {this.ticket.time}</p>
                <p><b>TOTAL PRICE:</b> Rs.{this.ticket.total}</p>

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
}

export default Ticket;