import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utilities/formateCurrency";
import { format } from "date-fns";
import Overlay from "../../component/Overlay";
import Error from "../../component/Error";
import { getStatusColor } from "../../utilities/getStatusColor";

const UserOrders = () => {
  const userStore = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;

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
        console.log(response.data);

        const ordersData = Array.isArray(response.data) ? response.data : [];

        setOrders(ordersData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    if (userStore) {
      fetchUserOrders();
    } else {
      const from = location.state?.from?.pathname || "/login";
      navigate(from, { replace: true });
    }
  }, [userStore, navigate]);

  if (isLoading) {
    return (
      <div>
        <Overlay />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (!userStore) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="section-title text-2xl font-bold mb-4 md:mb-8">
        Your order{orders.length > 1 ? "s" : ""}: {orders.length}
      </h2>

      {orders.length > 0 ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="overflow-x-auto md:overflow-x-visible">
            <table className="w-full mt-4 text-center">
              <thead>
                <tr className="uppercase border-b">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Products</th>
                  <th className="py-2 px-4">Products QUANTITY</th>
                  <th className="py-2 px-4">Shipping Cost</th>
                  <th className="py-2 px-4">Subtotal</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Status</th>
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
                            {product.productId.title || "N/A"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ul>
                        {order.products.map((product) => (
                          <li key={product.productId._id}>
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
    </div>
  );
};

export default UserOrders;
