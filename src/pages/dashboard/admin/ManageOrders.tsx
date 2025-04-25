import React, { useState } from 'react';
import DataTable from '../../../components/dashboard/DataTable';

import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, XCircle, Truck } from 'lucide-react';
import { mockBooks, mockOrders, mockUsers } from '../../../utils/mockData';

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);

  // Prepare the order data with user and book information
  const ordersWithDetails = orders.map(order => {
    const user = mockUsers.find(u => u._id === order.UserId);
    
    const bookDetails = order.BookDetails.map(bd => {
      const book = mockBooks.find(b => b._id === bd.BookId);
      return {
        title: book ? book.Title : 'Unknown Book',
        quantity: bd.Quantity,
        price: book ? book.Price : 0
      };
    });
    
    const itemCount = bookDetails.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      ...order,
      userName: user ? user.Name : 'Unknown User',
      itemCount,
      bookDetails
    };
  });

  const updateOrderStatus = (orderId: string, status: string) => {
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, OrderStatus: status };
        
        // Log the action
        console.log(`Order status updated:`, updatedOrder);
        
        toast.success(`Order #${orderId} status updated to ${status}`);
        return updatedOrder;
      }
      return order;
    });
    
    setOrders(updatedOrders);
  };

  const viewOrderDetails = (order: any) => {
    // Log the action
    console.log('View order details:', order);
    
    toast.info(`Viewing details for order #${order._id}`);
    
    // In a real app, this would open a modal with all details
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Review and update customer orders</p>
      </div>

      <DataTable
        columns={[
          { header: 'Order ID', accessor: '_id' },
          { 
            header: 'Customer', 
            accessor: 'userName',
          },
          { 
            header: 'Date', 
            accessor: (order) => 
              order.OrderDate 
                ? new Date(order.OrderDate).toLocaleDateString() 
                : 'N/A' 
          },
          { 
            header: 'Items', 
            accessor: 'itemCount'
          },
          { 
            header: 'Total', 
            accessor: (order) => `$${order.Total.toFixed(2)}` 
          },
          { 
            header: 'Payment', 
            accessor: (order) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                order.PaymentStatus === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : order.PaymentStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {order.PaymentStatus}
              </span>
            )
          },
          { 
            header: 'Status', 
            accessor: (order) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
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
            )
          },
          {
            header: 'Actions',
            accessor: (order) => (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => viewOrderDetails(order)}
                  className="p-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  title="View Details"
                >
                  <Eye size={16} />
                </motion.button>
                
                {order.OrderStatus !== 'Processing' && order.OrderStatus !== 'Cancelled' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateOrderStatus(order._id as string, 'Processing')}
                    className="p-1.5 text-xs rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    title="Mark as Processing"
                  >
                    <CheckCircle size={16} />
                  </motion.button>
                )}
                
                {order.OrderStatus !== 'Shipped' && order.OrderStatus !== 'Cancelled' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateOrderStatus(order._id as string, 'Shipped')}
                    className="p-1.5 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                    title="Mark as Shipped"
                  >
                    <Truck size={16} />
                  </motion.button>
                )}
                
                {order.OrderStatus !== 'Delivered' && order.OrderStatus !== 'Cancelled' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateOrderStatus(order._id as string, 'Delivered')}
                    className="p-1.5 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200"
                    title="Mark as Delivered"
                  >
                    <CheckCircle size={16} />
                  </motion.button>
                )}
                
                {order.OrderStatus !== 'Cancelled' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateOrderStatus(order._id as string, 'Cancelled')}
                    className="p-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                    title="Cancel Order"
                  >
                    <XCircle size={16} />
                  </motion.button>
                )}
              </div>
            ),
          },
        ]}
        data={ordersWithDetails}
        searchable
        searchPlaceholder="Search orders..."
      />
    </div>
  );
};

export default ManageOrders;