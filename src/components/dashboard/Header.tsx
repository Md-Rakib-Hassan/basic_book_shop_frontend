import React, { use } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFullUser } from '../../redux/hooks/useUserByEmail';
import ProfileAvatar from '../ui/ProfileAvatar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const user = useFullUser();
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b border-gray-200">
      <button
        onClick={toggleSidebar}
        className="p-2 mr-4 text-gray-500 rounded-md lg:hidden hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
      >
        <Menu size={24} />
      </button>

 
      <div className="flex items-center justify-end w-screen gap-4">
        {/* <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-gray-500 rounded-full hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            2
          </span>
        </motion.button> */}

        <div className="flex items-center">
          <ProfileAvatar imageUrl={user?.user?.ProfileImage} size='h-10 w-10'></ProfileAvatar>
          <div className="ml-2 hidden sm:block">
            <div className="text-sm font-medium text-gray-700">{user?.user?.Name }</div>
            <div className="text-xs text-gray-500">{user?.user?.Email}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;