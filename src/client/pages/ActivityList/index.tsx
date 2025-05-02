import React, { useState } from "react";
import searchIcon from "/assets/images/search.svg";
import filterIcon from "/assets/images/filter.svg";
import listActive from "/assets/images/listActive.svg";
import patternListTour from "/assets/images/patternListTour.svg";
import calendarBlack from "/assets/images/calendarBlack.svg";
import DateRangePicker from "@/client/components/DateRangePicker";
import TourCardListActive from "@/client/components/TourCardListActive";

const ActivityList = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div>
        <div className="mt-8 w-full flex justify-center">
          <div className="relative">
            <img src={listActive} alt="" />
            <img src={patternListTour} alt="" className="absolute top-0" />
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex gap-x-3">
              <div className="relative">
                <img
                  src={searchIcon}
                  alt=""
                  className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                />
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Tìm kiếm"
                  className="rounded-2xl border border-[#D6D9DC] h-12 p-3 w-[278px] pl-11"
                />
              </div>
              <div className="relative cursor-pointer">
                <div
                  className="rounded-2xl bg-white p-3 "
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <img src={calendarBlack} alt="" />
                </div>
                {showDatePicker && (
                  <div className="absolute top-full right-0 mt-2 z-50 bg-white  ">
                    <DateRangePicker
                      onConfirm={(date) => {
                        console.log("🚀 ~ Home ~ date:", date);
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-[#D6D9DC] h-12 p-3  bg-white relative w-[128px] text-end cursor-pointer">
                <img
                  src={filterIcon}
                  alt=""
                  className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                />
                Trạng thái
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <TourCardListActive
          title="[TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU"
          location="Hà Nội"
          departure="Thứ 2, 31/3/2025"
          bookingDate="28/2/2025 15:20"
          groupLeader="Nguyễn Bảo An"
          members="12 người lớn, 2 trẻ em, 0 em bé"
          deadline="23:25"
          price="20.000.000"
          status="unpaid"
          extraStatus=""
        />
      </div>
    </div>
  );
};

export default ActivityList;
