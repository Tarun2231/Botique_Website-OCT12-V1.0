import React, { useState } from 'react';

function BillingPayments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      clientName: "Priya Sharma",
      amount: 2500,
      paidAmount: 1500,
      balanceAmount: 1000,
      paymentMethod: "UPI",
      paymentDate: "2024-01-15",
      status: "Partial",
      invoiceNumber: "INV-001",
      description: "Blouse - Silk fabric with embroidery"
    },
    {
      id: 2,
      orderId: "ORD-002",
      clientName: "Rajesh Kumar",
      amount: 4500,
      paidAmount: 4500,
      balanceAmount: 0,
      paymentMethod: "Card",
      paymentDate: "2024-02-20",
      status: "Paid",
      invoiceNumber: "INV-002",
      description: "Formal Shirt - Premium cotton"
    },
    {
      id: 3,
      orderId: "ORD-003",
      clientName: "Sunita Patel",
      amount: 1800,
      paidAmount: 0,
      balanceAmount: 1800,
      paymentMethod: "Cash",
      paymentDate: "2024-03-10",
      status: "Pending",
      invoiceNumber: "INV-003",
      description: "Kurta - Linen fabric"
    }
  ]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const [newPayment, setNewPayment] = useState({
    orderId: '',
    clientName: '',
    amount: '',
    paidAmount: '',
    paymentMethod: 'Cash',
    description: '',
    status: 'Pending'
  });

  const paymentMethods = ['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque'];
  const paymentStatuses = ['Pending', 'Partial', 'Paid', 'Overdue'];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleAddPayment = (e) => {
    e.preventDefault();
    const payment = {
      ...newPayment,
      id: payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1,
      paymentDate: new Date().toISOString().split('T')[0],
      balanceAmount: parseFloat(newPayment.amount) - parseFloat(newPayment.paidAmount),
      invoiceNumber: `INV-${String(payments.length + 1).padStart(3, '0')}`
    };
    setPayments([...payments, payment]);
    resetForm();
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setNewPayment(payment);
    setShowPaymentForm(true);
  };

  const handleUpdatePayment = (e) => {
    e.preventDefault();
    const updatedPayment = {
      ...newPayment,
      balanceAmount: parseFloat(newPayment.amount) - parseFloat(newPayment.paidAmount)
    };
    setPayments(payments.map(payment => 
      payment.id === editingPayment.id ? updatedPayment : payment
    ));
    setEditingPayment(null);
    resetForm();
  };

  const handleDeletePayment = (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(payment => payment.id !== paymentId));
    }
  };

  const resetForm = () => {
    setNewPayment({
      orderId: '',
      clientName: '',
      amount: '',
      paidAmount: '',
      paymentMethod: 'Cash',
      description: '',
      status: 'Pending'
    });
    setShowPaymentForm(false);
  };

  const generateInvoice = (payment) => {
    // In a real app, this would generate a PDF invoice
    const invoiceContent = `
      ELEGANT STITCHES BOUTIQUE
      Invoice: ${payment.invoiceNumber}
      
      Client: ${payment.clientName}
      Order ID: ${payment.orderId}
      Date: ${new Date(payment.paymentDate).toLocaleDateString()}
      
      Description: ${payment.description}
      Total Amount: ₹${payment.amount}
      Paid Amount: ₹${payment.paidAmount}
      Balance: ₹${payment.balanceAmount}
      
      Payment Method: ${payment.paymentMethod}
      Status: ${payment.status}
    `;
    
    // Create and download the invoice
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${payment.invoiceNumber}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculate statistics
  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  const totalPaid = payments.reduce((sum, payment) => sum + parseFloat(payment.paidAmount), 0);
  const totalPending = totalRevenue - totalPaid;
  const paidCount = payments.filter(p => p.status === 'Paid').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-elegant-gold to-elegant-darkGold rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-elegant">Billing & Payments</h1>
            <p className="text-white/90 mt-2">Manage invoices, payments, and financial records</p>
          </div>
          <button
            onClick={() => {
              setShowPaymentForm(true);
              setEditingPayment(null);
              resetForm();
            }}
            className="bg-white/20 hover:bg-white/30 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            + Add Payment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Amount Received</p>
              <p className="text-3xl font-bold text-blue-600">₹{totalPaid.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Amount</p>
              <p className="text-3xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Paid Orders</p>
              <p className="text-3xl font-bold text-purple-600">{paidCount}/{payments.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Methods Distribution</h3>
          <div className="space-y-4">
            {paymentMethods.map(method => {
              const count = payments.filter(p => p.paymentMethod === method).length;
              const percentage = payments.length > 0 ? (count / payments.length) * 100 : 0;
              return (
                <div key={method} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{method}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Status Overview</h3>
          <div className="space-y-4">
            {paymentStatuses.map(status => {
              const count = payments.filter(p => p.status === status).length;
              const amount = payments.filter(p => p.status === status).reduce((sum, p) => sum + parseFloat(p.amount), 0);
              const colorClass = status === 'Paid' ? 'bg-green-100 text-green-800' :
                               status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                               status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                               'bg-red-100 text-red-800';
              return (
                <div key={status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                      {status}
                    </span>
                    <span className="text-sm text-gray-600">{count} orders</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₹{amount.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by client name, order ID, or invoice number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
          >
            <option value="all">All Status</option>
            {paymentStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
          >
            <option value="all">All Methods</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Paid/Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{payment.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{payment.orderId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{payment.clientName}</div>
                    <div className="text-sm text-gray-500">{new Date(payment.paymentDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">₹{parseFloat(payment.amount).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-green-600">₹{parseFloat(payment.paidAmount).toLocaleString()}</div>
                    <div className="text-sm text-red-600">₹{parseFloat(payment.balanceAmount).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                      payment.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => generateInvoice(payment)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Invoice
                      </button>
                      <button
                        onClick={() => handleEditPayment(payment)}
                        className="text-green-600 hover:text-green-800 font-semibold text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePayment(payment.id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
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
      </div>

      {/* Add/Edit Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPayment ? 'Edit Payment' : 'Add New Payment'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={editingPayment ? handleUpdatePayment : handleAddPayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order ID *</label>
                  <input
                    type="text"
                    required
                    value={newPayment.orderId}
                    onChange={(e) => setNewPayment({...newPayment, orderId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newPayment.clientName}
                    onChange={(e) => setNewPayment({...newPayment, clientName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount *</label>
                  <input
                    type="number"
                    required
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Paid Amount *</label>
                  <input
                    type="number"
                    required
                    value={newPayment.paidAmount}
                    onChange={(e) => setNewPayment({...newPayment, paidAmount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method *</label>
                  <select
                    required
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={newPayment.status}
                    onChange={(e) => setNewPayment({...newPayment, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  >
                    {paymentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                  rows={3}
                  placeholder="Description of the order/item..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-elegant-gold hover:bg-elegant-darkGold text-white rounded-lg font-semibold transition-colors"
                >
                  {editingPayment ? 'Update Payment' : 'Add Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingPayments;
