import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utilities/formateCurrency";
import { useDispatch } from "react-redux"; // Uncomment if using Redux
import { clearCart } from "../../store/productSlice"; // Uncomment if using Redux
import { FaRegCheckCircle } from "react-icons/fa";

const Success = () => {
  const { transactionID } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart()); // Uncomment if using Redux

    if (!transactionID) {
      navigate("/", { replace: true });
    }

    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${transactionID}`
        );
        setOrderData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [dispatch, navigate, transactionID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center">
        <FaRegCheckCircle className="h-10 w-10 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-center mb-3">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-3">Transaction ID: {transactionID}</p>
      </div>
      {orderData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="mb-4">
            <p className="font-bold text-gray-800">Order ID:</p>
            <p>{orderData._id}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-800">Total Amount:</p>
            <p>{formatCurrency(orderData.amountTotal.$numberDecimal)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-800">Shipping Cost:</p>
            <p>{formatCurrency(orderData.amountShipping.$numberDecimal)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-800">Address:</p>
            <p>{orderData.address}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-gray-800">Mobile:</p>
            <p>(+880) {orderData.mobile}</p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-4">
              Want to see all your order details? Visit the{" "}
              <Link
                to="/orders"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Orders
              </Link>{" "}
              page.
            </p>
            <Link
              to="/orders"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
