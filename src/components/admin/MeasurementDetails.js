import React, { useState } from 'react';

function MeasurementDetails({ order, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [measurements, setMeasurements] = useState(order.measurements);

  const getMeasurementFields = () => {
    if (order.garmentType === 'Shirt') {
      return [
        { key: 'chest', label: 'Chest', description: 'Around the fullest part of chest' },
        { key: 'waist', label: 'Waist', description: 'Around the natural waistline' },
        { key: 'sleeve', label: 'Sleeve Length', description: 'From shoulder to wrist' },
        { key: 'length', label: 'Shirt Length', description: 'From shoulder to hem' },
        { key: 'shoulder', label: 'Shoulder Width', description: 'Across shoulder blades' },
        { key: 'neck', label: 'Neck Size', description: 'Around the neck base' }
      ];
    } else if (order.garmentType === 'Pant') {
      return [
        { key: 'waist', label: 'Waist', description: 'Around the waistline' },
        { key: 'hip', label: 'Hip', description: 'Around the fullest part of hips' },
        { key: 'length', label: 'Pant Length', description: 'From waist to ankle' },
        { key: 'inseam', label: 'Inseam', description: 'From crotch to ankle' },
        { key: 'thigh', label: 'Thigh', description: 'Around the fullest part of thigh' },
        { key: 'knee', label: 'Knee', description: 'Around the knee area' },
        { key: 'bottom', label: 'Bottom Width', description: 'Width at the bottom hem' }
      ];
    } else {
      return [
        { key: 'chest', label: 'Chest', description: 'Around the fullest part of chest' },
        { key: 'waist', label: 'Waist', description: 'Around the natural waistline' },
        { key: 'hip', label: 'Hip', description: 'Around the fullest part of hips' },
        { key: 'sleeve', label: 'Sleeve Length', description: 'From shoulder to wrist' },
        { key: 'length', label: 'Length', description: 'From shoulder to hem' },
        { key: 'shoulder', label: 'Shoulder Width', description: 'Across shoulder blades' },
        { key: 'neck', label: 'Neck Size', description: 'Around the neck base' },
        { key: 'inseam', label: 'Inseam', description: 'From crotch to ankle' }
      ];
    }
  };

  const handleMeasurementChange = (key, value) => {
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const downloadMeasurements = () => {
    const measurementFields = getMeasurementFields();
    const availableMeasurements = measurementFields.filter(field => measurements[field.key]);
    
    // Create measurements HTML content
    const measurementsHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Measurement Details - Order #${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #7c3aed; margin-bottom: 10px; }
          .title { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 16px; color: #666; }
          .client-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .measurements-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .measurements-table th, .measurements-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .measurements-table th { background-color: #f8f9fa; font-weight: bold; }
          .measurements-table td:last-child { text-align: right; font-weight: bold; color: #7c3aed; }
          .notes-section { margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 14px; }
          .date-info { text-align: right; color: #666; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="date-info">
          Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </div>
        
        <div class="header">
          <div class="logo">Elegant Stitches</div>
          <div class="title">MEASUREMENT DETAILS</div>
          <div class="subtitle">Order #${order.id}</div>
        </div>
        
        <div class="client-info">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> ${order.clientName}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Address:</strong> ${order.address}</p>
        </div>
        
        <div class="client-info">
          <h3>Order Details</h3>
          <p><strong>Garment Type:</strong> ${order.garmentType}</p>
          <p><strong>Fabric Type:</strong> ${order.fabricType}</p>
          <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          ${order.designNotes ? `<p><strong>Design Notes:</strong> ${order.designNotes}</p>` : ''}
        </div>
        
        <table class="measurements-table">
          <thead>
            <tr>
              <th>Measurement</th>
              <th>Description</th>
              <th>Value (inches)</th>
            </tr>
          </thead>
          <tbody>
            ${availableMeasurements.map(field => `
              <tr>
                <td><strong>${field.label}</strong></td>
                <td>${field.description}</td>
                <td>${measurements[field.key]}"</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="notes-section">
          <h3>Important Notes</h3>
          <ul>
            <li>All measurements are in inches</li>
            <li>Measurements were taken while wearing light clothing</li>
            <li>Please contact us if you notice any discrepancies</li>
            <li>These measurements are for custom tailoring purposes only</li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>Elegant Stitches Boutique</strong></p>
          <p>123 Fashion Street, Boutique Plaza, Downtown City, State 560001</p>
          <p>Phone: +91 9876543210 | Email: info@elegantstitches.com</p>
          <p>Thank you for choosing our tailoring services!</p>
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([measurementsHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Measurements_Order_${order.id}_${order.clientName.replace(' ', '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const measurementFields = getMeasurementFields();
  const availableMeasurements = measurementFields.filter(field => measurements[field.key]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Measurement Details</h2>
              <p className="text-purple-100">Order #{order.id} - {order.clientName}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={downloadMeasurements}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
              >
                📋 Download
              </button>
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
        </div>

        <div className="p-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {order.clientName}</p>
                <p><span className="font-medium">Phone:</span> {order.phone}</p>
                <p><span className="font-medium">Email:</span> {order.email}</p>
                <p><span className="font-medium">Address:</span> {order.address}</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Garment:</span> {order.garmentType}</p>
                <p><span className="font-medium">Fabric:</span> {order.fabricType}</p>
                <p><span className="font-medium">Order Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> {order.status}</p>
              </div>
            </div>
          </div>

          {/* Edit Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Measurements (inches)</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isEditing 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isEditing ? '✅ Save Changes' : '✏️ Edit Measurements'}
            </button>
          </div>

          {/* Measurements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {measurementFields.map((field) => (
              <div key={field.key} className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={measurements[field.key] || ''}
                    onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter measurement"
                  />
                ) : (
                  <div className="text-2xl font-bold text-purple-600">
                    {measurements[field.key] ? `${measurements[field.key]}"` : 'N/A'}
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-1">{field.description}</p>
              </div>
            ))}
          </div>

          {/* Measurement Summary */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Measurement Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{availableMeasurements.length}</div>
                <div className="text-sm text-gray-600">Total Measurements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{order.garmentType}</div>
                <div className="text-sm text-gray-600">Garment Type</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{order.fabricType}</div>
                <div className="text-sm text-gray-600">Fabric Type</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">₹{order.amount}</div>
                <div className="text-sm text-gray-600">Order Value</div>
              </div>
            </div>
          </div>

          {/* Design Notes */}
          {order.designNotes && (
            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Design Notes</h3>
              <p className="text-gray-700">{order.designNotes}</p>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Notes</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• All measurements are in inches</li>
              <li>• Measurements were taken while wearing light clothing</li>
              <li>• Please contact us if you notice any discrepancies</li>
              <li>• These measurements are for custom tailoring purposes only</li>
              <li>• Keep this document safe for future reference</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              onClick={downloadMeasurements}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition"
            >
              📋 Download Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeasurementDetails;
