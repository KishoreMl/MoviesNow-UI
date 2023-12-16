import React, { Component } from 'react';
import axios from 'axios';
import img from '../Images/Spiderman.jpg';
import img1 from '../Images/booked.png';

class Ticket extends Component
{
    ticket = {};  
    componentDidMount()
    {
        const res = async () => {
            const response = await axios.get("http://localhost:5000/ticket/" + this.props.ticketId);
            this.ticket = response.data;

            axios.get("http://localhost:5000/movie/" + this.state.ticket.moviename)
                .then(response => {
                  this.ticket={...this.ticket, image:response.data.image}
                })
         }
        res();
    }
    render() {
        return (
            <div className="ticket">
                <div className="ticket-img">
                    <img src={img}  alt=""/>
                </div>
                <h2> {this.ticket.moviename} ({this.ticket.print})</h2>
                <p><b>LANGUAGE:</b> {this.state.ticket.language} </p>
                <p> {this.ticket.theatrename} , {this.ticket.location}</p>
                <p><b>SEATS: </b>
                    {this.ticket.seats.map(seat => 
                        <span>{seat},</span>
                    )}
                </p>
                <p><b>DATE:</b> {this.ticket.date}</p>
                <p><b>TIME:</b> {this.ticket.time}</p>
                <p><b>TOTAL PRICE:</b> Rs.{this.ticket.total}</p>

                <img id="booked" src={img1} alt="" />
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