
export function getAllMovies()
{
    let data;
    axios.get("http://localhost:5000/movie")
        .then(response => {
            if (response.data.length > 0)
            {
                data = response.data;
            }
        })
        .catch(function (err)
        { if (err)
            console.log(err);
        })
    return data;
}

export function getMovie(movieId) {
    let data;
    axios.get("http://localhost:5000/movie/" + movieId)
        .then(response => {
            data = response.data.description;
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export function getAllTheatres() {
    
}

export function getCast(movie) {
    let data;
     axios.get("http://localhost:5000/cast/" + movie)
            .then(response => {
                data = response.data.cast;
            })
            .catch(function (err) {
                console.log(err);
            })
    return data;
}

export function getCrew(movie) {
    let data;
     axios.get("http://localhost:5000/crew/" + movie)
        .then(response => {
            data = response.data;
        })
        .catch(function (err){
            console.log(err);
        })
    return data;
}
 
export function getTicket() {
    let data;
     axios.get("http://localhost:5000/ticket/" + this.ticketId)
        .then(response => {
            data = response.data;
        })
        .catch(function (err) {
            if(err)
                console.log(err);
        })
    return data;
}

export function updateTicket() {

}

export function deleteTicket() {

}

