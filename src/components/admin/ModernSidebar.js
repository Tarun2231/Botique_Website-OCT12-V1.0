import React from 'react';

function ModernSidebar({ activeView, setActiveView, setSelectedOrder, orders, updateOrder, sidebarOpen, setSidebarOpen }) {
  const handleNavigation = (view) => {
    setActiveView(view);
    setSelectedOrder(null);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '🏠', description: 'Overview & Analytics' },
    { id: 'clients', label: 'Clients', icon: '👥', description: 'Manage Clients' },
    { id: 'measurements', label: 'Measurements', icon: '📏', description: 'Client Measurements' },
    { id: 'add-client', label: 'Add Client', icon: '➕', description: 'New Client Order' },
    { id: 'orders', label: 'All Orders', icon: '📦', description: 'Order Management' },
    { id: 'status', label: 'Status Manager', icon: '⚡', description: 'Order Status' },
    { id: 'billing', label: 'Billing', icon: '💳', description: 'Payments & Invoices' },
    { id: 'inventory', label: 'Inventory', icon: '📦', description: 'Stock Management' },
    { id: 'employees', label: 'Employees', icon: '👷', description: 'Staff Management' },
    { id: 'appointments', label: 'Appointments', icon: '📅', description: 'Schedule Management' },
    { id: 'reports', label: 'Reports', icon: '📊', description: 'Analytics & Reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'System Settings' },
  ];

  return (
    <div className={`w-72 sm:w-80 bg-gradient-to-b from-elegant-cream to-white shadow-2xl h-screen fixed left-0 top-0 z-50 flex flex-col border-r-2 border-elegant-gold/30 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Logo Section */}
      <div className="p-4 sm:p-6 border-b-2 border-elegant-gold/30 bg-gradient-to-r from-elegant-gold to-elegant-darkGold">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-elegant-darkGold text-lg sm:text-2xl font-bold font-elegant">E</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white font-elegant truncate">Elegant Stitches</h2>
            <p className="text-white/90 text-xs sm:text-sm truncate">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-3 overflow-y-auto">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-elegant-darkGold uppercase tracking-wider mb-2 px-2">
            🎯 Main Menu
          </h3>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`group w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 touch-manipulation ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white shadow-lg border-2 border-elegant-gold'
                  : 'text-elegant-darkGold hover:bg-white hover:shadow-md border-2 border-transparent hover:border-elegant-gold/30'
              }`}
            >
              <div className={`p-1 sm:p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                activeView === item.id 
                  ? 'bg-white/20' 
                  : 'bg-elegant-gold/10 group-hover:bg-elegant-gold/20'
              }`}>
                <span className="text-lg sm:text-xl">{item.icon}</span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-semibold text-xs sm:text-sm truncate">{item.label}</div>
                <div className={`text-xs truncate ${
                  activeView === item.id 
                    ? 'text-white/80' 
                    : 'text-elegant-darkGold/70 group-hover:text-elegant-darkGold'
                }`}>
                  {item.description}
                </div>
              </div>
              {activeView === item.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default ModernSidebar;
