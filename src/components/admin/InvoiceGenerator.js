import React, { useState } from 'react';

function InvoiceGenerator({ order, onClose }) {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${order.id}-${Date.now().toString().slice(-4)}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    taxRate: 18,
    discount: 0,
    notes: 'Thank you for choosing Elegant Stitches!',
    terms: 'Payment due within 30 days of invoice date.'
  });

  const calculateInvoiceTotal = () => {
    const subtotal = order.amount - invoiceData.discount;
    const tax = subtotal * (invoiceData.taxRate / 100);
    return subtotal + tax;
  };

  const downloadInvoice = () => {
    // Create invoice HTML content
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #7c3aed; margin-bottom: 10px; }
          .invoice-title { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .invoice-number { font-size: 16px; color: #666; }
          .company-info { margin-bottom: 30px; }
          .billing-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .info-section h3 { margin-bottom: 10px; color: #333; }
          .info-section p { margin: 5px 0; color: #666; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .items-table th { background-color: #f8f9fa; font-weight: bold; }
          .totals { text-align: right; margin-top: 20px; }
          .total-row { display: flex; justify-content: space-between; padding: 5px 0; }
          .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Elegant Stitches</div>
          <div class="invoice-title">INVOICE</div>
          <div class="invoice-number">${invoiceData.invoiceNumber}</div>
        </div>
        
        <div class="company-info">
          <p><strong>Elegant Stitches Boutique</strong></p>
          <p>123 Fashion Street, Boutique Plaza</p>
          <p>Downtown City, State 560001</p>
          <p>Phone: +91 9876543210 | Email: info@elegantstitches.com</p>
        </div>
        
        <div class="billing-info">
          <div class="info-section">
            <h3>Bill To:</h3>
            <p><strong>${order.clientName}</strong></p>
            <p>${order.address}</p>
            <p>Phone: ${order.phone}</p>
            <p>Email: ${order.email}</p>
          </div>
          <div class="info-section">
            <h3>Invoice Details:</h3>
            <p><strong>Invoice Date:</strong> ${new Date(invoiceData.issueDate).toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${new Date(invoiceData.dueDate).toLocaleDateString()}</p>
            <p><strong>Order ID:</strong> #${order.id}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          </div>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Fabric</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Custom ${order.garmentType} Stitching</td>
              <td>${order.garmentType}</td>
              <td>${order.fabricType}</td>
              <td>₹${order.amount.toLocaleString()}</td>
            </tr>
            ${order.designNotes ? `<tr><td colspan="3"><strong>Design Notes:</strong> ${order.designNotes}</td><td></td></tr>` : ''}
          </tbody>
        </table>
        
        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${order.amount.toLocaleString()}</span>
          </div>
          ${invoiceData.discount > 0 ? `
          <div class="total-row">
            <span>Discount:</span>
            <span>-₹${invoiceData.discount.toLocaleString()}</span>
          </div>
          ` : ''}
          <div class="total-row">
            <span>Tax (${invoiceData.taxRate}%):</span>
            <span>₹${((order.amount - invoiceData.discount) * (invoiceData.taxRate / 100)).toLocaleString()}</span>
          </div>
          <div class="total-row total-final">
            <span>Total Amount:</span>
            <span>₹${calculateInvoiceTotal().toLocaleString()}</span>
          </div>
        </div>
        
        ${invoiceData.notes ? `
        <div style="margin-top: 30px;">
          <h3>Notes:</h3>
          <p>${invoiceData.notes}</p>
        </div>
        ` : ''}
        
        ${invoiceData.terms ? `
        <div style="margin-top: 20px;">
          <h3>Terms & Conditions:</h3>
          <p>${invoiceData.terms}</p>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>Thank you for choosing Elegant Stitches!</p>
          <p>For any queries, contact us at info@elegantstitches.com</p>
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${invoiceData.invoiceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    // For a real implementation, you would use a library like jsPDF or html2pdf
    alert('PDF download would be implemented with jsPDF library in production');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Generate Invoice</h2>
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
          {/* Invoice Settings */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Date</label>
              <input
                type="date"
                value={invoiceData.issueDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, issueDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={invoiceData.taxRate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (₹)</label>
              <input
                type="number"
                value={invoiceData.discount}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-lg font-semibold text-purple-600">
                ₹{calculateInvoiceTotal().toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Notes</label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add any notes for the invoice..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Terms & Conditions</label>
            <textarea
              value={invoiceData.terms}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
              rows="2"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add terms and conditions..."
            />
          </div>

          {/* Invoice Preview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Preview</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-purple-600">Elegant Stitches</h2>
                <h3 className="text-xl font-semibold">INVOICE</h3>
                <p className="text-gray-600">{invoiceData.invoiceNumber}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold">Bill To:</h4>
                  <p>{order.clientName}</p>
                  <p>{order.address}</p>
                  <p>{order.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Invoice Details:</h4>
                  <p>Date: {new Date(invoiceData.issueDate).toLocaleDateString()}</p>
                  <p>Due: {new Date(invoiceData.dueDate).toLocaleDateString()}</p>
                  <p>Order: #{order.id}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">₹{calculateInvoiceTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              📄 Download PDF
            </button>
            <button
              onClick={downloadInvoice}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition"
            >
              📋 Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceGenerator;
