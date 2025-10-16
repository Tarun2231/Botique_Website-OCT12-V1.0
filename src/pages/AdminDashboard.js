import React, { useState, useEffect } from 'react';
import ModernSidebar from '../components/admin/ModernSidebar';
import TopHeader from '../components/admin/TopHeader';
import AirlineStyleDashboard from '../components/admin/AirlineStyleDashboard';
import ClientManagement from '../components/admin/ClientManagement';
import MeasurementManagement from '../components/admin/MeasurementManagement';
import BillingPayments from '../components/admin/BillingPayments';
import AddClientForm from '../components/admin/AddClientForm';
import OrdersTable from '../components/admin/OrdersTable';
import OrderDetails from '../components/admin/OrderDetails';
import StatusManager from '../components/admin/StatusManager';
import { ordersAPI, analyticsAPI } from '../services/api';

function AdminDashboard({ orders, setOrders }) {
  const [activeView, setActiveView] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [realStats, setRealStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for navigation events from ClientManagement
  useEffect(() => {
    const handleNavigateToAddClient = () => {
      setActiveView('add-client');
    };

    window.addEventListener('navigateToAddClient', handleNavigateToAddClient);
    
    return () => {
      window.removeEventListener('navigateToAddClient', handleNavigateToAddClient);
    };
  }, []);

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.log('API timeout, using dummy data');
          setLoading(false);
        }, 3000);
        
        try {
          // Fetch orders from backend
          const ordersResponse = await ordersAPI.getAll();
          console.log('Orders API Response:', ordersResponse);
          
          if (ordersResponse.data?.orders && ordersResponse.data.orders.length > 0) {
            // Transform backend orders to frontend format
            const transformedOrders = ordersResponse.data.orders.map(order => ({
              id: order._id,
              orderNumber: order.orderNumber,
              clientName: order.client?.name || 'Unknown Client',
              clientEmail: order.client?.email,
              clientPhone: order.client?.phone,
              garmentType: order.items?.[0]?.itemType || 'Unknown',
              fabricType: order.items?.[0]?.fabric || 'Unknown',
              designNotes: order.items?.[0]?.description || '',
              measurements: order.measurements || {},
              status: order.status === 'in-progress' ? 'In Progress' : 
                     order.status === 'ready-for-fitting' ? 'Ready for Fitting' :
                     order.status.charAt(0).toUpperCase() + order.status.slice(1),
              paymentStatus: order.paymentStatus === 'paid' ? 'Paid' :
                            order.paymentStatus === 'partial' ? 'Partial' :
                            order.paymentStatus === 'pending' ? 'Pending' : 'Pending',
              paymentMethod: 'Cash', // Default, could be enhanced
              amount: order.pricing?.total || 0,
              date: order.dates?.orderDate ? new Date(order.dates.orderDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            }));
            setOrders(transformedOrders);
          } else {
            console.log('No orders from backend, using existing dummy data');
            // Keep using the existing dummy orders data
          }

          // Fetch analytics from backend
          const analyticsResponse = await analyticsAPI.getDashboard();
          console.log('Analytics API Response:', analyticsResponse);
          
          if (analyticsResponse.data) {
            setRealStats(analyticsResponse.data.summary);
          }
          
          clearTimeout(timeoutId);
        } catch (apiError) {
          console.error('API Error:', apiError);
          clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Falling back to existing orders data');
        // Keep using existing orders if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setOrders]);

  // Add new order
  const addOrder = (newOrder) => {
    const order = {
      ...newOrder,
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([...orders, order]);
  };

  // Update order
  const updateOrder = (updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setSelectedOrder(updatedOrder);
  };

  // Delete order
  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
        setActiveView('orders');
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toString().includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats - use real backend data if available, otherwise calculate from orders
  const stats = realStats ? {
    total: realStats.totalOrders || orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: realStats.totalRevenue || 0
  } : {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.reduce((sum, o) => {
      // Handle both old format (o.amount) and new format (o.pricing.total)
      const amount = o.pricing?.total || o.amount || 0;
      return sum + (o.paymentStatus === 'Paid' ? amount : 0);
    }, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elegant-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elegant-gold mx-auto mb-4"></div>
          <p className="text-[#4a3b30] font-elegant text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elegant-cream flex">
      <ModernSidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        setSelectedOrder={setSelectedOrder}
        orders={orders}
        updateOrder={updateOrder}
      />
      
      <div className="flex-1 ml-72">
        <TopHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          orders={orders}
          updateOrder={updateOrder}
        />
        <div className="p-8">

          {activeView === 'overview' && (
            <AirlineStyleDashboard 
              orders={orders} 
              stats={stats}
              setActiveView={setActiveView}
              setSelectedOrder={setSelectedOrder}
              updateOrder={updateOrder}
              searchTerm={searchTerm}
              clearSearch={() => setSearchTerm('')}
            />
          )}

          {activeView === 'clients' && (
            <ClientManagement />
          )}

          {activeView === 'measurements' && (
            <MeasurementManagement />
          )}

          {activeView === 'billing' && (
            <BillingPayments />
          )}

          {activeView === 'add-client' && (
            <AddClientForm addOrder={addOrder} setActiveView={setActiveView} />
          )}

          {activeView === 'orders' && (
            <OrdersTable
              orders={filteredOrders}
              setSelectedOrder={setSelectedOrder}
              setActiveView={setActiveView}
              deleteOrder={deleteOrder}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}

          {activeView === 'status' && (
            <StatusManager
              orders={orders}
              updateOrder={updateOrder}
              setActiveView={setActiveView}
              setSelectedOrder={setSelectedOrder}
            />
          )}

          {activeView === 'order-details' && selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              updateOrder={updateOrder}
              deleteOrder={deleteOrder}
              setActiveView={setActiveView}
            />
          )}

          {/* Placeholder for other modules */}
          {['inventory', 'employees', 'appointments', 'reports', 'settings'].includes(activeView) && (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {activeView === 'inventory' && '📦'}
                  {activeView === 'employees' && '👷'}
                  {activeView === 'appointments' && '📅'}
                  {activeView === 'reports' && '📊'}
                  {activeView === 'settings' && '⚙️'}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeView.charAt(0).toUpperCase() + activeView.slice(1)} Module
                </h2>
                <p className="text-gray-600">This module is coming soon!</p>
                <button
                  onClick={() => setActiveView('overview')}
                  className="mt-4 px-6 py-3 bg-elegant-gold hover:bg-elegant-darkGold text-white rounded-lg font-semibold transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

