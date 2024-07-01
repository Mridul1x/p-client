import React from "react";

const SkeletonProductItem = () => {
  return (
    <div className="flex flex-col gap-3 w-full md:w-[20rem] border-b pb-3 animate-pulse">
      <div className="w-full h-[30rem] bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-16 bg-gray-300 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/5"></div>
      </div>
    </div>
  );
};

export default SkeletonProductItem;
