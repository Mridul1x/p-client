import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Profile from "../pages/Login/Profile";
import Products from "../pages/ProductContainer/Products";
import Nuts from "../pages/ProductContainer/Nuts";
import ProductDetails from "../pages/ProductContainer/ProductDetails";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import SuccessPage from "../pages/Checkout/Success";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import UserOrders from "../pages/Orders/UserOrder";
import Seeds from "../pages/ProductContainer/Seeds";
import Powder from "../pages/ProductContainer/Powder";
import Dates from "../pages/ProductContainer/Dates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/products/",
        element: <Products></Products>,
      },
      {
        path: "/products/nuts",
        element: <Nuts></Nuts>,
      },
      {
        path: "/products/seeds",
        element: <Seeds></Seeds>,
      },
      {
        path: "/products/powder",
        element: <Powder></Powder>,
      },
      {
        path: "/products/dates",
        element: <Dates></Dates>,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage></CheckoutPage>,
      },
      {
        path: "/success",
        element: <SuccessPage></SuccessPage>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: <UserOrders></UserOrders>,
      },
    ],
  },
]);

export default router;
