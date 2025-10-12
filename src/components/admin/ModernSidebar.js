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

  const handleStatusChange = (order, newStatus) => {
    const updatedOrder = { ...order, status: newStatus };
    if (updateOrder) {
      updateOrder(updatedOrder);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return '⏳';
      case 'In Progress': return '⚙️';
      case 'Delivered': return '✅';
      default: return '📋';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'add-client', label: 'Add Client', icon: '➕' },
    { id: 'orders', label: 'All Orders', icon: '📦' },
    { id: 'status', label: 'Status Manager', icon: '⚡' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Elegant Stitches</h2>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Stats</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 text-sm">📦</span>
              <span className="text-xs text-gray-700">Orders</span>
            </div>
            <span className="text-xs font-semibold text-blue-600">{orders.length}</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-sm">💰</span>
              <span className="text-xs text-gray-700">Revenue</span>
            </div>
            <span className="text-xs font-semibold text-green-600">
              ₹{orders.reduce((sum, order) => sum + (order.paymentStatus === 'Paid' ? order.amount : 0), 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Quick Status Management */}
        <div className="mt-2 border-t border-gray-200 pt-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <span className="mr-1">⚡</span> Quick Status
          </h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {orders.length > 0 ? (
              orders.slice(0, 2).map((order) => (
                <div key={order.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">{getStatusIcon(order.status)}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-800">#{order.id}</p>
                        <p className="text-xs text-gray-600 truncate">{order.clientName}</p>
                      </div>
                    </div>
                    <span className={`px-1 py-1 rounded-full text-xs font-bold ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-1">
                    {['Pending', 'In Progress', 'Delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(order, status)}
                        disabled={order.status === status}
                        className={`flex-1 flex items-center justify-center px-1 py-1 rounded text-xs font-semibold transition ${
                          order.status === status
                            ? 'bg-purple-200 text-purple-800 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-800 border border-gray-200'
                        }`}
                      >
                        <span className="text-xs">{getStatusIcon(status)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-600">No orders</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* User Profile */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-800">{user?.username || 'Admin'}</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition"
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
