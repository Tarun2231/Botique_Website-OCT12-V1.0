import React from 'react';

function OrderAnalytics({ orders }) {
  // Calculate analytics data
  const getOrderTrends = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = orders.filter(order => order.date === dateStr);
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + (order.paymentStatus === 'Paid' ? order.amount : 0), 0)
      });
    }
    
    return last7Days;
  };

  const getGarmentTypeDistribution = () => {
    const distribution = {};
    orders.forEach(order => {
      distribution[order.garmentType] = (distribution[order.garmentType] || 0) + 1;
    });
    return Object.entries(distribution).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / orders.length) * 100)
    }));
  };

  const getPaymentStatusDistribution = () => {
    const paid = orders.filter(order => order.paymentStatus === 'Paid').length;
    const unpaid = orders.filter(order => order.paymentStatus === 'Unpaid').length;
    
    return [
      { status: 'Paid', count: paid, percentage: Math.round((paid / orders.length) * 100), color: 'bg-green-500' },
      { status: 'Unpaid', count: unpaid, percentage: Math.round((unpaid / orders.length) * 100), color: 'bg-red-500' }
    ];
  };

  const trends = getOrderTrends();
  const garmentDistribution = getGarmentTypeDistribution();
  const paymentDistribution = getPaymentStatusDistribution();

  const maxOrders = Math.max(...trends.map(t => t.orders));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Order Trends Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Order Trends (Last 7 Days)</h3>
          <div className="text-sm text-gray-500">Orders</div>
        </div>
        
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-gray-600">{trend.date}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(trend.orders / maxOrders) * 100}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-800">{trend.orders}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Orders (7 days):</span>
            <span className="font-semibold text-gray-800">{trends.reduce((sum, t) => sum + t.orders, 0)}</span>
          </div>
        </div>
      </div>

      {/* Garment Type Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Garment Types</h3>
        
        <div className="space-y-4">
          {garmentDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  'bg-pink-500'
                }`}></div>
                <span className="text-gray-800 font-medium">{item.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{item.count}</span>
                <span className="text-sm text-gray-500">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Most Popular:</span>
            <span className="font-semibold text-gray-800">{garmentDistribution[0]?.type || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderAnalytics;
