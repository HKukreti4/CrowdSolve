import React from "react";
import Navbar from "../componets/header/Navbar";
import Footer from "../componets/footer/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="fixed top-0 w-screen">
        <Navbar />
      </div>
      <main className="mb-5">
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-screen">
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
