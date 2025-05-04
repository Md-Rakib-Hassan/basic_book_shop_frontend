import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, Book, DollarSign } from 'lucide-react';
import StatCard from '../../../components/dashboard/StatCard';
import DataTable from '../../../components/dashboard/DataTable';
import { getStats } from '../../../utils/mockData';
import { useGetAllOrdersQuery } from '../../../redux/features/order/orderApi';
import LoadingPage from '../../LoadingPage';


const AdminDashboard: React.FC = () => {

    const { data, isLoading } = useGetAllOrdersQuery('');
    if (isLoading) return <LoadingPage></LoadingPage>;
    const orders = data?.data;
  const stats = getStats();
  const recentOrders = orders.map(order => {
    // Get user name for the order
    const userName = order.UserId && typeof order.UserId === 'object' ? order.UserId.Name : 'Unknown';
    
    return {
      id: order._id,
      userName,
      date: order.OrderDate ? new Date(order.OrderDate).toLocaleDateString() : 'N/A',
      amount: `$${order.Total.toFixed(2)}`,
      status: order.OrderStatus,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your bookshop statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="bg-primary-600"
          change={{ value: 12, type: 'increase' }}
        />
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={Book}
          color="bg-green-600"
          change={{ value: 5, type: 'increase' }}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="bg-indigo-600"
          change={{ value: 18, type: 'increase' }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="bg-amber-600"
          change={{ value: 8, type: 'increase' }}
        />
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
        <DataTable
          columns={[
            { header: 'Order ID', accessor: 'id' },
            { header: 'Customer', accessor: 'userName' },
            { header: 'Date', accessor: 'date' },
            { header: 'Amount', accessor: 'amount' },
            { 
              header: 'Status', 
              accessor: (row) => {
                const statusColor = 
                  row.status === 'Delivered' ? 'badge-success' :
                  row.status === 'Shipped' ? 'badge-info' :
                  row.status === 'Processing' ? 'badge-warning' : 'badge-error';
                return <span className={`badge ${statusColor}`}>{row.status}</span>;
              }
            },
          ]}
          data={recentOrders}
        />
      </div>

      {/* Low Stock Alert */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alert</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.lowStockBooks.map((book) => (
            <motion.div
              key={book._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4"
            >
              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                <img
                  src={book.ImageUrl}
                  alt={book.Title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{book.Title}</p>
                <p className="text-sm text-primary-600">Stock: {book.StockQuantity}</p>
                <p className="text-sm text-gray-500">${book.Price.toFixed(2)}</p>
              </div>
              <div className="inline-flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Low Stock
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;