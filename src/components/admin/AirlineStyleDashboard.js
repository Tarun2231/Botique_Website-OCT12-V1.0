import React from 'react';

function AirlineStyleDashboard({ orders, stats, setActiveView, setSelectedOrder, updateOrder }) {

  const chartData = {
    monthly: [4, 6, 3, 7, 5, 8],
    orders: [2, 4, 3, 6, 4, 7],
    revenue: [1500, 2800, 2200, 3200, 2500, 3800]
  };

  const boutiqueStats = {
    totalOrders: stats.total || 0,
    totalRevenue: stats.revenue || 0,
    avgOrderValue: orders.length > 0 ? Math.round(stats.revenue / orders.length) : 0
  };

  const recentClients = orders.slice(0, 3).map(order => ({
    name: order.clientName,
    email: order.clientEmail,
    garmentType: order.garmentType,
    totalMembers: Math.floor(Math.random() * 5) + 1,
    amount: order.amount || 0
  }));

  return (
    <div className="space-y-6">
      {/* Top Row - Header Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Shirt Orders */}
        <div className="bg-elegant-gold rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-elegant-darkGold font-bold text-lg">Shirt Orders</h3>
              <p className="text-white text-2xl font-bold">₹{boutiqueStats.avgOrderValue}</p>
            </div>
            <div className="text-4xl opacity-20">👔</div>
          </div>
        </div>

        {/* Pant Orders */}
        <div className="bg-elegant-purple rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">Pant Orders</h3>
              <p className="text-white text-2xl font-bold">₹{Math.round(boutiqueStats.avgOrderValue * 0.8)}</p>
            </div>
            <div className="text-4xl opacity-20">👖</div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-elegant-darkGold rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">Total Orders</h3>
              <p className="text-white text-2xl font-bold">{boutiqueStats.totalOrders}</p>
            </div>
            <div className="text-4xl opacity-20">📊</div>
          </div>
        </div>
      </div>

      {/* Middle Row - Data Panels */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Clients</h3>
            <button onClick={() => setActiveView('clients')} className="text-elegant-gold hover:underline text-sm">View All</button>
          </div>
          <p className="text-gray-600 text-sm">Overview of latest month</p>

          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-elegant-cream rounded-lg">
                <div className="w-10 h-10 bg-elegant-gold rounded-full flex items-center justify-center text-white font-semibold">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{client.name}</div>
                  <div className="text-sm text-gray-600">{client.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{client.garmentType}</div>
                  <div className="text-sm text-gray-600">{client.totalMembers} items</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-elegant-gold">₹{client.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Statistics</h3>
          <div className="h-40 flex items-end space-x-2">
            {chartData.monthly.map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-elegant-darkGold to-elegant-gold rounded-t-lg"
                style={{ height: `${(height / 8) * 100}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Orders Share */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Orders Share</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Donut Chart */}
              <div className="absolute inset-0 rounded-full border-8 border-elegant-darkGold"></div>
              <div className="absolute inset-2 rounded-full border-6 border-elegant-gold"></div>
              <div className="absolute inset-4 rounded-full border-4 border-elegant-purple"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">Order</div>
                  <div className="text-sm text-gray-600">Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Schedule */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Orders Schedule</h3>
          <div className="relative h-32">
            {/* Line Chart */}
            <svg className="w-full h-full" viewBox="0 0 400 120">
              {/* Gold line */}
              <polyline
                fill="none"
                stroke="#d4a05c"
                strokeWidth="3"
                points="20,100 80,60 140,80 200,40 260,70 320,30 380,50"
              />
              {/* Purple line */}
              <polyline
                fill="none"
                stroke="#6f4382"
                strokeWidth="3"
                points="20,90 80,70 140,90 200,60 260,80 320,50 380,60"
              />
              {/* Gold area fill */}
              <polygon
                fill="rgba(212, 160, 92, 0.2)"
                points="20,100 80,60 140,80 200,40 260,70 320,30 380,50 380,120 20,120"
              />
              {/* Purple area fill */}
              <polygon
                fill="rgba(111, 67, 130, 0.2)"
                points="20,90 80,70 140,90 200,60 260,80 320,50 380,60 380,120 20,120"
              />
            </svg>

            {/* Peak indicator */}
            <div className="absolute top-2 right-8 bg-elegant-darkGold text-white px-3 py-1 rounded-lg text-sm">
              {boutiqueStats.totalOrders} Orders
            </div>

            {/* Peak dot */}
            <div className="absolute top-12 right-16 w-3 h-3 bg-elegant-gold rounded-full"></div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirlineStyleDashboard;