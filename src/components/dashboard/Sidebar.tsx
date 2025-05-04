import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Home, 
  Users, 
  ShoppingCart, 
  Book, 
  User, 
  Lock,
  LogOut
} from 'lucide-react';
import { logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';

interface SidebarProps {
  userRole: 'admin' | 'user';
}

const linkClass = "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-md transition-all duration-200";
const activeLinkClass = "bg-primary-50 text-primary-700 font-medium";




const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const onLogout = () => {
  
    dispatch(logOut());
    navigate('/');

  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Link to={'/'}><motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <BookOpen className="w-8 h-8 text-primary-600" />
          <span className="text-xl font-bold text-primary-700">BookShop</span>
        </motion.div></Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {/* Common dashboard link */}
          

          {/* Admin Links */}
          {userRole === 'admin' && (
            <>
              <NavLink
            to="/dashboard/admin"
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
            end
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
              <NavLink
                to="/dashboard/admin/users"
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <Users size={20} />
                <span>Manage Users</span>
              </NavLink>

              <NavLink
                to="/dashboard/admin/books"
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <Book size={20} />
                <span>Manage Books</span>
              </NavLink>

              <NavLink
                to="/dashboard/admin/orders"
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
              >
                <ShoppingCart size={20} />
                <span>Manage Orders</span>
              </NavLink>
            </>
          )}

          {/* User Links */}
          {userRole === 'user' && (
            <>
              <NavLink
            to="/dashboard/user"
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
            end
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
            
            <NavLink
              to="/dashboard/user/orders"
              className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
              >
              <ShoppingCart size={20} />
              <span>My Orders</span>
            </NavLink>
              </>
          )}

          {/* Common account links */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard/change-password"
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
          >
            <Lock size={20} />
            <span>Change Password</span>
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button onClick={onLogout} className={`${linkClass} w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50`}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;