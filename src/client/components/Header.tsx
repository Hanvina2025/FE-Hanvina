import React, { useState, useEffect } from "react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import "./Header.css";
import { useAuth } from "@/admin/components/AuthProvider";
import logo from "../../../public/assets/images/logo2.svg";
import cart from "../../../public/assets/images/cart.svg";
import noti from "../../../public/assets/images/noti.svg";
import message from "../../../public/assets/images/message.svg";
import ava from "../../../public/assets/images/ava.png";
import iconDown from "../../../public/assets/images/arrow-down.svg";
interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
}

const Header = () => {
  const { settingValue } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const source = location.state?.source;

  const menu: IMenu[] = [
    {
      link: PATH.HOME,
      title: "Danh sách tour",
      icon: undefined,
    },
    {
      link: PATH.CUOC_THI,
      title: "Báo cáo",
      icon: undefined,
    },
    {
      link: PATH.TO_CHUC_DOAN,
      title: "Tin tức",
      icon: undefined,
    },
    {
      link: PATH.TO_CHUC_DOAN,
      title: "Liên hệ",
      icon: undefined,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/tim-kiem?searchTerm=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <div className=" mx-auto max-w-[1280px] h-[116px] ">
      <div className="flex justify-between w-full h-[96px]  bg-white shadow rounded-[30px] ">
        <div className="w-[300px] h-[116px] borderRadiusCustom bg-[#BB2C26]  flex justify-center items-center">
          <img src={logo} alt="header" className="" />
        </div>
        <div className="flex h-full gap-x-10 items-center">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `group inline-flex items-centerrounded-md text-base font-medium text-center ${
                  isActive || item.link == source ? "active" : ""
                }`
              }
            >
              <span
                className="navbar-text text-[#141415] text-base font-semibold"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></span>
            </NavLink>
          ))}
          <div className="flex gap-x-3">
            <img src={cart} alt="Cart Icon" className="size-12" />
            <img src={message} alt="Cart Icon" className="size-12" />
            <img src={noti} alt="Cart Icon" className="size-12" />
          </div>
          <div className="w-[95px] h-[56px] border border-[#D6D9DC] rounded-[20px] bg-[#F4F5F6] flex  gap-x-[15px] items-center p-2 mr-[30px]">
            <img
              src={ava}
              alt="avatar"
              className="size-10 rounded-full border border-[#BB2C26]"
            />
            <img src={iconDown} alt="avatar" className="size-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
