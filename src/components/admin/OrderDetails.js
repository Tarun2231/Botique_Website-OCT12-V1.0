import React, { useState } from 'react';
import PaymentCheckout from './PaymentCheckout';
import PaymentGateway from './PaymentGateway';
import InvoiceGenerator from './InvoiceGenerator';
import MeasurementDetails from './MeasurementDetails';
import PaymentBalance from './PaymentBalance';

function OrderDetails({ order, updateOrder, deleteOrder, setActiveView }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [showPaymentCheckout, setShowPaymentCheckout] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const handleQuickStatusChange = (newStatus) => {
    if (newStatus === 'Delivered') {
      // Show date picker for delivered status
      setShowDatePicker(true);
    } else {
      // Direct status update for other statuses
      const updatedOrder = { ...editedOrder, status: newStatus };
      setEditedOrder(updatedOrder);
      updateOrder(updatedOrder);
    }
  };

  const handleDeliveryDateConfirm = () => {
    if (deliveryDate) {
      const updatedOrder = { 
        ...editedOrder, 
        status: 'Delivered',
        deliveryDate: deliveryDate
      };
      setEditedOrder(updatedOrder);
      updateOrder(updatedOrder);
      setShowDatePicker(false);
      setDeliveryDate('');
    }
  };

  const handleDeliveryDateCancel = () => {
    setShowDatePicker(false);
    setDeliveryDate('');
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

  const handleSave = () => {
    updateOrder(editedOrder);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedOrder({ ...order });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({
      ...prev,
      measurements: { ...prev.measurements, [name]: value }
    }));
  };

  const togglePaymentStatus = () => {
    const newStatus = editedOrder.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    const updated = { ...editedOrder, paymentStatus: newStatus };
    setEditedOrder(updated);
    updateOrder(updated);
  };

  const handlePaymentComplete = (updatedOrder) => {
    updateOrder(updatedOrder);
    setShowPaymentCheckout(false);
  };

  const handleGatewayPaymentSuccess = (updatedOrder) => {
    updateOrder(updatedOrder);
    setShowPaymentGateway(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-elegant-gold to-elegant-darkGold rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-elegant">Order Details</h1>
            <p className="text-white/90 mt-2">Order ID: #{order.id}</p>
          </div>
          <button
            onClick={() => setActiveView('orders')}
            className="bg-white/20 hover:bg-white/30 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            ← Back to Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">👤</span> Client Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
                >
                  Edit Order
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={editedOrder.clientName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedOrder.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedOrder.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editedOrder.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Name</p>
                  <p className="text-gray-800 font-semibold">{order.clientName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-800 font-semibold">{order.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <p className="text-gray-800 font-semibold">{order.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="text-gray-800 font-semibold">{order.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Garment Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">👔</span> Garment Details
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Garment Type</label>
                    <select
                      name="garmentType"
                      value={editedOrder.garmentType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Shirt">Shirt</option>
                      <option value="Pant">Pant</option>
                      <option value="Kurta">Kurta</option>
                      <option value="Blazer">Blazer</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Fabric Type</label>
                    <input
                      type="text"
                      name="fabricType"
                      value={editedOrder.fabricType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Design Notes</label>
                  <textarea
                    name="designNotes"
                    value={editedOrder.designNotes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Garment Type</p>
                    <p className="text-gray-800 font-semibold">{order.garmentType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Fabric Type</p>
                    <p className="text-gray-800 font-semibold">{order.fabricType}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Design Notes</p>
                  <p className="text-gray-800">{order.designNotes || 'No notes provided'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📏</span> Measurements (inches)
            </h2>

            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(editedOrder.measurements).map(key => (
                  editedOrder.measurements[key] !== '' && (
                    <div key={key}>
                      <label className="block text-gray-700 font-semibold mb-2 capitalize">{key}</label>
                      <input
                        type="text"
                        name={key}
                        value={editedOrder.measurements[key]}
                        onChange={handleMeasurementChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {Object.entries(order.measurements).map(([key, value]) => (
                  value && (
                    <div key={key} className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-gray-600 mb-1 capitalize">{key}</p>
                      <p className="text-gray-800 font-semibold text-lg">{value}"</p>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Status & Payment */}
        <div className="space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📋</span> Order Status
            </h2>

            {/* Current Status Display */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border-2 border-gray-200">
                      <span className="text-2xl">{getStatusIcon(editedOrder.status)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Current Status</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(editedOrder.status)} shadow-sm`}>
                        {editedOrder.status}
                      </span>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <span>✏️</span>
                      <span>Edit Status</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

              {/* Quick Status Change Buttons */}
              {!isEditing && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">⚡</span> Quick Status Update
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['Pending', 'In Progress', 'Delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleQuickStatusChange(status)}
                        disabled={editedOrder.status === status}
                        className={`group flex flex-col items-center justify-center space-y-2 px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                          editedOrder.status === status
                            ? 'bg-gradient-to-br from-purple-200 to-purple-300 text-purple-900 cursor-not-allowed border-2 border-purple-400 shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 hover:text-purple-800 border border-gray-200 hover:border-purple-300 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {getStatusIcon(status)}
                        </span>
                        <span className="text-xs font-bold">{status}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Edit Mode Status Dropdown */}
              {isEditing && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                  <select
                    name="status"
                    value={editedOrder.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">⚙️ In Progress</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>
              )}
            </div>

            {/* Order Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">📄</span> Order Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-gray-600 text-xs font-medium">Order Date</span>
                  <p className="text-gray-800 font-bold">{order.date}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-gray-600 text-xs font-medium">Order ID</span>
                  <p className="text-gray-800 font-bold">#{order.id}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-gray-600 text-xs font-medium">Client Name</span>
                  <p className="text-gray-800 font-bold">{order.clientName}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-gray-600 text-xs font-medium">Garment Type</span>
                  <p className="text-gray-800 font-bold">{order.garmentType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">💳</span> Payment Details
            </h2>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-2">Total Amount</p>
                <p className="text-3xl font-bold text-gray-800">₹{order.amount}</p>
              </div>

              {order.advanceAmount && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm mb-2">Advance Paid</p>
                  <p className="text-2xl font-bold text-yellow-800">₹{order.advanceAmount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Remaining: ₹{order.amount - order.advanceAmount}
                  </p>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-gray-800 font-semibold">{order.paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={togglePaymentStatus}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
                  editedOrder.paymentStatus === 'Paid'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Mark as {editedOrder.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid'}
              </button>
              
              {editedOrder.paymentStatus === 'Unpaid' && (
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => setShowPaymentGateway(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    💳 Pay Now
                  </button>
                  <button
                    onClick={() => setShowPaymentCheckout(true)}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    ⚙️ Manual Payment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payment Balance */}
          <PaymentBalance 
            order={order} 
            onPaymentAdded={(payment) => {
              // Update order with new payment info
              console.log('Payment added:', payment);
            }}
          />

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowInvoice(true)}
                className="w-full px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition"
              >
                📋 Generate Invoice
              </button>
              <button
                onClick={() => setShowMeasurements(true)}
                className="w-full px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition"
              >
                📏 View Measurements
              </button>
              <button
                onClick={() => window.print()}
                className="w-full px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
              >
                🖨️ Print Order
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
                className="w-full px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
              >
                🗑️ Delete Order
              </button>
            </div>
          </div>
        </div>

      {/* Modals */}
      {showPaymentGateway && (
        <PaymentGateway
          order={editedOrder}
          onPaymentSuccess={handleGatewayPaymentSuccess}
          onClose={() => setShowPaymentGateway(false)}
        />
      )}

      {showPaymentCheckout && (
        <PaymentCheckout
          order={editedOrder}
          onPaymentComplete={handlePaymentComplete}
          onClose={() => setShowPaymentCheckout(false)}
        />
      )}

      {showInvoice && (
        <InvoiceGenerator
          order={editedOrder}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {showMeasurements && (
        <MeasurementDetails
          order={editedOrder}
          onClose={() => setShowMeasurements(false)}
        />
      )}

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
                Order: <span className="font-semibold">#{editedOrder.id} - {editedOrder.clientName}</span>
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

export default OrderDetails;

