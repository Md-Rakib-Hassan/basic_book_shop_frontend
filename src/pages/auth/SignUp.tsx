import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { toast } from "sonner";
import RingLoader from "react-spinners/RingLoader";
import { useSignupMutation } from "../../redux/features/auth/authApi";
const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Address: "",
    Phone: "",
  });
  const[isImageUploading, setIsImageUploading] = useState(false);
  const [signup, { isError, isLoading, data, isSuccess }] = useSignupMutation();
  const [image, setImage] = useState<File | null>(null);
  const [setImageUrl] = useState<string>(""); // Removed unused 'imageUrl'

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = "";

      if (image) {
        setIsImageUploading(true);
        const formDataImg = new FormData();
        formDataImg.append("file", image);
        formDataImg.append("upload_preset", "BookShop"); // Replace with your Cloudinary upload preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dw74s1u8t/image/upload",
          formDataImg
        );
        uploadedImageUrl = response.data.secure_url;
 
      }
      setIsImageUploading(false);
      const payload = { ...formData, ProfileImage: uploadedImageUrl };
  
      const result = await signup(payload).unwrap();

      if (result) {
        toast.success("Registration successful! Redirecting to login.");
        navigate("/auth/login");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration or image upload failed:", error);
      toast.error(error.data.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl overflow-hidden">
      {/* Image / Animation Side */}
      <motion.div
        className="hidden md:flex items-center justify-center bg-blue-100"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/images/SignUp_ill.jpg"
          alt="Signup Illustration"
          className="object-cover rounded-l-xl h-full"
        />
      </motion.div>

      {/* Form Side */}
      <motion.div
        className="p-10 flex flex-col justify-center bg-white"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Join us today! It takes only a few steps.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <textarea
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="tel"
            name="Phone"
            placeholder="Phone Number"
            value={formData.Phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            { isLoading||isImageUploading?<RingLoader size={20} color="#fff"/>:"Register"}
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
