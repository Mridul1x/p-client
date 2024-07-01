import React from "react";

const Overlay = () => {
  return (
    <div className="min-h-screen inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mb-4"></div>
        <p className="text-black text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Overlay;
