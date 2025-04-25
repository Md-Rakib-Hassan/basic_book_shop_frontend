import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { mockUsers } from '../../../utils/mockData';

const UserProfile: React.FC = () => {
  // Get user ID (would normally come from auth)
  const userId = '1'; // Mock user ID
  
  // Get user data
  const userData = mockUsers.find(user => user._id === userId);
  
  const [formData, setFormData] = useState({
    Name: userData?.Name || '',
    Email: userData?.Email || '',
    Phone: userData?.Phone || '',
    Address: userData?.Address || '',
    ProfileImage: userData?.ProfileImage || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the data as requested
    console.log('Profile update submitted with data:', formData);
    
    // Show success toast
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account information</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Profile Sidebar */}
          <div className="md:w-1/3 p-6 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={formData.ProfileImage}
                  alt={formData.Name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full text-xs shadow-sm"
                >
                  Change
                </motion.button>
              </div>
              <h2 className="text-xl font-bold">{formData.Name}</h2>
              <p className="text-gray-500">{formData.Email}</p>
              
              <div className="w-full mt-6 space-y-2">
                <div className="p-3 bg-white rounded-md border border-gray-200 text-left flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium">{userData?.UserType === 'admin' ? 'Admin' : 'User'}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    userData?.UserType === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {userData?.UserType === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
                
                <div className="p-3 bg-white rounded-md border border-gray-200 text-left">
                  <p className="text-sm text-gray-500">Account Status</p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Active</p>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Edit Profile Information</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="Name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="Phone"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ProfileImage" className="form-label">Profile Image URL</label>
                  <input
                    type="url"
                    id="ProfileImage"
                    name="ProfileImage"
                    value={formData.ProfileImage}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Address" className="form-label">Address</label>
                <textarea
                  id="Address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;