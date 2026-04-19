# Movie Ticket Booking System - Database Schema

This document provides a comprehensive overview of the database schema for the Movie Ticket Booking System.

## 🗄️ Schema Overview

The database is designed to handle a complete movie ticket booking system with the following core functionality:
- **Location & Theatre Management**
- **Movie & Show Management** 
- **Seat Selection & Booking**
- **User Management**
- **Payment Processing**
- **Reviews & Notifications**

## 📊 Entity Relationship Diagram

```
Locations (1) ─────→ (N) Theatres (1) ─────→ (N) Screens (1) ─────→ (N) Seats
                                         │                      │
                                         │                      └→ (N) TimeSlots
                                         │
                                         └─────→ (N) Shows ←──── (1) Movies
                                                    │              │
                                                    │              └→ (N) MovieGenres
                                                    │              └→ (N) MovieLanguages
                                                    │              └→ (N) MovieCastCrew
                                                    │
Users (1) ─────→ (N) Bookings ←─────────────────────┘
   │                │
   │                └─────→ (N) BookedSeats
   │                └─────→ (N) Payments
   │
   └─────→ (N) UserFavorites
   └─────→ (N) MovieReviews
   └─────→ (N) Notifications
```

## 🏗️ Core Entities

### 1. Location & Theatre Management

#### `locations`
- **Purpose**: Stores city/area information
- **Key Fields**: `city`, `state`, `pincode`, `coordinates`
- **Relationships**: One-to-Many with `theatres`

#### `theatres` 
- **Purpose**: Cinema/multiplex information
- **Key Fields**: `name`, `address`, `amenities` (parking, food, wheelchair)
- **Relationships**: 
  - Belongs to one `location`
  - Has many `screens`

#### `screens`
- **Purpose**: Individual theater screens within a theatre
- **Key Fields**: `screen_number`, `screen_type`, `total_seats`, `seating_layout`
- **Relationships**:
  - Belongs to one `theatre`
  - Has many `seats` and `time_slots`
  - Has many `shows`

### 2. Seat Management

#### `seat_categories`
- **Purpose**: Defines seat pricing tiers (Premium, Gold, Silver, Economy)
- **Key Fields**: `name`, `base_price`, `color_code`

#### `seats`
- **Purpose**: Individual seats in each screen
- **Key Fields**: `seat_row`, `seat_number`, `seat_category_id`
- **Relationships**: 
  - Belongs to one `screen`
  - Belongs to one `seat_category`

### 3. Movie Management

#### `movies`
- **Purpose**: Movie information and metadata
- **Key Fields**: `title`, `duration`, `certification`, `rating`, `release_date`
- **Relationships**:
  - Many-to-Many with `genres` via `movie_genres`
  - Many-to-Many with `languages` via `movie_languages`
  - Many-to-Many with `cast_crew` via `movie_cast_crew`

#### `cast_crew`
- **Purpose**: Actor, director, and crew information
- **Key Fields**: `name`, `role`, `biography`

### 4. Show & Time Management

#### `time_slots`
- **Purpose**: Available show times for each screen
- **Key Fields**: `start_time`, `end_time`, `slot_name`
- **Relationships**: Belongs to one `screen`

#### `shows` (Central Entity)
- **Purpose**: Links movies to specific screenings
- **Key Fields**: `show_date`, `base_price`, `booking_times`
- **Relationships**: 
  - Belongs to one `movie`
  - Belongs to one `screen`
  - Belongs to one `time_slot`
  - Belongs to one `language`
  - Has many `bookings`

### 5. User & Booking Management

#### `users`
- **Purpose**: Customer account information
- **Key Fields**: `email`, `phone`, `name`, `verification_status`
- **Relationships**: Has many `bookings`, `reviews`, `favorites`

#### `bookings` (Transaction Entity)
- **Purpose**: Ticket booking records
- **Key Fields**: `booking_reference`, `total_amount`, `status`
- **Relationships**:
  - Belongs to one `user`
  - Belongs to one `show`
  - Has many `booked_seats`
  - Has many `payments`

#### `booked_seats`
- **Purpose**: Individual seat bookings
- **Relationships**: Links `bookings` to specific `seats`

#### `payments`
- **Purpose**: Payment transaction records
- **Key Fields**: `payment_method`, `gateway_transaction_id`, `amount`, `status`

## 🔄 Key Workflows

