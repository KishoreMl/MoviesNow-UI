
const LOCAL_URL = "http://localhost:5000";
const BASE_URL = LOCAL_URL;

export async function getAllMovies() {
    let data;
    axios.get(BASE_URL+"/movie")
        .then(response => {
            if (response.data.length > 0){
                data = response.data;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function getMovie(movieId) {
    let data;
    axios.get(BASE_URL+"/movie/"+movieId)
        .then(response => {
            data = response.data;
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function getTheatre(theatreId) {
    let data;
    axios.get(BASE_URL+"/theatre/"+theatreId)
        .then(response => {
            data = response.data;
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function getAllTheatres() {
    let data
    axios.get(BASE_URL+"/theatre")
        .then(response => {
            if (response.data.length > 0) {
               data = response.data.map(theatre => theatre);
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        
    return data;
}

export async function getCast(movieId) {
    let data;
    axios.get(BASE_URL+"/cast/"+movieId)
        .then(response => {
            data = response.data.cast;
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function getCrew(movieId) {
    let data;
     axios.get(BASE_URL+"/crew/"+movieId)
        .then(response => {
            data = response.data;
        })
        .catch(function (err){
            console.log(err);
        })
    return data;
}

export async function getSeats() {
    let data;
    axios.get(BASE_URL+"/seat/" + this.ticket.theatrename)
        .then(response => {
            data = response.data.seats;
        })
        .catch(function (err){
            console.log(err);
        })
    return data;
}

export async function updateSeats(theatreId,seats) {
    axios.post(BASE_URL+"/seat/update/"+ theatreId, seats);
}

export async function createTicket(ticket) {
    axios.post(BASE_URL+"/ticket/add", ticket);
}
 
export async function getTicket(ticketId) {
    let data;
     axios.get(BASE_URL+"/ticket/"+ticketId)
        .then(response => {
            data = response.data;
        })
        .catch(function (err) {
            console.log(err);
        })
    return data;
}

export async function updateTicket(ticketId,ticket) {
    axios.post(BASE_URL+"/ticket/update/" + ticketId, ticket);
}

export async function deleteTicket() {

}

