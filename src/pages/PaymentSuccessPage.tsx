import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center max-w-md w-full"
      >
        <CheckCircle className="text-green-500" size={64} />
        <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link to="/" className="mt-6 w-full">
          <button className="w-full btn btn-primary py-3">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
