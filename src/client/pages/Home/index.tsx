import "./index.scss";
import bannerHome from "/assets/images/banner-home.svg";
import location from "/assets/images/location.svg";
import destination from "/assets/images/destination.svg";
import dateTime from "/assets/images/dateTime.svg";
import placePdf from "/assets/images/placePdf.svg";
import ButtonLong from "/assets/images/button-long.svg";
import Dropdown from "@/client/components/DropDown";
import down from "/assets/images/arrow-down.svg";
import { useState } from "react";
import DateRangePicker from "@/client/components/DateRangePicker";
const Home = () => {
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const locationsDestination = [
    "Tất cả",
    "Cửu Trại Câu",
    "Phượng Hoàng Cổ Trấn",
    "Quý Châu",
    "Tây An",
    "Tây Tạng",
    "Đài Loan",
  ];
  const locationsDeparture = ["Tất cả", "Hà Nội", "Hồ Chí Minh"];
  return (
    <div className="">
      <div className="grid lg:grid-cols-7 gap-[66px] max-w-7xl mx-auto relative z-[10]">
        <div className="col-span-4 z-50">
          <div className="max-w-[560px]">
            <h1 className="text-[48px] font-bold leading-[56px] text-[#333]">
              Chuyên tour trọn gói ghép khách lẻ cho đại lý, CTV
            </h1>
          </div>
          <div className="mt-4 max-w-[533px]">
            <span className="text-base text-[#333]">
              HanVina Travel - Nơi mà chuyến du lịch của bạn trở nên đáng nhớ và
              tuyệt vời. Với cam kết về uy tín, chất lượng dịch vụ và đội ngũ
              chuyên viên tư vấn giàu kinh nghiệm, chúng tôi tự hào là đối tác
              tin cậy của bạn trên hành trình khám phá thế giới.
            </span>
          </div>

          <div className="bg-white shadow-[0px_10px_24px_rgba(20,20,21,0.09)] rounded-[20px] p-6 max-w-7xl mx-auto mt-10">
            <div className="lg:flex items-center justify-center gap-[24px]">
              {/* Điểm đi */}
              <div className="relative cursor-pointer">
                <div
                  className="flex items-center gap-4 py-2 rounded-full"
                  onClick={() => {
                    setIsDepartureOpen(!isDepartureOpen);
                    setIsDestinationOpen(false);
                  }}
                >
                  <img src={location} alt="" />
                  <div>
                    <div className="font-semibold text-[#333] flex gap-x-2 items-center">
                      <span>Điểm đi</span>
                      <div className="w-6 h-6">
                        <img src={down} alt="" className="w-full h-full" />
                      </div>
                    </div>
                    <div className="text-[#767A7F] text-sm whitespace-nowrap">
                      {departure || "Chọn điểm khởi hành"}
                    </div>
                  </div>
                </div>

                {isDepartureOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50">
                    <Dropdown
                      locations={locationsDeparture}
                      selected={departure}
                      onSelect={(value) => {
                        setDeparture(value);
                        setIsDepartureOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Điểm đến */}
              <div className="relative cursor-pointer ">
                <div
                  className="flex items-center gap-4 py-2 rounded-full "
                  onClick={() => {
                    setIsDepartureOpen(false);
                    setIsDestinationOpen(!isDestinationOpen);
                  }}
                >
                  <img src={dateTime} alt="" />
                  <div>
                    <div className="font-semibold text-[#333] flex gap-x-2 items-center">
                      <span>Điểm đến</span>
                      <div className="w-6 h-6">
                        <img src={down} alt="" className="w-full h-full" />
                      </div>
                    </div>
                    <div className="text-[#767A7F] text-sm whitespace-nowrap">
                      {destination || "Chọn điểm đến"}
                    </div>
                  </div>
                </div>

                {isDestinationOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50">
                    <Dropdown
                      locations={locationsDestination}
                      selected={destination}
                      onSelect={(value) => {
                        console.log("🚀 ~ Home ~ value:222", value);
                        setDestination(value);
                        setIsDestinationOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="relative cursor-pointer">
                <div
                  className="flex items-center gap-4 py-2 rounded-full"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <img src={dateTime} alt="" />
                  <div>
                    <div className="font-semibold text-[#333] flex gap-x-2 items-center">
                      <span>Thời gian</span>
                      <div className="w-6 h-6">
                        <img src={down} alt="" className="w-full h-full" />
                      </div>
                    </div>
                    <div className="text-[#767A7F] text-sm whitespace-nowrap">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("vi-VN")
                        : "Trong khoảng thời gian"}
                    </div>
                  </div>
                </div>

                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 z-50 bg-white shadow-lg rounded-lg p-4">
                    <DateRangePicker
                      onConfirm={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-[28px] relative h-[48px] cursor-pointer">
              <img src={ButtonLong} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[12px] text-center font-[500] text-[16px] text-white">
                Tìm kiếm
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 z-50 hidden lg:block">
          <div className="relative rounded-[230px]">
            <embed src={bannerHome} className="" />
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-[-20px]">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Home;
