import React from 'react';

function PaymentGateways({ orders }) {
  const getPaymentMethodStats = () => {
    const methods = {};
    orders.forEach(order => {
      methods[order.paymentMethod] = (methods[order.paymentMethod] || 0) + 1;
    });
    
    return Object.entries(methods).map(([method, count]) => ({
      method,
      count,
      amount: orders
        .filter(order => order.paymentMethod === method)
        .reduce((sum, order) => sum + order.amount, 0),
      percentage: Math.round((count / orders.length) * 100)
    }));
  };

  const paymentMethods = getPaymentMethodStats();
  const totalTransactions = orders.reduce((sum, order) => sum + order.amount, 0);

  const getMethodIcon = (method) => {
    switch(method) {
      case 'UPI': return '💳';
      case 'Card': return '💳';
      case 'Cash': return '💵';
      case 'Bank Transfer': return '🏦';
      default: return '💰';
    }
  };

  const getMethodColor = (method) => {
    switch(method) {
      case 'UPI': return 'bg-blue-500';
      case 'Card': return 'bg-purple-500';
      case 'Cash': return 'bg-green-500';
      case 'Bank Transfer': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Gateways</h3>
      
      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <div key={method.method} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 ${getMethodColor(method.method)} rounded-full flex items-center justify-center text-white`}>
                {getMethodIcon(method.method)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{method.method}</h4>
                <p className="text-sm text-gray-600">{method.count} transactions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">₹{method.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{method.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Transactions:</span>
          <span className="text-2xl font-bold text-purple-600">₹{totalTransactions.toLocaleString()}</span>
        </div>
        <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
          View All Transactions
        </button>
      </div>
    </div>
  );
}

export default PaymentGateways;
