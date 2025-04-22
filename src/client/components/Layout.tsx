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
      }}
    >
      <div className="pt-[30px]">
        <Header />
      </div>
      <div className="relative pt-[80px] min-h-[calc(100vh-100px)]">
        <main>{<Outlet />}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
