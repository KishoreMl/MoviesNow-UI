import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import img from '../Images/Spiderman.jpg';
import cover from '../Images/SpidermanCover.jpg';
import { getMovie } from '../sdk/moviesnow';


class Movie extends Component{
    movie = {};

    componentDidMount() {
        this.movie = getMovie(this.props.movie);
    }
    
    render()
    {
        return (
            <div className="movdet" style={{ backgroundImage: `url(${cover})`}} >
                <div className="background"></div>
                <div className="movie1">
                    <img src={img} alt=""/>
                </div>
                <div className="desc">
                    <h2>{this.props.movie}</h2>
                    <span>{ this.movie.print}</span>
                    <span>{this.movie.language}</span>
                    <p>{this.movie.runtime}  <i className='fa fa-circle' id="dot"/>  {this.movie.genre}  <i className='fa fa-circle' id="dot"/> 
                    {this.movie.certification}  <i className='fa fa-circle' id="dot"/>  {this.movie.releasedate}</p>
                    <p><i className="fa fa-thumbs-up"></i>{this.movie.likes}% Intrested</p>
                    <Link to={'/theaters/'+this.props.movie}><button >Book Tickets</button></Link>
                </div> 
            </div>

        );
    }
}
export default Movie;