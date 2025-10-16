import React, { useState } from 'react';

function ClientManagement() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya.sharma@gmail.com",
      address: "123 MG Road, Bangalore",
      joinDate: "2024-01-15",
      totalOrders: 8,
      totalSpent: 45000,
      loyaltyPoints: 450,
      preferences: ["Silk", "Cotton"],
      notes: "Prefers traditional designs",
      status: "Active"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.kumar@gmail.com",
      address: "456 Brigade Road, Bangalore",
      joinDate: "2024-02-20",
      totalOrders: 5,
      totalSpent: 32000,
      loyaltyPoints: 320,
      preferences: ["Formal", "Business"],
      notes: "Regular customer, prefers quick delivery",
      status: "Active"
    },
    {
      id: 3,
      name: "Sunita Patel",
      phone: "+91 76543 21098",
      email: "sunita.patel@gmail.com",
      address: "789 Koramangala, Bangalore",
      joinDate: "2024-03-10",
      totalOrders: 3,
      totalSpent: 18000,
      loyaltyPoints: 180,
      preferences: ["Bridal", "Party Wear"],
      notes: "Wedding season customer",
      status: "Active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEditClient = (client) => {
    // For now, just show an alert since we're redirecting to the full form
    alert('Edit functionality will be available in the full form. Please use "Add New Client" to create a new order.');
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-elegant-gold to-elegant-darkGold rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-elegant">Client Management</h1>
            <p className="text-white/90 mt-2">Manage your boutique clients and their preferences</p>
          </div>
          <button
            onClick={() => {
              // Redirect to the AddClientForm instead of showing popup
              window.location.hash = '#add-client';
              // Trigger a custom event to change the active view
              window.dispatchEvent(new CustomEvent('navigateToAddClient'));
            }}
            className="bg-white/20 hover:bg-white/30 rounded-lg px-6 py-3 font-semibold transition-colors"
          >
            + Add New Client Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Clients</p>
              <p className="text-3xl font-bold text-elegant-gold">{clients.length}</p>
            </div>
            <div className="w-12 h-12 bg-elegant-gold/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Clients</p>
              <p className="text-3xl font-bold text-green-600">{clients.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">{clients.reduce((sum, c) => sum + c.totalOrders, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-purple-600">₹{clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
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
              placeholder="Search clients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-elegant-gold rounded-full flex items-center justify-center text-white font-semibold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">Joined {new Date(client.joinDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{client.phone}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{client.totalOrders}</div>
                    <div className="text-sm text-gray-500">{client.loyaltyPoints} points</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">₹{client.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' :
                      client.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="text-elegant-gold hover:text-elegant-darkGold font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
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

      {/* Note: Add Client functionality now redirects to the full AddClientForm */}
    </div>
  );
}

export default ClientManagement;
