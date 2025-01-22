import React from "react";

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E3D2D] dark:bg-background-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-75"></div>
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
