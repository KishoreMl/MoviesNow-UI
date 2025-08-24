type CrewType = "CAST" | "CREW";
type seatStatus ="AVAILABLE" | "BOOKED" | "SELECTED";

export interface Crew{
    name: string;
    role: string;
    imageUrl: string;
    type: CrewType
}

export interface Movie{
    id:string;
    name: string;
    language: string;
    format: string;
    certification:string;
    genre: string;
    releaseDate: string;
    likes: number;
    rating: number;
    about: string;
    imageUrl: string;
    coverImageUrl:string;
    crew: Crew[];
}

export interface Theatre{
    id: string;
    name: string;
    location: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
}


export interface Screen{
    theatreId: string;
    screenName: string;
    seating: Seating[];
}

export interface Seating{
    row: string;
    seats: seatStatus[];
}

export interface Seat{
    id: string;
    status: seatStatus;
    number: number;
}

export interface Tikcet{
    ticketId: string;
    moviename: string;
    theatrename: string;
    location: string;
    format: string;
    language: string;
    time: string;
    date: string;
    seats: string[];
    ticketPrice: number;
    concessionfee: number;
    booked: boolean;
}