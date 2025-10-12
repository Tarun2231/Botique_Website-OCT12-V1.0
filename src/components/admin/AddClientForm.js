import React, { useState } from 'react';

function AddClientForm({ addOrder, setActiveView }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    address: '',
    garmentType: 'Shirt',
    fabricType: '',
    designNotes: '',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
    amount: '',
    advanceAmount: '',
    measurements: {
      chest: '',
      waist: '',
      hip: '',
      sleeve: '',
      length: '',
      shoulder: '',
      neck: '',
      inseam: '',
      thigh: '',
      knee: '',
      bottom: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.fabricType.trim()) newErrors.fabricType = 'Fabric type is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
    
    // Validate advance amount
    if (formData.advanceAmount && (formData.advanceAmount < 0 || formData.advanceAmount > formData.amount)) {
      newErrors.advanceAmount = 'Advance amount cannot be negative or greater than total amount';
    }

    // Check at least some measurements are provided
    const hasMeasurements = Object.values(formData.measurements).some(val => val.trim() !== '');
    if (!hasMeasurements) {
      newErrors.measurements = 'At least some measurements are required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-set payment status based on advance amount
      if (name === 'advanceAmount' || name === 'amount') {
        const totalAmount = parseFloat(newData.amount) || 0;
        const advanceAmount = parseFloat(newData.advanceAmount) || 0;
        
        if (advanceAmount === 0) {
          newData.paymentStatus = 'Unpaid';
        } else if (advanceAmount >= totalAmount) {
          newData.paymentStatus = 'Paid';
        } else {
          newData.paymentStatus = 'Partial';
        }
      }
      
      return newData;
    });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      measurements: { ...prev.measurements, [name]: value }
    }));
    if (errors.measurements) {
      setErrors(prev => ({ ...prev, measurements: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      addOrder(formData);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        clientName: '',
        phone: '',
        email: '',
        address: '',
        garmentType: 'Shirt',
        fabricType: '',
        designNotes: '',
        status: 'Pending',
        paymentStatus: 'Unpaid',
        paymentMethod: 'Cash',
        amount: '',
        measurements: {
          chest: '', waist: '', hip: '', sleeve: '', length: '',
          shoulder: '', neck: '', inseam: '', thigh: '', knee: '', bottom: ''
        }
      });

      setTimeout(() => {
        setShowSuccess(false);
        setActiveView('orders');
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  const getMeasurementFields = () => {
    if (formData.garmentType === 'Shirt') {
      return ['chest', 'waist', 'sleeve', 'length', 'shoulder', 'neck'];
    } else if (formData.garmentType === 'Pant') {
      return ['waist', 'hip', 'length', 'inseam', 'thigh', 'knee', 'bottom'];
    } else {
      return ['chest', 'waist', 'hip', 'sleeve', 'length', 'shoulder', 'neck', 'inseam'];
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Client Order</h1>
        <p className="text-gray-600 mb-8">Fill in the details to create a new tailoring order</p>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">✓ Order created successfully!</p>
            <p className="text-green-700 text-sm">Redirecting to orders page...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👤</span> Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Client Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.clientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.clientName && <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Garment Details */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👔</span> Garment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Garment Type *</label>
                <select
                  name="garmentType"
                  value={formData.garmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Kurta">Kurta</option>
                  <option value="Blazer">Blazer</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Fabric Type *</label>
                <input
                  type="text"
                  name="fabricType"
                  value={formData.fabricType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.fabricType ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Cotton, Silk, Linen..."
                />
                {errors.fabricType && <p className="mt-1 text-sm text-red-600">{errors.fabricType}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Design Notes</label>
                <textarea
                  name="designNotes"
                  value={formData.designNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Special design requirements, preferences, etc..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📏</span> Measurements (in inches)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getMeasurementFields().map(field => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold mb-2 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData.measurements[field]}
                    onChange={handleMeasurementChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
            {errors.measurements && <p className="mt-2 text-sm text-red-600">{errors.measurements}</p>}
          </div>

          {/* Order Status & Payment */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">💳</span> Order Status & Payment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Order Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Total Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2500"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Advance Amount</label>
                <input
                  type="number"
                  name="advanceAmount"
                  value={formData.advanceAmount}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.advanceAmount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1000"
                />
                {errors.advanceAmount && <p className="mt-1 text-sm text-red-600">{errors.advanceAmount}</p>}
                <p className="mt-1 text-sm text-gray-500">Optional: Enter advance payment amount if client pays upfront</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Payment Status *</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-6 border-t flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Create Order
            </button>
            <button
              type="button"
              onClick={() => setActiveView('orders')}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClientForm;

