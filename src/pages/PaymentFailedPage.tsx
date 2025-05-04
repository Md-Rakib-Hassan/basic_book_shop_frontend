import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentFailedPage = () => {
  return (
    <div className="h-[50vh] flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center max-w-md w-full"
      >
        <XCircle className="text-red-500" size={64} />
        <h1 className="text-3xl font-bold mt-4">Payment Failed</h1>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong with your payment. Please try again.
        </p>
        <Link to="/" className="mt-6 w-full">
          <button className="w-full btn btn-primary py-3">
                      {/* Retry Payment */}
                      Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentFailedPage;
