import React, { Component } from 'react';
import axios from "axios";
import TheatreRow from './TheatreRow';

class TheatreGrid extends Component
{
    theatres = []
   
    componentDidMount() {
        axios.get("http://localhost:5000/theatre")
            .then(response => {
                if (response.data.length > 0) {
                    this.theatres = response.data.map(theatre => theatre);
                }})
            }

    render() {
        return (
            <div className="theatreGrid">
                {this.state.theatres.map(theatre =>
                    <TheatreRow Theatre={theatre}
                        date={this.props.date}
                        key={theatre}
                        movie={this.props.movie} />
                )}  
            </div>
        )
    }
}

export default TheatreGrid;