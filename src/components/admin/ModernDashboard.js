import React from 'react';
import AnalyticsCards from './AnalyticsCards';
import OrderAnalytics from './OrderAnalytics';
import RecentOrders from './RecentOrders';
import PaymentGateways from './PaymentGateways';
import ClientActivity from './ClientActivity';
import RevenueChart from './RevenueChart';

function ModernDashboard({ orders, stats }) {
  const enhancedStats = {
    ...stats,
    activeClients: orders.length,
    avgOrderValue: orders.length > 0 ? Math.round(stats.revenue / orders.length) : 0
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-purple-100 text-lg">Your tailoring boutique is performing excellently. Here's your overview.</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-sm">All systems running smoothly</span>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-sm">You have {stats.pending} pending orders</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-purple-100 text-sm">Today</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards stats={enhancedStats} />

      {/* Sales Distribution Banner */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Sales Distribution</h2>
          <p className="text-white/80 mb-6">This is all over Platform Sales Generated</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">₹{enhancedStats.revenue.toLocaleString()}</div>
              <div className="text-sm text-white/80">Total Sales</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">₹{Math.round(enhancedStats.revenue * 0.4).toLocaleString()}</div>
              <div className="text-sm text-white/80">By Website (40%)</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">₹{Math.round(enhancedStats.revenue * 0.25).toLocaleString()}</div>
              <div className="text-sm text-white/80">By Mobile (25%)</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">₹{Math.round(enhancedStats.revenue * 0.20).toLocaleString()}</div>
              <div className="text-sm text-white/80">By Market (20%)</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">₹{Math.round(enhancedStats.revenue * 0.15).toLocaleString()}</div>
              <div className="text-sm text-white/80">By Agent (15%)</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sales Overview</h3>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-20"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-60"></div>
              <div className="absolute inset-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">₹{enhancedStats.revenue.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">₹{enhancedStats.revenue.toLocaleString()} Profit</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">₹{Math.round(enhancedStats.revenue * 0.3).toLocaleString()} Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Updates */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Updates</h3>
          <div className="space-y-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => (
              <div key={month} className="flex items-center space-x-3">
                <div className="w-12 text-sm text-gray-600">{month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-semibold text-gray-800">
                  {Math.floor(Math.random() * 50 + 10)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Sales */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Yearly Sales</h3>
          <div className="h-32 flex items-end space-x-2 mb-4">
            {[40, 65, 45, 80, 55, 90, 75].map((height, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" 
                   style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">₹{enhancedStats.revenue.toLocaleString()} 2025</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <span className="text-gray-600">₹{Math.round(enhancedStats.revenue * 0.8).toLocaleString()} 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Analytics and Recent Orders */}
      <OrderAnalytics orders={orders} />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={orders.slice(0, 5)} />
        <PaymentGateways orders={orders} />
      </div>

      {/* Client Activity */}
      <ClientActivity orders={orders} />
    </div>
  );
}

export default ModernDashboard;
