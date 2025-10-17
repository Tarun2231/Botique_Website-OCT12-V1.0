import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function TopHeader({ searchTerm, setSearchTerm, orders, updateOrder, sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white shadow-sm border-b border-elegant-gold/20 px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and Welcome message */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-elegant-cream border border-elegant-gold/30 hover:border-elegant-gold/50 transition-colors touch-manipulation"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-elegant-darkGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-elegant-darkGold font-elegant truncate">
              Welcome back, {user?.username || 'Admin'}!
            </h1>
            <p className="text-elegant-darkGold/60 text-xs lg:text-sm mt-0.5 sm:mt-1 truncate">
              {getCurrentDate()}
            </p>
          </div>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search orders, clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-elegant-cream border border-elegant-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-elegant-gold focus:border-elegant-gold transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-elegant-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - User Profile */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 bg-elegant-cream rounded-lg p-1.5 sm:p-2 border border-elegant-gold/20 hover:border-elegant-gold/40 transition-all duration-300 touch-manipulation"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-elegant-darkGold to-elegant-gold rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-semibold text-elegant-darkGold text-sm">{user?.username || 'Admin'}</p>
              <p className="text-xs text-elegant-darkGold/60">Administrator</p>
            </div>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-elegant-darkGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-elegant-gold/20 z-50">
              <div className="p-4 border-b border-elegant-gold/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-elegant-darkGold to-elegant-gold rounded-lg flex items-center justify-center text-white font-bold">
                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold text-elegant-darkGold">{user?.username || 'Admin'}</p>
                    <p className="text-sm text-elegant-darkGold/60">Administrator</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;