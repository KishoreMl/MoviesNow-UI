import React, { Component } from 'react';
import axios from 'axios';
import Ticket from './Ticket';
import Footer from './Footer';
import NavBar from './NavBar';

class TicketPage extends Component{

    seats = { theatrename: "", theatreSeats: [] };
    ticket = {};

    componentDidMount()
    {
        axios.get("http://localhost:5000/ticket/" + this.state.ticket.ticketId)
            .then(response => {
                this.ticket = response.data;
                this.seats.theatrename = response.data.theatrename;
               
            axios.post("http://localhost:5000/ticket/update/" + this.state.ticket.ticketId, this.state.ticket)
                .then( this.updateSeats())
        })
        .catch(function (err) {
            if (err)
                console.log(err);
         })  
    }

    updateSeats()
    {
        axios.get("http://localhost:5000/seat/"+this.state.ticket.theatrename)
            .then(response => {
                this.seats.theatreSeats = response.data.seats;

                this.ticket.seats.map(seat => {
                    var seatss = this.state.theatreSeats;
                    var seatno = seat.split("");
                    var row = seatno[0];
                    var no = "";
                    if (seatno.length > 2)
                    {
                        no = seatno[1] + seatno[2];
                    }
                    else
                    {
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
                axios.post("http://localhost:5000/seat/update/"+this.seats.theatrename,this.seats);
            })
            .catch(function (err) {
                if (err)
                    console.log(err);
            })
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