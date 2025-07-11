import React from "react";
import locationList from "/assets/images/locationList.svg";
import IcCalendar1 from "/assets/images/ic-calendar.svg";
import IcCalendar2 from "/assets/images/ic-calendar2.svg";
import IcClock from "/assets/images/ic-clock.svg";
import IcProfileUser from "/assets/images/ic-profile-2user.svg";
import IcUserTag from "/assets/images/ic-user-tag.svg";
import IcUser from "/assets/images/ic-user2.svg";
import { PATH } from "@/libs/constants/path";
import { Link, useNavigate } from "react-router-dom";

const TourCardListActive = ({ tourActiveData, isDeposited }) => {
  const navigate = useNavigate();
  const statusColors = {
    unpaid: {
      label: "Chưa thanh toán cọc",
      background: "#FFEBEB",
      color: "#DC1F18",
    },
    pendingTransactions: {
      label: "Chưa tất toán",
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
    statusPendingApproval: {
      label: "Chờ duyệt tất toán",
      background: "#FEF9E1",
      color: "#CC7B02",
    },
    paid: {
      label: "Đã cọc",
      background: "#EBF4FF",
      color: "#006AF5",
    },
    fully_paid: {
      label: "Đã tất toán",
      background: "#E6FAED",
      color: "#34B764",
    },
  };

  // Map statusName từ API sang key statusColors
  const getStatusKey = (statusName) => {
    switch (statusName) {
      case "Chưa thanh toán cọc":
        return "unpaid";
      case "Chờ duyệt thanh toán cọc":
        return "pending";
      case "Chưa tất toán":
        return "pendingTransactions";
      case "Đã tất toán":
        return "fully_paid";
      case "Đã cọc":
        return "paid";
      default:
        return "unpaid";
    }
  };

  const statusKey = getStatusKey(tourActiveData?.statusName);

  const handleNavigate = () => {
    navigate(`/reserve/step2/${tourActiveData?.id}`);
  };

  return (
    <div className="bg-white rounded-[20px] boxShadowTourActive p-5 flex flex-col sm:flex-row justify-between gap-4 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="flex-1 ">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[24px] mb-6">{tourActiveData?.tourName}</h2>
          <div className="flex items-center gap-2 rounded">
            {isDeposited && (
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold`}
                style={{
                  backgroundColor: statusColors.paid.background,
                  color: statusColors.paid.color,
                }}
              >
                {statusColors.paid.label}
              </span>
            )}
            <span
              className={`px-2 py-1 rounded-md text-base font-[500]`}
              style={{
                backgroundColor: statusColors[statusKey].background,
                color: statusColors[statusKey].color,
              }}
            >
              {statusColors[statusKey].label}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-y-3 gap-x-6">
          <div className="lg:col-span-2 border-r border-[#D4D3D2] border-dashed pr-4">
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
                    {tourActiveData?.startDate}
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

          <div className="lg:col-span-2 pl-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src={IcCalendar2} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Ngày đặt:
                  </p>
                  <span className="text-[#8F9499] text-base font-[500]">
                    {tourActiveData?.createdTime?.slice(0, 10)}
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
                    <Link to="/chi-tiet-tour" className="text-sm text-[#006AF5]">
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col items-end space-y-3">
              <div className="flex items-center gap-2">
                <img src={IcClock} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Hạn thanh toán cọc:
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#8F9499] text-base font-[500]">
                      {/* {tourActiveData?.settlementDate} */}
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
    </div>
  );
};

export default TourCardListActive;
