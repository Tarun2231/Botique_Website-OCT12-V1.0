import React, { useState } from 'react';

function PaymentCheckout({ order, onPaymentComplete, onClose }) {
  const [paymentData, setPaymentData] = useState({
    amount: order.amount,
    paymentMethod: order.paymentMethod,
    transactionId: '',
    notes: '',
    discount: 0,
    tax: 0
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    const subtotal = paymentData.amount - paymentData.discount;
    const taxAmount = subtotal * (paymentData.tax / 100);
    return subtotal + taxAmount;
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData(prev => ({ 
      ...prev, 
      paymentMethod: method,
      transactionId: method === 'Cash' ? '' : generateTransactionId()
    }));
  };

  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TXN_${timestamp}_${random}`.toUpperCase();
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (paymentData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (paymentData.paymentMethod !== 'Cash' && !paymentData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required for non-cash payments';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validatePayment();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const updatedOrder = {
        ...order,
        paymentStatus: 'Paid',
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        paymentDate: new Date().toISOString(),
        paymentNotes: paymentData.notes,
        finalAmount: calculateTotal()
      };
      
      onPaymentComplete(updatedOrder);
      setIsProcessing(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'Cash', name: 'Cash Payment', icon: '💵', description: 'Physical cash payment' },
    { id: 'UPI', name: 'UPI Payment', icon: '📱', description: 'UPI/QR Code payment' },
    { id: 'Card', name: 'Card Payment', icon: '💳', description: 'Credit/Debit card' },
    { id: 'Bank Transfer', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Payment Checkout</h2>
              <p className="text-purple-100">Complete payment for Order #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-semibold">{order.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Garment</p>
              <p className="font-semibold">{order.garmentType} - {order.fabricType}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentData.paymentMethod === method.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{method.name}</div>
                  <div className="text-xs text-gray-600">{method.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Base Amount</label>
              <input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isProcessing}
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (₹)</label>
              <input
                type="number"
                value={paymentData.discount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax (%)</label>
              <input
                type="number"
                value={paymentData.tax}
                onChange={(e) => setPaymentData(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isProcessing}
              />
            </div>

            {paymentData.paymentMethod !== 'Cash' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.transactionId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter transaction ID"
                  disabled={isProcessing}
                />
                {errors.transactionId && <p className="mt-1 text-sm text-red-600">{errors.transactionId}</p>}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Notes</label>
            <textarea
              value={paymentData.notes}
              onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add any payment notes..."
              disabled={isProcessing}
            />
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Amount</span>
                <span>₹{paymentData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-₹{paymentData.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({paymentData.tax}%)</span>
                <span>₹{((paymentData.amount - paymentData.discount) * (paymentData.tax / 100)).toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-purple-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Complete Payment - ₹${calculateTotal().toLocaleString()}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentCheckout;
