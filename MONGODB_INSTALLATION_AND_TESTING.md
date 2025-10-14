# MongoDB Installation & Complete Testing Guide

## 📥 Step 1: Download & Install MongoDB (5-10 minutes)

### Download Instructions

The MongoDB download page should be open in your browser. If not, visit:
https://www.mongodb.com/try/download/community

### Installation Steps:

1. **Select Your Version:**
   - Version: **7.0.x** (or latest)
   - Platform: **Windows**
   - Package: **MSI**
   - Click **Download**

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Click **Next**
   - Accept the license agreement
   - Choose **Complete** installation

3. **Service Configuration (IMPORTANT):**
   - ✅ Check **"Install MongoDB as a Service"**
   - ✅ Check **"Run service as Network Service user"**
   - Data Directory: Keep default `C:\Program Files\MongoDB\Server\7.0\data\`
   - Log Directory: Keep default `C:\Program Files\MongoDB\Server\7.0\log\`
   - Click **Next**

4. **MongoDB Compass (Optional):**
   - You can uncheck "Install MongoDB Compass" to skip the GUI tool
   - Or keep it checked if you want a database viewer
   - Click **Next**

5. **Complete Installation:**
   - Click **Install**
   - Wait for installation (2-3 minutes)
   - Click **Finish**

### ✅ Verify MongoDB Installation

After installation, open a **NEW terminal** and run:

```powershell
mongod --version
```

You should see version information like:
```
db version v7.0.x
```

### 🚀 Start MongoDB Service (if not auto-started)

MongoDB should start automatically as a Windows service. If needed:

```powershell
# Check if MongoDB service is running
net start MongoDB

# Or start it manually
Start-Service MongoDB
```

---

## 🛠️ Step 2: Install Backend Dependencies

Now that MongoDB is ready, let's set up the backend:

### Navigate to Backend Folder:

```powershell
cd backend
```

### Install All Dependencies:

```powershell
npm install
```

This will install (~1-2 minutes):
- express
- mongoose
- jsonwebtoken
- bcryptjs
- and 15+ other packages

**Expected output:**
```
added 150+ packages in 1-2 minutes
```

---

## 🌱 Step 3: Seed the Database

Populate the database with sample data for testing:

```powershell
npm run seed
```

**You should see:**
```
📦 Connected to MongoDB
🗑️  Clearing existing data...
👤 Creating users...
✅ Created 2 users
👥 Creating clients...
✅ Created 3 clients
📋 Creating sample orders...
✅ Created 3 orders
💳 Creating sample payments...
✅ Created 2 payments

🎉 Database seeded successfully!

📝 Login credentials:
   Admin: admin@elegantstitches.com / admin123
   Staff: staff@elegantstitches.com / staff123
```

**Important:** Save these credentials! You'll use them to login.

---

## 🚀 Step 4: Start the Backend Server

Start the development server:

```powershell
npm run dev
```

**You should see:**
```
🚀 Server is running on port 5000
📍 Environment: development
🌐 Frontend URL: http://localhost:3000
✅ MongoDB connected successfully
```

**Keep this terminal open!** The backend server needs to keep running.

---

## 🧪 Step 5: Test the Backend API

### Test 1: Health Check

Open your web browser and visit:
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

✅ **If you see this, your backend is working!**

### Test 2: Login Test (Using Browser or Postman)

**Using Postman or any API client:**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

Body:
{
  "email": "admin@elegantstitches.com",
  "password": "admin123"
}
```

**Expected response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "username": "admin",
      "email": "admin@elegantstitches.com",
      "fullName": "Admin User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

✅ **If you see this, authentication is working!**

---

## 🌐 Step 6: Test Frontend-Backend Integration

Now let's test the complete application!

### Ensure Both Servers Are Running:

You should have **TWO terminal windows open:**

**Terminal 1 (Frontend):**
```
Location: Project root
Running: npm start
URL: http://localhost:3000
Status: Should already be running ✅
```

**Terminal 2 (Backend):**
```
Location: backend folder
Running: npm run dev
URL: http://localhost:5000
Status: Just started ✅
```

### Test the Complete Application:

1. **Open the Frontend:**
   - Visit: `http://localhost:3000`
   - You should see the Elegant Stitches homepage

2. **Click "Admin Login":**
   - Look for "Admin Login" button in the navbar
   - Or click "Get Started" and find the admin link

3. **Login with Sample Credentials:**
   ```
   Email: admin@elegantstitches.com
   Password: admin123
   ```

4. **You Should See:**
   - ✅ Successful login
   - ✅ Redirect to Admin Dashboard
   - ✅ Dashboard with statistics
   - ✅ Sample clients (3 clients)
   - ✅ Sample orders (3 orders)
   - ✅ Analytics data

