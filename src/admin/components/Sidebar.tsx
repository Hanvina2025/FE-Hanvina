import {
  Teacher,
  FavoriteChart,
  Book,
  Award,
  UserTag,
  Setting2,
  Subtitle,
  ArrowRight3,
} from "iconsax-react";
import "./Sidebar.scss";
import React, { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN_PATHS } from "../../libs/constants/path";
import Logo from "./Logo";

interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
  children?: IMenu[];
}
const menu: IMenu[] = [
  {
    icon: <Teacher size="24" />,
    link: ADMIN_PATHS.THI_CU,
    title: "Quản lý thi cử",
  },
  {
    icon: <FavoriteChart size="24" />,
    link: ADMIN_PATHS.BAO_CAO_THONG_KE,
    title: "Báo cáo thống kê",
  },
  {
    icon: <Book size="24" />,
    link: ADMIN_PATHS.BAI_VIET,
    title: "Quản lý bài viết",
  },
  {
    icon: <Award size="24" />,
    link: ADMIN_PATHS.CHUNG_CHI,
    title: "Quản lý chứng chỉ",
  },
  {
    icon: <Setting2 size="24" />,
    link: ADMIN_PATHS.CAI_DAT_BO_LOC,
    title: "Cài đặt bộ lọc",
    children: [
      {
        icon: <ArrowRight3 size="24" />, // Icon cho submenu
        link: "/admin/cai-dat-bo-loc/cap/1",
        title: "Cấp 1",
      },
      {
        icon: <ArrowRight3 size="24" />,
        link: "/admin/cai-dat-bo-loc/cap/2",
        title: "Cấp 2",
      },
      {
        icon: <ArrowRight3 size="24" />,
        link: "/admin/cai-dat-bo-loc/cap/3",
        title: "Cấp 3",
      },
      {
        icon: <ArrowRight3 size="24" />,
        link: "/admin/cai-dat-bo-loc/cap/4",
        title: "Cấp 4",
      },
    ],
  },
  {
    icon: <Subtitle size="24" />,
    link: ADMIN_PATHS.CAI_DAT_WEB,
    title: "Cài đặt website",
  },
];

const Sidebar: React.FC = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="flex flex-col px-2 pb-[10px] h-full justify-between">
      <Logo size="small" text="text-left" />
      <div className="fixed top-[80px] flex-1 flex flex-col justify-center gap-3">
        {menu.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center nav-link w-full rounded-[4px] gap-2 mb-2 py-2 px-5
        hover:bg-[#E5EEFB] hover:text-[#0056D2] transition duration-400 ease-in-out
         ${isActive ? "bg-[#E5EEFB] group text-[#0056D2] nav-active" : ""}`
              }
              onClick={() => item.children && toggleSubmenu(item.title)}
            >
              <span className="w-8 h-8 p-1 rounded-[4px] flex items-center justify-center text-[#989FAB] icon">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </NavLink>
            {/* {item.children && openSubmenu === item.title && ( */}
            {item.children && (
              <div className="pl-8">
                {item.children.map((child, childIndex) => (
                  <NavLink
                    key={childIndex}
                    to={child.link}
                    className={({ isActive }) =>
                      `flex items-center nav-link w-full rounded-[4px] gap-2 mb-2 py-2 px-5
              hover:bg-[#E5EEFB] hover:text-[#0056D2] transition duration-400 ease-in-out
               ${isActive ? " group text-[#0056D2] nav-active" : ""}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 p-1 rounded-[4px] flex items-center justify-center icon 
              ${isActive ? "text-[#0056D2]" : "text-[#989FAB]"}`}
                        >
                          {React.cloneElement(
                            child.icon as React.ReactElement,
                            {
                              color: isActive ? "#99bbed" : "#a8acb2",
                              style: { fill: isActive ? "#99bbed" : "#a8acb2" },
                              // Đổi màu icon khi active
                            }
                          )}
                        </span>
                        <span>{child.title}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
