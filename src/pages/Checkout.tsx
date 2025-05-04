import React, {  useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {  Truck, ShoppingBag, Book } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useGetSpecificBookQuery } from '../redux/features/books/bookApi';
import LoadingPage from './LoadingPage';
import { useCreateOrderMutation } from '../redux/features/order/orderApi';
import { useInitPaymentMutation } from '../redux/features/payment/paymentApi';

interface CheckoutFormData {
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    },
  });
  const qty = parseInt(searchParams.get('qty'));

  const { isLoading: bookLoading, currentData: book } = useGetSpecificBookQuery(bookId);
  const [createOrder,{isSuccess,isError, isLoading:orderLoading}] = useCreateOrderMutation();
    const [initPayment] = useInitPaymentMutation();
  
  if (bookLoading) return <LoadingPage />;


  // const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 5.99;
  const subtotal = parseFloat(book?.data?.Price) * parseInt(qty);
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [section, field] = e.target.name.split('.');
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof CheckoutFormData],
        [field]: e.target.value,
      },
    }));
  };




  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const BookDetails= [
      {
        BookId: book?.data?._id,
        Quantity: qty,
      }]
    const CustomerDetails = {
      Name: formData.shippingAddress.fullName,
      Address: formData.shippingAddress.addressLine1+' '+formData.shippingAddress.addressLine2,
      City: formData.shippingAddress.city,
      State: formData.shippingAddress.state,
      ZIPCode: formData.shippingAddress.zipCode,
      Country: formData.shippingAddress.country,
      Phone: formData.shippingAddress.phone,
    };
    // Log the checkout data
    // console.log('Checkout form submitted with data:', {
    //   ...formData,
    // });
    const orderData = {
      CustomerDetails,
      BookDetails,
    }
    console.log(orderData);

    try {
      const response = await initPayment(orderData).unwrap();
      console.log("Payment initialized:", response);
      window.location.replace(response?.url);
    } catch (error) {
      console.error("Error initializing payment:", error);
    }

  };

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <ShoppingBag className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <form id='checkout-form' onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="shippingAddress.fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="shippingAddress.fullName"
                    value={formData.shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="shippingAddress.addressLine1" className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    name="shippingAddress.addressLine1"
                    value={formData.shippingAddress.addressLine1}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="shippingAddress.addressLine2" className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    name="shippingAddress.addressLine2"
                    value={formData.shippingAddress.addressLine2}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="shippingAddress.city" className="form-label">City</label>
                  <input
                    type="text"
                    name="shippingAddress.city"
                    value={formData.shippingAddress.city}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shippingAddress.state" className="form-label">State</label>
                  <input
                    type="text"
                    name="shippingAddress.state"
                    value={formData.shippingAddress.state}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shippingAddress.zipCode" className="form-label">ZIP Code</label>
                  <input
                    type="text"
                    name="shippingAddress.zipCode"
                    value={formData.shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shippingAddress.country" className="form-label">Country</label>
                  <input
                    type="text"
                    name="shippingAddress.country"
                    value={formData.shippingAddress.country}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="shippingAddress.phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="shippingAddress.phone"
                    value={formData.shippingAddress.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </motion.div>


          </form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {[book?.data].map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <img
                      src={item.ImageUrl}
                      alt={item.Title}
                      className="h-20 w-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.Title}</h3>
                      <p className="text-sm text-gray-500">by {item?.Author?.Name}</p>
                      <p className="text-sm text-gray-500">Quantity: {qty}</p>
                    </div>
                    <p className="font-medium text-gray-900">৳{(item.Price).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">৳{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
              
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              form='checkout-form'
              className="w-full btn btn-primary py-3"
            >
              Place Order
            </motion.button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
                Your payment information is securely processed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;