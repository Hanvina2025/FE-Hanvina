import React, { useState, useEffect } from "react";
import locationList from "/assets/images/locationList.svg";
import IcCalendar1 from "/assets/images/ic-calendar.svg";
import IcCalendar2 from "/assets/images/ic-calendar2.svg";
import IcClock from "/assets/images/ic-clock.svg";
import IcProfileUser from "/assets/images/ic-profile-2user.svg";
import IcUserTag from "/assets/images/ic-user-tag.svg";
import IcUser from "/assets/images/ic-user2.svg";
import { useNavigate } from "react-router-dom";
import ReservationList from "@/client/components/ReservationList"
import { Modal } from "antd"
import dayjs from "dayjs"
import { formatDateNotTime } from "@/utils/common";

const TourCardListActive = ({ tourActiveData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const statusColors = {
    unpaid: {
      label: "Chưa thanh toán cọc",
      background: "#FFEBEB",
      color: "#DC1F18",
    },
    pending: {
      label: "Chờ duyệt thanh toán cọc",
      background: "#FEF9E1",
      color: "#CC7B02",
    },
    incomplete: {
      label: "Chưa nộp hồ sơ",
      background: "#FEF9E1",
      color: "#CC7B02",
    },
    pendingTransactions: {
      label: "Chưa tất toán",
      background: "#FFEBEB",
      color: "#DC1F18",
    },
    statusPendingApproval: {
      label: "Chờ duyệt tất toán",
      background: "#FEF9E1",
      color: "#CC7B02",
    },
    fully_paid: {
      label: "Đã tất toán",
      background: "#E6FAED",
      color: "#34B764",
    },
    paid: {
      label: "Đã cọc",
      background: "#EBF4FF",
      color: "#006AF5",
    },
  };

  // Map statusName từ API sang key statusColors
  const getStatusKey = (statusName) => {
    switch (statusName) {
      case "Chưa thanh toán cọc":
        return "unpaid";
      case "Chờ duyệt thanh toán cọc":
        return "pending";
      case "Chưa nộp hồ sơ":
        return "incomplete";
      case "Chưa tất toán":
        return "pendingTransactions";
      case "Chờ duyệt tất toán":
        return "statusPendingApproval";
      case "Đã tất toán":
        return "fully_paid";
      default:
        return "unpaid";
    }
  };

  const statusKey = getStatusKey(tourActiveData?.statusName);

  // Tự động cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigate = () => {
    const { status, id } = tourActiveData || {};

    if ([118, 119].includes(status)) {
      navigate(`/reserve/step2/${id}`);
    } else if (status === 120) {
      navigate(`/reserve/step3/${id}`);
    } else if ([121, 122, 123].includes(status)) {
      navigate(`/reserve/step4/${id}`);
    } else if ([124].includes(status)) {
      navigate(`/reserve/step-done/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-[20px] boxShadowTourActive p-5 flex flex-col sm:flex-row justify-between gap-4 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="flex-1 ">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[24px] mb-6">{tourActiveData?.tourName}</h2>
          <div className="flex items-center gap-2 rounded">
            {["incomplete", "pendingTransactions"].includes(statusKey) && (
              <span
                className={`px-2 py-1 rounded-md text-base`}
                style={{
                  backgroundColor: statusColors.paid.background,
                  color: statusColors.paid.color,
                }}
              >
                {statusColors.paid.label}
              </span>
            )}
            <span
              className={`px-2 py-1 rounded-md text-base`}
              style={{
                backgroundColor: statusColors[statusKey].background,
                color: statusColors[statusKey].color,
              }}
            >
              {statusColors[statusKey].label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1.5fr_1fr] gap-y-3 gap-x-6">
          <div className="border-r border-[#D4D3D2] border-dashed pr-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Điểm đi:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    {tourActiveData?.tourFrom} - {tourActiveData?.tourTo}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={IcCalendar1} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Ngày khởi hành:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    {tourActiveData?.startDate ? formatDateNotTime(tourActiveData?.startDate) : ''}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={IcProfileUser} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Thông tin hành khách:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    Người lớn: {tourActiveData?.adultCount ?? 0}, Trẻ em: {tourActiveData?.childrenCount ?? 0}, Em bé: {tourActiveData?.babyCount ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src={IcCalendar2} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Ngày đặt:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    {tourActiveData?.createdTime ? formatDateNotTime(tourActiveData?.createdTime) : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={IcUser} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Đại diện đoàn:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    {tourActiveData?.customerName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={IcUserTag} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Số thứ tự giữ chỗ:
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#8F9499] text-base font-[500]">
                      {tourActiveData?.orderNo ?? "01"}
                    </span>
                    <div
                      className="text-[#6961FF] underline text-sm cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                    >
                      Chi tiết
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col items-end space-y-3">
              <div className={`flex items-center gap-2 ${tourActiveData?.status === 124 ? 'invisible' : ''}`}>
                <img src={IcClock} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    {([118, 119].includes(tourActiveData?.status))
                      ? "Hạn thanh toán cọc"
                      : ([120, 121, 122, 123].includes(tourActiveData?.status))
                        ? "Hạn tất toán"
                        : ""}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#8F9499] text-base font-[500]">
                      {
                        [118, 119].includes(tourActiveData?.status) && tourActiveData?.depositDateTime
                        && (() => {
                          const end = dayjs(tourActiveData.depositDateTime);
                          const diff = end.diff(currentTime);

                          if (diff <= 0) return "Hết hạn"; // Nếu đã hết hạn

                          const duration = dayjs.duration(diff);
                          const hours = String(duration.hours()).padStart(2, "0"); // Đảm bảo có 2 chữ số
                          const minutes = String(duration.minutes()).padStart(2, "0"); // Đảm bảo có 2 chữ số
                          const seconds = String(duration.seconds()).padStart(2, "0");

                          return `${hours}:${minutes}`;
                        })()
                      }
                      {
                        [120, 121, 122, 123].includes(tourActiveData?.status) && tourActiveData?.settlementDate
                          &&
                          tourActiveData?.settlementDate ? formatDateNotTime(tourActiveData?.settlementDate) : ''
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[#141415] text-base font-semibold">
                Giá tiền
              </div>
              <div className="text-[#BB2C26] text-[24px] font-medium">
                {tourActiveData?.totalPrice?.toLocaleString()} đ
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={(e) => {
          e?.stopPropagation();
          setIsModalOpen(false);
        }}
        width={1000}
        title={<span style={{ fontSize: 20, fontWeight: 500 }}>Danh sách giữ chỗ</span>}
        style={{ borderRadius: 20 }}
        footer={null}
      >
        <ReservationList id={tourActiveData?.tourId} />
      </Modal>
    </div>
  );
};

export default TourCardListActive;
