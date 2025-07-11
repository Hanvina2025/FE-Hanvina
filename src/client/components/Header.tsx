import React, { useState, useEffect } from "react";
import { Popover } from 'antd';
import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import "./Header.scss";
import logo from "/assets/images/logo2.svg";
import cart from "/assets/images/cart.svg";
import noti from "/assets/images/noti.svg";
import message from "/assets/images/message.svg";
import IcLogout from "/assets/images/logout.svg";
import IcUser from "/assets/images/user.svg";
import ava from "/assets/images/ava.png";
import iconDown from "/assets/images/arrow-down.svg";
import { ArrowRight2 } from "iconsax-react";
interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
}

const notifications = [
  {
    id: 1,
    title: "Bạn là người giữ chỗ đầu tiên! Bạn có muốn tiến hành thanh toán cọc?",
    time: "1 phút trước",
    highlight: true,
  },
  {
    id: 2,
    title: "Thông báo giữ chỗ: Hiện tại còn 7 chỗ còn trống tại [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
  {
    id: 3,
    title: "Tất toán thành công! [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
  {
    id: 4,
    title: "Sắp hết thời gian giữ chỗ! [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
  {
    id: 4,
    title: "Sắp hết thời gian giữ chỗ! [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
  {
    id: 4,
    title: "Sắp hết thời gian giữ chỗ! [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
  {
    id: 4,
    title: "Sắp hết thời gian giữ chỗ! [TOUR NOSHOP] THƯƠNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU",
    time: "1 phút trước",
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = (
    <>
      <h3 className="notify-title">Thông báo</h3>
      <div className="notify-container-content">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="notify-content-item"
          >
            <div className="text-[#000] text-[14px] font-[500] mb-[6px]">{item.title}</div>
            <div className="text-[#B9BDC1] text-[12px]">{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );

  const contentUser = (
    <>
      <h3 className="user-title">Tài khoản đại lý</h3>
      <div className="flex justify-between items-center user-container-content" onClick={() => navigate(PATH.PROFILE)}>
        <div className="flex gap-[18px] items-center">
          <img src={IcUser} alt="user" className="user-icon" />
          <div className="text-[14px] font-[500] text-[#000]">Thông tin đại lý</div>
        </div>
        <ArrowRight2 size="16px" color="#8F9499"/>
      </div>
      <div className="flex justify-between items-center user-container-content" onClick={() => console.log("Đăng xuất")}>
        <div className="flex gap-[18px] items-center">
          <img src={IcLogout} alt="IcLogout" className="user-icon" />
          <div className="text-[14px] font-[500] text-[#000]">Đăng xuất</div>
        </div>
        <ArrowRight2 size="16px" color="#8F9499"/>
      </div>
    </>
  );

  const source = location.state?.source;

  const menu: IMenu[] = [
    {
      link: PATH.LIST_TOUR,
      title: "Danh sách tour",
      icon: undefined,
    },
    {
      link: PATH.REPORT,
      title: "Báo cáo",
      icon: undefined,
    },
    {
      link: PATH.NEWS,
      title: "Tin tức",
      icon: undefined,
    },
    {
      link: PATH.CONTACT,
      title: "Liên hệ",
      icon: undefined,
    },
  ];

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
    <div className="container mx-auto h-[116px]">
      <div className="flex justify-between w-full h-[96px]  shadow-all rounded-[30px] header-menu-background">
        <div className="w-[300px] h-[116px] borderRadiusCustom bg-[#BB2C26]  flex justify-center items-center cursor-pointer shadow-all">
          <img src={logo} alt="header" className="" onClick={handleNavigate} />
        </div>
        <div className="flex h-full gap-x-5 items-center">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `group inline-flex items-centerrounded-md text-base font-medium text-center relative nav-link ${
                  isActive || item.link == source ? "nav-link-active" : ""
                }`
              }
            >
              <div
                className="navbar-text text-[#141415] text-base font-semibold relative"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></div>
            </NavLink>
          ))}
          <div className="flex gap-x-3">
            <img onClick={() => navigate(PATH.LIST_TOUR_ACTIVE)} src={cart} alt="Cart Icon" className="size-12 cursor-pointer" />
            <img onClick={() => navigate(PATH.CHAT)} src={message} alt="Cart Icon" className="size-12 cursor-pointer" />
            <Popover content={content} trigger="click" placement="bottomRight" overlayClassName="notify-content-wrapper">
              <img src={noti} alt="Notification Icon" className="size-12 cursor-pointer" />
            </Popover>
          </div>
          
          <Popover content={contentUser} trigger="click" placement="bottomRight" overlayClassName="user-content-wrapper">
            <div className="w-[95px] h-[56px] border border-[#D6D9DC] rounded-[20px] bg-[#F4F5F6] flex  gap-x-[10px] items-center p-2 mr-[30px] cursor-pointer">
              <img
                src={ava}
                alt="avatar"
                className="size-10 rounded-full border border-[#BB2C26]"
              />
              <img src={iconDown} alt="avatar" className="size-6" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
