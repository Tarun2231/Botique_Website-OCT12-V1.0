import React, { useState, useMemo, useCallback } from 'react';

function AirlineStyleDashboard({ orders, stats, setActiveView, setSelectedOrder, updateOrder, searchTerm, clearSearch }) {
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all'); // New: Male/Female toggle

  // Debug logging
  console.log('AirlineStyleDashboard - orders:', orders);
  console.log('AirlineStyleDashboard - stats:', stats);
  console.log('AirlineStyleDashboard - orders length:', orders?.length);
  console.log('AirlineStyleDashboard - searchTerm:', searchTerm);

  // Ensure orders is always an array
  const safeOrders = useMemo(() => Array.isArray(orders) ? orders : [], [orders]);

  // Calculate dynamic order categories from actual data
  const orderCategories = useMemo(() => {
    const categories = {};
    safeOrders.forEach(order => {
      const category = order.garmentType || 'Unknown';
      categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
  }, [safeOrders]);

  // Comprehensive garment categories with gender classification - using useMemo to prevent recreation
  const garmentCategories = useMemo(() => ({
    male: {
      'Shirt': { color: '#3b82f6', icon: '👔', gender: 'male' },
      'Pant': { color: '#1e40af', icon: '👖', gender: 'male' },
      'Kurta': { color: '#7c3aed', icon: '👘', gender: 'male' },
      'Sherwani': { color: '#dc2626', icon: '👑', gender: 'male' },
      'Blazer / Suit': { color: '#059669', icon: '🤵', gender: 'male' },
      'Waistcoat': { color: '#ea580c', icon: '🎩', gender: 'male' },
      'Dhoti / Traditional Wear': { color: '#0891b2', icon: '🥻', gender: 'male' },
      'Jacket': { color: '#be185d', icon: '🧥', gender: 'male' },
      'Indo-Western Outfit': { color: '#7c2d12', icon: '👤', gender: 'male' },
      'Pathani Set': { color: '#374151', icon: '👨‍💼', gender: 'male' }
    },
    female: {
      'Kurti': { color: '#ec4899', icon: '👗', gender: 'female' },
      'Lehenga': { color: '#e11d48', icon: '👘', gender: 'female' },
      'Saree': { color: '#f59e0b', icon: '🥻', gender: 'female' },
      'Gown': { color: '#8b5cf6', icon: '👗', gender: 'female' },
      'Blouse': { color: '#06b6d4', icon: '👚', gender: 'female' },
      'Salwar Suit': { color: '#10b981', icon: '👗', gender: 'female' },
      'Skirt & Top': { color: '#f97316', icon: '👗', gender: 'female' },
      'Dress (Western / Fusion)': { color: '#ef4444', icon: '👗', gender: 'female' },
      'Dupatta': { color: '#84cc16', icon: '🧣', gender: 'female' },
      'Anarkali': { color: '#6366f1', icon: '👗', gender: 'female' },
      'Crop Top & Palazzo Set': { color: '#ec4899', icon: '👚', gender: 'female' }
    },
    unisex: {
      'Kids Wear': { color: '#fbbf24', icon: '👶', gender: 'unisex' },
      'Uniforms': { color: '#6b7280', icon: '👔', gender: 'unisex' },
      'Accessories': { color: '#8b5cf6', icon: '🧣', gender: 'unisex' },
      'Alteration / Custom Stitching': { color: '#059669', icon: '✂️', gender: 'unisex' },
      'Fabric Only': { color: '#dc2626', icon: '🧵', gender: 'unisex' },
      'Miscellaneous / Others': { color: '#6b7280', icon: '📦', gender: 'unisex' }
    }
  }), []);

  // Helper functions using useCallback to avoid dependency issues
  const getCategoryDetails = useCallback((category) => {
    for (const gender in garmentCategories) {
      if (garmentCategories[gender][category]) {
        return garmentCategories[gender][category];
      }
    }
    return { color: '#95a5a6', icon: '👕', gender: 'unknown' };
  }, [garmentCategories]);

  const getCategoryColor = useCallback((category) => {
    return getCategoryDetails(category).color;
  }, [getCategoryDetails]);

  const getCategoryIcon = useCallback((category) => {
    return getCategoryDetails(category).icon;
  }, [getCategoryDetails]);

  const getCategoryGender = useCallback((category) => {
    return getCategoryDetails(category).gender;
  }, [getCategoryDetails]);

    // Filter orders based on selected filters
    const filteredOrders = useMemo(() => {
      return safeOrders.filter(order => {
        const orderDate = new Date(order.date);
        const now = new Date();
        
        // Search filter
        const searchMatch = !searchTerm || 
          order.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.garmentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id?.toString().includes(searchTerm);
        
        // Debug search for specific term
        if (searchTerm && searchTerm.toLowerCase().includes('sneha')) {
          console.log('Searching for Sneha:', {
            order: order.clientName,
            searchTerm: searchTerm,
            match: searchMatch,
            clientName: order.clientName?.toLowerCase(),
            searchTermLower: searchTerm.toLowerCase()
          });
        }
        
        // Date filter
        let dateMatch = true;
        if (dateFilter === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          dateMatch = orderDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          dateMatch = orderDate >= monthAgo;
        } else if (dateFilter === 'quarter') {
          const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          dateMatch = orderDate >= quarterAgo;
        }

        // Category filter
        const categoryMatch = categoryFilter === 'all' || order.garmentType === categoryFilter;

        // Status filter
        const statusMatch = statusFilter === 'all' || order.status === statusFilter;

        // Gender filter
        let genderMatch = true;
        if (genderFilter !== 'all') {
          const orderGender = getCategoryGender(order.garmentType);
          genderMatch = orderGender === genderFilter;
        }

        return searchMatch && dateMatch && categoryMatch && statusMatch && genderMatch;
      });
    }, [safeOrders, searchTerm, dateFilter, categoryFilter, statusFilter, genderFilter, getCategoryGender]);

  // Debug logging for filtered orders
  console.log('AirlineStyleDashboard - filteredOrders:', filteredOrders);
  console.log('AirlineStyleDashboard - filteredOrders length:', filteredOrders.length);

  // Calculate dynamic statistics
  const dashboardStats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => {
      const amount = order.amount || order.pricing?.total || 0;
      return sum + (order.paymentStatus === 'Paid' ? amount : 0);
    }, 0);
    
    const statusCounts = {
      pending: filteredOrders.filter(o => o.status === 'Pending').length,
      inProgress: filteredOrders.filter(o => o.status === 'In Progress').length,
      delivered: filteredOrders.filter(o => o.status === 'Delivered').length,
    };

    // Get top categories
    const categoryStats = Object.entries(orderCategories)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      totalOrders,
      totalRevenue,
      statusCounts,
      categoryStats,
      avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
    };
  }, [filteredOrders, orderCategories]);

  // Recent clients with actual data
  const recentClients = useMemo(() => {
    return filteredOrders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(order => ({
        name: order.clientName || 'Unknown Client',
        email: order.clientEmail || order.email || 'no-email@example.com',
        garmentType: order.garmentType || 'Unknown',
        orderDate: order.date,
        status: order.status,
    amount: order.amount || 0
  }));
  }, [filteredOrders]);

  // Chart data for statistics
  const chartData = useMemo(() => {
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      orders: [4, 6, 3, 7, 5, 8],
      revenue: [15000, 28000, 22000, 32000, 25000, 38000]
    };

    // Category distribution for pie chart
    const categoryData = dashboardStats.categoryStats.map(item => ({
      name: item.category,
      value: item.count,
      color: getCategoryColor(item.category)
    }));

    return {
      monthly: monthlyData,
      categories: categoryData
    };
  }, [dashboardStats, getCategoryColor]);

  // Show loading state if no orders data
  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Loading...</h2>
          <p className="text-gray-600">Setting up your boutique analytics</p>
          <button
            onClick={() => setActiveView('add-client')}
            className="mt-4 px-6 py-3 bg-elegant-gold text-white rounded-lg font-semibold hover:bg-elegant-darkGold transition-colors"
          >
            Add Your First Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Compact Filters Section */}
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-wrap gap-3 items-center justify-center max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-semibold text-gray-700">Filters:</label>
              {searchTerm && (
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-elegant-gold text-white text-xs rounded-full">
                    Search: "{searchTerm}" ({filteredOrders.length} results)
                  </span>
                  {filteredOrders.length > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Found: {filteredOrders.map(o => o.clientName).join(', ')}
                    </span>
                  )}
                </div>
              )}
            </div>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-elegant-gold focus:border-transparent min-w-[120px]"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-elegant-gold focus:border-transparent min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-elegant-gold focus:border-transparent min-w-[140px]"
          >
            <option value="all">All Categories</option>
            {Object.keys(orderCategories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Gender Toggle Switch */}
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setGenderFilter('male')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                genderFilter === 'male' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👔 Male
            </button>
            <button
              onClick={() => setGenderFilter('female')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                genderFilter === 'female' 
                  ? 'bg-pink-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👗 Female
            </button>
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                genderFilter === 'all' 
                  ? 'bg-elegant-gold text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              👥 All
            </button>
          </div>

            <button
              onClick={() => {
                setDateFilter('all');
                setCategoryFilter('all');
                setStatusFilter('all');
                setGenderFilter('all');
                if (clearSearch) {
                  clearSearch();
                }
              }}
              className="px-3 py-2 text-sm text-elegant-gold hover:text-elegant-darkGold font-medium bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Clear All
            </button>
        </div>
        </div>

        {/* Complete Client Details - Search Results */}
        {searchTerm && filteredOrders.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-green-800">🔍 Complete Client Details for "{searchTerm}"</h4>
              <button
                onClick={() => setActiveView('clients')}
                className="px-4 py-2 bg-elegant-gold text-white rounded-lg hover:bg-elegant-darkGold transition-colors text-sm font-semibold"
              >
                View All Clients
              </button>
            </div>
            
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-green-300 shadow-md">
                  {/* Client Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-elegant-gold to-elegant-darkGold rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {order.clientName?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 className="text-2xl font-bold text-gray-800">{order.clientName}</h5>
                        <p className="text-gray-600">{order.clientEmail || order.email}</p>
                        <p className="text-gray-600">{order.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-elegant-gold">₹{order.amount?.toLocaleString()}</div>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Garment Information */}
                    <div className="space-y-3">
                      <h6 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">👗 Garment Details</h6>
                      <div className="space-y-2">
                        <div><span className="font-semibold text-gray-700">Type:</span> <span className="text-gray-600">{getCategoryIcon(order.garmentType)} {order.garmentType}</span></div>
                        <div><span className="font-semibold text-gray-700">Fabric:</span> <span className="text-gray-600">{order.fabricType}</span></div>
                        <div><span className="font-semibold text-gray-700">Order Date:</span> <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span></div>
                        <div><span className="font-semibold text-gray-700">Order ID:</span> <span className="text-gray-600">#{order.id}</span></div>
                      </div>
                    </div>

                    {/* Measurements */}
                    <div className="space-y-3">
                      <h6 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">📏 Measurements</h6>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {order.measurements && Object.entries(order.measurements).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="font-medium text-gray-700 capitalize">{key}:</span>
                            <span className="text-gray-600">{value}"</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment & Status */}
                    <div className="space-y-3">
                      <h6 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">💳 Payment & Status</h6>
                      <div className="space-y-2">
                        <div><span className="font-semibold text-gray-700">Payment Status:</span> 
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        <div><span className="font-semibold text-gray-700">Payment Method:</span> <span className="text-gray-600">{order.paymentMethod}</span></div>
                        <div><span className="font-semibold text-gray-700">Total Amount:</span> <span className="text-elegant-gold font-bold">₹{order.amount?.toLocaleString()}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Design Notes & Address */}
                  {(order.designNotes || order.address) && (
                    <div className="mt-6 space-y-4">
                      {order.designNotes && (
                        <div>
                          <h6 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">🎨 Design Notes & Style Choices</h6>
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{order.designNotes}"</p>
                        </div>
                      )}
                      
                      {order.address && (
                        <div>
                          <h6 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">📍 Delivery Address</h6>
                          <p className="text-gray-700">{order.address}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveView('order-details');
                      }}
                      className="px-4 py-2 bg-elegant-gold text-white rounded-lg hover:bg-elegant-darkGold transition-colors font-semibold"
                    >
                      View Full Details
                    </button>
                    <button
                      onClick={() => updateOrder(order.id, { status: order.status === 'In Progress' ? 'Delivered' : 'In Progress' })}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      {order.status === 'In Progress' ? 'Mark Delivered' : 'Mark In Progress'}
                    </button>
                    <button
                      onClick={() => setActiveView('measurements')}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
                    >
                      Edit Measurements
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchTerm && filteredOrders.length === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg">
            <h4 className="text-lg font-semibold text-red-800 mb-2">🔍 No Results Found for "{searchTerm}"</h4>
            <p className="text-red-600">Try searching for a different name or check the spelling.</p>
          </div>
        )}

        {/* Main Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Total Orders */}
        <div className="bg-gradient-to-br from-elegant-gold to-elegant-darkGold rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold opacity-90">Total Orders</h3>
              <p className="text-2xl font-bold">{safeOrders.length}</p>
              <div className="text-xs opacity-75 mt-1">
                Male: {safeOrders.filter(o => getCategoryGender(o.garmentType) === 'male').length} • 
                Female: {safeOrders.filter(o => getCategoryGender(o.garmentType) === 'female').length}
              </div>
            </div>
            <div className="text-2xl opacity-30">📊</div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Avg Order Value</h3>
              <p className="text-xl font-bold text-teal-600">₹{dashboardStats.avgOrderValue.toLocaleString()}</p>
            </div>
            <div className="text-2xl opacity-30">📈</div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{dashboardStats.statusCounts.pending}</p>
            </div>
            <div className="text-2xl opacity-30">⏳</div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">In Progress</h3>
              <p className="text-2xl font-bold text-blue-600">{dashboardStats.statusCounts.inProgress}</p>
            </div>
            <div className="text-2xl opacity-30">⚙️</div>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Delivered</h3>
              <p className="text-2xl font-bold text-green-600">{dashboardStats.statusCounts.delivered}</p>
            </div>
            <div className="text-2xl opacity-30">✅</div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-elegant-gold">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-xl font-bold text-elegant-gold">₹{dashboardStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-2xl opacity-30">💰</div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Active Clients */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Active Clients</h3>
              <p className="text-2xl font-bold text-purple-600">{new Set(filteredOrders.map(o => o.clientName)).size}</p>
            </div>
            <div className="text-2xl opacity-30">👥</div>
          </div>
        </div>

        {/* Today's New Orders */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Today's Orders</h3>
              <p className="text-2xl font-bold text-indigo-600">
                {filteredOrders.filter(o => {
                  const today = new Date().toDateString();
                  const orderDate = new Date(o.date).toDateString();
                  return today === orderDate;
                }).length}
              </p>
            </div>
            <div className="text-2xl opacity-30">📅</div>
          </div>
        </div>

        {/* Weekly Orders */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Weekly Orders</h3>
              <p className="text-xl font-bold text-indigo-600">
                {filteredOrders.filter(o => {
                  const orderDate = new Date(o.date);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return orderDate >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="text-2xl opacity-30">📅</div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Completion Rate</h3>
              <p className="text-xl font-bold text-emerald-600">
                {dashboardStats.totalOrders > 0 ? Math.round((dashboardStats.statusCounts.delivered / dashboardStats.totalOrders) * 100) : 0}%
              </p>
            </div>
            <div className="text-2xl opacity-30">🎯</div>
          </div>
        </div>

        {/* Top Category */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Top Category</h3>
              <p className="text-lg font-bold text-orange-600 truncate">
                {dashboardStats.categoryStats.length > 0 ? dashboardStats.categoryStats[0].category : 'N/A'}
              </p>
            </div>
            <div className="text-2xl opacity-30">🏆</div>
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Monthly Growth</h3>
              <p className="text-xl font-bold text-rose-600">+12%</p>
            </div>
            <div className="text-2xl opacity-30">📊</div>
          </div>
        </div>
      </div>

      {/* Charts & Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Order Trends Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Trends Over Time</h3>
          <div className="h-64 flex items-end space-x-2">
            {chartData.monthly.orders.map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-elegant-darkGold to-elegant-gold rounded-t-lg relative group transition-all duration-300 hover:from-elegant-gold hover:to-elegant-darkGold"
                  style={{ height: `${(height / Math.max(...chartData.monthly.orders)) * 200}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {height} orders
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{chartData.monthly.labels[index]}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Monthly order volume trends
          </div>
        </div>

        {/* Revenue Analysis Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Analysis</h3>
          <div className="h-64 flex items-end space-x-2">
            {chartData.monthly.revenue.map((amount, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg relative group transition-all duration-300 hover:from-green-500 hover:to-green-300"
                  style={{ height: `${(amount / Math.max(...chartData.monthly.revenue)) * 200}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{amount.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{chartData.monthly.labels[index]}</div>
              </div>
            ))}
            </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Monthly revenue trends
          </div>
        </div>
      </div>

      {/* Category Breakdown & Top Performing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            {chartData.categories.length > 0 ? (
              <div className="space-y-4">
                {chartData.categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm">{getCategoryIcon(category.name)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm font-bold text-gray-900">{category.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(category.value / Math.max(...chartData.categories.map(c => c.value))) * 100}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No category data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Performing Categories */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performing Categories</h3>
          <div className="space-y-4">
            {dashboardStats.categoryStats.slice(0, 5).map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-elegant-gold text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(category.category)}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{category.category}</div>
                      <div className="text-sm text-gray-600">{category.count} orders</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-elegant-gold">
                    {Math.round((category.count / dashboardStats.totalOrders) * 100)}%
                </div>
                  <div className="text-xs text-gray-500">of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Clients Table */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Clients</h3>
            <button onClick={() => setActiveView('clients')} className="text-elegant-gold hover:underline text-sm">View All</button>
          </div>
        <p className="text-gray-600 text-sm mb-4">Latest orders and client activity</p>

        {recentClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Garment Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total Amount</th>
                </tr>
              </thead>
              <tbody>
            {recentClients.map((client, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-elegant-gold rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                        <div>
                  <div className="font-semibold text-gray-800">{client.name}</div>
                  <div className="text-sm text-gray-600">{client.email}</div>
                </div>
                </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getCategoryIcon(client.garmentType)}</span>
                        <span className="text-sm text-gray-700">{client.garmentType}</span>
                </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-700">{new Date(client.orderDate).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        client.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-bold text-elegant-gold">₹{client.amount.toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👥</div>
            <p className="text-gray-600">No recent clients found</p>
            <p className="text-sm text-gray-500 mt-2">Clients will appear here once orders are added</p>
            <button
              onClick={() => setActiveView('add-client')}
              className="mt-3 px-4 py-2 bg-elegant-gold text-white rounded-lg text-sm hover:bg-elegant-darkGold transition-colors"
            >
              Add First Client
            </button>
          </div>
        )}
        </div>

      {/* Performance Metrics & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Performance Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Orders This Month</span>
                <span className="font-semibold text-blue-600">
                  {filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    const now = new Date();
                    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
              <div className="text-xs text-gray-500">vs Last Month: +2</div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Delivery Success Rate</span>
                <span className="font-semibold text-green-600">
                  {dashboardStats.totalOrders > 0 ? Math.round((dashboardStats.statusCounts.delivered / dashboardStats.totalOrders) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${dashboardStats.totalOrders > 0 ? (dashboardStats.statusCounts.delivered / dashboardStats.totalOrders) * 100 : 0}%` 
                  }}
              ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Average Order Value</span>
                <span className="font-semibold text-elegant-gold">₹{dashboardStats.avgOrderValue.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Top 5 Clients</div>
              <div className="space-y-2">
                {recentClients.slice(0, 3).map((client, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 truncate">{client.name}</span>
                    <span className="font-semibold text-elegant-gold">₹{client.amount.toLocaleString()}</span>
          </div>
            ))}
          </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setActiveView('add-client')}
              className="w-full bg-gradient-to-r from-elegant-gold to-elegant-darkGold text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>➕</span>
              <span>Add New Order</span>
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className="w-full border-2 border-elegant-gold text-elegant-gold px-4 py-3 rounded-lg font-semibold hover:bg-elegant-gold hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📋</span>
              <span>View All Orders</span>
            </button>
            <button
              onClick={() => setActiveView('clients')}
              className="w-full border-2 border-elegant-purple text-elegant-purple px-4 py-3 rounded-lg font-semibold hover:bg-elegant-purple hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>👥</span>
              <span>Manage Clients</span>
            </button>
            <button
              onClick={() => setActiveView('measurements')}
              className="w-full border-2 border-blue-500 text-blue-500 px-4 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📏</span>
              <span>Manage Inventory</span>
            </button>
            <button
              onClick={() => alert('Report generation feature coming soon!')}
              className="w-full border-2 border-green-500 text-green-500 px-4 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📊</span>
              <span>Generate Reports</span>
            </button>
        </div>
      </div>

        {/* Notifications & Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications & Alerts</h3>
          <div className="space-y-3">
            {/* Delayed Orders Alert */}
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <div className="text-yellow-600 text-lg">⚠️</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-yellow-800">Delayed Orders</div>
                <div className="text-xs text-yellow-700">
                  {filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    const daysDiff = Math.floor((new Date() - orderDate) / (1000 * 60 * 60 * 24));
                    return daysDiff > 7 && o.status !== 'Delivered';
                  }).length} orders need attention
                </div>
              </div>
            </div>

            {/* Low Inventory Alert */}
            <div className="flex items-start space-x-3 p-3 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="text-red-600 text-lg">📦</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-red-800">Low Inventory</div>
                <div className="text-xs text-red-700">Some fabrics running low</div>
              </div>
            </div>

            {/* Upcoming Deliveries */}
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <div className="text-blue-600 text-lg">🚚</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-800">Upcoming Deliveries</div>
                <div className="text-xs text-blue-700">
                  {filteredOrders.filter(o => o.status === 'In Progress').length} orders in progress
                </div>
              </div>
            </div>

            {/* Revenue Milestone */}
            <div className="flex items-start space-x-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <div className="text-green-600 text-lg">🎉</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-green-800">Revenue Milestone</div>
                <div className="text-xs text-green-700">
                  ₹{dashboardStats.totalRevenue.toLocaleString()} total revenue achieved!
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Revenue */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Today's Revenue</h3>
              <p className="text-xl font-bold text-emerald-600">
                ₹{filteredOrders.filter(o => {
                  const today = new Date().toDateString();
                  const orderDate = new Date(o.date).toDateString();
                  return today === orderDate;
                }).reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-2xl opacity-30">💵</div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Weekly Orders</h3>
              <p className="text-xl font-bold text-indigo-600">
                {filteredOrders.filter(o => {
                  const orderDate = new Date(o.date);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return orderDate >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="text-2xl opacity-30">📅</div>
          </div>
            </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Monthly Growth</h3>
              <p className="text-xl font-bold text-orange-600">+12%</p>
            </div>
            <div className="text-2xl opacity-30">📈</div>
          </div>
          </div>

        {/* Top Selling Product */}
        <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Top Selling</h3>
              <p className="text-lg font-bold text-purple-600 truncate">
                {dashboardStats.categoryStats.length > 0 ? dashboardStats.categoryStats[0].category : 'N/A'}
              </p>
            </div>
            <div className="text-2xl opacity-30">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirlineStyleDashboard;