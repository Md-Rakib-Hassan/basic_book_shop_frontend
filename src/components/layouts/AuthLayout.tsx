import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">BookShop</h2>
          <p className="mt-2 text-sm text-gray-600">Your gateway to literary adventures</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;