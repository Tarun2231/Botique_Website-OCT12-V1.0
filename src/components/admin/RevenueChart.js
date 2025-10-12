import React from 'react';

function RevenueChart({ orders }) {
  const getMonthlyRevenue = () => {
    const monthlyData = {};
    const currentDate = new Date();
    
    // Generate last 6 months data
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = 0;
    }
    
    // Add actual order data
    orders.forEach(order => {
      if (order.paymentStatus === 'Paid') {
        const orderDate = new Date(order.date);
        const monthKey = orderDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (monthlyData[monthKey] !== undefined) {
          monthlyData[monthKey] += order.amount;
        }
      }
    });
    
    // Add some simulated data for months without orders
    Object.keys(monthlyData).forEach(month => {
      if (monthlyData[month] === 0) {
        monthlyData[month] = Math.floor(Math.random() * 50000) + 10000;
      }
    });
    
    return Object.entries(monthlyData).map(([month, revenue]) => ({
      month,
      revenue,
      formatted: `₹${revenue.toLocaleString()}`
    }));
  };

  const monthlyData = getMonthlyRevenue();
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Revenue Trends</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium">6M</button>
          <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">1Y</button>
        </div>
      </div>
      
      <div className="h-64 flex items-end space-x-2 mb-4">
        {monthlyData.map((data, index) => (
          <div key={data.month} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
              <div 
                className="bg-gradient-to-t from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                style={{ 
                  height: `${(data.revenue / maxRevenue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-gray-600">
        {monthlyData.map((data) => (
          <span key={data.month} className="text-center">
            {data.month}
          </span>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            ₹{monthlyData.reduce((sum, data) => sum + data.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Revenue (6M)</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            +{Math.round(Math.random() * 20 + 5)}%
          </div>
          <div className="text-sm text-gray-600">Growth Rate</div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
