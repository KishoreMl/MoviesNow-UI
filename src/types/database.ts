// Database Schema Type Definitions for Movie Ticket Booking System

// ============================================================================
// LOCATION & THEATRE TYPES
// ============================================================================

export interface Location {
    id: string;
    city: string;
    state: string;
    country: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Theatre {
    id: string;
    name: string;
    location_id: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    total_screens: number;
    parking_available: boolean;
    food_court: boolean;
    wheelchair_accessible: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    location?: Location; // Populated via JOIN
}

export type ScreenType = '2D' | '3D' | '4DX' | 'IMAX' | 'DOLBY_ATMOS' | 'RGB_LASER';

export interface Screen {
    id: string;
    theatre_id: string;
    screen_number: number;
    screen_name?: string;
    screen_type: ScreenType;
    total_seats: number;
    rows: number;
    seats_per_row: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    theatre?: Theatre; // Populated via JOIN
}

// ============================================================================
// SEAT MANAGEMENT TYPES
// ============================================================================

export interface SeatCategory {
    id: string;
    name: string; // 'Premium', 'Gold', 'Silver', 'Economy'
    description?: string;
    color_code?: string;
    base_price: number;
    created_at: string;
}

export interface Seat {
    id: string;
    screen_id: string;
    seat_row: string; // A, B, C, etc.
    seat_number: number;
    seat_category_id: string;
    is_available: boolean;
    created_at: string;
    screen?: Screen;
    category?: SeatCategory;
}

// ============================================================================
// MOVIE MANAGEMENT TYPES
// ============================================================================

export interface Genre {
    id: string;
    name: string;
    description?: string;
    created_at: string;
}

export interface Language {
    id: string;
    name: string;
    code: string; // 'en', 'hi', 'ta', etc.
    created_at: string;
}

export type Certification = 'U' | 'UA' | 'A' | 'S';

export interface Movie {
    id: string;
    title: string;
    description?: string;
    duration: number; // Duration in minutes
    release_date: string;
    certification: Certification;
    rating: number; // Out of 10
    votes: number;
    poster_url?: string;
    cover_image_url?: string;
    trailer_url?: string;
    director?: string;
    producer?: string;
    music_director?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    genres?: Genre[]; // Populated via JOIN
    languages?: Language[]; // Populated via JOIN
    cast_crew?: CastCrewMember[]; // Populated via JOIN
}

export type CastCrewRole = 'ACTOR' | 'ACTRESS' | 'DIRECTOR' | 'PRODUCER' | 'MUSIC_DIRECTOR' | 'CINEMATOGRAPHER' | 'EDITOR';

export interface CastCrewPerson {
    id: string;
    name: string;
    role: CastCrewRole;
    image_url?: string;
    biography?: string;
    created_at: string;
}

export interface CastCrewMember extends CastCrewPerson {
    character_name?: string; // For actors/actresses
}

// ============================================================================
// TIME SLOT & SHOW TYPES
// ============================================================================

export interface TimeSlot {
    id: string;
    screen_id: string;
    start_time: string; // HH:MM format
    end_time: string; // HH:MM format
    slot_name?: string; // 'Morning', 'Afternoon', 'Evening', 'Night'
    is_active: boolean;
    created_at: string;
    screen?: Screen;
}

export interface Show {
    id: string;
    movie_id: string;
    screen_id: string;
    time_slot_id: string;
    language_id: string;
    show_date: string; // YYYY-MM-DD format
    base_price: number;
    booking_open_time: string;
    booking_close_time: string;
    is_housefull: boolean;
    is_cancelled: boolean;
    cancellation_reason?: string;
    created_at: string;
    updated_at: string;
    movie?: Movie;
    screen?: Screen;
    time_slot?: TimeSlot;
    language?: Language;
    available_seats?: number; // Calculated field
}

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface User {
    id: string;
    email: string;
    phone?: string;
    first_name: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: Gender;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    is_active: boolean;
    last_login?: string;
    created_at: string;
    updated_at: string;
}

export interface UserAddress {
    id: string;
    user_id: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
    created_at: string;
}

// ============================================================================
// BOOKING & PAYMENT TYPES
// ============================================================================

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CARD' | 'UPI' | 'NETBANKING' | 'WALLET';

export interface Booking {
    id: string;
    user_id: string;
    show_id: string;
    booking_reference: string;
    total_seats: number;
    total_amount: number;
    convenience_fee: number;
    tax_amount: number;
    discount_amount: number;
    final_amount: number;
    booking_status: BookingStatus;
    payment_status: PaymentStatus;
    booking_time: string;
    cancellation_time?: string;
    cancellation_reason?: string;
    created_at: string;
    updated_at: string;
    user?: User;
    show?: Show;
    booked_seats?: BookedSeat[];
    payments?: Payment[];
}

export interface BookedSeat {
    id: string;
    booking_id: string;
    seat_id: string;
    seat_price: number;
    created_at: string;
    seat?: Seat;
}

export interface Payment {
    id: string;
    booking_id: string;
    payment_method: PaymentMethod;
    payment_gateway?: string;
    gateway_transaction_id?: string;
    amount: number;
    payment_status: PaymentStatus;
    payment_time: string;
    refund_time?: string;
    refund_amount?: number;
    created_at: string;
}

// ============================================================================
// ADDITIONAL FEATURE TYPES
// ============================================================================

export interface MovieReview {
    id: string;
    movie_id: string;
    user_id: string;
    rating: number; // 1-10
    review_text?: string;
    is_spoiler: boolean;
    likes: number;
    dislikes: number;
    is_verified_booking: boolean;
    created_at: string;
    user?: User;
    movie?: Movie;
}

export type NotificationType = 
    | 'BOOKING_CONFIRMATION' 
    | 'BOOKING_CANCELLATION' 
    | 'PAYMENT_SUCCESS' 
    | 'PAYMENT_FAILED' 
    | 'SHOW_CANCELLED' 
    | 'PROMOTIONAL';

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: NotificationType;
    is_read: boolean;
    booking_id?: string;
    created_at: string;
}

