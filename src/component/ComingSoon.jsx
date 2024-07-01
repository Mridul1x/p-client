import React from "react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-md mx-5 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Coming Soon!</h1>
        <p className="text-gray-700 text-lg text-center">
          Our new product line is currently under development. Stay tuned for an
          exciting launch!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
