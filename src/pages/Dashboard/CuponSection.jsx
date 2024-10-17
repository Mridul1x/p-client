import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const CouponSection = () => {
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    name: "",
    description: "",
    discount: 0,
    limit: 0,
    validity: "", // You might want to use a date picker library here
  });

  // Fetch coupons on component mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/cupon`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [token]);

  const handleInputChange = (event) => {
    setNewCoupon({
      ...newCoupon,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCoupon = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/api/cupon/create`, newCoupon, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Re-fetch coupons after successful creation
      const response = await axios.get(`${apiBaseUrl}/api/cupon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(response.data);
      setNewCoupon({
        name: "",
        description: "",
        discount: 0,
        limit: 0,
        validity: "",
      });
      toast.success("Coupon created successfully!");
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("Failed to create coupon.");
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/cupon/${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Coupon Management</h2>

      {/* Create Coupon Form */}
      <form onSubmit={handleCreateCoupon} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCoupon.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newCoupon.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="discount"
              className="block text-gray-700 font-bold mb-2"
            >
              Discount (%):
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={newCoupon.discount}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              htmlFor="limit"
              className="block text-gray-700 font-bold mb-2"
            >
              Limit:
            </label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={newCoupon.limit}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="validity"
              className="block text-gray-700 font-bold mb-2"
            >
              Validity (YYYY-MM-DD):
            </label>
            <input
              type="date"
              id="validity"
              name="validity"
              value={newCoupon.validity}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Create Coupon
        </button>
      </form>

      {/* Coupon List */}
      <h3 className="text-xl font-bold mb-2">Existing Coupons</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Discount</th>
            <th className="px-4 py-2">Limit</th>
            <th className="px-4 py-2">Used</th>
            <th className="px-4 py-2">Validity</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td className="border px-4 py-2">{coupon.name}</td>
              <td className="border px-4 py-2">{coupon.description}</td>
              <td className="border px-4 py-2">{coupon.discount}%</td>
              <td className="border px-4 py-2">{coupon.limit}</td>
              <td className="border px-4 py-2">{coupon.used}</td>
              <td className="border px-4 py-2">
                {new Date(coupon.validity).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponSection;
