# Backend Quick Start Guide

## Prerequisites

Before running the backend, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB installed and running (or use MongoDB Atlas)
- ✅ npm or yarn package manager

## Step 1: Install MongoDB (if not already installed)

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install and run MongoDB as a service, or
3. Run manually: `mongod --dbpath C:\data\db`

### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Alternative: Use MongoDB Atlas (Cloud)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

## Step 2: Install Dependencies

Navigate to the backend directory and install packages:

```bash
cd backend
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- express-validator (input validation)
- And more...

## Step 3: Configure Environment Variables

The `.env` file has been created with default values. Update these settings:

```env
# Required - Update these
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elegant-stitches
JWT_SECRET=elegant_stitches_secret_key_2024

# Optional - Configure if using these features
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Get Gmail App Password (for email notifications):
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Generate new password
4. Use this password in `EMAIL_PASSWORD`

### Get Stripe Keys (for payments):
1. Sign up at https://stripe.com
2. Go to Developers → API keys
3. Copy your Secret key

### Get Cloudinary Credentials (for image uploads):
1. Sign up at https://cloudinary.com
2. Dashboard → Account Details
3. Copy Cloud Name, API Key, and API Secret

## Step 4: Seed the Database (Optional but Recommended)

Populate the database with sample data:

```bash
npm run seed
```

This creates:
- 2 users (admin and staff)
- 3 sample clients
- 3 sample orders
- 2 sample payments

**Login Credentials:**
- Admin: `admin@elegantstitches.com` / `admin123`
- Staff: `staff@elegantstitches.com` / `staff123`

## Step 5: Start the Backend Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Step 6: Test the API

### Health Check:
Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

### Test Login:
Using Postman, curl, or any API client:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elegantstitches.com","password":"admin123"}'
```

You should receive a JWT token in the response.

## Step 7: Connect Frontend

The frontend is already configured to connect to `http://localhost:5000`. Just ensure:
1. Backend is running on port 5000
2. Frontend is running on port 3000
3. CORS is enabled (already configured)

## Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

## API Documentation

The API is now available at `http://localhost:5000/api/`

### Main Endpoints:

**Authentication:**
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (requires auth)

**Clients:**
- GET `/api/clients` - List all clients
- POST `/api/clients` - Create client
- GET `/api/clients/:id` - Get client details
- PUT `/api/clients/:id` - Update client

**Orders:**
- GET `/api/orders` - List all orders
- POST `/api/orders` - Create order
- GET `/api/orders/:id` - Get order details
- PUT `/api/orders/:id/status` - Update order status

**Payments:**
- GET `/api/payments` - List all payments
- POST `/api/payments` - Record payment

**Analytics:**
- GET `/api/analytics/dashboard` - Dashboard stats
- GET `/api/analytics/revenue` - Revenue analytics

**Invoices:**
- GET `/api/invoices/:orderId` - Generate PDF invoice

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Troubleshooting

### MongoDB Connection Error
**Error:** `MongoNetworkError: failed to connect to server`

**Solution:**
1. Ensure MongoDB is running: `mongod` or check service status
2. Verify connection string in `.env`
3. Check if port 27017 is available
4. Try using MongoDB Atlas cloud database

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change PORT in `.env` to another number (e.g., 5001)
2. Or kill the process using port 5000:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill`

### Validation Errors
**Error:** `ValidationError: ...`

**Solution:** Check the request body matches the required schema. See model files in `/models` directory.

### JWT Token Error
**Error:** `Token is invalid or has expired`

**Solution:**
1. Login again to get a new token
2. Ensure you're sending the token in the correct format: `Bearer <token>`

## Next Steps

1. ✅ Backend is now running
2. ✅ Database is seeded with sample data
3. ✅ API is ready to use
4. 📱 Connect the frontend (already configured)
5. 🧪 Test the complete application
6. 🎨 Customize as needed

## Production Deployment

For production deployment:

1. Use a production MongoDB database (MongoDB Atlas recommended)
2. Set `NODE_ENV=production` in environment
3. Use strong JWT secret
4. Enable HTTPS
5. Set up proper error logging
6. Configure firewall rules
7. Use process manager like PM2

```bash
npm install -g pm2
pm2 start server.js --name "boutique-api"
```

## Support

For issues or questions:
- Check the main README.md for detailed API documentation
- Review model files to understand data structures
- Check server logs for error messages

Happy coding! 🚀

