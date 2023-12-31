import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getTicket, getMovie } from "../sdk/moviesnow";

class BookingSummary extends Component{

    ticketId = this.props.match.params.ticketId;
    ticket = {};
    totalPrice = 0;
    subTotal = 0;
    convenienceFee = 0;
    noOfTickets = 0;
    movieImg = '';

    componentDidMount()
    {
        this.ticket = getTicket(this.ticketId); 
        this.calculatePrice(this.ticket);    
        this.movieImg = getMovie(this.ticket.moviename).image;       
    }

    calculatePrice(ticket)
    {
        const platinum = "ABC"
        const gold = "DEFGHIJKL"
        const seats = ticket.seats;
        this.noOfTickets = seats.length;
        this.convenienceFee = this.noOfTickets * 30;

        seats.map(seat => {
            var c = seat.split('');
            if (platinum.indexOf( c[0]) >= 0)
                this.subTotal = this.subTotal + 120;
            else if (gold.indexOf( c[0]) >= 0)
                this.subTotal = this.subTotal + 100;
            else
                this.subTotal += 50;
        }) 
        this.totalPrice = this.subTotal + this.convenienceFee;
    }
   

    render()
    {
        return (
            <div className="summary-container">
                <div className="moviePoster">
                    <img src={this.ticket.img} alt="" />
                    <div className="moviePoster-sub">
                        <div className="movpos-sub">
                            <h3>{this.ticket.moviename},({this.ticket.print})</h3>
                            <p>{this.ticket.theatrename} , {this.ticket.location}</p>
                            <p>{this.ticket.date} ,  {this.ticket.time}</p>
                        </div>
                    </div>
                </div>
                <div className="summary">
                    <h4>BOOKING SUMMARY</h4>
                    <p><b>SEATS:</b>{this.ticket.seats.map(seat => <span>{seat},</span>)}</p>
                    <p><b>Ticket(s): </b>{this.noOfTickets}</p> 
                    <p><b>Convenience fees: </b> <span>{this.convenienceFee}</span> </p> 
                    <hr/><br/>
                    <p><b>Sub Total </b> <span>Rs.{this.subTotal}</span></p>
                    <p><b>Amount Payable </b> <span>Rs.{this.totalPrice}</span> </p> 
                    <hr/>
                    <p>By proceeding, I express my consent to complete this transaction</p>
                    <Link to={'/payment/'+this.ticketId}> <button type="submit">Total: Rs.{this.totalPrice}  Proceed </button></Link>
                </div>
            </div>
        );
    }
}

export default BookingSummary;