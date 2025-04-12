import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import axios from 'axios';

interface Book {
  _id: string;
  Title: string;
  Price: number;
  StockQuantity: number;
  ImageUrl: string;
}

interface User {
  _id: string;
  Name: string;
  Email: string;
  Address: string;
  Phone: string;
}

interface CheckoutProps {
  book: Book;
  user: User;
}

const Checkout = () => {
    
    const params = useParams();
      
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'Mobile Banking' | 'Cash on Delivery'>('Mobile Banking');
  const navigate = useNavigate();

  const total = +(book.Price * quantity).toFixed(2);

  const handleOrder = async () => {
    if (quantity > book.StockQuantity) {
      return toast.error('Quantity exceeds available stock.');
    }

    try {
      const orderPayload = {
        UserId: user._id,
        BookDetails: [{ BookId: book._id, Quantity: quantity }],
        PaymentMethod: paymentMethod,
        SubTotal: total,
        Total: total,
      };

      const { data } = await axios.post('/api/orders', orderPayload); // update with your backend route
      toast.success('Order placed successfully!');
      navigate('/dashboard/orders'); // redirect to user's order page
    } catch (error) {
      toast.error('Something went wrong while placing order.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-6 text-[#1b8bcb]"
      >
        Checkout
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
        {/* Book Details */}
        <div>
          <img src={book.ImageUrl} alt={book.Title} className="w-full h-60 object-cover rounded" />
          <h3 className="mt-4 text-xl font-semibold">{book.Title}</h3>
          <p className="text-gray-600">Price: ${book.Price}</p>
          <p className="text-gray-600">Stock: {book.StockQuantity}</p>

          <label className="block mt-4">
            <span className="text-gray-700">Quantity</span>
            <input
              type="number"
              value={quantity}
              min={1}
              max={book.StockQuantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            />
          </label>
        </div>

        {/* User & Payment Details */}
        <div>
          <h4 className="text-lg font-medium mb-2">Shipping Info</h4>
          <p><span className="font-semibold">Name:</span> {user.Name}</p>
          <p><span className="font-semibold">Email:</span> {user.Email}</p>
          <p><span className="font-semibold">Address:</span> {user.Address}</p>
          <p><span className="font-semibold">Phone:</span> {user.Phone}</p>

          <div className="mt-4">
            <label className="text-gray-700 block mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full border border-gray-300 rounded shadow-sm"
            >
              <option value="Mobile Banking">Mobile Banking</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <p className="mt-4 text-lg font-semibold text-[#1b8bcb]">
            Total: ${total}
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-[#1b8bcb] text-white px-6 py-2 rounded w-full"
            onClick={handleOrder}
          >
            Order Now
          </motion.button>
        </div>
      </div>

      {/* SurjoPay Placeholder */}
      {paymentMethod === 'Mobile Banking' && (
        <p className="text-sm text-gray-500 text-center mt-4">
          You will be redirected to SurjoPay after clicking "Order Now".
        </p>
      )}
    </div>
  );
};

export default Checkout;
