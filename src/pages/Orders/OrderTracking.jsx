import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrderTracking = ({ status, transactionID }) => {
  // Track order status steps based on the current status
  const steps = [
    { name: "Order Placed", completed: true },
    { name: "Processing", completed: status === "approved" },
    { name: "Shipped", completed: false },
    { name: "Delivered", completed: false },
  ];

  const renderSteps = () => {
    return steps.map((step, index) => (
      <div key={index} className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 ${
            step.completed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {step.completed ? <FaCheckCircle /> : index + 1}
        </div>
        <div className="ml-4 text-sm">{step.name}</div>
        {index < steps.length - 1 && (
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        Order Tracking: {transactionID}
      </h3>
      {status === "approved" ? (
        <div>{renderSteps()}</div>
      ) : (
        <div className="flex items-center text-red-500">
          <FaTimesCircle className="w-10 h-10" />
          <span className="ml-4 text-lg font-semibold">Order Cancelled</span>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
