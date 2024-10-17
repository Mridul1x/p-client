import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../utilities/formateCurrency";
import { format } from "date-fns";
import Overlay from "../../component/Overlay";
import Error from "../../component/Error";
import { getStatusColor } from "../../utilities/getStatusColor";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import OrderTracking from "./OrderTracking";
import ReviewModal from "../../component/ReviewModal";
import { MdOutlineRateReview } from "react-icons/md";
const UserOrders = () => {
  const userStore = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;

  // State for statistics
  const [totalOrders, setTotalOrders] = useState(0);
  const [subtotalApproved, setSubtotalApproved] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track the selected order for review
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/users/${userStore._id}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ordersData = Array.isArray(response.data) ? response.data : [];

        setOrders(ordersData);
        setIsLoading(false);

        // Calculate statistics
        calculateStatistics(ordersData);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    const calculateStatistics = (ordersData) => {
      // Total orders
      setTotalOrders(ordersData.length);

      // Subtotal of approved items
      const approvedOrders = ordersData.filter(
        (order) => order.status === "approved"
      );
      const subtotal = approvedOrders.reduce((acc, order) => {
        return acc + parseFloat(order.amountTotal.$numberDecimal);
      }, 0);
      setSubtotalApproved(subtotal);

      // Pending items count
      const pendingCount = ordersData.filter(
        (order) => order.status === "pending"
      ).length;
      setPendingCount(pendingCount);

      const failedCount = ordersData.filter(
        (order) => order.status === "failed"
      ).length;
      setFailedCount(failedCount);

      const approvedCount = ordersData.filter(
        (order) => order.status === "approved"
      ).length;
      setApprovedCount(approvedCount);
    };

    if (userStore) {
      fetchUserOrders();
    } else {
      const from = location.state?.from?.pathname || "/login";
      navigate(from, { replace: true });
    }
  }, [userStore, navigate]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (isLoading) {
    return <Overlay />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!userStore) {
    return null;
  }

  return (
    <div className="wrapper py-8 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome, {userStore.name}!</h2>
      </div>
      {/* Display statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-lg text-gray-500 mb-2 font-bold">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-lg text-gray-500 mb-2 font-bold">
              Subtotal of Approved Items
            </p>
            <p className="text-2xl font-bold text-blue-500">
              {formatCurrency(subtotalApproved)}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-lg text-gray-500 mb-2 font-bold">
              Approved Items
            </p>
            <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-lg text-gray-500 mb-2 font-bold">
              Pending Items
            </p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <p className="text-lg text-gray-500 mb-2 font-bold">Failed Items</p>
            <p className="text-2xl font-bold text-red-600">{failedCount}</p>
          </div>
        </div>
      </div>
      {/* Render Order Tracking for the first order
      {orders.length > 0 && (
        <OrderTracking
          status={orders[0].status}
          transactionID={orders[0].transactionID}
        />
      )} */}
      {orders.length > 0 ? (
        <div className="bg-white shadow-md rounded px-2 pt-6 pb-8">
          <div className="overflow-y-auto">
            <table className="w-full mt-4 text-left table">
              <thead>
                <tr className="uppercase border-b">
                  <th className="py-2 px-4  text-sm">Order ID</th>
                  <th className="py-2 px-4 text-sm">Products</th>
                  <th className="py-2 px-4 text-sm">Quantity</th>
                  <th className="py-2 px-4 text-sm">Shipping Cost</th>
                  <th className="py-2 px-4 text-sm">Subtotal</th>
                  <th className="py-2 px-4 text-sm">Date</th>
                  <th className="py-2 px-4 text-sm">Status</th>
                  <th className="py-2 px-4 text-sm">Payment Method</th>
                  <th className="py-2 px-4 text-sm">Transaction ID</th>
                  <th className="py-2 px-4 text-sm">Review</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-100 duration-300"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">{order._id}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ul>
                        {order.products.map((product) => (
                          <li key={product.productId._id}>
                            {product?.productId?.title || "N/A"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ul>
                        {order.products.map((product) => (
                          <li key={product?.productId?._id}>
                            {product.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {formatCurrency(order.amountShipping.$numberDecimal)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {formatCurrency(order.amountTotal.$numberDecimal)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {format(new Date(order.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td
                      className={`py-3 px-4 whitespace-nowrap ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.toUpperCase()}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {order.transactionID}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(order)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        <MdOutlineRateReview />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 min-h-screen">
          <h2 className="text-2xl font-semibold mt-8">
            Currently, you don't have any successful orders. To place an order,
            please visit:
          </h2>
          <Link
            to="/products"
            className="mt-2 inline-block bg-transparent border border-black text-black py-2 px-4 hover:bg-rose-900 transition-colors duration-300 font-serif"
          >
            SHOP NOW
          </Link>
        </div>
      )}
      {/* Review Modal */}
      {showModal && (
        <ReviewModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserOrders;
