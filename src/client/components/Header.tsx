import React, { useState, useEffect } from "react";
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import "./Header.css";
import { useAuth } from "@/admin/components/AuthProvider";

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
      title: "Trang chủ",
      icon: undefined,
    },
    {
      link: PATH.CUOC_THI,
      title: "Cuộc thi",
      icon: undefined,
    },
    {
      link: PATH.TO_CHUC_DOAN,
      title: "Giới thiệu tổ chức đoàn",
      icon: undefined,
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/tim-kiem?searchTerm=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("")
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
    <header className="header" style={{background: settingValue?.headerColor || '#0056D2'}}>
      <div className="navbar container  m-auto">
        <div className="navbar-link">
          {/* <Logo /> */}
          <div
            className="flex gap-3 items-start cursor-pointer"
            onClick={handleNavigate}
          >
            <img
              src={settingValue?.logoFile?.fileKey ? 
                `${ import.meta.env.VITE_API_BASE_URL }/file/download-file-all-type?fileKey=${settingValue?.logoFile?.fileKey}` 
                : "/assets/images/logo.svg"
              }
              alt="Huy hiệu đoàn logo"
              className={`h-9`}
            />
            <div
              className={`font-bold text-white text-[14px] text-start`}
              dangerouslySetInnerHTML={{
                __html: settingValue?.logoName
              }}
            />
          </div>
          {/* Nút mở menu */}
          <button
            className="menu-toggle-btn lg:hidden md:text-[#fff]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          {/* Menu chính */}
          <div
            className={`menu flex gap-[24px] lg:items-center ${
              isMenuOpen ? "block pb-4" : "hidden"
            } lg:flex`}
            style={{background: settingValue?.headerColor || '#0056D2'}}
          >
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `group inline-flex items-center p-[10px] rounded-md text-base font-medium text-center ${
                    isActive || item.link == source ? "active" : ""
                  }`
                }
              >
                <span
                  className="navbar-text"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
