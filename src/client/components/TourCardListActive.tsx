import React from "react";
import locationList from "/assets/images/locationList.svg";

const statusMap = {
  unpaid: { text: "Chưa thanh toán cọc", color: "red" },
  pending: { text: "Chờ duyệt thanh toán cọc", color: "orange" },
  incomplete: { text: "Chưa nộp hồ sơ", color: "yellow" },
  paid: { text: "Đã cọc", color: "blue" },
  fully_paid: { text: "Đã tất toán", color: "green" },
};

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
  extraStatus,
}) => {
  const statusColors = {
    unpaid: { label: "Chưa thanh toán cọc", color: "red" },
    pending: { label: "Chờ duyệt thanh toán cọc", color: "orange" },
    incomplete: { label: "Chưa nộp hồ sơ", color: "gold" },
    paid: { label: "Đã cọc", color: "blue" },
    fully_paid: { label: "Đã tất toán", color: "green" },
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
      <div className="flex-1">
        <h2 className="font-bold text-lg mb-4">
          [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU
        </h2>

        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationList} alt="" />
            <div className="flex items-center gap-x-2">
              <p className="text-[#141415] text-base font-semibold">Điểm đi:</p>
              <span className="text-[#767A7F] text-base font-semibold">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col  items-end justify-between min-w-[160px]">
        <div className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-md mb-2">
          Chưa thanh toán cọc
        </div>
        <div className="flex items-center gap-2 text-sm">
          {/* <Clock className="text-yellow-500 w-4 h-4" /> */}
          <span className="text-black font-semibold">Hạn thanh toán cọc: </span>
          <span className="text-black">23:25</span>
        </div>
        <div className="text-right mt-4">
          <p className="text-sm text-gray-600">Giá tiền</p>
          <p className="text-red-600 text-xl font-bold">20.000.000 đ</p>
        </div>
      </div>
    </div>
  );
};

export default TourCardListActive;
