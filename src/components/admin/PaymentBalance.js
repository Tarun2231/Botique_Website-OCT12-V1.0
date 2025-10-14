import React, { useState, useEffect } from 'react';
import { paymentsAPI } from '../../services/api';

function PaymentBalance({ order, onPaymentAdded }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    paymentMethod: 'cash',
    notes: ''
  });

  useEffect(() => {
    fetchPayments();
  }, [order]);

  const fetchPayments = async () => {
    try {
      const response = await paymentsAPI.getAll({ orderId: order.id });
      if (response.data?.payments) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Mock data for development
      setPayments([
        {
          id: 1,
          amount: 5000,
          paymentMethod: 'cash',
          paymentDate: new Date().toISOString(),
          status: 'completed',
          notes: 'Initial payment'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        order: order.id,
        amount: parseFloat(newPayment.amount),
        paymentMethod: newPayment.paymentMethod,
        notes: newPayment.notes
      };

      const response = await paymentsAPI.create(paymentData);
      if (response.data) {
        setPayments([...payments, response.data.payment]);
        setNewPayment({ amount: '', paymentMethod: 'cash', notes: '' });
        setShowAddPayment(false);
        
        if (onPaymentAdded) {
          onPaymentAdded(response.data.payment);
        }
      }
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Error adding payment. Please try again.');
    }
  };

  const totalPaid = payments.reduce((sum, payment) => sum + (payment.status === 'completed' ? payment.amount : 0), 0);
  const orderTotal = order.pricing?.total || order.amount || 0;
  const balance = orderTotal - totalPaid;

  const getPaymentStatus = () => {
    if (balance <= 0) return 'paid';
    if (totalPaid > 0) return 'partial';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Payment Status</h3>
        <button
          onClick={() => setShowAddPayment(!showAddPayment)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          {showAddPayment ? 'Cancel' : 'Add Payment'}
        </button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Order Total</div>
          <div className="text-lg font-bold text-gray-800">₹{orderTotal.toLocaleString()}</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded">
          <div className="text-sm text-gray-600">Total Paid</div>
          <div className="text-lg font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded">
          <div className="text-sm text-gray-600">Balance</div>
          <div className={`text-lg font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
            ₹{balance.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getPaymentStatus())}`}>
          {getPaymentStatus().toUpperCase()}
        </span>
      </div>

      {/* Add Payment Form */}
      {showAddPayment && (
        <form onSubmit={handleAddPayment} className="mb-4 p-4 bg-gray-50 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                value={newPayment.paymentMethod}
                onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                value={newPayment.notes}
                onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Payment notes"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Record Payment
            </button>
            <button
              type="button"
              onClick={() => setShowAddPayment(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Payment History */}
      {payments.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">Payment History</h4>
          <div className="space-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">₹{payment.amount.toLocaleString()}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({payment.paymentMethod})
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentBalance;
