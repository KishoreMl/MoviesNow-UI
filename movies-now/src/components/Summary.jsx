import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Summary extends Component{

    ticket = {}
    totalPrice = 0;
    subTotal = 0;
    convenienceFee = 0;
    length = 0;

    calculatePrice(ticket)
    {
        const platinum = "ABC"
        const gold = "DEFGHIJKL"
        const seats = ticket.seats;
        this.length = seats.length;
        this.convenienceFee = length * 30;

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
   
    componentDidMount()
    {
        axios.get("http://localhost:5000/ticket/" + this.props.ticketId)
            .then(response => {
                this.ticket = response.data;
                this.calculatePrice(this.ticket);
            })
            .catch(function (err) {
                    console.log(err);
            })  
        }
    render()
    {
        return (
            <div className="summary">
                <h4>BOOKING SUMMARY</h4>
                <p><b>SEATS:</b>
                    {this.state.ticket.seats.map(seat => <span>{seat},</span>)}
                </p>
                <p> <b>Ticket(s): </b>{this.state.length}</p> 
                <p><b>Convenience fees: </b> <span>{this.state.convenienceFee}</span> </p> 
                <hr/>
                <br/>
                <p><b>Sub Total </b> <span>Rs.{this.state.subTotal}</span></p>
                <p><b>Amount Payable </b> <span>Rs.{this.totalPrice}</span> </p> 
                <hr/>
                <p>By proceeding, I express my consent to complete this transaction</p>
               <Link to={'/payment/'+this.props.ticketId}> <button type="submit">Total: Rs.{this.totalPrice}  Proceed </button></Link>
            </div>
        );
    }
}

export default Summary;