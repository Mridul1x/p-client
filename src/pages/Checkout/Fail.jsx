import React from "react";
import { useParams } from "react-router-dom";

const Fail = () => {
  const { transactionID } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
        role="alert"
      >
        <p className="font-bold">Payment Failed</p>
        <p>Transaction ID: {transactionID}</p>
      </div>
      <p className="text-gray-700">
        Your payment could not be processed. Please try again or contact
        support.
      </p>
    </div>
  );
};

export default Fail;
