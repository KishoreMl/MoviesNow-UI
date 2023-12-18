import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovie, createTicket } from '../sdk/moviesnow';

class TheatreRow extends Component{

    date = new Date();
    ticket = {
            ticketId: "MNT"+10+Math.floor(Math.random()*999),
            theatrename: props.Theatre.theatrename,
            moviename: props.movie,
            location: props.Theatre.location,
            date: props.date + "," + date.getFullYear(), 
            booked:false,
    }

    componentDidMount()
    {
        let response = getMovie(this.props.movieId);
        this.ticket = {
            ...this.ticket,
            print: response.print,
            language: response.language
        }    
        setTimeout(() => {
            createTicket(this.ticket);
        }, 1000);    
    }
    render() {  
        return (
            <div className="theatreRow">
                <h4>{this.props.Theatre.theatrename},{this.props.Theatre.location}</h4>
                {this.props.Theatre.timeslots.map(time =>
                    <Link to={'/theatrehall/'+this.ticket.ticketId+'/'+time}>
                        <button name="theatre" key={time} >{time}</button>
                    </Link>
                )}           
            </div>
        );
    }
}

export default TheatreRow;