import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, BookOpen, Clock, Bookmark } from 'lucide-react';
import StatCard from '../../../components/dashboard/StatCard';
import { mockOrders } from '../../../utils/mockData';
import { Link } from 'react-router';
import { useGetMyOrdersQuery } from '../../../redux/features/order/orderApi';
import LoadingPage from '../../LoadingPage';

const UserDashboard: React.FC = () => {
   const { data, isLoading, error } = useGetMyOrdersQuery('');
   
   if (isLoading) return <LoadingPage></LoadingPage>;
   const userOrders = data?.data || [];
  // Calculate stats
  console.log(userOrders);
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.Total, 0);
  const pendingOrders = userOrders.filter(order => 
    order.OrderStatus === 'Processing' || order.OrderStatus === 'Shipped'
  ).length;
  
  // Get recent orders
  const recentOrders = [...userOrders]
    .sort((a, b) => new Date(b.OrderDate as Date).getTime() - new Date(a.OrderDate as Date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back to your BookShop account</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          color="bg-primary-600"
        />
        <StatCard
          title="Total Spent"
          value={`৳${totalSpent.toFixed(2)}`}
          icon={BookOpen}
          color="bg-green-600"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={Clock}
          color="bg-amber-600"
        />
        {/* <StatCard
          title="Wishlist Items"
          value="0"
          icon={Bookmark}
          color="bg-purple-600"
        /> */}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          <Link to="/dashboard/user/orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View All Orders
            </motion.button>
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <motion.div
                  key={order._id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order._id}</p>
                      <p className="text-sm text-gray-500">
                        {order.OrderDate ? new Date(order.OrderDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">৳{order.Total.toFixed(2)}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.OrderStatus === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.OrderStatus === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.OrderStatus === 'Processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {order.OrderStatus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended For You</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mock book recommendations */}
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={`https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=600`}
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">Recommended Book {index}</h3>
                <p className="text-sm text-gray-500 mt-1">Based on your reading history</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-primary-600 font-medium">৳14.99</span>
                  <button className="text-sm btn btn-primary py-1">View Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;