import React from 'react';

function RecentOrders({ orders, setActiveView, setSelectedOrder }) {
  const getStatusBadge = (status) => {
    const styles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (paymentStatus) => {
    return paymentStatus === 'Paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
        <button 
          onClick={() => setActiveView('orders')}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div 
            key={order.id} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              setSelectedOrder(order);
              setActiveView('order-details');
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {order.id}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{order.clientName}</h4>
                <p className="text-sm text-gray-600">{order.garmentType} - {order.fabricType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
              <span className="font-semibold text-gray-800">₹{order.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;
