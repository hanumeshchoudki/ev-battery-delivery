# Instant Charge - EV Battery Recharging & Delivery Platform

> Complete full-stack web application for on-demand EV battery recharging service with live tracking

## 🚀 Project Overview

Instant Charge connects EV owners with delivery agents who provide emergency portable battery recharge services. The platform features:

- **Custom JWT Authentication** (no third-party auth services)
- **Role-based Access Control** (Users, Admins, Delivery Agents)
- **Real-time Order Tracking** with OpenStreetMap/Leaflet
- **Admin Dashboard** for order management and analytics
- **Agent Portal** for delivery operations

---

## 📦 Tech Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS 4** for styling
- **shadcn/ui** components
- **Leaflet/React-Leaflet** for maps (OpenStreetMap)
- **Axios** for API calls
- **JWT-decode** for token management

### Backend
- **Node.js** with Express.js
- **Supabase** PostgreSQL database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Morgan** for logging

---

## 🗄️ Database Schema

### Tables
1. **users** - All user accounts (customers, admins, agents)
2. **delivery_agents** - Extended profile for delivery personnel
3. **orders** - Battery recharge delivery requests
4. **order_status_history** - Audit trail of status changes

See `backend/database/schema.sql` for complete SQL schema.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/ev-battery-delivery.git
cd ev-battery-delivery
```

### 2. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Copy and run the entire contents of `backend/database/schema.sql`
4. Note your project URL and anon/service keys from Settings → API

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your Supabase credentials:
# - SUPABASE_URL
# - SUPABASE_KEY (anon key)
# - SUPABASE_SERVICE_KEY (service_role key)
# - JWT_SECRET (any random string, e.g., openssl rand -hex 32)

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ..  # back to root
# (Frontend setup will connect to your existing Next.js app)

# Install frontend dependencies
npm install axios leaflet react-leaflet jwt-decode

# Create .env.local for frontend
```

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ..
npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

---

## 🔐 Default Accounts

After running the schema migration, these test accounts are available:

| Role | Username | Password | Purpose |
|------|----------|----------|---------|
| Admin | `admin` | `admin123` | Full platform access |
| Agent | `agent1` | `agent123` | Delivery operations |
| User | `testuser` | `user123` | Customer account |

**⚠️ Change these passwords in production!**

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup        - Register new user
POST   /api/auth/login         - Login (returns JWT)
GET    /api/auth/me            - Get current user
POST   /api/auth/refresh       - Refresh token
```

### Orders (User)
```
POST   /api/orders             - Create new order
GET    /api/orders/:id         - Get order details
GET    /api/orders/user/:userId - Get user's orders
PUT    /api/orders/:id/status  - Update order status
DELETE /api/orders/:id          - Cancel order
```

### Admin
```
GET    /api/admin/orders       - List all orders
PUT    /api/admin/orders/:id/assign - Assign agent
GET    /api/admin/analytics    - Dashboard statistics
GET    /api/admin/users        - List all users
DELETE /api/admin/users/:id    - Delete user
```

### Agents
```
GET    /api/agents             - List all agents
POST   /api/agents/create      - Create new agent (admin only)
GET    /api/agents/my-orders   - Get agent's assigned orders
PUT    /api/agents/location    - Update current location
PUT    /api/agents/status      - Toggle active/inactive
GET    /api/agents/stats       - Get agent statistics
```

---

## 🗺️ OpenStreetMap Integration

The app uses **Leaflet** with **OpenStreetMap** tiles instead of Google Maps:

```jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[12.9716, 77.5946]} zoom={13}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='© OpenStreetMap contributors'
  />
  <Marker position={[lat, lng]} />
