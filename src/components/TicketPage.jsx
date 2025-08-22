import React, { Component } from 'react';
import axios from 'axios';
import Ticket from './Ticket';
import Footer from './Footer';
import NavBar from './NavBar';
import { updateSeats, getTicket, updateTicket, getSeats } from '../sdk/moviesnow';

class TicketPage extends Component{

    seats = { theatreId: "", theatreSeats: [] };
    ticket = {};

    componentDidMount()
    {
        this.ticket = getTicket(this.props.ticket.ticketId);
        this.seats.theatrename = this.ticket.theatreId;
        updateTicket(this.props.ticket.ticketId, this.ticket);
        this.seats.theatreSeats = getSeats(this.ticket.theatreId);
        this.updateTickets();
       
    }

    updateTickets()
    {
        this.ticket.seats.map(seat => {
        var seatss = this.state.theatreSeats;
        var seatno = seat.split("");
        var row = seatno[0];
        var no = "";
        if (seatno.length > 2){
            no = seatno[1] + seatno[2];
        }
        else{
            no = seatno[1];   
        }
        const rows ="ABCDEFGHIJKLMNO";
        var r = rows.indexOf(row);
        seatss[r][no] = "B";
        this.setState(prevState => ({
            seats: {
                ...prevState.seats,
                theatreSeats: seatss,
            }
        }))   
    })
    updateSeats(this.seats.theatreId, this.seats.theatreSeats);
}
    render()
    {
        return (
            <div >
                <NavBar />
                <h2>Your Booking has been Confirmed</h2>
                <center>
                    <Ticket ticket={this.ticket} />
                </center>
                <Footer/>
            </div>
        );
    }
}

export default TicketPage;