---

## 🎯 What to Test in the Admin Dashboard

### 1. Dashboard Overview
- Total clients count (should be 3)
- Total orders count (should be 3)
- Total revenue (should show dollar amount)
- Recent orders list

### 2. Client Management
- Click "Clients" in sidebar
- View list of 3 sample clients:
  - Sarah Johnson
  - Emily Davis
  - Michael Brown
- Click on a client to see details
- Check measurements tab
- Try adding new client (optional)

### 3. Order Management
- Click "Orders" in sidebar
- View list of 3 sample orders
- See different statuses (pending, in-progress, completed)
- Click on an order to see details
- Try updating order status

### 4. Payments
- Click "Payments" in sidebar
- View payment history (2 payments)
- Check payment methods and amounts

### 5. Analytics
- Click "Analytics" in sidebar
- View charts and graphs
- Check revenue trends
- View client statistics

---

## 🔍 Troubleshooting

### Problem: MongoDB Won't Start

**Solution 1:** Start MongoDB service manually
```powershell
net start MongoDB
```

**Solution 2:** Check if port 27017 is available
```powershell
netstat -ano | findstr :27017
```

**Solution 3:** Restart MongoDB service
```powershell
net stop MongoDB
net start MongoDB
```

### Problem: Backend Connection Error

**Error:** `MongoNetworkError: failed to connect`

**Solution:**
1. Make sure MongoDB service is running
2. Check `backend/.env` has correct connection string
3. Restart backend server

### Problem: Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change port in `backend/.env`:
   ```
   PORT=5001
   ```
2. Restart backend server

### Problem: Frontend Can't Connect to Backend

**Solution:**
1. Make sure backend is running on port 5000
2. Check browser console for errors (F12)
3. Verify CORS is enabled (it should be by default)

### Problem: Login Fails on Frontend

**Checklist:**
- ✅ Backend server is running
- ✅ Database was seeded (run `npm run seed` again)
- ✅ Using correct credentials
- ✅ Check browser console for errors

---

## 📊 Complete Testing Checklist

Use this checklist to verify everything works:

### Backend Tests:
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Database seeded with sample data (`npm run seed`)
- [ ] Backend server started (`npm run dev`)
- [ ] Health endpoint works (`/api/health`)
- [ ] Login API works (`/api/auth/login`)

### Frontend Tests:
- [ ] Frontend running on port 3000
- [ ] Homepage loads successfully
- [ ] Can navigate to admin login page
- [ ] Login form appears
- [ ] Can login with sample credentials
- [ ] Redirects to admin dashboard after login

### Integration Tests:
- [ ] Dashboard shows sample data
- [ ] Can view clients list
- [ ] Can view orders list
- [ ] Can view payments list
- [ ] Analytics page shows data
- [ ] All navigation works
- [ ] No console errors

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ **Backend Terminal Shows:**
   ```
   ✅ MongoDB connected successfully
   🚀 Server is running on port 5000
   ```

2. ✅ **Frontend Terminal Shows:**
   ```
   webpack compiled successfully
   ```

3. ✅ **Browser Shows:**
   - Beautiful landing page
   - Smooth navigation
   - Successful login
   - Admin dashboard with data

4. ✅ **No Errors:**
   - No red errors in terminal
   - No red errors in browser console (F12)
   - All pages load quickly

---

## 🚀 Next Steps After Testing

Once everything works:

1. **Explore the Application:**
   - Try creating new clients
   - Create new orders
   - Record payments
   - Generate invoices
   - Check analytics

2. **Customize (Optional):**
   - Update company name
   - Change colors/theme
   - Add your logo
   - Update contact information

3. **Production Deployment (Later):**
   - Use MongoDB Atlas (cloud database)
   - Deploy backend to Heroku/Railway/Render
   - Deploy frontend to Netlify/Vercel
   - Set up proper environment variables

---

## 📞 Quick Command Reference

### MongoDB:
```powershell
# Check if running
net start MongoDB

# Start service
Start-Service MongoDB

# Stop service
Stop-Service MongoDB
```

### Backend:
```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Seed database
npm run seed

# Start dev server
npm run dev

# Start production server
npm start
```

### Frontend:
```powershell
# Navigate to project root
cd ..

# Start development server
npm start
```

---

## 🎯 Summary

**Current Status:**
- ✅ Frontend created and running
- ✅ Backend created with 30 files
- ⏳ MongoDB - Installing now
- ⏳ Backend - Ready to start
- ⏳ Testing - Ready to begin

**Login Credentials (After Seeding):**
- **Admin:** admin@elegantstitches.com / admin123
- **Staff:** staff@elegantstitches.com / staff123

**URLs:**
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

**You're almost there! 🎉**

Follow the steps above after MongoDB installation completes!

