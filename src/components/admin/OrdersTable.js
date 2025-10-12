import React from 'react';

function OrdersTable({ 
  orders, 
  setSelectedOrder, 
  setActiveView, 
  deleteOrder,
  updateOrder,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}) {
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

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return '⏳';
      case 'In Progress': return '⚙️';
      case 'Delivered': return '✅';
      default: return '📋';
    }
  };

  const handleQuickStatusChange = (order, newStatus) => {
    const updatedOrder = { ...order, status: newStatus };
    if (updateOrder) {
      updateOrder(updatedOrder);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setActiveView('order-details');
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setActiveView('order-details');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Orders</h1>
        <p className="text-gray-600">Manage and track all client orders</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Search Orders</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name or order ID..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding a new client order'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Client Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Garment Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleViewDetails(order)}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.clientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.garmentType}</td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)} inline-block w-fit`}>
                          {order.status}
                        </span>
                        <div className="flex space-x-1">
                          {['Pending', 'In Progress', 'Delivered'].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleQuickStatusChange(order, status)}
                              disabled={order.status === status}
                              className={`p-1 rounded text-xs transition ${
                                order.status === status
                                  ? 'bg-purple-100 text-purple-700 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                              }`}
                              title={`Change to ${status}`}
                            >
                              {getStatusIcon(status)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">₹{order.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {orders.length > 0 && (
        <div className="mt-4 text-center text-gray-600">
          Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default OrdersTable;

