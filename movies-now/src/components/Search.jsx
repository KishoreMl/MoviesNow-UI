import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component
{
    constructor(props)
    {
        super(props);
        this.onChangemovie = this.onChangemovie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            moviename:" ",
        }
    }
    
    onChangemovie(e){
        this.setState({ moviename: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        console.log(e);
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        name="movie"
                        placeholder="Search movies"
                        onChange={this.onChangemovie}/>
                    <button type="submit" value="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default Search;