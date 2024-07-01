import React, { useContext } from "react";
import Navbar from "../pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import { Toaster } from "react-hot-toast";
const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Toaster
        gutter={24}
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: "black",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
