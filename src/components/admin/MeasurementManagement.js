import React, { useState } from 'react';

function MeasurementManagement() {
  const [measurements, setMeasurements] = useState([
    {
      id: 1,
      clientId: 1,
      clientName: "Priya Sharma",
      garmentType: "Blouse",
      measurements: {
        bust: "34",
        waist: "28",
        hip: "36",
        shoulder: "14",
        sleeve: "23",
        length: "20",
        neck: "13"
      },
      date: "2024-01-15",
      designer: "Rajesh Tailor",
      notes: "Regular fit, slightly loose at waist",
      status: "Active"
    },
    {
      id: 2,
      clientId: 2,
      clientName: "Rajesh Kumar",
      garmentType: "Shirt",
      measurements: {
        chest: "40",
        waist: "34",
        hip: "38",
        shoulder: "16",
        sleeve: "32",
        length: "30",
        neck: "15"
      },
      date: "2024-02-20",
      designer: "Sunita Tailor",
      notes: "Formal fit, precise measurements",
      status: "Active"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGarment, setFilterGarment] = useState('all');

  const [newMeasurement, setNewMeasurement] = useState({
    clientId: '',
    clientName: '',
    garmentType: 'Blouse',
    measurements: {
      bust: '',
      waist: '',
      hip: '',
      shoulder: '',
      sleeve: '',
      length: '',
      neck: '',
      // Additional measurements for different garment types
      inseam: '',
      thigh: '',
      knee: '',
      bottom: '',
      armhole: '',
      backWidth: ''
    },
    designer: '',
    notes: '',
    status: 'Active'
  });

  const garmentTypes = [
    'Blouse', 'Kurta', 'Shirt', 'Pant', 'Suit', 'Gown', 'Lehenga', 'Saree Blouse', 'Sherwani', 'Custom'
  ];

  const measurementTemplates = {
    'Blouse': ['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole', 'backWidth'],
    'Kurta': ['chest', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck'],
    'Shirt': ['chest', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck'],
    'Pant': ['waist', 'hip', 'length', 'inseam', 'thigh', 'knee', 'bottom'],
    'Suit': ['chest', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'inseam', 'thigh', 'knee', 'bottom'],
    'Gown': ['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole'],
    'Lehenga': ['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole'],
    'Saree Blouse': ['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole'],
    'Sherwani': ['chest', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck'],
    'Custom': ['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole', 'backWidth', 'inseam', 'thigh', 'knee', 'bottom']
  };

  const filteredMeasurements = measurements.filter(measurement => {
    const matchesSearch = measurement.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         measurement.garmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         measurement.designer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterGarment === 'all' || measurement.garmentType === filterGarment;
    return matchesSearch && matchesFilter;
  });

  const handleAddMeasurement = (e) => {
    e.preventDefault();
    const measurement = {
      ...newMeasurement,
      id: measurements.length > 0 ? Math.max(...measurements.map(m => m.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0]
    };
    setMeasurements([...measurements, measurement]);
    resetForm();
  };

  const handleEditMeasurement = (measurement) => {
    setEditingMeasurement(measurement);
    setNewMeasurement(measurement);
    setShowAddForm(true);
  };

  const handleUpdateMeasurement = (e) => {
    e.preventDefault();
    setMeasurements(measurements.map(measurement => 
      measurement.id === editingMeasurement.id ? { ...newMeasurement, id: editingMeasurement.id } : measurement
    ));
    setEditingMeasurement(null);
    resetForm();
  };

  const handleDeleteMeasurement = (measurementId) => {
    if (window.confirm('Are you sure you want to delete this measurement?')) {
      setMeasurements(measurements.filter(measurement => measurement.id !== measurementId));
    }
  };

  const resetForm = () => {
    setNewMeasurement({
      clientId: '',
      clientName: '',
      garmentType: 'Blouse',
      measurements: {
        bust: '', waist: '', hip: '', shoulder: '', sleeve: '', length: '', neck: '',
        inseam: '', thigh: '', knee: '', bottom: '', armhole: '', backWidth: ''
      },
      designer: '',
      notes: '',
      status: 'Active'
    });
    setShowAddForm(false);
  };

  const updateMeasurementValue = (field, value) => {
    setNewMeasurement({
      ...newMeasurement,
      measurements: {
        ...newMeasurement.measurements,
        [field]: value
      }
    });
  };

  const getCurrentTemplate = () => {
    return measurementTemplates[newMeasurement.garmentType] || measurementTemplates['Custom'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-elegant-purple to-elegant-gold rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-elegant">Measurement Management</h1>
            <p className="text-white/90 mt-2">Manage client measurements and garment specifications</p>
          </div>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingMeasurement(null);
              resetForm();
            }}
            className="bg-white/20 hover:bg-white/30 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            + Add New Measurement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Measurements</p>
              <p className="text-3xl font-bold text-elegant-gold">{measurements.length}</p>
            </div>
            <div className="w-12 h-12 bg-elegant-gold/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📏</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Measurements</p>
              <p className="text-3xl font-bold text-green-600">{measurements.filter(m => m.status === 'Active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Garment Types</p>
              <p className="text-3xl font-bold text-blue-600">{new Set(measurements.map(m => m.garmentType)).size}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👗</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Unique Clients</p>
              <p className="text-3xl font-bold text-purple-600">{new Set(measurements.map(m => m.clientId)).size}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by client name, garment type, or designer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
            />
          </div>
          <select
            value={filterGarment}
            onChange={(e) => setFilterGarment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
          >
            <option value="all">All Garment Types</option>
            {garmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Measurements Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Garment Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Key Measurements</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Designer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMeasurements.map((measurement) => (
                <tr key={measurement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-elegant-purple rounded-full flex items-center justify-center text-white font-semibold">
                        {measurement.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">{measurement.clientName}</div>
                        <div className="text-sm text-gray-500">ID: {measurement.clientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-elegant-gold/20 text-elegant-darkGold rounded-full text-sm font-semibold">
                      {measurement.garmentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {measurement.garmentType === 'Blouse' && (
                        <>Bust: {measurement.measurements.bust}", Waist: {measurement.measurements.waist}"</>
                      )}
                      {measurement.garmentType === 'Shirt' && (
                        <>Chest: {measurement.measurements.chest}", Length: {measurement.measurements.length}"</>
                      )}
                      {measurement.garmentType === 'Pant' && (
                        <>Waist: {measurement.measurements.waist}", Inseam: {measurement.measurements.inseam}"</>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{measurement.designer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{new Date(measurement.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      measurement.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {measurement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMeasurement(measurement)}
                        className="text-elegant-gold hover:text-elegant-darkGold font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMeasurement(measurement.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
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

      {/* Add/Edit Measurement Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMeasurement ? 'Edit Measurement' : 'Add New Measurement'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={editingMeasurement ? handleUpdateMeasurement : handleAddMeasurement} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client ID *</label>
                  <input
                    type="text"
                    required
                    value={newMeasurement.clientId}
                    onChange={(e) => setNewMeasurement({...newMeasurement, clientId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newMeasurement.clientName}
                    onChange={(e) => setNewMeasurement({...newMeasurement, clientName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Garment Type *</label>
                  <select
                    required
                    value={newMeasurement.garmentType}
                    onChange={(e) => setNewMeasurement({...newMeasurement, garmentType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  >
                    {garmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Measurements (in inches) *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {getCurrentTemplate().map(field => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        value={newMeasurement.measurements[field] || ''}
                        onChange={(e) => updateMeasurementValue(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Designer/Tailor</label>
                  <input
                    type="text"
                    value={newMeasurement.designer}
                    onChange={(e) => setNewMeasurement({...newMeasurement, designer: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={newMeasurement.status}
                    onChange={(e) => setNewMeasurement({...newMeasurement, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newMeasurement.notes}
                  onChange={(e) => setNewMeasurement({...newMeasurement, notes: e.target.value})}
                  rows={3}
                  placeholder="Any special notes about the measurements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
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
                  {editingMeasurement ? 'Update Measurement' : 'Add Measurement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeasurementManagement;
