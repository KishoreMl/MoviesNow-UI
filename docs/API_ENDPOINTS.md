# Movie Ticket Booking System - API Endpoints

This document outlines the RESTful API endpoints for the movie ticket booking system based on the database schema.

## 🌐 Base URL
```
Production: https://api.moviesapp.com/v1
Development: http://localhost:3000/api/v1
```

## 🔐 Authentication
All protected endpoints require Bearer token authentication:
```http
Authorization: Bearer <jwt_token>
```

## 📍 Location & Theatre APIs

### Get Locations
```http
GET /locations
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "LOC001",
      "city": "Coimbatore",
      "state": "Tamil Nadu",
      "country": "India",
      "pincode": "641001"
    }
  ]
}
```

### Get Theatres by Location
```http
GET /locations/{location_id}/theatres
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "THR001",
      "name": "Cosmo Cinemas PEELAMEDU",
      "address": "123 Main Road, Peelamedu",
      "phone": "+91-9876543210",
      "amenities": {
        "parking_available": true,
        "food_court": true,
        "wheelchair_accessible": false
      },
      "total_screens": 4
    }
  ]
}
```

### Get Theatre Details
```http
GET /theatres/{theatre_id}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "THR001",
    "name": "Cosmo Cinemas PEELAMEDU",
    "location": {
      "city": "Coimbatore",
      "state": "Tamil Nadu"
    },
    "screens": [
      {
        "id": "SCR001",
        "screen_number": 1,
        "screen_type": "DOLBY_ATMOS",
        "total_seats": 180
      }
    ]
  }
}
```

## 🎬 Movie APIs

### Get Now Playing Movies
```http
GET /movies/now-playing?location_id={location_id}&date={YYYY-MM-DD}
```
**Query Parameters:**
- `location_id` (optional): Filter by location
- `date` (optional): Show date (defaults to today)
- `language` (optional): Language filter
- `genre` (optional): Genre filter

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "MOV001",
      "title": "Spider-Man: No Way Home",
      "duration": 148,
      "certification": "UA",
      "rating": 8.7,
      "votes": 15420,
      "poster_url": "https://cdn.example.com/spiderman-poster.jpg",
      "genres": ["Action", "Adventure", "Sci-Fi"],
      "languages": ["English", "Hindi", "Tamil"]
    }
  ]
}
```

### Get Movie Details
```http
GET /movies/{movie_id}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "MOV001",
    "title": "Spider-Man: No Way Home",
    "description": "Spider-Man's identity is revealed...",
    "duration": 148,
    "release_date": "2021-12-17",
    "certification": "UA",
    "rating": 8.7,
    "votes": 15420,
    "poster_url": "https://cdn.example.com/spiderman-poster.jpg",
    "cover_image_url": "https://cdn.example.com/spiderman-cover.jpg",
    "trailer_url": "https://youtube.com/watch?v=xyz",
    "director": "Jon Watts",
    "cast_crew": [
      {
        "name": "Tom Holland",
        "role": "ACTOR",
        "character_name": "Peter Parker / Spider-Man",
        "image_url": "https://cdn.example.com/tom-holland.jpg"
      }
    ],
    "genres": [
      { "id": "GEN001", "name": "Action" }
    ],
    "languages": [
      { "id": "LANG001", "name": "English", "code": "en" }
    ]
  }
}
```

## 🎭 Show & Time Slot APIs

### Get Movie Showtimes
```http
GET /movies/{movie_id}/showtimes?location_id={location_id}&date={YYYY-MM-DD}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "movie": {
      "id": "MOV001",
      "title": "Spider-Man: No Way Home"
    },
    "show_date": "2024-01-15",
    "theatre_shows": [
      {
        "theatre": {
          "id": "THR001",
          "name": "Cosmo Cinemas PEELAMEDU",
          "location": "RGB Lase:Coimbatore",
          "amenities": {
            "parking_available": true,
            "food_court": true
          }
        },
        "shows": [
          {
            "id": "SHOW001",
            "time_slot": {
              "start_time": "11:00",
              "end_time": "13:28"
            },
            "screen": {
              "screen_type": "DOLBY_ATMOS",
              "screen_name": "Screen 1"
            },
            "language": {
              "name": "English",
              "code": "en"
            },
            "base_price": 200.00,
            "available_seats": 156,
            "is_housefull": false
          }
        ]
      }
    ]
  }
}
```

### Get Show Details
```http
GET /shows/{show_id}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "SHOW001",
    "movie": {
      "title": "Spider-Man: No Way Home",
      "duration": 148
    },
    "theatre": {
      "name": "Cosmo Cinemas PEELAMEDU",
      "address": "123 Main Road, Peelamedu"
    },
    "screen": {
      "screen_number": 1,
      "screen_type": "DOLBY_ATMOS"
    },
    "show_date": "2024-01-15",
    "time_slot": {
      "start_time": "11:00",
      "end_time": "13:28"
    },
    "base_price": 200.00,
    "booking_open_time": "2024-01-14T00:00:00Z",
    "booking_close_time": "2024-01-15T10:45:00Z"
  }
}
```

## 💺 Seat Selection APIs

### Get Seat Layout
```http
GET /shows/{show_id}/seats
```
**Response:**
```json
{
  "success": true,
  "data": {
    "screen": {
      "id": "SCR001",
      "total_seats": 180,
      "rows": 12,
      "seats_per_row": 15
    },
    "seat_categories": [
      {
        "id": "CAT001",
        "name": "Premium",
        "base_price": 250.00,
        "color_code": "#FFD700"
      },
      {
        "id": "CAT002",
        "name": "Gold",
        "base_price": 200.00,
        "color_code": "#FFA500"
      }
    ],
    "seats": [
      [
        {
          "id": "SEAT001",
          "seat_row": "A",
          "seat_number": 1,
          "category": {
            "name": "Premium",
            "price": 250.00
          },
          "status": "AVAILABLE"
        },
        {
          "id": "SEAT002",
          "seat_row": "A",
          "seat_number": 2,
          "category": {
            "name": "Premium",
            "price": 250.00
          },
          "status": "BOOKED"
        }
      ]
    ]
  }
}
```

## 🎫 Booking APIs

### Create Booking
```http
POST /bookings
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "show_id": "SHOW001",
  "seat_ids": ["SEAT001", "SEAT002"],
  "coupon_code": "WELCOME10"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "BOOK001",
    "booking_reference": "BK12345",
    "status": "PENDING",
    "show": {
      "movie_title": "Spider-Man: No Way Home",
      "theatre_name": "Cosmo Cinemas PEELAMEDU",
      "show_date": "2024-01-15",
      "show_time": "11:00 AM"
    },
    "seats": [
      {
        "seat_row": "A",
        "seat_number": 1,
        "price": 250.00
      }
    ],
    "pricing": {
      "base_amount": 500.00,
      "convenience_fee": 25.00,
      "tax_amount": 45.00,
      "discount_amount": 50.00,
      "final_amount": 520.00
    },
    "payment_deadline": "2024-01-15T10:45:00Z"
  }
}
```

### Get Booking Details
```http
GET /bookings/{booking_id}
Authorization: Bearer <token>
```

### Get User Bookings
```http
GET /users/me/bookings?status={status}&page={page}&limit={limit}
Authorization: Bearer <token>
```
**Query Parameters:**
- `status` (optional): Filter by booking status
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

## 💳 Payment APIs

### Process Payment
```http
POST /bookings/{booking_id}/payments
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "payment_method": "CARD",
  "payment_gateway": "razorpay",
  "gateway_payment_id": "pay_xyz123"
}
```

### Payment Webhook
```http
POST /webhooks/payment/{gateway}
```
**Request Body:** (varies by payment gateway)

## 👤 User APIs

### User Registration
```http
POST /auth/register
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+919876543210",
  "first_name": "John",
  "last_name": "Doe",
  "password": "securepassword123"
}
```

### User Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "USER001",
      "email": "user@example.com",
      "first_name": "John",
      "is_verified": true
    },
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here"
  }
}
```

