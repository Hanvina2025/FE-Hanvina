import React, { useState, useEffect } from "react";
import "./index.scss";
import bannerHome from "/assets/images/banner-home.svg";
import location from "/assets/images/location.svg";
import destinationIcon from "/assets/images/destination.svg";
import dateTime from "/assets/images/dateTime.svg";
import placePdf from "/assets/images/placePdf.svg";
import ButtonLong from "/assets/images/button-long.svg";
import Dropdown from "@/client/components/DropDown";
import down from "/assets/images/arrow-down.svg";
import DateRangePicker from "@/client/components/DateRangePicker";
import { ArrowDown2 } from "iconsax-react"
import { getTourCategory } from "@/client/apis/category";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/libs/constants/path"

const Home = () => {
  const navigate = useNavigate();
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [tourFromLst, setTourFromLst] = useState([]);
  const [tourToLst, setTourToLst] = useState([]);
  useEffect(() => {
    fetchListTourFrom();
    fetchListTourTo();
  }, []);
  const fetchListTourFrom = async () => {
    try {
      const fetchedData = await getTourCategory(`type=0`);
      const dataWithDefault = [{ id: "", name: "Tất cả" }, ...fetchedData.data];
      setTourFromLst(dataWithDefault);
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchListTourTo = async () => {
    try {
      const fetchedData = await getTourCategory(`type=24`);
      const dataWithDefault = [{ id: "", name: "Tất cả" }, ...fetchedData.data];
      setTourToLst(dataWithDefault);
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };
  return (
    <div className="">
      <div className="grid lg:grid-cols-7 gap-[66px] max-w-7xl mx-auto relative z-[10] md:pb-[108px]">
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
            <div className="lg:flex items-center justify-center gap-[24px] relative z-[20]">
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
                        <ArrowDown2 />
                      </div>
                    </div>
                    <div className="text-[#767A7F] text-sm whitespace-nowrap">
                      {departure || "Chọn điểm khởi hành"}
                    </div>
                  </div>
                </div>

                {isDepartureOpen && (
                  <div className="absolute top-full left-0 mt-2 z-100">
                    <Dropdown
                      locations={tourFromLst}
                      selected={departure}
                      onSelect={(value) => {
                        setDeparture(value);
                        setIsDepartureOpen(false);
                      }}
                      setIsShowDropdown={setIsDepartureOpen}
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
                  <img src={destinationIcon} alt="" />
                  <div>
                    <div className="font-semibold text-[#333] flex gap-x-2 items-center">
                      <span>Điểm đến</span>
                      <div className="w-6 h-6">
                        <ArrowDown2 />
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
                      locations={tourToLst}
                      selected={destination}
                      onSelect={(value) => {
                        setDestination(value);
                        setIsDestinationOpen(false);
                      }}
                      setIsShowDropdown={setIsDestinationOpen}
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
                      {selectedDate ? selectedDate : "Trong khoảng thời gian"}
                    </div>
                  </div>
                </div>

                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl">
                    <DateRangePicker
                      onConfirm={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                      setIsShowDropdown={setShowDatePicker}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-[28px] h-[48px] cursor-pointer relative z-[10]" onClick={() => navigate(PATH.LIST_TOUR)}>
              <img src={ButtonLong} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white">
                Tìm kiếm
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 z-20 hidden lg:block">
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
