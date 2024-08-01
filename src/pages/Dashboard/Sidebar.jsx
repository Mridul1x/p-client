import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-10">
        <NavLink
          to="/admin/home"
          className="block px-4 py-2 hover:bg-gray-700"
          activeClassName="bg-gray-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="block px-4 py-2 hover:bg-gray-700"
          activeClassName="bg-gray-900"
        >
          All Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className="block px-4 py-2 hover:bg-gray-700"
          activeClassName="bg-gray-900"
        >
          All Users
        </NavLink>
        <NavLink
          to="/admin/create-product"
          className="block px-4 py-2 hover:bg-gray-700"
          activeClassName="bg-gray-900"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/admin/all-products"
          className="block px-4 py-2 hover:bg-gray-700"
          activeClassName="bg-gray-900"
        >
          All Products
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
