import React, { useState } from 'react';

function PaymentGateway({ order, onPaymentSuccess, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: order.amount,
    currency: 'INR',
    discount: 0,
    tax: 0,
    notes: ''
  });

  const calculateTotal = () => {
    const subtotal = paymentDetails.amount - paymentDetails.discount;
    const taxAmount = subtotal * (paymentDetails.tax / 100);
    return subtotal + taxAmount;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processRazorpayPayment = async () => {
    setIsProcessing(true);
    
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please try again.');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
      amount: calculateTotal() * 100, // Amount in paise
      currency: paymentDetails.currency,
      name: 'Elegant Stitches',
      description: `Payment for Order #${order.id} - ${order.garmentType}`,
      image: '/logo.png', // Your logo URL
      order_id: `order_${order.id}_${Date.now()}`, // Generate order ID
      handler: function (response) {
        // Payment successful
        const updatedOrder = {
          ...order,
          paymentStatus: 'Paid',
          paymentMethod: 'Razorpay',
          transactionId: response.razorpay_payment_id,
          paymentDate: new Date().toISOString(),
          finalAmount: calculateTotal()
        };
        onPaymentSuccess(updatedOrder);
        setIsProcessing(false);
      },
      prefill: {
        name: order.clientName,
        email: order.email,
        contact: order.phone
      },
      notes: {
        order_id: order.id,
        garment_type: order.garmentType,
        fabric_type: order.fabricType
      },
      theme: {
        color: '#7c3aed'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const processUPIPayment = () => {
    setIsProcessing(true);
    
    // Simulate UPI payment
    setTimeout(() => {
      const upiId = `elegantstitches@paytm`; // Your UPI ID
      const amount = calculateTotal();
      const note = `Payment for Order #${order.id}`;
      
      // Create UPI payment URL
      const upiUrl = `upi://pay?pa=${upiId}&pn=Elegant%20Stitches&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
      
      // Open UPI app or show QR code
      window.open(upiUrl, '_blank');
      
      // For demo purposes, simulate successful payment after 3 seconds
      setTimeout(() => {
        const updatedOrder = {
          ...order,
          paymentStatus: 'Paid',
          paymentMethod: 'UPI',
          transactionId: `UPI_${Date.now()}`,
          paymentDate: new Date().toISOString(),
          finalAmount: calculateTotal()
        };
        onPaymentSuccess(updatedOrder);
        setIsProcessing(false);
      }, 3000);
    }, 1000);
  };

  const processCashPayment = () => {
    setIsProcessing(true);
    
    // Simulate cash payment confirmation
    setTimeout(() => {
      const updatedOrder = {
        ...order,
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        transactionId: `CASH_${Date.now()}`,
        paymentDate: new Date().toISOString(),
        finalAmount: calculateTotal()
      };
      onPaymentSuccess(updatedOrder);
      setIsProcessing(false);
    }, 1500);
  };

  const handlePayment = () => {
    switch(paymentMethod) {
      case 'razorpay':
        processRazorpayPayment();
        break;
      case 'upi':
        processUPIPayment();
        break;
      case 'cash':
        processCashPayment();
        break;
      default:
        alert('Please select a payment method');
    }
  };

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Online Payment',
      description: 'Credit/Debit Card, Net Banking, UPI',
      icon: '💳',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Paytm, PhonePe, Google Pay',
      icon: '📱',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      description: 'Pay at store or on delivery',
      icon: '💵',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Complete Payment</h2>
              <p className="text-purple-100">Order #{order.id} - {order.clientName}</p>
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

        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Garment</p>
                <p className="font-semibold">{order.garmentType} - {order.fabricType}</p>
              </div>
              <div>
                <p className="text-gray-600">Client</p>
                <p className="font-semibold">{order.clientName}</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {method.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">{method.name}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Amount */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Amount</label>
                <input
                  type="number"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (₹)</label>
                <input
                  type="number"
                  value={paymentDetails.discount}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isProcessing}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax (%)</label>
              <input
                type="number"
                value={paymentDetails.tax}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Amount</span>
                <span>₹{paymentDetails.amount.toLocaleString()}</span>
              </div>
              {paymentDetails.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹{paymentDetails.discount.toLocaleString()}</span>
                </div>
              )}
              {paymentDetails.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({paymentDetails.tax}%)</span>
                  <span>₹{((paymentDetails.amount - paymentDetails.discount) * (paymentDetails.tax / 100)).toLocaleString()}</span>
                </div>
              )}
              <hr className="border-gray-300" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-purple-600">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Notes (Optional)</label>
            <textarea
              value={paymentDetails.notes}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add any payment notes..."
              disabled={isProcessing}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
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
                `Pay Now - ₹${calculateTotal().toLocaleString()}`
              )}
            </button>
          </div>

          {/* Payment Method Info */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Payment Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Online payments are processed securely via Razorpay</li>
              <li>• UPI payments redirect to your preferred UPI app</li>
              <li>• Cash payments can be made at store or on delivery</li>
              <li>• All transactions are encrypted and secure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
