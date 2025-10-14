import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ModernSidebar({ activeView, setActiveView, setSelectedOrder, orders, updateOrder }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (view) => {
    setActiveView(view);
    setSelectedOrder(null);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };


  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'add-client', label: 'Add Client', icon: '➕' },
    { id: 'orders', label: 'All Orders', icon: '📦' },
    { id: 'status', label: 'Status Manager', icon: '⚡' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 flex flex-col border-r border-elegant-gold/20">
      {/* Logo */}
      <div className="p-6 border-b border-elegant-gold/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-elegant-darkGold to-elegant-gold rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold font-elegant">E</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-elegant-black font-elegant">Elegant Stitches</h2>
            <p className="text-sm text-[#4a3b30]">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-[#4a3b30] uppercase tracking-wider mb-2">Main Menu</h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-elegant-darkGold to-elegant-gold text-white shadow-lg'
                  : 'text-[#4a3b30] hover:bg-elegant-cream'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="flex-shrink-0 p-3 border-t border-elegant-gold/20">
        <h3 className="text-xs font-semibold text-[#4a3b30] uppercase tracking-wider mb-2">Quick Stats</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-2 bg-elegant-cream rounded-lg border border-elegant-gold/30">
            <div className="flex items-center space-x-2">
              <span className="text-elegant-gold text-sm">📦</span>
              <span className="text-xs text-[#4a3b30]">Orders</span>
            </div>
            <span className="text-xs font-semibold text-elegant-darkGold">{orders.length}</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-elegant-cream rounded-lg border border-elegant-gold/30">
            <div className="flex items-center space-x-2">
              <span className="text-elegant-gold text-sm">💰</span>
              <span className="text-xs text-[#4a3b30]">Revenue</span>
            </div>
            <span className="text-xs font-semibold text-elegant-darkGold">
              ₹{orders.reduce((sum, order) => sum + (order.paymentStatus === 'Paid' ? order.amount : 0), 0).toLocaleString()}
            </span>
          </div>
        </div>

      </div>


      {/* User Profile */}
      <div className="flex-shrink-0 p-3 border-t border-elegant-gold/20 bg-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-elegant-darkGold to-elegant-gold rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-elegant-black">{user?.username || 'Admin'}</p>
            <p className="text-xs text-[#4a3b30]">Administrator</p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-2 py-1 text-xs text-[#4a3b30] hover:bg-elegant-cream rounded transition"
          >
            🌐 Site
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModernSidebar;
