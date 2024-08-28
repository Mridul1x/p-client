// src/pages/Error/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
        <h1 className="text-4xl font-bold mb-4 animate-bounce">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg mb-8 animate-pulse">
          The page you’re looking for doesn’t exist or an error occurred.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Home Page
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Browse Shop
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
