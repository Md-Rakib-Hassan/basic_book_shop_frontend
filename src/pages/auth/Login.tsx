import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";


const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({ Email: "", Password: "" });
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useAppDispatch();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      //   console.log("Login Credentials:", credentials);
      
    const res = await login(credentials).unwrap();
    console.log(res);
      
    if (res) {
      const user = verifyToken(res?.data?.token);
        dispatch(setUser({user, token: res?.data?.token}));
    }
    toast.success("Login successful!");
        navigate("/");
    };
    
    

  return (
    
        <div className="bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl overflow-hidden">
          {/* Image Side */}
          <motion.div
            className="hidden md:flex items-center justify-center bg-blue-100"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/Login_ill.jpg"
              alt="Login Illustration"
              className="h-full rounded-l-xl"
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
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Login to continue to your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="Email"
                placeholder="Email Address"
                value={credentials.Email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={credentials.Password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Login
              </button>
              <p className="text-sm text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-blue-500 hover:underline">
                  Signup here
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      
  );
};

export default Login;
