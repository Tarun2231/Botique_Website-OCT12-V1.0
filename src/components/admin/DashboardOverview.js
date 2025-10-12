import React from 'react';

function DashboardOverview({ stats, setActiveView }) {
  const cards = [
    {
      title: 'Total Orders',
      value: stats.total,
      icon: '📦',
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'Pending Orders',
      value: stats.pending,
      icon: '⏳',
      gradient: 'from-yellow-500 to-orange-600',
      bgLight: 'bg-yellow-50',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: '⚙️',
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'Completed Orders',
      value: stats.delivered,
      icon: '✅',
      gradient: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: '💰',
      gradient: 'from-pink-500 to-pink-600',
      bgLight: 'bg-pink-50',
      onClick: null
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your boutique today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`${card.bgLight} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
              card.onClick ? 'cursor-pointer hover:-translate-y-1' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`text-4xl p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-md`}>
                <span className="filter drop-shadow-sm">{card.icon}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveView('add-client')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            ➕ Add New Client
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            📋 View All Orders
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            🔍 Search Orders
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Order Delivered</p>
              <p className="text-sm text-gray-600">Wedding special designer shirt completed</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl">⚙️</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Order In Progress</p>
              <p className="text-sm text-gray-600">Blue formal shirt with French cuffs</p>
            </div>
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl">⏳</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">New Order Received</p>
              <p className="text-sm text-gray-600">Beige casual pants</p>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;