</MapContainer>
```

**Key Files to Update:**
- `app/order/page.tsx` - Add location picker
- `app/tracking/[orderId]/page.tsx` - Replace map component
- `components/order-flow.tsx` - Integrate location selection

---

## 🎨 Frontend Integration Guide

### 1. Create Auth Context

```jsx
// lib/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);

  const login = async (username, password) => {
    const { data } = await axios.post('/auth/login', { username, password });
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 2. Protect Routes

```jsx
// components/ProtectedRoute.tsx
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else if (requiredRole && user.role !== requiredRole) {
      router.push('/');
    }
  }, [user, requiredRole, router]);

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return children;
}
```

### 3. API Service

```jsx
// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Order API
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getById: (id) => api.get(`/orders/${id}`),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

// Admin API
export const adminAPI = {
  getOrders: (filters) => api.get('/admin/orders', { params: filters }),
  assignAgent: (orderId, agentId) => api.put(`/admin/orders/${orderId}/assign`, { agent_id: agentId }),
  getAnalytics: () => api.get('/admin/analytics')
};

// Agent API
export const agentAPI = {
  getMyOrders: () => api.get('/agents/my-orders'),
  updateLocation: (lat, lng) => api.put('/agents/location', { latitude: lat, longitude: lng }),
  getStats: () => api.get('/agents/stats')
};
```

---

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Railway** (Recommended):
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

2. Set environment variables in Railway dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `JWT_SECRET`
   - `FRONTEND_URL=https://your-vercel-app.vercel.app`

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - NEXT_PUBLIC_API_URL (your Railway backend URL)
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📊 User Flows

### Customer Flow
1. Signup/Login
2. Create order (select location on map, battery type, charge level)
3. Track order in real-time
4. View order history

### Admin Flow
1. Login to admin dashboard
2. View all orders and analytics
3. Assign delivery agents to pending orders
4. Monitor order statuses

### Agent Flow
1. Login to agent portal
2. View assigned orders
3. Update order status (en_route → delivered)
4. Update current location
5. Toggle availability status

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Role-based access control (RBAC)
- ✅ Secure HTTP headers (Helmet.js)
- ✅ CORS configuration
- ✅ SQL injection prevention (parameterized queries)
- ✅ Environment variable protection

---

## 🧪 Testing

### Test the Backend

```bash
# Health check
curl http://localhost:5000/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"test123","name":"John Doe","phone":"+919876543210"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"test123"}'

# Create order (use token from login)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "current_location":"123 Main St, Bangalore",
    "latitude":12.9716,
    "longitude":77.5946,
    "battery_type":"standard",
    "vehicle_model":"Tesla Model 3"
  }'
```

---

## 📁 Project Structure

```
ev-battery-delivery/
├── app/                    # Next.js app directory (existing UI)
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── order/             # Order creation page
│   ├── tracking/          # Order tracking
│   ├── admin/             # Admin dashboard
│   └── ...
├── backend/               # Express.js API server
│   ├── config/
│   │   └── database.js    # Supabase configuration
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   ├── routes/
│   │   ├── auth.js        # Auth endpoints
│   │   ├── orders.js      # Order management
│   │   ├── admin.js       # Admin endpoints
│   │   └── agents.js      # Agent endpoints
│   ├── database/
│   │   └── schema.sql     # Database schema
│   ├── .env.example
│   ├── package.json
│   └── server.js          # Main server file
├── components/            # React components (existing)
├── lib/                   # Utilities
│   ├── api.js            # API service (NEW)
│   └── AuthContext.tsx   # Auth context (NEW)
├── .env.local            # Frontend environment variables
├── package.json
└── README.md
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check Supabase credentials in `.env`
- Ensure PostgreSQL schema is created
- Verify Node.js version (18+)

### CORS errors
- Check `FRONTEND_URL` in backend `.env`
- Ensure frontend is running on correct port

### Authentication errors
- Verify JWT_SECRET is set
- Check token expiry (default 24h)
- Clear localStorage and login again

### Database connection issues
- Verify Supabase project is active
- Check service_role key (not anon key) is used in backend
- Test connection: `npm run test` (if test script exists)

---

## 📝 Next Steps

1. **Frontend Integration**:
   - [ ] Add login/signup pages
   - [ ] Create AuthContext
   - [ ] Integrate API calls
   - [ ] Add Leaflet maps

2. **Features**:
   - [ ] Real-time notifications
   - [ ] Payment integration
   - [ ] SMS notifications
   - [ ] Email confirmations

3. **Production**:
   - [ ] Setup monitoring (Sentry)
   - [ ] Add rate limiting
   - [ ] Implement caching
   - [ ] Setup CI/CD

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📧 Support

For issues and questions, please open a GitHub issue or contact support@instantcharge.com

---

**Built with  using React, Node.js, and Supabase**
