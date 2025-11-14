# ನಮ್ಮ Charge - Quick Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (recommended) or npm - Install with: `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** (free) - [Sign up](https://supabase.com)

## Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
# Frontend dependencies
pnpm install

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a region close to you)
3. Wait for the project to initialize (~2 minutes)
4. Go to **SQL Editor** in the left sidebar
5. Copy and paste the entire contents of `backend/database/schema.sql`
6. Click **Run** to create all tables, functions, and sample data

### Step 3: Get Your Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **service_role key** (NOT the anon key - this is the secret key)

### Step 4: Configure Environment Variables

#### Frontend (.env.local)
```bash
# In the root directory, create/update .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```bash
# In the backend directory, create/update backend/.env
SUPABASE_URL=your_project_url_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
JWT_SECRET=your_random_secret_here
PORT=5000
NODE_ENV=development
```

To generate a secure JWT_SECRET:
```bash
# On macOS/Linux
openssl rand -hex 32

# Or use this online: https://www.random.org/strings/
```

### Step 5: Start the Application

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 6: Open the App

Open your browser and go to: **http://localhost:3000**

## Test Accounts

The database comes with pre-configured test accounts:

| Role  | Username    | Password   |
|-------|-------------|------------|
| Admin | admin       | admin123   |
| Agent | agent1      | agent123   |
| User  | testuser    | user123    |

## Available URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **Admin Dashboard**: http://localhost:3000/admin
- **Order Page**: http://localhost:3000/order

## Project Structure

```
ev-battery-delivery/
├── app/                    # Next.js pages
│   ├── auth/              # Login/Signup pages
│   ├── admin/             # Admin dashboard
│   ├── order/             # Order placement
│   └── tracking/          # Order tracking
├── backend/               # Express.js backend
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   ├── config/           # Database config
│   └── database/         # SQL schema
├── components/           # React components
└── lib/                 # API services & utilities
```

## Troubleshooting

### Backend won't start
- Check if `.env` file exists in `backend/` directory
- Verify Supabase credentials are correct
- Make sure port 5000 is not in use: `lsof -ti:5000 | xargs kill -9`

### Frontend shows errors
- Run `pnpm install` again
- Clear Next.js cache: `rm -rf .next`
- Check if backend is running on port 5000

### Database connection errors
- Verify your Supabase project is active
- Check if you're using the `service_role` key (not anon key)
- Ensure the SQL schema was executed successfully

### Can't login
- Make sure backend is running
- Open browser console (F12) to see error messages
- Try using test accounts listed above

## Next Steps

1. **Customize the app**: Edit components in the `components/` folder
2. **Add features**: Create new API endpoints in `backend/routes/`
3. **Deploy**: Follow the deployment guide in `BACKEND_README.md`

## Support

- 📖 Full Backend Docs: `BACKEND_README.md`
- ⚡ Quick Reference: `QUICKSTART.md`
- 🎯 Implementation Details: `IMPLEMENTATION_SUMMARY.md`

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS 4, shadcn/ui
- **Backend**: Node.js, Express.js, Supabase PostgreSQL
- **Auth**: Custom JWT (no Supabase Auth)
- **Maps**: OpenStreetMap with Leaflet
