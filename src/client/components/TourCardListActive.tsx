import React from "react";
import locationList from "/assets/images/locationList.svg";
import { Link } from "react-router-dom";

const TourCardListActive = ({
  title,
  location,
  departure,
  bookingDate,
  groupLeader,
  members,
  deadline,
  price,
  status,
  isDeposited,
}) => {
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
    paid: { label: "Đã cọc", background: "#EBF4FF", color: "#006AF5" },
    fully_paid: {
      label: "Đã tất toán",
      background: "#E6FAED",
      color: "#34B764",
    },
  };
  return (
    // <div className="px-[30px] py-5 bg-white shadow-md rounded-[20px] ">
    //   <h1 className="text-[#141415] font-medium text-2xl">{title}</h1>
    //   <div className="mt-6">
    //     <div className="flex items-center gap-x-4">
    //       <img src={locationList} alt="" />
    //       <div className="flex items-center gap-x-2">
    //         <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
    //         <span className="text-[#767A7F] text-base font-semibold">
    //           {location}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row justify-between gap-4 border border-red-50">
      {/* Left Section */}
      <div className="flex-1 ">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg mb-4">{title}</h2>
          <div className="flex items-center gap-2 rounded">
            {isDeposited && (
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold`}
                style={{
                  backgroundColor: statusColors.paid?.background || "gray",
                  color: statusColors.paid?.color || "white",
                }}
              >
                {statusColors.paid?.label}
              </span>
            )}
            <span
              className={`px-2 py-1 rounded-md text-xs font-semibold`}
              style={{
                backgroundColor: statusColors[status]?.background || "gray",
                color: statusColors[status]?.color || "white",
              }}
            >
              {statusColors[status]?.label || "Không xác định"}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-y-3 gap-x-6 text-sm text-gray-700">
          <div className="md:col-span-2 border-r border-gray-300 pr-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Điểm đi:
                  </p>
                  <span className="text-[#767A7F] text-base font-semibold">
                    {location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Ngày khởi hành:
                  </p>
                  <span className="text-[#767A7F] text-base font-semibold">
                    {departure}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Thông tin hành khách:
                  </p>
                  <span className="text-[#767A7F] text-base font-semibold">
                    {members}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 pl-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Ngày đặt:
                  </p>
                  <span className="text-[#767A7F] text-base font-semibold">
                    {bookingDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Đại diện đoàn:
                  </p>
                  <span className="text-[#767A7F] text-base font-semibold">
                    {groupLeader}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Số thứ tự giữ chỗ:
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#767A7F] text-base font-semibold">
                      01
                    </span>
                    <Link
                      to="/chi-tiet-tour"
                      className="text-sm text-[#006AF5]"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="flex flex-col items-end space-y-4">
              <div className="flex items-center  gap-2">
                <img src={locationList} alt="" />
                <div className="flex items-center gap-x-2">
                  <p className="text-[#141415] text-base font-semibold">
                    Hạn thanh toán cọc:
                  </p>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#767A7F] text-base font-semibold">
                      {deadline}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#141415] text-base font-semibold">
                  Giá tiền
                </p>
              </div>
              <div>
                <p className="text-[#BB2C26] text-2xl font-medium">{price} đ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      {/* <div className="flex flex-col  items-end justify-between min-w-[160px]">
        <div className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-md mb-2">
          Chưa thanh toán cọc
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-black font-semibold">Hạn thanh toán cọc: </span>
          <span className="text-black">{deadline}</span>
        </div>
        <div className="text-right mt-4">
          <p className="text-sm text-gray-600">Giá tiền</p>
          <p className="text-red-600 text-xl font-bold">{price} đ</p>
        </div>
      </div> */}
    </div>
  );
};

export default TourCardListActive;
