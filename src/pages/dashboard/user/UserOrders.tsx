import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useGetMyOrdersQuery } from '../../../redux/features/order/orderApi';
import LoadingPage from '../../LoadingPage';

const UserOrders: React.FC = () => {

  const { data, isLoading, error } = useGetMyOrdersQuery('');
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

  
  if (isLoading) return <LoadingPage></LoadingPage>;
  const userOrders = data?.data || [];
  
  // console.log(userOrders);

  const ordersWithDetails = userOrders.map(order => {
    const bookDetails = order.BookDetails.map(bd => {
      const book = bd.BookId;
      // console.log( book);
      return {
        id: book?._id,
        title: book ? book.Title : 'Unknown Book',
        quantity: bd.Quantity,
        price: book ? book.Price : 0,
        image: book ? book.ImageUrl : '',
      };
    });
    
    return {
      ...order,
      bookDetails,
      isExpanded: false,
    };
  });

  
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // const viewOrderDetails = (order: any) => {

  //   console.log('View order details:', order);
    
  //   toast.info(`Viewing details for order #${order._id}`);
    

  // };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-sm text-gray-500">View and track your orders</p>
      </div>

      {ordersWithDetails.length > 0 ? (
        <div className="space-y-4">
          {ordersWithDetails.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Order #{order._id}</p>
                  <p className="text-sm text-gray-500">
                    {order.OrderDate ? new Date(order.OrderDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">৳ {order.Total.toFixed(2)}</p>
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
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleOrderDetails(order._id as string)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    {expandedOrderId === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.button>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrderId === order._id && (
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-4">
                    {order.bookDetails.map((book, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-16 w-12 rounded overflow-hidden">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{book.title}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {book.quantity} × ৳ {book.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                          ৳ {(book.quantity * book.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-500">Subtotal</p>
                        <p className="text-gray-900">৳ {order.SubTotal.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <p className="text-gray-500">Shipping</p>
                        <p className="text-gray-900">৳ {(order.Total - order.SubTotal).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between font-medium text-base mt-2">
                        <p className="text-gray-900">Total</p>
                        <p className="text-gray-900">৳ {order.Total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-gray-200">
                      <div>
                        {/* <p className="text-sm text-gray-500">
                          Payment Method: <span className="font-medium">{order.PaymentMethod}</span>
                        </p> */}
                        <p className="text-sm text-gray-500">
                          Payment Status: <span className="font-medium">{order.PaymentStatus}</span>
                        </p>
                      </div>
                      {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => viewOrderDetails(order)}
                        className="btn btn-primary"
                      >
                        <Eye size={16} />
                        View Details
                      </motion.button> */}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 text-center rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-500 mb-4">You don't have any orders yet.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Browse Books
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default UserOrders;