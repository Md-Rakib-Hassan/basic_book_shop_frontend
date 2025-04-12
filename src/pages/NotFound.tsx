import { motion } from 'framer-motion';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </p>
      <p className="text-gray-600 mt-2">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
