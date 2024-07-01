import { useLocation, Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utilities/formateCurrency";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "../../store/productSlice";

const SuccessPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());

    // Redirect if there is no orderData
    if (!orderData) {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, orderData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
        role="alert"
      >
        <p className="font-bold">Order Placed Successfully</p>
      </div>

      {orderData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="mb-4">
            <p className="font-bold">Order ID:</p>
            <p>{orderData._id}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Total Amount:</p>
            <p>{formatCurrency(orderData.amountTotal.$numberDecimal)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Shipping Cost:</p>
            <p>{formatCurrency(orderData.amountShipping.$numberDecimal)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Address:</p>
            <p>{orderData.address}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Mobile:</p>
            <p>(+880) {orderData.mobile}</p>
          </div>

          <div className="mt-2 text-center">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
