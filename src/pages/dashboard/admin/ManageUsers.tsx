import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/dashboard/DataTable';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { IUser } from '../../../types/user';
import { useGetAllUsersQuery } from '../../../redux/features/user/userApi';
import LoadingPage from '../../LoadingPage';

const ManageUsers: React.FC = () => {

  const {data,isLoading}=useGetAllUsersQuery('');
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  if (isLoading) return <LoadingPage></LoadingPage>;
  const toggleBlockUser = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user._id === userId) {
        const updatedUser = { ...user, isBlocked: !user.isBlocked };
        
        // Log the action
        console.log(`User ${user.isBlocked ? 'unblocked' : 'blocked'}:`, updatedUser);
        
        toast.success(`User ${updatedUser.Name} has been ${updatedUser.isBlocked ? 'blocked' : 'unblocked'}`);
        return updatedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage user accounts</p>
      </div>

      <DataTable
        columns={[
          {
            header: 'User',
            accessor: (user) => (
              <div className="flex items-center">
                <img 
                  src={user.ProfileImage} 
                  alt={user.Name} 
                  className="h-10 w-10 rounded-full mr-3" 
                />
                <div>
                  <div className="font-medium text-gray-900">{user.Name}</div>
                  <div className="text-gray-500 text-sm">{user.Email}</div>
                </div>
              </div>
            ),
          },
          {
            header: 'Role',
            accessor: (user) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                user.UserType === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.UserType === 'admin' ? 'Admin' : 'User'}
              </span>
            ),
          },
          { header: 'Phone', accessor: 'Phone' },
          {
            header: 'Status',
            accessor: (user) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                user.isBlocked 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </span>
            ),
          },
          {
            header: 'Actions',
            accessor: (user) => (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBlockUser(user._id as string)}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    user.isBlocked
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200"
                  onClick={() => {
                    console.log('View user details:', user);
                    toast.info(`Viewing details for ${user.Name}`);
                  }}
                >
                  Details
                </motion.button>
              </div>
            ),
          },
        ]}
        data={users}
        searchable
        searchPlaceholder="Search users..."
      />
    </div>
  );
};

export default ManageUsers;