import React from 'react';

function ClientActivity({ orders }) {
  const getRecentActivity = () => {
    const activities = [];
    
    orders.forEach(order => {
      // Order creation activity
      activities.push({
        id: `${order.id}-created`,
        type: 'order_created',
        message: `New order created by ${order.clientName}`,
        details: `${order.garmentType} - ₹${order.amount}`,
        time: order.date,
        icon: '📦',
        color: 'bg-blue-100 text-blue-600'
      });
      
      // Payment activity if paid
      if (order.paymentStatus === 'Paid') {
        activities.push({
          id: `${order.id}-paid`,
          type: 'payment',
          message: `Payment received from ${order.clientName}`,
          details: `₹${order.amount} via ${order.paymentMethod}`,
          time: order.date,
          icon: '💳',
          color: 'bg-green-100 text-green-600'
        });
      }
      
      // Status updates
      if (order.status === 'Delivered') {
        activities.push({
          id: `${order.id}-delivered`,
          type: 'delivery',
          message: `Order delivered to ${order.clientName}`,
          details: `${order.garmentType} completed successfully`,
          time: order.date,
          icon: '✅',
          color: 'bg-green-100 text-green-600'
        });
      } else if (order.status === 'In Progress') {
        activities.push({
          id: `${order.id}-progress`,
          type: 'progress',
          message: `Order in progress for ${order.clientName}`,
          details: `${order.garmentType} being tailored`,
          time: order.date,
          icon: '⚙️',
          color: 'bg-yellow-100 text-yellow-600'
        });
      }
    });
    
    // Sort by date (most recent first)
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 8);
  };

  const activities = getRecentActivity();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
        <button className="text-purple-600 hover:text-purple-800 font-medium">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-lg`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{activity.message}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
              <p className="text-xs text-gray-500 mt-2">{formatTime(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-600">No recent activity</p>
        </div>
      )}
    </div>
  );
}

export default ClientActivity;
