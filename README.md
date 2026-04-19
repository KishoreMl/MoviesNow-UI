# MoviesNow UI

A React-based frontend for a movie ticket booking platform. Users can browse movies, explore theatre showtimes, select seats, and complete ticket purchases through a multi-step booking flow.

---

## Features

- **Movie Listings** — Browse new releases with details like genre, certification, language, and format
- **Movie Detail Page** — View full cast, crew, synopsis, and ratings
- **Theatre & Showtime Selection** — Browse theatres by location with available time slots per screen type
- **Date Selection** — Filter shows by date using the date bar
- **Seat Selection** — Interactive seat layout with real-time availability (Available / Selected / Booked)
- **Booking Summary** — Review selected seats and pricing before payment
- **Payment Flow** — Card details entry followed by OTP verification
- **Ticket View** — Final ticket confirmation screen
- **Search** — Search movies by name
- **OTP-based Login** — Email-based authentication with OTP

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | JavaScript / TypeScript |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Styling | CSS |
| Testing | React Testing Library, Jest |
| Build Tool | Create React App |

---

## Project Structure

```
src/
├── components/
│   ├── Header/             # Top navigation bar
│   ├── Home.tsx            # Home page with movie listings
│   ├── MovieCard.tsx       # Movie card component
│   ├── MoviePage/          # Full movie detail page (cast, crew, synopsis)
│   ├── TheatrePage/        # Theatre list with time slots for a movie
│   ├── TimeSlot/           # Individual time slot component
│   ├── SeatLayout/         # Seat map layout
│   ├── Seat.jsx            # Single seat component
│   ├── SeatRow.jsx         # Row of seats
│   ├── Seats.jsx           # Full seats section
│   ├── Legend.jsx          # Seat status legend (Available / Selected / Booked)
│   ├── DateBar.jsx         # Date selector bar
│   ├── MovieBar.jsx        # Movie info bar shown during booking
│   ├── Summary1.jsx        # Booking summary (seats + price)
│   ├── Payment.jsx         # Card payment form
│   ├── PaymentOtp.jsx      # OTP verification for payment
│   ├── PaymentPage.jsx     # Payment page wrapper
│   ├── LoginPage.jsx       # Email login page
│   ├── Otp.jsx             # OTP entry for login
│   ├── TicketPage.jsx      # Final ticket display
│   ├── Ticket.jsx          # Ticket component
│   ├── Search.jsx          # Movie search
│   ├── NavBar.jsx          # Navigation bar
│   ├── Footer.jsx          # Footer
│   ├── CrewBox.tsx         # Cast/crew card
│   ├── TheatreGroup.jsx    # Grouped theatre list
│   ├── TheatreHall.jsx     # Theatre hall info
│   ├── TheatreRow.jsx      # Theatre row display
│   └── MovieNotFound.jsx   # 404 / not found state
├── mockData/
│   ├── movies.json         # Sample movie data
│   ├── theatres.json       # Sample theatre data
│   ├── theatreShows.json   # Theatre show listings with time slots
│   └── sampleTheatreLayout.json  # Sample seat layout data
├── sdk/
│   └── moviesnow.js        # Axios-based API client
├── types/
│   └── database.ts         # TypeScript types for database entities
├── model.ts                # Core TypeScript interfaces (Movie, Theatre, Seat, Ticket…)
├── utils/
│   └── helper.js           # Utility/helper functions
├── App.js                  # Root component and routing
├── App.css                 # Global styles
└── movie.css               # Movie-specific styles
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher

### Installation

```bash
git clone https://github.com/your-username/MoviesNow-UI.git
cd MoviesNow-UI
npm install
```

### Running the App

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). The page hot-reloads on file changes.

### Running Tests

```bash
npm test
```

### Production Build

```bash
npm run build
```

Output is placed in the `build/` folder, optimized and minified for deployment.

---

## Backend / API

The frontend communicates with a REST API backend. By default it points to `http://localhost:5000`.

To change the base URL, update the `LOCAL_URL` constant in `src/sdk/moviesnow.js`.

Full API documentation is available in [API_ENDPOINTS.md](./API_ENDPOINTS.md).

### Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/movie` | Get all movies |
| GET | `/movie/:id` | Get movie details |
| GET | `/theatre` | Get all theatres |
| GET | `/theatre/:id` | Get theatre details |
| GET | `/cast/:movieId` | Get cast for a movie |
| GET | `/crew/:movieId` | Get crew for a movie |
| GET | `/seat/:theatreId` | Get seat layout for a theatre |
| POST | `/seat/update/:theatreId` | Update seat availability |
| POST | `/ticket/add` | Create a new booking |
| GET | `/ticket/:ticketId` | Get ticket details |
| POST | `/ticket/update/:ticketId` | Update ticket |

---

## Database

The database schema and entity relationship diagram are documented in [DATABASE_SCHEMA_README.md](./DATABASE_SCHEMA_README.md). The raw SQL schema is in [database-schema.sql](./database-schema.sql).

Core entities: `Locations`, `Theatres`, `Screens`, `Seats`, `Movies`, `Shows`, `Bookings`, `Users`, `Payments`

---

## Booking Flow

```
Home (Movie List)
  └─→ Movie Detail Page
        └─→ Date Selection
              └─→ Theatre & Showtime Selection
                    └─→ Seat Selection
                          └─→ Booking Summary
                                └─→ Payment (Card Details)
                                      └─→ Payment OTP
                                            └─→ Ticket Confirmation
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start development server on port 3000 |
| `npm test` | Run tests in interactive watch mode |
| `npm run build` | Create optimized production build |
| `npm run eject` | Eject from Create React App (irreversible) |
