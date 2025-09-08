import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Popover, message } from 'antd';
import { ReactNode } from "react";
import { getNotify, markRead, getNotifyCount } from "@/client/apis/notify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import "./Header.scss";
import logo from "/assets/images/logo2.svg";
import cart from "/assets/images/cart.svg";
import noti from "/assets/images/noti.svg";
import Icmessage from "/assets/images/message.svg";
import IcLogout from "/assets/images/logout.svg";
import IcUser from "/assets/images/user.svg";
import IcNotify1 from "/assets/images/notify-1.svg";
import IcNotify2 from "/assets/images/notify-2.svg";
import IcNotify3 from "/assets/images/notify-3.svg";
import IcNotify4 from "/assets/images/notify-4.svg";
import ava from "/assets/images/ava.png";
import iconDown from "/assets/images/arrow-down.svg";
import { ArrowRight2 } from "iconsax-react";
import {
  getDetailPreOrder
} from "@/client/apis/tour";
interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
}
import { useAuth } from "@/admin/components/AuthProvider";
import { log } from "node:console";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { logout, userData } = useAuth();
  const [notify, setNotify] = useState<any[]>([]);
  const [loadingNotify, setLoadingNotify] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreNotify, setHasMoreNotify] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingStateRef = useRef({ loadingMore: false, loadingNotify: false, hasMore: true, page: 0 });

  useEffect(() => {
    if (userData && userData.info && userData?.info?.avatar?.fileKey) {
      setAvatarUrl(`${import.meta.env.VITE_API_BASE_URL}/file/download-file?fileKey=${userData.info.avatar.fileKey}`);
    } else {
      setAvatarUrl(ava);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.info && userData?.info?.id) {
      // Load số đếm thông báo khi component mount
      loadNotifyCount();
    }
  }, [userData]);

  const loadNotifyCount = async () => {
    if (userData && userData.info && userData?.info?.id) {
      try {
        const res = await getNotifyCount(userData.info.id);
        setNotifyCount(res.unreadCount);
      } catch (error) {
        console.error('Error loading notify count:', error);
      }
    }
  };

  const loadNotifications = useCallback(async (page: number = 0, isLoadMore: boolean = false) => {
    if (!userData?.info?.id) return;

    try {
      if (isLoadMore) {
        setLoadingMore(true);
        loadingStateRef.current.loadingMore = true;
      } else {
        setLoadingNotify(true);
        setCurrentPage(0);
        setHasMoreNotify(true);
        loadingStateRef.current.loadingNotify = true;
        loadingStateRef.current.page = 0;
        loadingStateRef.current.hasMore = true;
      }

      const params = {
        params: {
          notificationTypes: "GIAO_VIEC,DON_HANG,BAO_CAO,TOUR",
          unreadOnly: false,
          page: page,
          size: 20
        }
      };
      const res = await getNotify(userData.info.id, params);
      console.log('res', res);

      if (isLoadMore) {
        // Append new notifications for load more
        setNotify(prev => [...prev, ...(res.data || [])]);
      } else {
        // Replace notifications for initial load
        setNotify(res.data || []);
      }

      // Check if there are more notifications
      const hasMore = !res.last;
      setHasMoreNotify(hasMore);
      setCurrentPage(page);
      loadingStateRef.current.hasMore = hasMore;
      loadingStateRef.current.page = page;

    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoadingNotify(false);
      setLoadingMore(false);
      loadingStateRef.current.loadingNotify = false;
      loadingStateRef.current.loadingMore = false;
    }
  }, [userData?.info?.id]);

  const loadMoreNotifications = useCallback(() => {
    if (!loadingMore && !loadingNotify && hasMoreNotify) {
      loadNotifications(currentPage + 1, true);
    }
  }, [loadingMore, loadingNotify, hasMoreNotify, currentPage, loadNotifications]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Delay to ensure element is rendered
    const timer = setTimeout(() => {
      const currentRef = observerRef.current;
      if (!currentRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            const { loadingMore, loadingNotify, hasMore, page } = loadingStateRef.current;

            // Only load if not currently loading and has more data
            if (!loadingMore && !loadingNotify && hasMore) {
              loadNotifications(page + 1, true);
            }
          }
        },
        {
          root: null,
          rootMargin: '20px', // Trigger 20px before reaching the element
          threshold: 0.1,
        }
      );

      observer.observe(currentRef);

      // Cleanup function
      return () => {
        observer.unobserve(currentRef);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isNotifyOpen]); // Re-setup when modal opens

  const handleMarkRead = async (id: any) => {
    try {
      await markRead(id);
      // Cập nhật state local
      setNotify(notify.map((item) => item.id === id ? { ...item, read: true } : item));
      // Gọi lại getNotifyCount để cập nhật số đếm
      await loadNotifyCount();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = async (item: any) => {
    try {
      if (!item.read) {
        await handleMarkRead(item.id);
      }

      if (item.notificationType == "DON_HANG" && item.redirectId) {
        try {
          const fetchedData = await getDetailPreOrder(item.redirectId);
          if (fetchedData.status == 118 || fetchedData.status == 119) {
            const stepTwoPath = PATH.STEP_TWO_PROCESS.replace(':id', item.redirectId.toString());
            navigate(stepTwoPath);
          } else if (fetchedData.status == 120) {
            const stepThreePath = PATH.STEP_THREE_PROCESS.replace(':id', item.redirectId.toString());
            navigate(stepThreePath);
          } else if (fetchedData.status == 122 || fetchedData.status == 123) {
            const stepFourPath = PATH.STEP_FOR_PROCESS.replace(':id', item.redirectId.toString());
            navigate(stepFourPath);
          } else if (fetchedData.status == 124) {
            const stepDonePath = PATH.STEP_DONE.replace(':id', item.redirectId.toString());
            navigate(stepDonePath);
          }
        } catch (error) {
          const errorMsg =
            error?.response?.data?.errorMsg ||
            error?.errorMsg ||
            "Lỗi không xác định";

          message.error(errorMsg);
          console.error("Lỗi:", error);

        }
      } else if (item.notificationType == "TOUR") {
        navigate(PATH.LIST_TOUR);
      }
      else if (item.notificationType == "BAO_CAO") {
        navigate(PATH.REPORT);
      }

    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  // Memoized skeleton loading component
  const SkeletonNotification = useMemo(() => ({
    component: () => (
      <div className="p-3 border-b border-gray-100 flex items-start gap-3 animate-pulse">
        {/* Icon skeleton */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200"></div>

        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Unread indicator skeleton */}
        <div className="w-2 h-2 bg-gray-200 rounded-full flex-shrink-0 mt-2"></div>
      </div>
    )
  }), []).component;

  // Function to get icon based on typeIcon
  const getNotificationIcon = (typeIcon: number) => {
    switch (typeIcon) {
      case 1:
        return IcNotify1;
      case 2:
        return IcNotify2;
      case 3:
        return IcNotify3;
      case 4:
        return IcNotify4;
      default:
        return IcNotify1;
    }
  };

  // Function to format time
  const formatNotificationTime = (createdTime: string) => {
    const now = new Date();
    const created = new Date(createdTime);
    const diffInMs = now.getTime() - created.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${diffInDays} ngày trước`;
  };

  // Memoized notification items
  const notificationItems = useMemo(() => {
    return notify.map((item) => (
      <div
        key={item.id}
        className={`notify-content-item cursor-pointer transition-colors duration-200 ${!item.read ? 'bg-[#FFFCF0]' : 'bg-white'
          } py-2 px-4 border-b border-gray-100 flex items-start gap-3 relative`}
        onClick={() => handleNotificationClick(item)}
      >
        {/* Icon */}
        <div className="flex items-center justify-center">
          <img
            src={getNotificationIcon(item.typeIcon)}
            alt="notification icon"
            className=" w-[32px] h-[32px]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className="text-[#000] text-[14px] font-[500] mb-1 overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {item.title}
          </div>
          <div
            className="text-[#000] text-[13px] mb-2 overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {item.content}
          </div>
          <div className="text-[#B9BDC1] text-[12px]">
            {formatNotificationTime(item.createdTime)}
          </div>
        </div>

        {/* Unread indicator */}
        {!item.read && (
          <div className="w-3 h-3 bg-[#FFCB12] rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>
    ));
  }, [notify]);

  const content = (
    <>
      <h3 className="notify-title">Thông báo</h3>
      <div
        className="notify-container-content bg-white"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {loadingNotify ? (
          // Skeleton loading for initial load
          <div>
            {[...Array(5)].map((_, index) => (
              <SkeletonNotification key={index} />
            ))}
          </div>
        ) : notify.length > 0 ? (
          <>
            {notificationItems}

            {/* Intersection Observer trigger element */}
            {hasMoreNotify && (
              <div ref={observerRef} className="h-4">
                {loadingMore && (
                  <div>
                    {[...Array(3)].map((_, index) => (
                      <SkeletonNotification key={`loading-${index}`} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!hasMoreNotify && notify.length > 0 && (
              <div className="text-center p-4 border-t border-gray-100">
                <div className="text-[#999] text-[12px]">Đã hiển thị hết thông báo</div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-4">
            <div className="text-[#666] text-[14px]">Không có thông báo mới</div>
          </div>
        )}
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
        <ArrowRight2 size="16px" color="#8F9499" />
      </div>
      <div className="flex justify-between items-center user-container-content" onClick={logout}>
        <div className="flex gap-[18px] items-center">
          <img src={IcLogout} alt="IcLogout" className="user-icon" />
          <div className="text-[14px] font-[500] text-[#000]">Đăng xuất</div>
        </div>
        <ArrowRight2 size="16px" color="#8F9499" />
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
                `group inline-flex items-centerrounded-md text-base font-medium text-center relative nav-link ${isActive || item.link == source ? "nav-link-active" : ""
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
            <img onClick={() => navigate(PATH.CHAT)} src={Icmessage} alt="Cart Icon" className="size-12 cursor-pointer" />
            <Popover
              content={content}
              trigger="click"
              placement="bottomRight"
              overlayClassName="notify-content-wrapper"
              onOpenChange={(open) => {
                setIsNotifyOpen(open);
                if (open) {
                  loadNotifications(0, false); // Reset to first page when opening
                  loadNotifyCount();
                }
              }}
            >
              <div className="relative">
                <img src={noti} alt="Notification Icon" className="size-12 cursor-pointer" />
                {notifyCount > 0 && (
                  <div className="absolute top-[8px] right-[8px] bg-[#DC1F18] text-white text-[10px] rounded-full min-w-4 h-4 flex items-center justify-center font-[500]">
                    {notifyCount > 99 ? '99+' : notifyCount}
                  </div>
                )}
              </div>
            </Popover>
          </div>

          <Popover content={contentUser} trigger="click" placement="bottomRight" overlayClassName="user-content-wrapper">
            <div className="w-[95px] h-[56px] border border-[#D6D9DC] rounded-[20px] bg-[#F4F5F6] flex  gap-x-[10px] items-center p-2 mr-[30px] cursor-pointer">
              <img
                src={avatarUrl || ava}
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
