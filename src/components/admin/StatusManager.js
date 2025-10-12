import React, { useState } from 'react';

function StatusManager({ orders, updateOrder, setActiveView, setSelectedOrder }) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOrder, setSelectedOrderForDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  const getStatusBadge = (status) => {
    const styles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return '⏳';
      case 'In Progress': return '⚙️';
      case 'Delivered': return '✅';
      default: return '📋';
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    switch(paymentStatus) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (order, newStatus) => {
    if (newStatus === 'Delivered') {
      // Show date picker for delivered status
      setSelectedOrderForDate(order);
      setShowDatePicker(true);
    } else {
      // Direct status update for other statuses
      const updatedOrder = { ...order, status: newStatus };
      updateOrder(updatedOrder);
    }
  };

  const handleDeliveryDateConfirm = () => {
    if (selectedOrder && deliveryDate) {
      const updatedOrder = { 
        ...selectedOrder, 
        status: 'Delivered',
        deliveryDate: deliveryDate
      };
      updateOrder(updatedOrder);
      setShowDatePicker(false);
      setSelectedOrderForDate(null);
      setDeliveryDate('');
    }
  };

  const handleDeliveryDateCancel = () => {
    setShowDatePicker(false);
    setSelectedOrderForDate(null);
    setDeliveryDate('');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    'Pending': orders.filter(o => o.status === 'Pending').length,
    'In Progress': orders.filter(o => o.status === 'In Progress').length,
    'Delivered': orders.filter(o => o.status === 'Delivered').length
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Status Manager</h1>
            <p className="text-gray-600">Manage order statuses and track progress</p>
          </div>
          <button
            onClick={() => setActiveView('orders')}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            ← Back to Orders
          </button>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Pending Orders</h3>
                <p className="text-3xl font-bold text-yellow-900">{statusCounts['Pending']}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">In Progress</h3>
                <p className="text-3xl font-bold text-blue-900">{statusCounts['In Progress']}</p>
              </div>
              <div className="text-4xl">⚙️</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Delivered</h3>
                <p className="text-3xl font-bold text-green-900">{statusCounts['Delivered']}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <input
                type="text"
                placeholder="Search by client name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">⚙️ In Progress</option>
                <option value="Delivered">✅ Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Orders ({filteredOrders.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                        <span className="text-2xl">{getStatusIcon(order.status)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          #{order.id} - {order.clientName}
                        </h3>
                        <p className="text-sm text-gray-600">{order.garmentType} • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => {
                          setActiveView('order-details');
                          setSelectedOrder(order);
                        }}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Quick Status Change */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Status Update</h4>
                    <div className="flex space-x-3">
                      {['Pending', 'In Progress', 'Delivered'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(order, status)}
                          disabled={order.status === status}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                            order.status === status
                              ? 'bg-purple-200 text-purple-800 cursor-not-allowed border-2 border-purple-300'
                              : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-800 border border-gray-200 hover:border-purple-300 shadow-sm'
                          }`}
                        >
                          <span className="text-lg">{getStatusIcon(status)}</span>
                          <span>{status}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No orders found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Set Delivery Date</h3>
              <button
                onClick={handleDeliveryDateCancel}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Order: <span className="font-semibold">#{selectedOrder?.id} - {selectedOrder?.clientName}</span>
              </p>
              <p className="text-sm text-gray-500">
                Please select the delivery date for this order.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeliveryDateCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeliveryDateConfirm}
                disabled={!deliveryDate}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                  deliveryDate
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ✅ Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusManager;
