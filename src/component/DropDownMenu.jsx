import React from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ isOpen, toggleDropdown }) => {
  return (
    <div
      className={`dropdown-menu absolute bg-black text-white py-2 rounded-md shadow-lg ${
        isOpen ? "block z-10" : "hidden"
      }`}
    >
      <Link
        to="/products/nuts"
        className="block px-4 py-2 linear-walkaways"
        onClick={toggleDropdown}
      >
        Nuts
      </Link>
      <Link
        to="/products/seeds"
        className="block px-4 py-2 linear-walkaways"
        onClick={toggleDropdown}
      >
        Seeds
      </Link>
      <Link
        to="/products/powder"
        className="block px-4 py-2 linear-walkaways"
        onClick={toggleDropdown}
      >
        Powder
      </Link>
      <Link
        to="/products/dates"
        className="block px-4 py-2 linear-walkaways"
        onClick={toggleDropdown}
      >
        Dates
      </Link>
    </div>
  );
};

export default DropdownMenu;
