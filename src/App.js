import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  // Initial dummy orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      clientName: "John Doe",
      phone: "+91 9876543210",
      email: "john@example.com",
      address: "123 Main St, City",
      garmentType: "Shirt",
      fabricType: "Cotton",
      designNotes: "Blue formal shirt with French cuffs",
      measurements: {
        chest: "40",
        waist: "34",
        hip: "38",
        sleeve: "32",
        length: "30",
        shoulder: "16",
        neck: "15"
      },
      status: "In Progress",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      amount: 2500,
      date: "2024-12-01"
    },
    {
      id: 2,
      clientName: "Jane Smith",
      phone: "+91 9123456789",
      email: "jane@example.com",
      address: "456 Park Ave, Town",
      garmentType: "Pant",
      fabricType: "Linen",
      designNotes: "Beige casual pants",
      measurements: {
        waist: "30",
        hip: "36",
        length: "40",
        inseam: "32",
        thigh: "22",
        knee: "16",
        bottom: "14"
      },
      status: "Pending",
      paymentStatus: "Unpaid",
      paymentMethod: "Cash",
      amount: 1800,
      date: "2024-12-05"
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      phone: "+91 9988776655",
      email: "robert@example.com",
      address: "789 Oak Road, Village",
      garmentType: "Shirt",
      fabricType: "Silk",
      designNotes: "Wedding special designer shirt",
      measurements: {
        chest: "42",
        waist: "36",
        hip: "40",
        sleeve: "33",
        length: "31",
        shoulder: "17",
        neck: "16"
      },
      status: "Delivered",
      paymentStatus: "Paid",
      paymentMethod: "Card",
      amount: 4500,
      date: "2024-11-28"
    },
    {
      id: 4,
      clientName: "Priya Sharma",
      phone: "+91 9876543211",
      email: "priya@example.com",
      address: "456 Park St, Mumbai",
      garmentType: "Kurti",
      fabricType: "Cotton",
      designNotes: "Elegant cotton kurti with embroidery",
      measurements: {
        chest: "36",
        waist: "30",
        hip: "38",
        sleeve: "28",
        length: "42",
        shoulder: "14",
        neck: "13"
      },
      status: "In Progress",
      paymentStatus: "Partial",
      paymentMethod: "UPI",
      amount: 3200,
      date: "2024-12-10"
    },
    {
      id: 5,
      clientName: "Rajesh Kumar",
      phone: "+91 9876543212",
      email: "rajesh@example.com",
      address: "789 Market St, Delhi",
      garmentType: "Sherwani",
      fabricType: "Silk",
      designNotes: "Royal silk sherwani for wedding",
      measurements: {
        chest: "42",
        waist: "36",
        hip: "40",
        sleeve: "34",
        length: "45",
        shoulder: "18",
        neck: "16"
      },
      status: "Pending",
      paymentStatus: "Unpaid",
      paymentMethod: "Cash",
      amount: 8500,
      date: "2024-12-12"
    },
    {
      id: 6,
      clientName: "Sneha Patel",
      phone: "+91 9876543213",
      email: "sneha@example.com",
      address: "321 Garden St, Bangalore",
      garmentType: "Lehenga",
      fabricType: "Silk",
      designNotes: "Bridal lehenga with heavy work",
      measurements: {
        chest: "34",
        waist: "28",
        hip: "36",
        sleeve: "26",
        length: "38",
        shoulder: "13",
        neck: "12"
      },
      status: "In Progress",
      paymentStatus: "Paid",
      paymentMethod: "Card",
      amount: 12000,
      date: "2024-12-15"
    }
  ]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard orders={orders} setOrders={setOrders} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

