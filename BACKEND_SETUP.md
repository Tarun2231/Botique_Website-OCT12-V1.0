# Backend Setup Instructions

## Overview

A complete backend API has been created in the `backend/` folder with all the necessary features for the Elegant Stitches Boutique application.

## What's Included

### ✅ Complete Backend Structure
```
backend/
├── config/          # Configuration files (database, cloudinary)
├── controllers/     # Business logic (auth, clients, orders, payments, analytics, invoices)
├── models/          # Database schemas (User, Client, Order, Payment)
├── routes/          # API endpoints
├── middleware/      # Auth, validation, error handling
├── utils/           # Helper functions (email, file upload, database seeding)
├── uploads/         # Temporary file storage
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env             # Environment variables (configured)
├── .gitignore       # Git ignore rules
└── README.md        # Comprehensive documentation
```

### 📦 Features Implemented

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (admin, staff)
   - Password hashing with bcrypt
   - Protected routes

2. **Client Management**
   - CRUD operations for clients
   - Comprehensive measurements tracking
   - Photo uploads support
   - Client preferences and notes
   - Order history integration

3. **Order Management**
   - Complete order lifecycle tracking
   - Multiple items per order
   - Status history with timestamps
   - Priority levels (low, normal, high, urgent)
   - Expected delivery dates
   - Automated order numbering

4. **Payment Processing**
   - Multiple payment methods
   - Payment tracking and history
   - Refund processing
   - Stripe integration ready
   - Automatic payment status updates

5. **Analytics & Reporting**
   - Dashboard overview statistics
   - Revenue analytics with trends
   - Client analytics and insights
   - Order analytics by type
   - Payment method distribution

6. **Invoice Generation**
   - PDF invoice generation
   - Professional invoice templates
   - Order and payment details
   - Downloadable invoices

7. **Additional Features**
   - Email notifications (order confirmations, status updates)
   - Image upload with Cloudinary
   - Input validation on all routes
   - Centralized error handling
   - Database seeding for testing

## Quick Start

### Step 1: Install MongoDB

**You need MongoDB running to use the backend.**

#### Option A: Local MongoDB (Recommended for Development)

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run as a Windows service automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### Option B: MongoDB Atlas (Cloud - Free Tier Available)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Whitelist your IP address
4. Create a database user
5. Get connection string
6. Update `MONGODB_URI` in `backend/.env`

### Step 2: Install Backend Dependencies

Open a **new terminal** and run:

```bash
cd backend
npm install
```

This will install all required packages (~1-2 minutes).

### Step 3: Seed the Database (Optional but Recommended)

This creates sample data so you can test immediately:

```bash
npm run seed
```

**You'll get:**
- 2 users (admin and staff)
- 3 sample clients
- 3 sample orders
- 2 sample payments

**Login credentials:**
- Admin: `admin@elegantstitches.com` / `admin123`
- Staff: `staff@elegantstitches.com` / `staff123`

### Step 4: Start the Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📍 Environment: development
🌐 Frontend URL: http://localhost:3000
```

### Step 5: Test the API

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see a success message!

## Running Both Frontend and Backend

You need **TWO terminal windows**:

### Terminal 1 - Frontend (already running):
```bash
# In project root
npm start
```
Runs on: `http://localhost:3000`

### Terminal 2 - Backend:
```bash
cd backend
npm run dev
```
Runs on: `http://localhost:5000`

## Environment Configuration

The `.env` file in the `backend/` folder is already configured with basic settings:

```env
# Required (Already configured)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elegant-stitches
JWT_SECRET=elegant_stitches_secret_key_2024

# Optional - Only needed if using these features
EMAIL_USER=           # For email notifications
EMAIL_PASSWORD=       # Gmail app password
STRIPE_SECRET_KEY=    # For payment processing
CLOUDINARY_*=         # For cloud image storage
```

**The app will work without the optional settings!** They're only needed for:
- Email notifications (optional)
- Stripe payment processing (optional, can use manual payments)
- Cloud image storage (optional, stores locally by default)

## API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `GET /api/clients/:id` - Get client
- `PUT /api/clients/:id` - Update client
- `PUT /api/clients/:id/measurements` - Update measurements

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `PUT /api/orders/:id` - Update order
- `PUT /api/orders/:id/status` - Update status

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Record payment
- `GET /api/payments/:id` - Get payment

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/revenue` - Revenue data
- `GET /api/analytics/clients` - Client insights
- `GET /api/analytics/orders` - Order analytics

### Invoices
- `GET /api/invoices/:orderId` - Generate PDF invoice

## Integrating with Frontend

The frontend is already configured to work with the backend. No changes needed!

The frontend will make API calls to `http://localhost:5000/api/...`

Just ensure both servers are running:
- Frontend: `http://localhost:3000` ✅
- Backend: `http://localhost:5000` ✅

## Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is active:
   - Windows: Services → MongoDB Server → Started
   - Mac/Linux: `brew services list` or `systemctl status mongodb`
3. Or use MongoDB Atlas (cloud option)

### Issue: Port 5000 Already in Use

**Solution:**
1. Change `PORT=5001` in `backend/.env`
2. Restart backend server

### Issue: "npm: command not found"

**Solution:**
- Install Node.js from https://nodejs.org/ (includes npm)
- Restart your terminal after installation

### Issue: Dependencies Installation Fails

**Solution:**
```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Testing the Integration

After both servers are running:

1. **Open frontend:** `http://localhost:3000`
2. **Click "Admin Login"** (in the navbar or homepage)
3. **Login with:**
   - Email: `admin@elegantstitches.com`
   - Password: `admin123`
4. **You should see the admin dashboard!**

## Production Considerations

For production deployment:

1. ✅ Use MongoDB Atlas or managed MongoDB
2. ✅ Set strong `JWT_SECRET`
3. ✅ Set `NODE_ENV=production`
4. ✅ Enable HTTPS
5. ✅ Use environment-specific config
6. ✅ Set up logging and monitoring
7. ✅ Configure CORS for your domain
8. ✅ Use a process manager (PM2)

## Documentation

- **API Documentation:** `backend/README.md`
- **Quick Start Guide:** `backend/QUICKSTART.md`
- **Code Comments:** Detailed comments in all files

## Available npm Scripts

In the `backend/` directory:

```bash
npm start         # Production server
npm run dev       # Development server with auto-reload
npm run seed      # Seed database with sample data
```

## Summary

✅ Complete RESTful API with Express.js  
✅ MongoDB database with Mongoose  
✅ JWT authentication  
✅ Role-based access control  
✅ CRUD operations for all entities  
✅ Advanced analytics and reporting  
✅ PDF invoice generation  
✅ Email notifications ready  
✅ Payment processing ready  
✅ Image upload support  
✅ Comprehensive validation  
✅ Error handling  
✅ Sample data seeding  
✅ Full documentation  

**Next Steps:**
1. Install MongoDB
2. Run `cd backend && npm install`
3. Run `npm run seed` (optional)
4. Run `npm run dev`
5. Test at `http://localhost:5000/api/health`
6. Login to frontend with sample credentials

**You're all set! 🚀**

