import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function TopHeader({ searchTerm, setSearchTerm, orders, updateOrder }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickStatus, setShowQuickStatus] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'John Doe placed a new order for custom shirt',
      time: '2 minutes ago',
      type: 'order'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of ₹2,500 received from Jane Smith',
      time: '1 hour ago',
      type: 'payment'
    },
    {
      id: 3,
      title: 'Order Completed',
      message: 'Wedding shirt for Robert Johnson is ready',
      time: '3 hours ago',
      type: 'delivery'
    }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order': return '📦';
      case 'payment': return '💳';
      case 'delivery': return '✅';
      default: return '🔔';
    }
  };

  const handleQuickStatusChange = (order, newStatus) => {
    const updatedOrder = { ...order, status: newStatus };
    if (updateOrder) {
      updateOrder(updatedOrder);
    }
    setShowQuickStatus(false);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return '⏳';
      case 'In Progress': return '⚙️';
      case 'Delivered': return '✅';
      default: return '📋';
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

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Welcome message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.username}!</h1>
          <p className="text-gray-600">Here's what's happening with your boutique today.</p>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Status Update */}
          <div className="relative">
            <button
              onClick={() => setShowQuickStatus(!showQuickStatus)}
              className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              title="Quick Status Update"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>

            {/* Quick Status Dropdown */}
            {showQuickStatus && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Quick Status Update</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getStatusIcon(order.status)}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">#{order.id}</p>
                            <p className="text-xs text-gray-600">{order.clientName}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {['Pending', 'In Progress', 'Delivered'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleQuickStatusChange(order, status)}
                            disabled={order.status === status}
                            className={`flex-1 px-2 py-1 rounded text-xs font-medium transition ${
                              order.status === status
                                ? 'bg-purple-100 text-purple-700 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                            }`}
                          >
                            {getStatusIcon(status)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="text-right">
            <p className="text-sm text-gray-600">Today</p>
            <p className="font-semibold text-gray-800">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-purple-600 hover:text-purple-800 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{user?.username || 'Admin'}</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
