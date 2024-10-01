import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utilities/formateCurrency";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/productSlice";
import { FaRegCheckCircle } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "../../component/OrderPdf";

const Success = () => {
  const { transactionID } = useParams();
  const userStore = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());

    if (!transactionID) {
      navigate("/", { replace: true });
    }

    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/orders/${transactionID}`
        );
        const fetchedOrder = response.data;

        // Fetch product details for each product in the order
        const productsWithDetails = await Promise.all(
          fetchedOrder.products.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:5050/api/products/${item.productId}`
            );
            return {
              ...item,
              productDetails: productResponse.data, // Assuming product data has `name` field
            };
          })
        );

        setOrderData({
          ...fetchedOrder,
          products: productsWithDetails,
        });
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

          {/* Order Summary Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Product Name</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData.products.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">
                      {item.productDetails.title}
                    </td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                    <td className="px-4 py-2 border">
                      {formatCurrency(item.productDetails.price)}{" "}
                      {/* Replace with product price */}
                    </td>
                    <td className="px-4 py-2 border">
                      {formatCurrency(
                        item.quantity * item.productDetails.price
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="text-right px-4 py-2 font-bold border"
                  >
                    Total Amount:
                  </td>
                  <td className="px-4 py-2 border text-center">
                    BDT {formatCurrency(orderData.amountTotal.$numberDecimal)}
                  </td>
                </tr>
              </tfoot>
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="text-right px-4 py-2 font-bold border"
                  >
                    Shipping Cost:
                  </td>
                  <td className="px-4 py-2 border text-center">
                    BDT {formatCurrency(orderData.amountShipping.$numberDecimal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Order Information */}
          <div className="mt-8">
            <p className="font-bold text-gray-800">Order ID:</p>
            <p>{orderData._id}</p>

            <p className="font-bold text-gray-800 mt-4">Address:</p>
            <p>{orderData.address}</p>

            <p className="font-bold text-gray-800 mt-4">Mobile:</p>
            <p>(+880) {orderData.mobile}</p>
          </div>

          {/* Actions */}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 me-2"
            >
              View Orders
            </Link>
            <PDFDownloadLink
              document={
                <OrderPDF
                  orderData={orderData}
                  userStore={userStore}
                  transactionID={transactionID}
                />
              }
              fileName={`order_${transactionID}.pdf`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
