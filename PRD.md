# Product Requirements Document (PRD)
## ನಮ್ಮ Charge - EV Battery Delivery Platform

**Version:** 1.0  
**Date:** November 14, 2025  
**Status:** Draft

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Product Vision & Goals](#product-vision--goals)
3. [User Personas](#user-personas)
4. [Feature Requirements](#feature-requirements)
5. [User Flows](#user-flows)
6. [Database Schema](#database-schema)
7. [Technical Architecture](#technical-architecture)
8. [API Endpoints](#api-endpoints)
9. [Authentication & Authorization](#authentication--authorization)
10. [Real-time Features](#real-time-features)
11. [Payment Integration](#payment-integration)
12. [Admin Dashboard](#admin-dashboard)
13. [Mobile Responsiveness](#mobile-responsiveness)
14. [Security & Compliance](#security--compliance)
15. [Performance Requirements](#performance-requirements)
16. [Success Metrics](#success-metrics)
17. [Implementation Phases](#implementation-phases)

---

## 1. Executive Summary

**ನಮ್ಮ Charge** is an on-demand EV battery charging and delivery service platform that connects EV owners with certified charging technicians. The platform enables users to:
- Book instant or scheduled charging services
- Track service providers in real-time
- Manage fleet charging for businesses
- Earn money as service providers/drivers

This PRD outlines the functional requirements to transform the current static Next.js website into a fully operational platform using **Supabase** as the backend database and real-time engine.

---

## 2. Product Vision & Goals

### Vision
To become the leading on-demand EV charging service platform in India, making EV ownership more convenient and accessible.

### Primary Goals
1. **Customer Satisfaction**: Provide reliable, fast charging services with 95%+ satisfaction rate
2. **Platform Growth**: Onboard 1000+ service providers in the first 6 months
3. **Scalability**: Handle 10,000+ concurrent orders across multiple cities
4. **Revenue**: Generate ₹50 lakh+ monthly revenue by month 12

### Success Metrics
- Average response time: < 5 minutes
- Service completion rate: > 90%
- Average rating: > 4.5 stars
- User retention: > 60% monthly

---

## 3. User Personas

### 3.1 Customer (EV Owner)
- **Demographics**: 25-45 years, urban professionals, early tech adopters
- **Needs**: Quick, reliable charging when battery is low, emergency support
- **Pain Points**: Limited charging infrastructure, time-consuming trips to charging stations
- **Goals**: Get charged quickly without leaving home/office

### 3.2 Service Provider (Driver/Technician)
- **Demographics**: 21-50 years, owns vehicle, looking for flexible income
- **Needs**: Steady income, flexible working hours, low barriers to entry
- **Pain Points**: Finding consistent gig work, payment delays
- **Goals**: Maximize earnings, build reputation, get more orders

### 3.3 Business Fleet Manager
- **Demographics**: Corporate decision-makers, logistics managers
- **Needs**: Bulk charging services, predictable costs, SLA guarantees
- **Pain Points**: Managing multiple vehicles, downtime costs
- **Goals**: Minimize operational costs, ensure vehicle availability

### 3.4 Platform Admin
- **Demographics**: Operations team, customer support
- **Needs**: Monitor platform health, resolve disputes, manage providers
- **Pain Points**: Manual data entry, poor visibility into operations
- **Goals**: Efficient operations, quick issue resolution

---

## 4. Feature Requirements

### 4.1 Customer Features (Priority: P0 - Critical)

#### Order Placement
- **Location Input**: GPS-based location detection + manual address entry
- **Battery Selection**: Choose from vehicle type, current battery %, desired charge %
- **Service Type**: 
  - Instant (ASAP)
  - Scheduled (select date/time)
  - Recurring (weekly/monthly subscription)
- **Pricing Display**: Real-time price calculation based on service type, location, time
- **Payment Options**: UPI, Credit/Debit cards, Wallets, Cash on Delivery

#### Order Tracking
- **Real-time Map**: Live location of service provider
- **ETA Updates**: Dynamic arrival time estimation
- **Status Updates**: SMS/Push notifications at each stage
- **Provider Info**: Name, photo, rating, vehicle details, contact
- **Battery Monitoring**: Display current battery % during service

#### Order History
- **Past Orders**: List all completed orders with details
- **Receipts**: Downloadable invoices
- **Re-order**: Quick re-book previous service
- **Support**: Request help for past orders

#### Account Management
- **Profile**: Name, phone, email, photo, saved addresses
- **Saved Vehicles**: Multiple EV profiles (make, model, battery specs)
- **Payment Methods**: Save cards, UPI IDs
- **Preferences**: Default service type, notification settings

### 4.2 Service Provider Features (Priority: P0 - Critical)

#### Onboarding
- **Application Form**: Personal details, documents upload
- **Document Verification**: License, vehicle RC, Aadhaar, PAN
- **Background Check**: Integration with verification service
- **Training Module**: Safety protocols, app usage, customer service
- **Equipment Setup**: Charging equipment procurement/rental

#### Order Management
- **Order Notifications**: Real-time order alerts with sound
- **Accept/Reject**: 30-second window to accept orders
- **Navigation**: Integrated Google Maps for directions
- **Status Updates**: Mark stages (En Route, Arrived, In Progress, Completed)
- **Photo Upload**: Before/after charging photos

#### Earnings Dashboard
- **Today's Earnings**: Real-time earnings tracker
- **Weekly/Monthly Stats**: Total earnings, completed orders, ratings
- **Payout Schedule**: Weekly automatic transfers to bank account
- **Transaction History**: Detailed breakdown of each order payment

#### Availability Management
- **Online/Offline Toggle**: Control when to receive orders
- **Service Areas**: Define preferred coverage zones
- **Schedule**: Set working hours, breaks

### 4.3 Business Features (Priority: P1 - Important)

#### Fleet Management
- **Bulk Ordering**: Create orders for multiple vehicles
- **Dedicated Account Manager**: Assigned relationship manager
- **Custom Pricing**: Negotiate volume discounts
- **SLA Agreements**: Guaranteed response times

#### Analytics
- **Vehicle Utilization**: Track charging frequency per vehicle
- **Cost Analysis**: Monthly spending reports
- **Provider Performance**: Ratings and feedback for assigned providers

#### Billing
- **Consolidated Invoices**: Monthly billing with GST
- **Credit Terms**: Net 30/60 payment terms
- **Purchase Orders**: PO-based ordering system

### 4.4 Admin Features (Priority: P0 - Critical)

#### Dashboard
- **Real-time Metrics**: Active orders, online providers, revenue
- **Order Management**: View, modify, cancel orders
- **Provider Management**: Approve, suspend, track providers
- **Customer Support**: Handle disputes, refunds, complaints

#### Analytics & Reporting
- **Revenue Reports**: Daily/weekly/monthly trends
- **Provider Performance**: Ratings, completion rates, earnings
- **Customer Insights**: Retention, churn, satisfaction scores
- **Geographic Analysis**: Heatmaps of demand, service coverage

#### Configuration
- **Pricing Rules**: Set base rates, surge pricing, discounts
- **Service Areas**: Enable/disable cities, zones
- **Promotions**: Create coupon codes, referral programs
- **Notifications**: Broadcast announcements to users

---

## 5. User Flows

### 5.1 Customer Order Flow
```
1. Customer opens app/website
2. Enters/confirms location
3. Selects vehicle from saved list OR adds new vehicle
4. Chooses service type (Instant/Scheduled)
5. Selects charge level (50%/80%/100%)
6. Reviews pricing breakdown
7. Selects payment method
8. Confirms order
9. System finds nearest available provider
10. Provider accepts order
11. Customer receives provider details
12. Real-time tracking begins
13. Provider arrives, verifies details
14. Charging begins (status updates sent)
15. Charging completes
16. Payment processed
17. Customer rates provider
18. Receipt sent via email/SMS
```

### 5.2 Provider Onboarding Flow
```
1. Visit /drive page, click "Start Driving"
2. Fill application form (personal info)
3. Upload documents (license, RC, Aadhaar, PAN, photo)
4. Submit application
5. Admin reviews documents (24-48 hours)
6. Background verification initiated
7. Approval notification sent
8. Complete online training module
9. Equipment onboarding (purchase/rental)
10. Account activated
11. Download mobile app
12. Go online, start receiving orders
```

### 5.3 Order Matching Algorithm
```
1. Customer places order
2. System identifies service area
3. Queries all online providers within 5km radius
4. Filters by:
   - Current availability
   - Rating > 4.0
   - Completed orders > 10
   - Equipment compatibility
5. Sorts by:
   - Distance (closest first)
   - Rating (highest first)
   - Response time (fastest first)
6. Sends order to top 3 providers simultaneously
7. First to accept gets the order
8. Others receive cancellation notification
9. If no acceptance within 30 seconds, expand radius to 10km
10. Repeat until match found or notify customer of no availability
```

---

## 6. Database Schema

### 6.1 Supabase Tables

#### **users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'provider', 'admin', 'business')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
```

#### **customer_profiles**
```sql
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  default_address JSONB, -- {line1, line2, city, state, pincode, lat, lng}
  saved_addresses JSONB[], -- Array of address objects
  preferred_payment_method TEXT,
  total_orders INTEGER DEFAULT 0,
  lifetime_value DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customer_user ON customer_profiles(user_id);
```

#### **provider_profiles**
```sql
CREATE TABLE provider_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type TEXT NOT NULL,
  vehicle_number TEXT NOT NULL,
  vehicle_model TEXT,
  license_number TEXT NOT NULL,
  license_expiry DATE NOT NULL,
  aadhaar_number TEXT NOT NULL,
  pan_number TEXT NOT NULL,
  
  -- Documents (stored in Supabase Storage)
  license_image_url TEXT,
  vehicle_rc_url TEXT,
  aadhaar_image_url TEXT,
  pan_image_url TEXT,
  profile_photo_url TEXT,
  
  -- Verification
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'suspended')),
  verified_at TIMESTAMPTZ,
  background_check_status TEXT,
  
  -- Performance metrics
  total_orders INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  cancelled_orders INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  
  -- Availability
  is_online BOOLEAN DEFAULT FALSE,
  current_location GEOGRAPHY(POINT),
  service_areas TEXT[], -- Array of city/zone codes
  
  -- Banking
  bank_account_number TEXT,
  ifsc_code TEXT,
  account_holder_name TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_provider_user ON provider_profiles(user_id);
CREATE INDEX idx_provider_status ON provider_profiles(verification_status);
CREATE INDEX idx_provider_online ON provider_profiles(is_online);
CREATE INDEX idx_provider_location ON provider_profiles USING GIST(current_location);
```

#### **business_profiles**
```sql
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  gstin TEXT NOT NULL UNIQUE,
  pan_number TEXT NOT NULL,
  business_type TEXT,
  fleet_size INTEGER DEFAULT 0,
  
  -- Documents
  gst_certificate_url TEXT,
  pan_card_url TEXT,
  business_registration_url TEXT,
  
  -- Billing
  billing_address JSONB,
  credit_terms TEXT, -- 'immediate', 'net_30', 'net_60'
  credit_limit DECIMAL(10, 2),
  
  -- Account management
  account_manager_id UUID REFERENCES users(id),
  pricing_tier TEXT DEFAULT 'standard', -- 'standard', 'premium', 'enterprise'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_business_user ON business_profiles(user_id);
CREATE INDEX idx_business_gstin ON business_profiles(gstin);
```

#### **vehicles**
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  owner_type TEXT CHECK (owner_type IN ('customer', 'business')),
  
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  registration_number TEXT,
  
  -- Battery specifications
  battery_type TEXT NOT NULL,
  battery_capacity_kwh DECIMAL(5, 2),
  charging_port_type TEXT, -- 'Type 1', 'Type 2', 'CCS', 'CHAdeMO'
  
  -- Status
  is_primary BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vehicles_owner ON vehicles(owner_id);
CREATE INDEX idx_vehicles_type ON vehicles(owner_type);
```

#### **orders**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- e.g., 'ORD-2024-001234'
  
  -- Parties
  customer_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id),
  vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
  
  -- Service details
  service_type TEXT NOT NULL CHECK (service_type IN ('instant', 'scheduled')),
  scheduled_time TIMESTAMPTZ,
  charge_level TEXT NOT NULL, -- '50%', '80%', '100%'
  
  -- Location
  service_address JSONB NOT NULL, -- Full address object
  service_location GEOGRAPHY(POINT) NOT NULL,
  
  -- Pricing
  base_price DECIMAL(10, 2) NOT NULL,
  surge_multiplier DECIMAL(3, 2) DEFAULT 1.0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN 
    ('pending', 'searching_provider', 'provider_assigned', 'provider_en_route', 
     'provider_arrived', 'in_progress', 'completed', 'cancelled', 'failed')),
  
  -- Timestamps
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Completion details
  initial_battery_percent INTEGER,
  final_battery_percent INTEGER,
  actual_charge_time_minutes INTEGER,
  before_photo_url TEXT,
  after_photo_url TEXT,
  
  -- Payment
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  
  -- Ratings & feedback
  customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
  customer_feedback TEXT,
  provider_rating INTEGER CHECK (provider_rating >= 1 AND provider_rating <= 5),
  provider_feedback TEXT,
  
  -- Cancellation
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_provider ON orders(provider_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_placed ON orders(placed_at);
CREATE INDEX idx_orders_location ON orders USING GIST(service_location);
CREATE INDEX idx_orders_number ON orders(order_number);
```

#### **order_status_history**
```sql
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_status_order ON order_status_history(order_id);
CREATE INDEX idx_order_status_created ON order_status_history(created_at);
```

#### **payments**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id),
  
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  
  payment_method TEXT NOT NULL, -- 'upi', 'card', 'wallet', 'cash', 'business_credit'
  payment_gateway TEXT, -- 'razorpay', 'stripe', 'phonepe'
  gateway_transaction_id TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  
  -- Provider payout
  provider_payout_amount DECIMAL(10, 2),
  provider_payout_status TEXT DEFAULT 'pending',
  provider_payout_date TIMESTAMPTZ,
  
  -- Platform fees
  platform_fee DECIMAL(10, 2),
  gst_amount DECIMAL(10, 2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_provider ON payments(provider_id);
CREATE INDEX idx_payments_status ON payments(status);
```

#### **ratings**
```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE,
  
  -- Customer rating for provider
  provider_rating INTEGER CHECK (provider_rating >= 1 AND provider_rating <= 5),
  provider_review TEXT,
  provider_rated_at TIMESTAMPTZ,
  
  -- Provider rating for customer
  customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
  customer_review TEXT,
  customer_rated_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ratings_order ON ratings(order_id);
```

#### **notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL, -- 'order_update', 'payment', 'promotional', 'system'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Delivery channels
  push_sent BOOLEAN DEFAULT FALSE,
  sms_sent BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  
  -- Interaction
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Related entities
  order_id UUID REFERENCES orders(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

#### **promo_codes**
```sql
CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount DECIMAL(10, 2),
  min_order_value DECIMAL(10, 2),
  
  usage_limit INTEGER, -- null = unlimited
  usage_count INTEGER DEFAULT 0,
  
  user_type TEXT, -- null = all users, or 'new', 'existing'
  
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_promo_code ON promo_codes(code);
CREATE INDEX idx_promo_active ON promo_codes(is_active);
```

#### **support_tickets**
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT UNIQUE NOT NULL,
  
  user_id UUID REFERENCES users(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  
  category TEXT NOT NULL, -- 'order_issue', 'payment', 'technical', 'general'
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  
  assigned_to UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tickets_user ON support_tickets(user_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);
CREATE INDEX idx_tickets_order ON support_tickets(order_id);
```

#### **support_messages**
```sql
CREATE TABLE support_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) NOT NULL,
  
  message TEXT NOT NULL,
  attachments TEXT[], -- Array of file URLs
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_support_messages_ticket ON support_messages(ticket_id);
```

#### **analytics_events**
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'page_view', 'order_placed', 'search', etc.
  user_id UUID REFERENCES users(id),
  session_id TEXT,
  
  properties JSONB, -- Flexible event properties
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);
```

### 6.2 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
-- ... (enable for all tables)

-- Example policies

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Customers can view their orders
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (auth.uid() = customer_id);

-- Providers can view assigned orders
CREATE POLICY "Providers can view assigned orders" ON orders
  FOR SELECT USING (auth.uid() = provider_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'admin'
    )
  );
```

---

## 7. Technical Architecture

### 7.1 Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Context + Zustand (for complex state)
- **Forms**: React Hook Form + Zod validation
- **Maps**: Google Maps JavaScript API / Mapbox GL
- **Real-time**: Supabase Realtime subscriptions
- **Notifications**: React Toastify / Sonner
- **Analytics**: Vercel Analytics

### 7.2 Backend Stack
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage (for images, documents)
- **Edge Functions**: Supabase Edge Functions (Deno)
- **API**: RESTful API via Supabase Auto-generated APIs + Custom Edge Functions

### 7.3 Third-party Integrations
- **Payments**: Razorpay / Stripe
- **SMS**: Twilio / MSG91
- **Email**: Resend / SendGrid
- **Maps & Navigation**: Google Maps API
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Background Verification**: SpringVerify / AuthBridge
- **Analytics**: Google Analytics / Mixpanel

### 7.4 Infrastructure
- **Hosting**: Vercel (Frontend) + Supabase (Backend)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain with SSL
- **Monitoring**: Sentry (error tracking), LogRocket (session replay)
- **CI/CD**: GitHub Actions

---

## 8. API Endpoints

### 8.1 Supabase Auto-generated REST API
Supabase automatically generates RESTful endpoints for all tables:
```
GET    /rest/v1/orders
POST   /rest/v1/orders
PATCH  /rest/v1/orders?id=eq.{id}
DELETE /rest/v1/orders?id=eq.{id}
```

### 8.2 Custom Edge Functions

#### `/functions/create-order`
**Method**: POST  
**Auth**: Required  
**Purpose**: Create new order with validation and provider matching

**Request Body**:
```json
{
  "vehicle_id": "uuid",
  "service_type": "instant",
  "charge_level": "80%",
  "service_address": {},
  "service_location": {"lat": 12.34, "lng": 56.78},
  "scheduled_time": "ISO-8601 timestamp" // optional
}
```

**Response**:
```json
{
  "success": true,
  "order": {
    "id": "uuid",
    "order_number": "ORD-2024-001234",
    "status": "searching_provider",
    "total_price": 299
  }
}
```

#### `/functions/match-provider`
**Method**: POST  
**Auth**: System (Internal)  
**Purpose**: Find and assign nearest available provider

**Logic**:
1. Get order location
2. Query online providers within radius
3. Filter by rating, availability, equipment
4. Sort by distance and rating
5. Send push notification to top 3 providers
6. First to accept gets assigned
7. Update order status

#### `/functions/update-provider-location`
**Method**: POST  
**Auth**: Required (Provider only)  
**Purpose**: Update provider's real-time location

**Request Body**:
```json
{
  "latitude": 12.34,
  "longitude": 56.78
}
```

#### `/functions/process-payment`
**Method**: POST  
**Auth**: Required  
**Purpose**: Process payment via payment gateway

**Request Body**:
```json
{
  "order_id": "uuid",
  "payment_method": "upi",
  "payment_details": {}
}
```

**Integration**:
- Razorpay SDK for payment processing
- Webhook handler for payment status updates
- Automatic refund handling

#### `/functions/calculate-pricing`
**Method**: POST  
**Auth**: Required  
**Purpose**: Calculate dynamic pricing based on demand, location, time

**Request Body**:
```json
{
  "service_type": "instant",
  "charge_level": "80%",
  "location": {"lat": 12.34, "lng": 56.78},
  "scheduled_time": null
}
```

**Response**:
```json
{
  "base_price": 299,
  "surge_multiplier": 1.2,
  "discount": 0,
  "tax": 53.82,
  "total_price": 358.82
}
```

#### `/functions/send-notification`
**Method**: POST  
**Auth**: System (Internal)  
**Purpose**: Send multi-channel notifications

**Channels**:
- Push (FCM)
- SMS (Twilio)
- Email (Resend)
- In-app (database entry)

#### `/functions/analytics-track`
**Method**: POST  
**Auth**: Optional  
**Purpose**: Track user events for analytics

#### `/functions/generate-invoice`
**Method**: GET  
**Auth**: Required  
**Purpose**: Generate PDF invoice for completed orders

---

## 9. Authentication & Authorization

### 9.1 Authentication Methods

#### Email/Password
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      full_name: 'John Doe',
      user_type: 'customer'
    }
  }
})
```

#### Phone OTP
```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+919876543210',
  options: {
    channel: 'sms'
  }
})
```

#### Social Login (Future)
- Google OAuth
- Apple Sign In

### 9.2 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Customer** | Create orders, view own orders, rate providers, manage profile |
| **Provider** | View assigned orders, update order status, update location, manage earnings |
| **Business** | Create bulk orders, view fleet analytics, manage vehicles, manage billing |
| **Admin** | Full access to all data, manage users, configure platform, view analytics |

### 9.3 Protected Routes

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session && request.nextUrl.pathname.startsWith('/order')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // Role-based access
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: user } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', session.user.id)
      .single()
    
    if (user.user_type !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
```

---

## 10. Real-time Features

### 10.1 Order Tracking

**Customer Side**:
```typescript
// Subscribe to order status updates
const orderSubscription = supabase
  .channel(`order:${orderId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'orders',
    filter: `id=eq.${orderId}`
  }, (payload) => {
    // Update UI with new order status
    setOrder(payload.new)
  })
  .subscribe()

// Subscribe to provider location updates
const locationSubscription = supabase
  .channel(`provider:${providerId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'provider_profiles',
    filter: `id=eq.${providerId}`
  }, (payload) => {
    // Update provider marker on map
    updateProviderMarker(payload.new.current_location)
  })
  .subscribe()
```

**Provider Side**:
```typescript
// Send location updates every 10 seconds
const locationInterval = setInterval(async () => {
  const position = await getCurrentPosition()
  
  await supabase
    .from('provider_profiles')
    .update({
      current_location: `POINT(${position.lng} ${position.lat})`
    })
    .eq('user_id', session.user.id)
}, 10000)
```

### 10.2 New Order Notifications (Providers)

```typescript
// Listen for new order assignments
const newOrderChannel = supabase
  .channel('new-orders')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'orders',
    filter: `provider_id=eq.${session.user.id}`
  }, (payload) => {
    // Play alert sound
    playNotificationSound()
    
    // Show order details modal
    showNewOrderModal(payload.new)
    
    // Auto-reject after 30 seconds
    setTimeout(() => {
      if (!acceptedOrders.has(payload.new.id)) {
        rejectOrder(payload.new.id)
      }
    }, 30000)
  })
  .subscribe()
```

### 10.3 Admin Dashboard Real-time Metrics

```typescript
// Subscribe to order events
const ordersChannel = supabase
  .channel('all-orders')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'orders'
  }, (payload) => {
    updateDashboardMetrics()
  })
  .subscribe()

// Subscribe to provider online status
const providersChannel = supabase
  .channel('providers-status')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'provider_profiles'
  }, (payload) => {
    updateOnlineProvidersCount()
  })
  .subscribe()
```

---

## 11. Payment Integration

### 11.1 Razorpay Integration

**Order Creation**:
```typescript
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const order = await razorpay.orders.create({
  amount: totalPrice * 100, // Amount in paise
  currency: 'INR',
  receipt: orderNumber,
  notes: {
    order_id: orderId,
    customer_id: customerId
  }
})
```

**Frontend Payment**:
```typescript
const handlePayment = async () => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: totalPrice * 100,
    currency: 'INR',
    name: 'ನಮ್ಮ Charge',
    description: `Order ${orderNumber}`,
    order_id: razorpayOrderId,
    handler: async (response) => {
      // Verify payment on server
      await fetch('/api/verify-payment', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
      })
    },
    prefill: {
      name: user.full_name,
      email: user.email,
      contact: user.phone
    }
  }
  
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}
```

**Webhook Handler**:
```typescript
// /api/razorpay-webhook
export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get('x-razorpay-signature')
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(payload, signature)
  
  if (isValid) {
    const event = JSON.parse(payload)
    
    if (event.event === 'payment.captured') {
      // Update payment status in database
      await supabase
        .from('payments')
        .update({
          status: 'completed',
          gateway_transaction_id: event.payload.payment.entity.id
        })
        .eq('order_id', event.payload.payment.entity.notes.order_id)
      
      // Update order status
      await supabase
        .from('orders')
        .update({ payment_status: 'completed' })
        .eq('id', event.payload.payment.entity.notes.order_id)
    }
  }
  
  return new Response('OK', { status: 200 })
}
```

### 11.2 Provider Payouts

**Weekly Automatic Payouts**:
```typescript
// Cron job: Every Monday at 9 AM
export async function processWeeklyPayouts() {
  // Get all providers with completed orders in past week
  const { data: providers } = await supabase
    .from('provider_profiles')
    .select(`
      *,
      payments (
        amount,
        provider_payout_amount,
        created_at
      )
    `)
    .eq('payments.status', 'completed')
    .eq('payments.provider_payout_status', 'pending')
    .gte('payments.created_at', lastWeekDate)
  
  for (const provider of providers) {
    const totalPayout = provider.payments.reduce(
      (sum, p) => sum + p.provider_payout_amount, 
      0
    )
    
    // Transfer via Razorpay Payouts API
    await razorpay.payouts.create({
      account_number: provider.bank_account_number,
      amount: totalPayout * 100,
      currency: 'INR',
      mode: 'IMPS',
      purpose: 'payout',
      fund_account_id: provider.razorpay_fund_account_id,
      queue_if_low_balance: true
    })
    
    // Update payout status
    await supabase
      .from('payments')
      .update({
        provider_payout_status: 'completed',
        provider_payout_date: new Date()
      })
      .in('id', provider.payments.map(p => p.id))
  }
}
```

---

## 12. Admin Dashboard

### 12.1 Key Metrics (Real-time)

**Dashboard Overview**:
- Total Orders (Today/Week/Month)
- Active Orders (In Progress)
- Online Providers
- Revenue (Today/Week/Month)
- Average Rating
- Customer Satisfaction %

**SQL Views for Analytics**:
```sql
CREATE VIEW admin_dashboard_metrics AS
SELECT
  (SELECT COUNT(*) FROM orders WHERE DATE(placed_at) = CURRENT_DATE) AS orders_today,
  (SELECT COUNT(*) FROM orders WHERE status IN ('provider_en_route', 'in_progress')) AS active_orders,
  (SELECT COUNT(*) FROM provider_profiles WHERE is_online = true) AS online_providers,
  (SELECT COALESCE(SUM(total_price), 0) FROM orders WHERE DATE(placed_at) = CURRENT_DATE AND status = 'completed') AS revenue_today,
  (SELECT COALESCE(AVG(customer_rating), 0) FROM orders WHERE customer_rating IS NOT NULL) AS avg_rating;
```

### 12.2 Order Management

**Features**:
- View all orders with filters (status, date, provider, customer)
- Real-time status updates
- Manual order assignment/reassignment
- Cancel orders with refund processing
- View order timeline/history
- Contact customer/provider
- Generate invoices

### 12.3 Provider Management

**Features**:
- Approve/reject provider applications
- View provider performance (rating, orders, earnings)
- Suspend/activate providers
- Assign training modules
- Manage payouts
- View provider location (if online)

### 12.4 Customer Support

**Features**:
- View support tickets
- Assign tickets to team members
- Internal notes
- Canned responses
- Ticket priority management
- Order refunds
- Promo code generation

---

## 13. Mobile Responsiveness

### 13.1 Responsive Design Requirements

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-First Components**:
- Hamburger navigation menu
- Touch-optimized buttons (min 44x44px)
- Swipeable order cards
- Bottom sheet modals for forms
- Sticky header/footer on scroll
- Pull-to-refresh for order list

### 13.2 Progressive Web App (PWA)

**Features**:
- Install to home screen
- Offline order history viewing
- Background sync for location updates
- Push notifications
- App-like navigation

**Implementation**:
```typescript
// next.config.mjs
import withPWA from 'next-pwa'

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})
```

---

## 14. Security & Compliance

### 14.1 Data Security

**Encryption**:
- TLS 1.3 for all data in transit
- AES-256 encryption for sensitive data at rest
- Encrypted backups

**PII Protection**:
- Mask phone numbers in logs
- Encrypt Aadhaar, PAN numbers
- GDPR-compliant data deletion

### 14.2 Authentication Security

**Password Requirements**:
- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number, 1 special character
- Argon2 hashing (via Supabase Auth)

**Session Management**:
- JWT tokens with 1-hour expiry
- Refresh tokens for 30-day sessions
- Automatic logout on suspicious activity

### 14.3 API Security

**Rate Limiting**:
```typescript
// 100 requests per minute per IP
const rateLimit = {
  windowMs: 60 * 1000,
  max: 100
}
```

**CORS**:
```typescript
const allowedOrigins = [
  'https://nammacharge.com',
  'https://www.nammacharge.com'
]
```

### 14.4 Compliance

**Indian Regulations**:
- IT Act 2000
- Payment gateway PCI DSS compliance
- GST invoice generation
- Data localization (server in India region)

---

## 15. Performance Requirements

### 15.1 Page Load Performance

**Targets**:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

**Optimization Strategies**:
- Next.js Image optimization
- Code splitting by route
- Lazy loading components
- CDN for static assets
- Gzip/Brotli compression

### 15.2 Database Performance

**Query Optimization**:
- Proper indexing on frequently queried columns
- Connection pooling (Supabase built-in)
- Prepared statements
- Caching frequent queries (Redis future)

### 15.3 Real-time Performance

**Targets**:
- Location update latency: < 2 seconds
- Order status update latency: < 1 second
- Max concurrent connections: 10,000+

---

## 16. Success Metrics

### 16.1 Customer Metrics
- **Acquisition**: 1,000 new users/month
- **Retention**: 60% monthly active users
- **Satisfaction**: 4.5+ average rating
- **Order Frequency**: 2+ orders/month per active user

### 16.2 Provider Metrics
- **Onboarding**: 50 new providers/month
- **Utilization**: 70%+ of providers with > 5 orders/week
- **Earnings**: ₹1,500+ average daily earnings
- **Retention**: 80% provider retention month-over-month

### 16.3 Platform Metrics
- **Response Time**: < 5 minutes average provider assignment
- **Completion Rate**: 90%+ orders completed
- **Uptime**: 99.9% platform availability
- **Revenue Growth**: 20% month-over-month

---

## 17. Implementation Phases

### Phase 1: MVP (Weeks 1-4)
**Goal**: Basic order flow working end-to-end

**Features**:
- ✅ Supabase setup (database, auth, storage)
- ✅ Customer registration/login
- ✅ Basic order placement (instant only)
- ✅ Manual provider assignment (admin)
- ✅ Order status updates
- ✅ Basic tracking page
- ✅ Cash payment only
- ✅ SMS notifications

**Deliverables**:
- Functional customer app
- Admin panel for order management
- Basic provider mobile interface

### Phase 2: Core Features (Weeks 5-8)
**Goal**: Automated provider matching, payments, ratings

**Features**:
- ✅ Automatic provider matching algorithm
- ✅ Real-time location tracking
- ✅ Razorpay payment integration
- ✅ Rating & review system
- ✅ Order history
- ✅ Provider earnings dashboard
- ✅ Email notifications
- ✅ Scheduled orders

**Deliverables**:
- Fully automated order flow
- Payment processing
- Provider app improvements

### Phase 3: Advanced Features (Weeks 9-12)
**Goal**: Business accounts, analytics, optimization

**Features**:
- ✅ Business account onboarding
- ✅ Fleet management
- ✅ Bulk ordering
- ✅ Advanced admin analytics
- ✅ Promo codes & discounts
- ✅ Support ticket system
- ✅ Dynamic pricing (surge)
- ✅ Push notifications

**Deliverables**:
- Business portal
- Enhanced admin dashboard
- Marketing features

### Phase 4: Scale & Polish (Weeks 13-16)
**Goal**: Performance optimization, mobile apps, expansion

**Features**:
- ✅ Performance optimization
- ✅ PWA improvements
- ✅ Native mobile apps (React Native/Flutter)
- ✅ Multi-city expansion
- ✅ Referral program
- ✅ Subscription plans
- ✅ Advanced analytics & reporting
- ✅ API for third-party integrations

**Deliverables**:
- Production-ready platform
- Mobile apps in stores
- Scalability for 10,000+ users

---

## Appendix A: Database Migration Scripts

```sql
-- Create all tables with proper relationships
-- See Section 6 for full schema

-- Sample data for testing
INSERT INTO users (email, phone, full_name, user_type) VALUES
  ('customer@test.com', '+919876543210', 'Test Customer', 'customer'),
  ('provider@test.com', '+919876543211', 'Test Provider', 'provider'),
  ('admin@test.com', '+919876543212', 'Admin User', 'admin');
```

## Appendix B: Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXX

# Twilio (SMS)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1xxxxxx

# SendGrid (Email)
SENDGRID_API_KEY=SG.xxxxx
FROM_EMAIL=noreply@nammacharge.com

# Firebase (Push Notifications)
FIREBASE_SERVER_KEY=xxxxx
```

## Appendix C: Deployment Checklist

- [ ] Setup Supabase project
- [ ] Configure database tables & RLS policies
- [ ] Setup Supabase Storage buckets
- [ ] Deploy Edge Functions
- [ ] Setup Razorpay account
- [ ] Configure SMS provider
- [ ] Configure email provider
- [ ] Setup Google Maps API
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Setup SSL certificates
- [ ] Configure monitoring (Sentry)
- [ ] Setup analytics
- [ ] Configure backup strategy
- [ ] Load testing
- [ ] Security audit

---

**Document Status**: Draft v1.0  
**Next Review**: After MVP completion  
**Owner**: Product Team  
**Contributors**: Engineering, Design, Operations

