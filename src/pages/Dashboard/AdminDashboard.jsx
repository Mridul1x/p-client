import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Overlay from "../../component/Overlay";
import Dashboard from "./DashBoard";
import UserList from "./UserList";
import DashboardTab from "./DashboardTab";
import { MdCreateNewFolder, MdDashboard } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";

const AdminDashboard = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const [activeTab, setActiveTab] = useState("dashboard");
  const userStore = useSelector((state) => state.user?.user);

  const { data: users, error, isLoading } = useFetch("/api/users", token);

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

  const getApprovedItemsCount = () => {
    let count = 0;
    usersWithOrders.forEach((user) => {
      user.orders.forEach((order) => {
        if (order.status === "approved") {
          count++;
        }
      });
    });
    return count;
  };

  const getTotalUsersCount = () => {
    return users ? users.filter((user) => user.role === "user").length : 0;
  };

  if (isLoading || isLoadingOrders) {
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

  return (
    <main>
      <section className="section-padding">
        <h1 className="section-title text-center">Admin Dashboard</h1>
        <div className="min-h-screen bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-black grid grid-cols-[20rem_auto] mt-4 mx-5">
          <aside className="bg-black flex justify-center p-10">
            <div className="flex flex-col gap-5 justify-start h-fit">
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="dashboard"
                placeholder="Dashboard"
              >
                {<MdDashboard />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="users-order"
                placeholder="Users Order"
              >
                {<LiaHandsHelpingSolid />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="users"
                placeholder="All Users"
              >
                {<MdCreateNewFolder />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="create-product"
                placeholder="Create A Product"
              >
                {<MdCreateNewFolder />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="all-products"
                placeholder="All Products"
              >
                {<MdCreateNewFolder />}
              </DashboardTab>
            </div>
          </aside>
          <div className="py-10 px-5 bg-white ">
            {activeTab === "dashboard" && (
              <div className=" min-h-screen px-5">
                <h2 className="text-5xl mb-10 text-black font-semibold">
                  Welcome back,
                  <span className="text-[#8fc442]"> {userStore?.name}</span>.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-black">
                  <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h3 className="text-2xl font-semibold mb-4">
                      Pending Orders
                    </h3>
                    <p className="text-4xl text-yellow-600">
                      {getPendingOrdersCount()}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h3 className="text-2xl mb-4 font-semibold">
                      Subtotal Of Approved Items:
                    </h3>
                    <p className="text-4xl text-green-600">
                      BDT {getTotalApprovedOrdersAmount()}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h3 className="text-2xl font-semibold mb-4">
                      Approved Items Count
                    </h3>
                    <p className="text-4xl text-green-800">
                      {getApprovedItemsCount()}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h3 className="text-2xl font-semibold mb-4">
                      Total Users (Excluding Admin)
                    </h3>
                    <p className="text-4xl text-blue-600">
                      {getTotalUsersCount()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "users-order" && (
              <div className="w-full">
                <h2 className="text-4xl font-bold mb-4 ">All Orders</h2>
                <Dashboard
                  usersWithOrders={usersWithOrders}
                  handleUpdateOrderStatus={handleUpdateOrderStatus}
                />
              </div>
            )}
            {activeTab === "users" && (
              <div className="w-full">
                <h2 className="text-4xl font-bold mb-4 ">All Users</h2>
                <UserList users={users} />
              </div>
            )}

            {activeTab === "create-product" && (
              <div className="w-full">
                <CreateProduct />
              </div>
            )}
            {activeTab === "all-products" && <ProductList></ProductList>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
