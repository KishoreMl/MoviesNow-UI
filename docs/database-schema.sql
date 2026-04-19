-- Movie Ticket Booking System Database Schema

-- ============================================================================
-- LOCATION & THEATRE MANAGEMENT
-- ============================================================================

CREATE TABLE locations (
    id VARCHAR(50) PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE theatres (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location_id VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    website VARCHAR(200),
    total_screens INTEGER DEFAULT 0,
    parking_available BOOLEAN DEFAULT FALSE,
    food_court BOOLEAN DEFAULT FALSE,
    wheelchair_accessible BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE screens (
    id VARCHAR(50) PRIMARY KEY,
    theatre_id VARCHAR(50) NOT NULL,
    screen_number INTEGER NOT NULL,
    screen_name VARCHAR(100),
    screen_type ENUM('2D', '3D', '4DX', 'IMAX', 'DOLBY_ATMOS', 'RGB_LASER') DEFAULT '2D',
    total_seats INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats_per_row INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (theatre_id) REFERENCES theatres(id) ON DELETE CASCADE,
    UNIQUE KEY unique_screen_per_theatre (theatre_id, screen_number)
);

-- ============================================================================
-- SEAT MANAGEMENT
-- ============================================================================

CREATE TABLE seat_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- 'Premium', 'Gold', 'Silver', 'Economy'
    description TEXT,
    color_code VARCHAR(7), -- Hex color code
    base_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seats (
    id VARCHAR(50) PRIMARY KEY,
    screen_id VARCHAR(50) NOT NULL,
    seat_row VARCHAR(5) NOT NULL, -- A, B, C, etc.
    seat_number INTEGER NOT NULL,
    seat_category_id VARCHAR(50) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_category_id) REFERENCES seat_categories(id),
    UNIQUE KEY unique_seat_per_screen (screen_id, seat_row, seat_number)
);

-- ============================================================================
-- MOVIE MANAGEMENT
-- ============================================================================

CREATE TABLE genres (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE languages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(5) NOT NULL UNIQUE, -- 'en', 'hi', 'ta', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- Duration in minutes
    release_date DATE NOT NULL,
    certification ENUM('U', 'UA', 'A', 'S') NOT NULL,
    rating DECIMAL(3, 1) DEFAULT 0, -- Out of 10
    votes INTEGER DEFAULT 0,
    poster_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    trailer_url VARCHAR(500),
    director VARCHAR(100),
    producer VARCHAR(100),
    music_director VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE movie_genres (
    movie_id VARCHAR(50),
    genre_id VARCHAR(50),
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE movie_languages (
    movie_id VARCHAR(50),
    language_id VARCHAR(50),
    PRIMARY KEY (movie_id, language_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
);

CREATE TABLE cast_crew (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('ACTOR', 'ACTRESS', 'DIRECTOR', 'PRODUCER', 'MUSIC_DIRECTOR', 'CINEMATOGRAPHER', 'EDITOR') NOT NULL,
    image_url VARCHAR(500),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie_cast_crew (
    movie_id VARCHAR(50),
    person_id VARCHAR(50),
    character_name VARCHAR(100), -- For actors/actresses
    PRIMARY KEY (movie_id, person_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES cast_crew(id) ON DELETE CASCADE
);

-- ============================================================================
-- TIME SLOT & SHOW MANAGEMENT
-- ============================================================================

CREATE TABLE time_slots (
    id VARCHAR(50) PRIMARY KEY,
    screen_id VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_name VARCHAR(50), -- 'Morning', 'Afternoon', 'Evening', 'Night'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (screen_id) REFERENCES screens(id) ON DELETE CASCADE
);

CREATE TABLE shows (
    id VARCHAR(50) PRIMARY KEY,
    movie_id VARCHAR(50) NOT NULL,
    screen_id VARCHAR(50) NOT NULL,
    time_slot_id VARCHAR(50) NOT NULL,
    language_id VARCHAR(50) NOT NULL,
    show_date DATE NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    booking_open_time TIMESTAMP NOT NULL,
    booking_close_time TIMESTAMP NOT NULL,
    is_housefull BOOLEAN DEFAULT FALSE,
    is_cancelled BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (screen_id) REFERENCES screens(id),
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id),
    FOREIGN KEY (language_id) REFERENCES languages(id),
    UNIQUE KEY unique_show_per_slot (screen_id, time_slot_id, show_date)
);

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    password_hash VARCHAR(255) NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_addresses (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    address_line1 VARCHAR(200) NOT NULL,
    address_line2 VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- BOOKING & PAYMENT MANAGEMENT
-- ============================================================================

CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    show_id VARCHAR(50) NOT NULL,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    total_seats INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    convenience_fee DECIMAL(10, 2) DEFAULT 0,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    booking_status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    payment_status ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancellation_time TIMESTAMP NULL,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (show_id) REFERENCES shows(id)
);

CREATE TABLE booked_seats (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    seat_id VARCHAR(50) NOT NULL,
    seat_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE KEY unique_seat_per_booking (booking_id, seat_id)
);

CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    payment_method ENUM('CARD', 'UPI', 'NETBANKING', 'WALLET') NOT NULL,
    payment_gateway VARCHAR(50), -- 'razorpay', 'paytm', 'stripe'
    gateway_transaction_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refund_time TIMESTAMP NULL,
    refund_amount DECIMAL(10, 2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- ============================================================================
-- ADDITIONAL FEATURES
-- ============================================================================

-- User Favorites
CREATE TABLE user_favorite_movies (
    user_id VARCHAR(50),
    movie_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

CREATE TABLE user_favorite_theatres (
    user_id VARCHAR(50),
    theatre_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, theatre_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (theatre_id) REFERENCES theatres(id) ON DELETE CASCADE
);

-- Reviews & Ratings
CREATE TABLE movie_reviews (
    id VARCHAR(50) PRIMARY KEY,
    movie_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    review_text TEXT,
    is_spoiler BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    is_verified_booking BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review_per_user_movie (user_id, movie_id)
);

-- Notifications
CREATE TABLE notifications (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('BOOKING_CONFIRMATION', 'BOOKING_CANCELLATION', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'SHOW_CANCELLED', 'PROMOTIONAL') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    booking_id VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- Coupons & Offers
CREATE TABLE coupons (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    discount_type ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    minimum_amount DECIMAL(10, 2) DEFAULT 0,
    maximum_discount DECIMAL(10, 2) NULL,
    usage_limit INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_coupon_usage (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    coupon_id VARCHAR(50) NOT NULL,
    booking_id VARCHAR(50) NOT NULL,
    discount_applied DECIMAL(10, 2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Location & Theatre indexes
CREATE INDEX idx_theatres_location ON theatres(location_id);
CREATE INDEX idx_screens_theatre ON screens(theatre_id);
CREATE INDEX idx_seats_screen ON seats(screen_id);

-- Movie indexes
CREATE INDEX idx_movies_release_date ON movies(release_date);
CREATE INDEX idx_movies_rating ON movies(rating);
CREATE INDEX idx_movie_genres_movie ON movie_genres(movie_id);
CREATE INDEX idx_movie_languages_movie ON movie_languages(movie_id);

-- Show indexes
CREATE INDEX idx_shows_movie ON shows(movie_id);
CREATE INDEX idx_shows_screen ON shows(screen_id);
CREATE INDEX idx_shows_date ON shows(show_date);
CREATE INDEX idx_shows_movie_date ON shows(movie_id, show_date);
CREATE INDEX idx_time_slots_screen ON time_slots(screen_id);

-- Booking indexes
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_show ON bookings(show_id);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_booked_seats_booking ON booked_seats(booking_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- ============================================================================
-- SAMPLE DATA INSERTION
-- ============================================================================

-- Insert sample locations
INSERT INTO locations (id, city, state, country, pincode) VALUES
('LOC001', 'Coimbatore', 'Tamil Nadu', 'India', '641001'),
('LOC002', 'Chennai', 'Tamil Nadu', 'India', '600001'),
('LOC003', 'Bangalore', 'Karnataka', 'India', '560001');

-- Insert sample seat categories
INSERT INTO seat_categories (id, name, description, color_code, base_price) VALUES
('CAT001', 'Premium', 'Premium seats with extra legroom', '#FFD700', 250.00),
('CAT002', 'Gold', 'Gold category seats', '#FFA500', 200.00),
('CAT003', 'Silver', 'Silver category seats', '#C0C0C0', 150.00),
('CAT004', 'Economy', 'Economy seats', '#808080', 100.00);

-- Insert sample genres
INSERT INTO genres (id, name, description) VALUES
('GEN001', 'Action', 'Action-packed movies with thrills'),
('GEN002', 'Comedy', 'Light-hearted comedy movies'),
('GEN003', 'Drama', 'Dramatic storylines and characters'),
('GEN004', 'Thriller', 'Suspenseful and thrilling movies'),
('GEN005', 'Romance', 'Romantic storylines');

-- Insert sample languages
INSERT INTO languages (id, name, code) VALUES
('LANG001', 'English', 'en'),
('LANG002', 'Hindi', 'hi'),
('LANG003', 'Tamil', 'ta'),
('LANG004', 'Telugu', 'te'),
('LANG005', 'Kannada', 'kn');
