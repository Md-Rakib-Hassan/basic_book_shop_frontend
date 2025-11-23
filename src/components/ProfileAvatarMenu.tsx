import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import ProfileAvatar from "./ui/ProfileAvatar";

interface ProfileAvatarMenuProps {
  imageUrl: string;
  onDashboard: () => void;
  onLogout: () => void;
  size?: string;
}

const ProfileAvatarMenu = ({
  imageUrl,
  onDashboard,
  onLogout,
  onProfile,
  size = "w-12 h-12",
}: ProfileAvatarMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div 
        onClick={() => setOpen((prev) => !prev)}
      >
        <ProfileAvatar imageUrl={imageUrl} size="w-12 h-12"></ProfileAvatar>
        
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50 overflow-hidden"
          >

            <button
              onClick={() => {
                setOpen(false);
                onProfile();
              }}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onDashboard();
              }}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileAvatarMenu;
