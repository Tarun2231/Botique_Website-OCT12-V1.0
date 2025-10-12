# Quick Start Guide - Elegant Stitches

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Explore the Application

#### Public Landing Page
- Visit: `http://localhost:3000`
- Navigate through: Home, About Us, Services, Gallery, Contact
- Try the contact form (with validation)

#### Admin Dashboard
- Visit: `http://localhost:3000/admin`
- Explore the dashboard with pre-loaded sample data
- Try these features:
  - View dashboard statistics
  - Add a new client order
  - Search and filter orders
  - Edit existing orders
  - View order details
  - Toggle payment status
  - Delete orders

---

## 📱 Testing Responsive Design

### Desktop
- Default view when you open the app

### Mobile/Tablet
- Resize your browser window, or
- Open Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
- Try different device sizes

---

## 🎨 Key Features to Test

### Landing Page
1. **Smooth Scrolling**: Click navigation links
2. **Contact Form**: Fill and submit (check validation)
3. **Responsive Menu**: Resize to see hamburger menu
4. **Hover Effects**: Hover over cards and buttons

### Admin Dashboard
1. **Add Order**: Click "Add Client" and create a new order
2. **Search**: Try searching for "John" or "Jane"
3. **Filter**: Filter orders by status
4. **Edit Order**: Click any row or "Edit" button
5. **Payment Toggle**: Change payment status instantly
6. **Delete Order**: Remove an order (confirmation required)

---

## 📊 Sample Data

The app comes with 3 pre-loaded orders:
- **Order #1**: John Doe - Blue formal shirt (In Progress, Paid)
- **Order #2**: Jane Smith - Beige casual pants (Pending, Unpaid)
- **Order #3**: Robert Johnson - Wedding shirt (Delivered, Paid)

---

## 🎯 Admin Dashboard Navigation

```
Dashboard Overview → Add Client → All Orders → Order Details
     ↑________________↓_____________↓______________↓
            (Circular navigation flow)
```

---

## 💡 Tips

1. **Adding Orders**: All form fields with `*` are required
2. **Measurements**: Based on garment type, relevant fields will show
3. **Search**: Works on both client name and order ID
4. **Filtering**: Combine search with filter for precise results
5. **Editing**: Click anywhere on the order row to view details

---

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm start
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Loading
```bash
# Restart the development server
# Press Ctrl+C to stop
npm start
```

---

## 📞 Need Help?

Check the full [README.md](./README.md) for detailed documentation.

---

**Happy Testing! 🎉**

