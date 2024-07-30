import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Overlay from "../../component/Overlay";
import Dashboard from "./DashBoard";
import UserList from "./UserList";

const AdminDashboard = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const { data: users, error, isLoading } = useFetch("/api/users", token);

  // Fetch users with orders
  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      if (users) {
        setIsLoadingOrders(true);
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
        setIsLoadingOrders(false);
      }
    };

    fetchUsersWithOrders();
  }, [users, token]);

  // Update order status
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

  // Calculate pending orders count
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

  // Calculate total approved orders amount
  const getTotalApprovedOrdersAmount = () => {
    let total = 0;
    usersWithOrders.forEach((user) => {
      user.orders.forEach((order) => {
        if (order.status === "approved") {
          total += parseFloat(order.amountTotal.$numberDecimal);
        }
      });
    });
    return total.toFixed(2);
  };

  // Loading screen
  if (isLoading || isLoadingOrders) {
    return (
      <div>
        <Overlay />
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div className="wrapper min-h-screen my-20">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl lg:text-4xl uppercase font-bold lg:font-semibold">
          Admin Dashboard
        </h2>
        <div>
          <span className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
            Pending: {getPendingOrdersCount()}
          </span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-md">
            Total Approved Items: BDT {getTotalApprovedOrdersAmount()}
          </span>
        </div>
      </div>
      <Dashboard
        usersWithOrders={usersWithOrders}
        handleUpdateOrderStatus={handleUpdateOrderStatus}
      />
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboard;
