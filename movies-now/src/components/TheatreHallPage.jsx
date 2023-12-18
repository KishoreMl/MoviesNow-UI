import React, { Component } from "react";
import MovieBar from './MovieBar';
import TheatreHall from "./TheatreHall";
import { getTicket,updateTicket } from "../sdk/moviesnow";

class TheatreHallPage extends Component{
    
    ticket = {
        time: this.props.match.params.time,
        ticketId:this.props.match.params.ticketId,
    };
    
    constructor(props)
    {
        super(props);
        this.state = {
            selectedSeats: [],
        }
    }

    componentDidMount() {
        const ticket =  getTicket(this.props.match.params.ticketId);
        this.ticket = { ...this.ticket, ticket };       
    }

    onSelectSeat(seats){
        this.setState({ selectedSeats: seats });
    }
    
    onBookTicket(){
        updateTicket(this.ticket.ticketId, this.ticket);
    }

    render()
    {
        return (
            <div>
                <MovieBar 
                    ticket={this.ticket}
                    onBook={this.onBookTicket}
                />
                <TheatreHall
                    theatrename={this.ticket.theatrename}
                    onSelectedSeats={this.onSelectSeat}
                />
            </div>
        );
    }
}

export default TheatreHallPage;
