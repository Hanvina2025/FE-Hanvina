import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(#FFD9D9, #fff) 50%, #fff",
        backgroundSize: "100% 50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        height: "110vh",
        minWidth: "1280px",
        overflow: "auto"
      }}
    >
      <div className="pt-[30px] fixed z-[100] w-full flex justify-center ">
        <Header />
      </div>
      <div className="relative min-h-[100vh] pt-52">
        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
