// ReviewModal.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ReviewModal = ({ order, onClose }) => {
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const [reviews, setReviews] = useState({}); // State to store reviews for each product

  const handleReviewChange = (productId, review) => {
    setReviews({
      ...reviews,
      [productId]: review,
    });
  };

  const handleSubmitReviews = async (event) => {
    event.preventDefault();
    try {
      // Send reviews to the backend for each product in the order
      await Promise.all(
        order.products.map(async (product) => {
          const productReview = reviews[product.productId._id];
          if (productReview) {
            await axios.post(
              `${apiBaseUrl}/api/products/${product.productId._id}/reviews`, // Assuming this is your API endpoint
              { review: productReview },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        })
      );

      toast.success("Reviews submitted successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting reviews:", error);
      toast.error("Failed to submit reviews.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg   
 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmitReviews}>
          <ul>
            {order.products.map((product) => (
              <li key={product.productId._id} className="mb-4">
                <h3 className="text-lg font-bold mb-2">
                  {product.productId.title}
                </h3>
                <textarea
                  value={reviews[product.productId._id] || ""}
                  onChange={(e) =>
                    handleReviewChange(product.productId._id, e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500   
 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
