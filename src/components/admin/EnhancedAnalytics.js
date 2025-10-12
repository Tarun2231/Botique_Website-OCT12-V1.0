import React, { useState } from 'react';

function EnhancedAnalytics({ orders, stats }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const getPeriodData = () => {
    const now = new Date();
    let days = 7;
    
    switch(selectedPeriod) {
      case '30d': days = 30; break;
      case '90d': days = 90; break;
      case '1y': days = 365; break;
      default: days = 7;
    }

    const periodData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = orders.filter(order => order.date === dateStr);
      periodData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => {
          const amount = order.pricing?.total || order.amount || 0;
          return sum + (order.paymentStatus === 'Paid' ? amount : 0);
        }, 0),
        clients: [...new Set(dayOrders.map(order => order.clientName))].length
      });
    }
    
    return periodData;
  };

  const getGarmentTypeStats = () => {
    const stats = {};
    orders.forEach(order => {
      stats[order.garmentType] = (stats[order.garmentType] || 0) + 1;
    });
    
    return Object.entries(stats).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / orders.length) * 100),
      revenue: orders
        .filter(order => order.garmentType === type)
        .reduce((sum, order) => {
          const amount = order.pricing?.total || order.amount || 0;
          return sum + (order.paymentStatus === 'Paid' ? amount : 0);
        }, 0)
    }));
  };

  const getFabricTypeStats = () => {
    const stats = {};
    orders.forEach(order => {
      stats[order.fabricType] = (stats[order.fabricType] || 0) + 1;
    });
    
    return Object.entries(stats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([fabric, count]) => ({
        fabric,
        count,
        percentage: Math.round((count / orders.length) * 100)
      }));
  };

  const getClientStats = () => {
    const clientStats = {};
    orders.forEach(order => {
      if (!clientStats[order.clientName]) {
        clientStats[order.clientName] = {
          name: order.clientName,
          orders: 0,
          totalSpent: 0,
          lastOrder: order.date
        };
      }
      clientStats[order.clientName].orders++;
      if (order.paymentStatus === 'Paid') {
        clientStats[order.clientName].totalSpent += order.amount;
      }
    });
    
    return Object.values(clientStats)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);
  };

  const periodData = getPeriodData();
  const garmentStats = getGarmentTypeStats();
  const fabricStats = getFabricTypeStats();
  const clientStats = getClientStats();
  
  const maxRevenue = Math.max(...periodData.map(d => d.revenue));
  const maxOrders = Math.max(...periodData.map(d => d.orders));

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Analytics Overview</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Revenue Chart */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Daily Revenue Trend</h4>
          <div className="h-32 flex items-end space-x-1">
            {periodData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500"
                  style={{ 
                    height: `${maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0}%`,
                    minHeight: data.revenue > 0 ? '4px' : '0px'
                  }}
                  title={`${data.date}: ₹${data.revenue.toLocaleString()}`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            {periodData.map((data, index) => (
              <span key={index}>{data.date}</span>
            )).filter((_, index) => index % Math.ceil(periodData.length / 8) === 0)}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              ₹{periodData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {periodData.reduce((sum, d) => sum + d.orders, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(periodData.reduce((sum, d) => sum + d.revenue, 0) / periodData.reduce((sum, d) => sum + d.orders, 0) || 0)}
            </div>
            <div className="text-sm text-gray-600">Avg Order Value</div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Garment Type Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Garment Type Performance</h3>
          <div className="space-y-4">
            {garmentStats.map((stat, index) => (
              <div key={stat.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-500' :
                    index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{stat.type}</div>
                    <div className="text-sm text-gray-600">{stat.count} orders ({stat.percentage}%)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">₹{stat.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fabrics */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Fabrics</h3>
          <div className="space-y-3">
            {fabricStats.map((stat, index) => (
              <div key={stat.fabric} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-pink-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{stat.fabric}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{stat.count} orders</span>
                  <span className="text-sm text-gray-500">({stat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Clients</h3>
          <div className="space-y-4">
            {clientStats.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-500' :
                    index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                  }`}>
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{client.name}</div>
                    <div className="text-sm text-gray-600">{client.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">₹{client.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Status Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-800">Pending</span>
              </div>
              <span className="font-semibold text-gray-800">{stats.pending}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-800">In Progress</span>
              </div>
              <span className="font-semibold text-gray-800">{stats.inProgress}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-800">Delivered</span>
              </div>
              <span className="font-semibold text-gray-800">{stats.delivered}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedAnalytics;
