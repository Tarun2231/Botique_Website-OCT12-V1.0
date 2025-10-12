import React, { useState } from 'react';
import PaymentCheckout from './PaymentCheckout';
import PaymentGateway from './PaymentGateway';
import InvoiceGenerator from './InvoiceGenerator';
import MeasurementDetails from './MeasurementDetails';

function OrderDetails({ order, updateOrder, deleteOrder, setActiveView }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState({ ...order });
  const [showPaymentCheckout, setShowPaymentCheckout] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);

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
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
          <p className="text-gray-600">Order ID: #{order.id}</p>
        </div>
        <button
          onClick={() => setActiveView('orders')}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          ← Back to Orders
        </button>
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

            {isEditing ? (
              <select
                name="status"
                value={editedOrder.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            ) : (
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="text-gray-800 font-semibold">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="text-gray-800 font-semibold">#{order.id}</span>
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
    </div>
  );
}

export default OrderDetails;

