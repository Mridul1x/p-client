import React from "react";
import { useParams } from "react-router-dom";

const Cancel = () => {
  const { transactionID } = useParams();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
        role="alert"
      >
        <p className="font-bold">Payment Cancelled</p>
        <p>Transaction ID: {transactionID}</p>
      </div>
      <p className="text-gray-700">
        Your payment has been cancelled. If this was a mistake, please try again
        or contact support.
      </p>
    </div>
  );
};

export default Cancel;
