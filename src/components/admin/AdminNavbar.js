import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function AdminNavbar({ activeView, setActiveView, setSelectedOrder }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Admin Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigation('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeView === 'overview'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('add-client')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeView === 'add-client'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Add Client
              </button>
              <button
                onClick={() => handleNavigation('orders')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeView === 'orders'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                All Orders
              </button>
            </div>
            
            <div className="flex items-center space-x-2 border-l border-white/30 pl-4">
              <div className="text-white text-sm">
                Welcome, <span className="font-semibold">{user?.username}</span>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-3 py-1 rounded text-white hover:bg-white/20 transition text-sm"
              >
                Site
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded text-white hover:bg-red-500/50 transition text-sm border border-white/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;

