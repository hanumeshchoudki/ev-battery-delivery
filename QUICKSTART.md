# Instant Charge - Quick Start Guide

## ⚡ Installation (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install @supabase/supabase-js bcryptjs helmet jsonwebtoken morgan
npm run dev
```

### Step 2: Install Frontend Dependencies

```bash
cd ..
npm install axios leaflet react-leaflet
npm install --save-dev @types/leaflet
```

### Step 3: Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run `backend/database/schema.sql`
4. Copy your project URL and keys from Settings → API

### Step 4: Configure Environment

**Backend** (`backend/.env`):
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
JWT_SECRET=your-random-secret-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 5: Start Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🧪 Test the System

### 1. Test Backend Health

```bash
curl http://localhost:5000/health
```

### 2. Create a Test Account

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "test123",
    "name": "Test User",
    "phone": "+919876543210"
  }'
```

### 3. Login

Visit `http://localhost:3000/auth/login` and use:
- **Username**: `admin`
- **Password**: `admin123`

## 📋 Default Test Accounts

| Role | Username | Password | Access |
|------|----------|----------|--------|
| Admin | admin | admin123 | Full access to /admin |
| Agent | agent1 | agent123 | Agent dashboard |
| User | testuser | user123 | Customer portal |

## 🗺️ Add Maps to Your Pages

### Install Leaflet CSS

Add to `app/layout.tsx`:

```tsx
import 'leaflet/dist/leaflet.css';
```

### Example: Location Picker Component

```tsx
'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState([12.9716, 77.5946]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onLocationSelect(e.latlng);
      },
    });
    return <Marker position={position} />;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
}
```

## 🔌 API Usage Examples

### Create an Order

```tsx
import { orderAPI } from '@/lib/api';

const handleCreateOrder = async () => {
  try {
    const result = await orderAPI.create({
      current_location: '123 Main St, Bangalore',
      latitude: 12.9716,
      longitude: 77.5946,
      battery_type: 'standard',
      vehicle_model: 'Tesla Model 3',
      charge_level: '0-20%',
      amount: 299
    });
    console.log('Order created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Admin: Assign Agent

```tsx
import { adminAPI } from '@/lib/api';

const assignAgent = async (orderId, agentId) => {
  try {
    const result = await adminAPI.assignAgent(orderId, agentId);
    console.log('Agent assigned:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Agent: Update Order Status

```tsx
import { orderAPI } from '@/lib/api';

const markDelivered = async (orderId) => {
  try {
    await orderAPI.updateStatus(orderId, 'delivered');
    console.log('Order marked as delivered');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🎨 Integrate Auth into Existing UI

### Wrap your app with AuthProvider

```tsx
// app/layout.tsx
import { AuthProvider } from '@/lib/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Use Auth in Components

```tsx
'use client';

import { useAuth } from '@/lib/AuthContext';

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <a href="/auth/login">Login</a>;
  }

  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protect Routes

```tsx
// app/admin/page.tsx
'use client';

import { withAuth } from '@/lib/AuthContext';

function AdminDashboard() {
  return <div>Admin Dashboard</div>;
}

export default withAuth(AdminDashboard, 'admin');
```

## 🚀 Deployment Checklist

### Before Deploying:

- [ ] Change default passwords in database
- [ ] Set strong JWT_SECRET (use `openssl rand -hex 32`)
- [ ] Update CORS settings for production URLs
- [ ] Enable Supabase RLS policies
- [ ] Add rate limiting
- [ ] Setup monitoring (Sentry)
- [ ] Test all API endpoints
- [ ] Verify environment variables

### Deploy Backend (Railway):

```bash
railway init
railway up
```

### Deploy Frontend (Vercel):

```bash
vercel --prod
```

## 📞 Need Help?

- Check `BACKEND_README.md` for detailed documentation
- Review API endpoints in `backend/routes/`
- Test with Postman/Insomnia
- Check logs: `backend/logs/` or console

---

**You're all set! 🎉**

Start building your EV battery delivery platform!
