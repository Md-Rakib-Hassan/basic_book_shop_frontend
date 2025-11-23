import { motion } from "framer-motion";

interface ProfileAvatarProps {
  imageUrl: string;
  size?: string; 
}

const ProfileAvatar = ({ imageUrl, size = "w-24 h-24" }: ProfileAvatarProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`overflow-hidden rounded-full border-4 border-white shadow-xl ring-2 ring-indigo-500 ${size}`}
    >
      <img
        src={imageUrl}
        alt="Profile"
        className="object-cover w-full h-full"
      />
    </motion.div>
  );
};

export default ProfileAvatar;
