import React, { useState } from 'react';

function Search(props)
{   

    const [moviename, setMoviename] = useState("");

    function onChangemovie(e){
        setMoviename(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault(); 
        // search for movies by moviename to be implemented
    }

    return (
        <div className="search">
            <form onSubmit={onSubmit}>
                <input type="text"
                    name="movie"
                    placeholder="Search movies"
                    onChange={onChangemovie}/>
                <button type="submit" value="submit">
                    <i className="fa fa-search"></i>
                </button>
            </form>
        </div>
    );
}

export default Search;
