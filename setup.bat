@echo off
REM ನಮ್ಮ Charge - Windows Setup Script

echo ========================================
echo 🔋 ನಮ್ಮ Charge - Setup Script (Windows)
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js v18 or higher from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node -v

REM Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ npm detected
echo.

echo 📥 Installing dependencies...
echo.

REM Install frontend dependencies
echo → Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo.
echo → Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ All dependencies installed successfully!
echo.

REM Check for environment files
echo 🔧 Checking environment configuration...

if not exist ".env.local" (
    echo ⚠️  .env.local not found. Creating from example...
    if exist ".env.example" (
        copy .env.example .env.local >nul
        echo ✅ Created .env.local
    ) else (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000/api > .env.local
        echo ✅ Created .env.local with default values
    )
) else (
    echo ✅ .env.local exists
)

if not exist "backend\.env" (
    echo ⚠️  backend\.env not found. Creating from example...
    if exist "backend\.env.example" (
        copy backend\.env.example backend\.env >nul
        echo ⚠️  Created backend\.env - PLEASE UPDATE WITH YOUR SUPABASE CREDENTIALS
    ) else (
        (
            echo SUPABASE_URL=your_supabase_project_url_here
            echo SUPABASE_SERVICE_KEY=your_service_role_key_here
            echo JWT_SECRET=please_generate_a_random_32_character_secret
            echo PORT=5000
            echo NODE_ENV=development
        ) > backend\.env
        echo ⚠️  Created backend\.env - PLEASE UPDATE WITH YOUR SUPABASE CREDENTIALS
    )
) else (
    echo ✅ backend\.env exists
)

echo.
echo ========================================
echo 🎉 Setup Complete!
echo ========================================
echo.
echo 📋 Next Steps:
echo.
echo 1. Setup Supabase Database:
echo    - Go to https://supabase.com and create a project
echo    - Run the SQL in backend\database\schema.sql
echo    - Get your credentials from Settings → API
echo.
echo 2. Update backend\.env with your Supabase credentials
echo.
echo 3. Start the development servers:
echo.
echo    Terminal 1 (Backend):
echo    cd backend ^&^& npm run dev
echo.
echo    Terminal 2 (Frontend):
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📖 For detailed instructions, see SETUP.md
echo.
pause
