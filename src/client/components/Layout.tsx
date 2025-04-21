import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div
      className="relative "
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 94, 94, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%)",
      }}
    >
      <div className="pt-[30px]">
        <Header />
      </div>
      <div className="relative pt-[80px] min-h-[calc(100vh-100px)] bg-[#fff]">
        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