export type DiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface Coupon {
    id: string;
    code: string;
    title: string;
    description?: string;
    discount_type: DiscountType;
    discount_value: number;
    minimum_amount: number;
    maximum_discount?: number;
    usage_limit: number;
    used_count: number;
    valid_from: string;
    valid_until: string;
    is_active: boolean;
    created_at: string;
}

export interface UserCouponUsage {
    id: string;
    user_id: string;
    coupon_id: string;
    booking_id: string;
    discount_applied: number;
    used_at: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: {
        current_page: number;
        total_pages: number;
        total_items: number;
        items_per_page: number;
    };
}

// ============================================================================
// FRONTEND SPECIFIC TYPES
// ============================================================================

export interface TheatreShow {
    theatre: Theatre;
    shows: Show[];
}

export interface MovieShowTimes {
    movie: Movie;
    show_date: string;
    theatre_shows: TheatreShow[];
}

export interface SeatLayout {
    screen: Screen;
    seat_categories: SeatCategory[];
    seats: Seat[][];
    blocked_seats: string[]; // Array of seat IDs
}

export interface BookingSummary {
    show: Show;
    selected_seats: Seat[];
    pricing_breakdown: {
        base_amount: number;
        convenience_fee: number;
        tax_amount: number;
        discount_amount: number;
        final_amount: number;
    };
    coupon?: Coupon;
}

export interface SearchFilters {
    location_id?: string;
    movie_id?: string;
    date?: string;
    language_ids?: string[];
    genre_ids?: string[];
    screen_types?: ScreenType[];
    time_range?: {
        start: string;
        end: string;
    };
    price_range?: {
        min: number;
        max: number;
    };
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LoginForm {
    email: string;
    password: string;
}

export interface SignupForm {
    email: string;
    phone?: string;
    first_name: string;
    last_name?: string;
    password: string;
    confirm_password: string;
}

export interface BookingForm {
    show_id: string;
    seat_ids: string[];
    coupon_code?: string;
    payment_method: PaymentMethod;
}

export interface ReviewForm {
    movie_id: string;
    rating: number;
    review_text?: string;
    is_spoiler: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type SeatStatus = 'AVAILABLE' | 'BOOKED' | 'SELECTED' | 'BLOCKED';

export interface SeatWithStatus extends Seat {
    status: SeatStatus;
}

export type EntityId = string;
export type Timestamp = string;
export type DateString = string;
export type TimeString = string;