### Get User Profile
```http
GET /users/me
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /users/me
Authorization: Bearer <token>
```

## ⭐ Reviews & Ratings APIs

### Get Movie Reviews
```http
GET /movies/{movie_id}/reviews?page={page}&limit={limit}
```

### Add Movie Review
```http
POST /movies/{movie_id}/reviews
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "rating": 8,
  "review_text": "Amazing movie with great visual effects!",
  "is_spoiler": false
}
```

## 💝 Favorites APIs

### Get User Favorites
```http
GET /users/me/favorites?type={movies|theatres}
Authorization: Bearer <token>
```

### Add to Favorites
```http
POST /users/me/favorites
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "type": "movie",
  "item_id": "MOV001"
}
```

### Remove from Favorites
```http
DELETE /users/me/favorites/{type}/{item_id}
Authorization: Bearer <token>
```

## 🔍 Search APIs

### Search Movies
```http
GET /search/movies?q={query}&location_id={location_id}
```

### Search Theatres
```http
GET /search/theatres?q={query}&location_id={location_id}
```

## 🎟️ Coupon APIs

### Get Available Coupons
```http
GET /coupons?user_id={user_id}
Authorization: Bearer <token>
```

### Validate Coupon
```http
POST /coupons/validate
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "code": "WELCOME10",
  "booking_amount": 500.00
}
```

## 📱 Notification APIs

### Get User Notifications
```http
GET /users/me/notifications?unread_only={boolean}
Authorization: Bearer <token>
```

### Mark Notification as Read
```http
PUT /notifications/{notification_id}/read
Authorization: Bearer <token>
```

## 📊 Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Seat is already booked",
  "details": {
    "seat_id": "SEAT001",
    "current_status": "BOOKED"
  }
}
```

### Common Error Codes:
- `VALIDATION_ERROR`: Invalid input data
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict (e.g., seat already booked)
- `PAYMENT_FAILED`: Payment processing error
- `SHOW_CANCELLED`: Show has been cancelled

---

*This API documentation provides a complete interface for integrating with the movie ticket booking system backend.*
