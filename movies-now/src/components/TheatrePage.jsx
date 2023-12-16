import React, { Component } from 'react';
import { checkDay, checkMonth,assignMonth } from '../utils/helper';
import DateBar from './DateBar';
import TheatreGrid from './TheatreGrid';
import Footer from './Footer';

class TheatrePage extends Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getdate = this.getdate.bind(this);
        var date = new Date();

        this.state = {
            day:date.getDate(),
            month: this.assignMonth(date.getMonth() + 1),
            movie:"",
            dates: [
                {
                    day: date.getDate(),
                    month: assignMonth(date.getMonth() + 1),
                    id:0,
                },
                {
                    day: checkDay(date.getDate() + 1, date.getMonth() + 1),
                    month: assignMonth(checkMonth(date.getDate() + 1, date.getMonth() + 1)),
                    id:1,
                },
                {
                    day: checkDay(date.getDate() + 2, date.getMonth() + 1),
                    month: assignMonth(checkMonth(date.getDate() + 2, date.getMonth() + 1)),
                    id:2,
                },
                {
                    day: checkDay(date.getDate() + 3, date.getMonth() + 1),
                    month: assignMonth(checkMonth(date.getDate() + 3, date.getMonth() + 1)),
                    id:3,
                },
                {
                    day: checkDay(date.getDate() + 4, date.getMonth() + 1),
                    month: assignMonth (checkMonth(date.getDate() + 4, date.getMonth() + 1)),
                    id:4,
                },
            ],
            selectedDate:"",
            datess: ["datechosen", "0", "0", "0", "0"],   
        }
        
    }
   
    handleClick(date,day,month)
    { 
        var da = ["0", "0", "0", "0", "0"];
        da[date] = "datechosen";
        var selectdate = day + "," + month;
        this.setState({ datess: da,selectedDate:selectdate });
    }
    getdate(i)
    {
        return this.state.datess[i];
    }
    componentDidMount()
    {  
        var setdate = this.state.dates[0].day + "," + this.state.dates[0].month;
        this.setState({ selectedDate: setdate });
    }
    render()
    {    
        return (
            <div>
                <DateBar
                    Dates={this.state.dates}
                    onClick={this.handleClick}
                    getId={this.getdate}>
                </DateBar>
                <TheatreGrid
                    movie={this.props.match.params.id}
                    date={this.state.selectedDate}>
                </TheatreGrid>
                <Footer/>
            </div>
        );
    }

}

export default TheatrePage;