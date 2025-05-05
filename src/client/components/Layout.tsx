import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div
      className="relative "
      style={{
        background: "linear-gradient(#FFD9D9, #fff) 50%, #fff",
        backgroundSize: "100% 50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        height: "90vh",
      }}
    >
      <div className="pt-[30px] fixed z-[100] w-full flex justify-center ">
        <Header />
      </div>
      <div className="relative min-h-[calc(50vh-100px)] pt-52">
        <main>{<Outlet />}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
