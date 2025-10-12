import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ModernSidebar({ activeView, setActiveView, setSelectedOrder }) {
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
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
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
      <nav className="p-4">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Menu</h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">📦</span>
              <span className="text-sm text-gray-700">Orders</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">3</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">💰</span>
              <span className="text-sm text-gray-700">Revenue</span>
            </div>
            <span className="text-sm font-semibold text-green-600">₹8.8k</span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{user?.username || 'Admin'}</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            🌐 Site
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModernSidebar;
