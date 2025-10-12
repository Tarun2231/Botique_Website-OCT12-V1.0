import React, { useState } from 'react';
import ModernSidebar from '../components/admin/ModernSidebar';
import TopHeader from '../components/admin/TopHeader';
import ModernDashboard from '../components/admin/ModernDashboard';
import DashboardOverview from '../components/admin/DashboardOverview';
import AddClientForm from '../components/admin/AddClientForm';
import OrdersTable from '../components/admin/OrdersTable';
import OrderDetails from '../components/admin/OrderDetails';

function AdminDashboard({ orders, setOrders }) {
  const [activeView, setActiveView] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.amount : 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ModernSidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        setSelectedOrder={setSelectedOrder} 
      />
      
      <div className="flex-1 ml-64">
        <TopHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="p-8">
        {activeView === 'overview' && (
          <ModernDashboard 
            orders={filteredOrders} 
            stats={stats}
            setActiveView={setActiveView}
            setSelectedOrder={setSelectedOrder}
            updateOrder={updateOrder}
          />
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

        {activeView === 'order-details' && selectedOrder && (
          <OrderDetails 
            order={selectedOrder}
            updateOrder={updateOrder}
            deleteOrder={deleteOrder}
            setActiveView={setActiveView}
          />
        )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

