import React, { Component } from "react";
import axios from 'axios';
import Summary1 from "./Summary1";
import Payment from "./Payment";
import { getTicket } from "../sdk/moviesnow";

class PaymentPage extends Component{

    ticket = {};
    
    componentDidMount(){
        this.ticket = getTicket(this.props.match.params.ticketId);  
    }

    render()
    {
        return (
            <div>
                <Payment ticketId={this.props.match.params.ticketId} />
                <Summary1 ticketId={this.props.match.params.ticketId}/>
            </div>
        );
    }
}

export default PaymentPage;