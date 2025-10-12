# Elegant Stitches - Tailoring Boutique Website

A modern, fully responsive tailoring boutique website built with React and Tailwind CSS.

## Features

### Landing Page (/)
- **Hero Section**: Beautiful gradient hero with boutique name and tagline
- **Navigation**: Smooth scrolling navigation bar
- **About Us**: Story and unique selling points
- **Services**: 
  - Custom Shirt Stitching
  - Custom Pant Stitching
  - Alterations
  - Designer Wear
- **Gallery**: Showcase of sample outfits
- **Contact Form**: Complete contact form with validation
- **Footer**: Address, contact info, and social links

### Admin Dashboard (/admin)
- **Dashboard Overview**:
  - Total Orders
  - Pending Orders
  - In-Progress Orders
  - Completed Orders
  - Total Revenue
  - Quick Actions
  - Recent Activity

- **Add New Client Form**:
  - Client Information (Name, Phone, Email, Address)
  - Garment Details (Type, Fabric, Design Notes)
  - Measurements (Dynamic based on garment type)
  - Order Status & Payment Information
  - Form Validation

- **Orders Table**:
  - View all orders in a table
  - Search by client name or order ID
  - Filter by status (Pending, In Progress, Delivered)
  - Edit and Delete actions
  - Click to view details

- **Order Details Page**:
  - Full client information
  - Garment details and measurements
  - Order status tracking
  - Payment management
  - Edit order inline
  - Toggle payment status
  - Print and delete options

## Tech Stack

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Tailwind CSS** 3.3.0
- **PostCSS** & **Autoprefixer**

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
Botique-OCT12-V1.0/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Navbar.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Services.js
│   │   │   ├── Gallery.js
│   │   │   ├── Contact.js
│   │   │   └── Footer.js
│   │   └── admin/
│   │       ├── AdminNavbar.js
│   │       ├── DashboardOverview.js
│   │       ├── AddClientForm.js
│   │       ├── OrdersTable.js
│   │       └── OrderDetails.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   └── AdminDashboard.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Routes

- `/` - Landing Page (Public)
- `/admin` - Admin Dashboard (Order Management)

## Features in Detail

### State Management
- Orders are stored in the App component state
- Includes 3 sample orders for demonstration
- All CRUD operations (Create, Read, Update, Delete) are fully functional

### Form Validation
- Client contact form validation
- Admin order form validation
- Real-time error display
- Success messages on submission

### Responsive Design
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile
- Hamburger menu for mobile navigation
- Responsive tables and cards

### UI/UX Features
- Smooth scrolling navigation
- Gradient backgrounds and buttons
- Hover effects and transitions
- Loading states
- Status badges
- Custom scrollbar

## Color Scheme

- **Primary**: Purple gradient (#c621d3 to #a518ad)
- **Secondary**: Pink gradient (#f5a9fc to #ee75f7)
- **Background**: Soft pastel gradients
- **Status Colors**:
  - Pending: Yellow
  - In Progress: Blue
  - Delivered: Green
  - Paid: Green
  - Unpaid: Red

## Sample Orders

The app comes with 3 sample orders:
1. John Doe - Blue formal shirt (In Progress, Paid)
2. Jane Smith - Beige casual pants (Pending, Unpaid)
3. Robert Johnson - Wedding special designer shirt (Delivered, Paid)

## Future Enhancements (Backend Integration)

When you're ready to add a backend:
- User authentication for admin
- Database integration (MongoDB, PostgreSQL)
- Image upload for gallery
- Email notifications
- SMS notifications for order updates
- Payment gateway integration
- Invoice generation
- Customer portal for order tracking

## Contact Information

For support or queries:
- Email: info@elegantstitches.com
- Phone: +91 9876543210
- Address: 123 Fashion Street, Downtown City

## License

© 2025 Elegant Stitches. All rights reserved.

---

**Built with ❤️ for Elegant Stitches Boutique**

