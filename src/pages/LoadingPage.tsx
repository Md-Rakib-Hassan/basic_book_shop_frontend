import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <ClipLoader color="#1b8bcb" size={60} />
      <p className="mt-4 text-lg font-medium text-[#1b8bcb] animate-pulse">
        Loading BookNest...
      </p>
    </div>
  );
};

export default LoadingPage;
