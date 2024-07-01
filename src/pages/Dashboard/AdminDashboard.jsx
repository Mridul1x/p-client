import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Overlay from "../../component/Overlay";
import Dashboard from "./DashBoard";

const AdminDashboard = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const { data: users, error, isLoading } = useFetch("/api/users", token);

  //fetch data
  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      if (users) {
        setIsLoadingOrders(true); // Set isLoadingOrders to true before fetching orders
        const usersWithOrdersData = await Promise.all(
          users.map(async (user) => {
            const response = await fetch(
              `${apiBaseUrl}/api/users/${user._id}/orders`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const orders = await response.json();
            return {
              ...user,
              orders,
            };
          })
        );
        setUsersWithOrders(usersWithOrdersData);
        setIsLoadingOrders(false); // Set isLoadingOrders to false after fetching orders
      }
    };

    fetchUsersWithOrders();
  }, [users, token]);

  // order status update
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/orders/update-status`,
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the usersWithOrders state with the updated order
      setUsersWithOrders((prevUsersWithOrders) =>
        prevUsersWithOrders.map((user) => ({
          ...user,
          orders: user.orders.map((order) =>
            order._id === orderId ? response.data : order
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  // pending orders count
  const getPendingOrdersCount = () => {
    let count = 0;
    usersWithOrders.forEach((user) => {
      user.orders.forEach((order) => {
        if (order.status === "pending") {
          count++;
        }
      });
    });
    return count;
  };

  // loading screen
  if (isLoading || isLoadingOrders) {
    return (
      <div>
        <Overlay />
      </div>
    );
  }

  // error screen
  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div className="wrapper min-h-screen my-20">
      <div className="flex justify-between">
        <h2 className="text-xl lg:text-4xl uppercase font-bold lg:font-semibold">
          Admin Dashboard
        </h2>
        <span className=" bg-red-500 text-white px-2 py-1 rounded-md">
          Pending: {getPendingOrdersCount()}
        </span>
      </div>
      <Dashboard
        usersWithOrders={usersWithOrders}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
      ></Dashboard>
    </div>
  );
};

export default AdminDashboard;