### 1. Movie Discovery
```sql
-- Find movies playing in a location
SELECT m.*, l.city, t.name as theatre_name
FROM movies m
JOIN shows s ON m.id = s.movie_id
JOIN screens sc ON s.screen_id = sc.id
JOIN theatres t ON sc.theatre_id = t.id
JOIN locations l ON t.location_id = l.id
WHERE l.id = 'LOC001' 
AND s.show_date = '2024-01-15'
AND s.is_cancelled = FALSE;
```

### 2. Show Time Listing
```sql
-- Get all show times for a movie in a location
SELECT t.name, s.show_date, ts.start_time, ts.end_time, 
       s.base_price, sc.screen_type
FROM shows s
JOIN screens sc ON s.screen_id = sc.id
JOIN theatres t ON sc.theatre_id = t.id
JOIN time_slots ts ON s.time_slot_id = ts.id
WHERE s.movie_id = 'MOV001'
AND t.location_id = 'LOC001'
AND s.show_date >= CURDATE()
ORDER BY s.show_date, ts.start_time;
```

### 3. Seat Availability
```sql
-- Check available seats for a show
SELECT seat.id, seat.seat_row, seat.seat_number, 
       cat.name as category, cat.base_price,
       CASE 
         WHEN bs.seat_id IS NOT NULL THEN 'BOOKED'
         ELSE 'AVAILABLE'
       END as status
FROM seats seat
JOIN seat_categories cat ON seat.seat_category_id = cat.id
JOIN screens sc ON seat.screen_id = sc.id
LEFT JOIN booked_seats bs ON seat.id = bs.seat_id
LEFT JOIN bookings b ON bs.booking_id = b.id 
       AND b.show_id = 'SHOW001' 
       AND b.booking_status IN ('CONFIRMED', 'PENDING')
WHERE sc.id = (SELECT screen_id FROM shows WHERE id = 'SHOW001');
```

### 4. Booking Process
```sql
-- Create a booking (transaction)
BEGIN TRANSACTION;

-- 1. Create booking record
INSERT INTO bookings (id, user_id, show_id, booking_reference, 
                     total_seats, final_amount, booking_status)
VALUES ('BOOK001', 'USER001', 'SHOW001', 'BK12345', 2, 500.00, 'PENDING');

-- 2. Reserve seats
INSERT INTO booked_seats (id, booking_id, seat_id, seat_price)
VALUES 
('BS001', 'BOOK001', 'SEAT001', 250.00),
('BS002', 'BOOK001', 'SEAT002', 250.00);

-- 3. Process payment
INSERT INTO payments (id, booking_id, payment_method, amount, payment_status)
VALUES ('PAY001', 'BOOK001', 'CARD', 500.00, 'PENDING');

COMMIT;
```

## 📈 Performance Optimizations

### Indexes
```sql
-- Critical indexes for performance
CREATE INDEX idx_shows_movie_date ON shows(movie_id, show_date);
CREATE INDEX idx_shows_screen_date ON shows(screen_id, show_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, booking_status);
CREATE INDEX idx_seats_screen ON seats(screen_id);
```

### Query Patterns
- **Movie Listings**: Filter by location → theatre → screen → shows
- **Seat Selection**: Join seats with booked_seats to show availability
- **User History**: Index on user_id with booking_status filter

## 🔒 Security Considerations

1. **User Data**: Password hashing, email/phone verification
2. **Payment Security**: Never store card details, use payment gateway tokens
3. **Booking Integrity**: Use transactions for multi-table booking operations
4. **Seat Locking**: Implement temporary seat holds during booking process

## 📱 Frontend Integration

The `src/types/database.ts` file provides TypeScript interfaces that map directly to the database schema, ensuring type safety between frontend and backend.

### Key Integration Points:
- **Movie Discovery**: `MovieShowTimes` interface
- **Seat Selection**: `SeatLayout` interface with status
- **Booking Flow**: `BookingSummary` interface
- **User Management**: `User` and `UserAddress` interfaces

## 🚀 Getting Started

1. **Create Database**: Run the SQL schema file
2. **Insert Sample Data**: Use the provided sample data inserts
3. **Configure Indexes**: Apply performance indexes
4. **Setup TypeScript**: Use the interfaces in your frontend application

## 🔧 Extensions

The schema supports future enhancements:
- **Dynamic Pricing**: Time-based and demand-based pricing
- **Loyalty Programs**: User points and tier management
- **Multiple Locations**: Chain cinema management
- **Advanced Analytics**: Reporting and dashboard data
- **Mobile Apps**: Push notifications and offline bookings

---

*This schema provides a robust foundation for a production-ready movie ticket booking system with scalability and performance in mind.*
