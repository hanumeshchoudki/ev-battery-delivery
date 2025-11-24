# EV Battery Delivery Platform - ನಮ್ಮ Charge

Revolutionary EV battery delivery and charging service platform built with Next.js 14, Supabase, and TypeScript.

## Features

- 🔋 Real-time battery delivery ordering
- 📍 Location-based service matching
- 👤 User authentication with Supabase Auth
- 🚗 Vehicle management
- 📊 Order tracking and status updates
- 💳 Payment integration ready
- 🗺️ PostGIS-powered geolocation services
- ⚡ Provider matching with proximity search

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Maps**: Leaflet, React Leaflet
- **Notifications**: Sonner
- **Forms**: React Hook Form, Zod

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hanumeshchoudki/ev-battery-delivery.git
cd ev-battery-delivery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the Supabase database

**Note:** Supabase credentials are already configured in the code. No `.env.local` file needed!

1. Go to the [Supabase SQL Editor](https://supabase.com/dashboard/project/rcevzdmkflhazjiprcjy/sql)
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the schema

#### Alternative: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

### 4. Verify database setup

After running the schema, verify that the following tables were created:

- `users` - User profiles and authentication
- `vehicles` - Customer and business vehicles
- `provider_profiles` - Service provider information
- `orders` - Order management
- `order_tracking` - Real-time order tracking
- `payment_transactions` - Payment records

### 5. Enable PostGIS extension (if not already enabled)

In the Supabase SQL Editor, run:

```sql
CREATE EXTENSION IF NOT EXISTS "postgis";
```

### 6. Configure Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable **Email** provider
3. Configure email templates (optional)
4. Set up redirect URLs:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/**`

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema Overview

### Users Table
Stores user information including customers, providers, and admins.

### Vehicles Table
Manages customer and business vehicles with battery specifications.

### Orders Table
Handles all order lifecycle from placement to completion, including:
- Service type (instant/scheduled)
- Pricing details
- Status tracking
- Payment information
- Ratings and feedback

### Provider Profiles Table
Stores provider-specific data:
- Vehicle information
- Verification status
- Earnings and ratings
- Real-time location
- Online status

### Key Features

#### Geolocation
- Uses PostGIS for precise location-based queries
- `get_nearby_providers()` function finds available providers within a radius
- Spatial indexing for optimal performance

#### Row Level Security (RLS)
- Users can only access their own data
- Providers can only see orders assigned to them
- Admins have full access

#### Triggers
- Auto-update `updated_at` timestamps
- Maintains data integrity

## API Usage Examples

### Authentication

```typescript
import { supabase } from '@/lib/supabase'

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
  options: {
    data: {
      full_name: 'John Doe',
      phone: '+919876543210'
    }
  }
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
})
```

### Create an Order

```typescript
import { supabaseHelpers } from '@/lib/supabase'

const order = await supabaseHelpers.createOrder({
  order_number: 'ORD-' + Date.now(),
  customer_id: userId,
  vehicle_id: vehicleId,
  service_type: 'instant',
  charge_level: '20-40%',
  service_address: {
    address: '123 Main St, Bangalore',
    lat: 12.9716,
    lng: 77.5946
  },
  base_price: 500,
  tax_amount: 90,
  total_price: 590
})
```

### Find Nearby Providers

```typescript
const providers = await supabaseHelpers.getNearbyProviders(
  12.9716,  // latitude
  77.5946,  // longitude
  10        // radius in km
)
```

## Project Structure

```
ev-battery-delivery/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── order/page.tsx
│   ├── tracking/[orderId]/page.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── order-flow.tsx         # Order creation flow
│   ├── battery-selection.tsx
│   ├── location-input.tsx
│   └── ...
├── lib/
│   ├── supabase.ts           # Supabase client & helpers
│   ├── geocoding.ts          # Location services
│   └── utils.ts
├── public/
└── supabase-schema.sql       # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy (credentials are already in the code)

### Other Platforms

Make sure to:
1. Configure build command: `npm run build`
2. Set output directory: `.next`
3. Enable Node.js runtime

## Security Considerations

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- The public anon key is safe to expose (it's client-side only)
- Supabase handles password hashing and authentication
- All sensitive operations require authenticated users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@nammacharge.com or open an issue in the repository.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
