import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';

interface DashboardLayoutProps {
  userRole: 'admin' | 'user';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile - with overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-30 w-64 lg:hidden"
            >
              <Sidebar userRole={userRole} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64">
          <Sidebar userRole={userRole} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;