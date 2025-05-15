import React, { useState } from "react";
import listTour from "/assets/images/listTour.svg";
import dateTime from "/assets/images/dateTime.svg";
import DateRangePicker from "@/client/components/DateRangePicker";
import down from "/assets/images/arrow-down.svg";
import Dropdown from "@/client/components/DropDown";
import location from "/assets/images/location.svg";
import timeIcon from "/assets/images/time.svg";
import arrow_drop_down from "/assets/images/arrow_drop_down.svg";
import listTourImage from "/assets/images/listTourImage.svg";
import patternListTour from "/assets/images/patternListTour.svg";
import destinationIcon from "/assets/images/destination.svg";
import searchIcon from "/assets/images/search.svg";
import filterIcon from "/assets/images/filter.svg";
import { Range } from "react-range";
import placePdf from "/assets/images/placePdf.svg";
import "./index.scss";
import TourCard from "@/client/components/TourCard";
import CustomPagination from "@/client/components/Pagination";
export const ListTour = () => {
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isShowDateNumber, setIsShowDateNumber] = useState(false);
  const [isShowTourType, setIsShowTourType] = useState(false);
  const [isShowAirline, setIsShowAirline] = useState(false);
  const [airlineSelected, setAirlineSelected] = useState("");
  const [tourType, setTourType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [dateNumber, setDateNumber] = useState("");
  const [priceRange, setPriceRange] = useState([50000000, 120000000]);
  const [selected, setSelected] = useState("Nội địa");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const options = [
    { label: "Nội địa", count: 2 },
    { label: "Quốc tế", count: 4 },
  ];
  const MIN = 10000000;
  const MAX = 200000000;
  const STEP = 1000000;
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
  const dateNumberDrpdown = [
    "Tất cả",
    "3 ngày 2 đêm",
    "4 ngày 3 đêm",
    "5 ngày 4 đêm",
    "6 ngày 5 đêm",
    "7 ngày 6 đêm",
    "8 ngày 7 đêm",
  ];
  const listTourType = ["Nội địa", "Quốc tế"];
  const airline = [
    "Tất cả",
    "Vietnam Airlines",
    "Vietnam Airlines",
    "VietJet Air",
    "Bamboo Airways",
  ];
  return (
    <div className="bg-[#FFF5F5] min-h-[100vh] pb-[218px] relative mt-[-208px]">
      <div className="z-10 relative">
        <div>
          <img
            src={listTour}
            alt=""
            className="w-full object-cover h-[588px]"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-96 z-10 ">
          <div className="bg-white shadow-[0px_10px_24px_rgba(20,20,21,0.09)] rounded-[20px] p-8 w-[1280px] mx-auto ">
            <div>
              <h1 className="text-xl font-bold text-[#141415] ">
                Cùng khám phá những tour tour hấp dẫn nào!
              </h1>
              <span className="text-base text-[#575859] opacity-80">
                Bạn có thể dùng bộ lọc tour bên dưới để tìm kiếm nhanh hơn.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
                    <div className="absolute top-full left-0 mt-2 z-50 bg-white  ">
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
              </div>
              <div>
                <div className="relative cursor-pointer">
                  <div
                    className="flex items-center gap-4 py-2 rounded-full"
                    onClick={() => {
                      setIsShowDateNumber(!isShowDateNumber);
                    }}
                  >
                    <img src={timeIcon} alt="" />
                    <div>
                      <div className="font-semibold text-[#333] flex gap-x-2 items-center">
                        <span>Số ngày</span>
                        <div className="w-6 h-6">
                          <img src={down} alt="" className="w-full h-full" />
                        </div>
                      </div>
                      <div className="text-[#767A7F] text-sm whitespace-nowrap">
                        {dateNumber || "Số ngày muốn đi"}
                      </div>
                    </div>
                  </div>

                  {isShowDateNumber && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                      <Dropdown
                        locations={dateNumberDrpdown}
                        selected={dateNumber}
                        onSelect={(value) => {
                          setDateNumber(value);
                          setIsShowDateNumber(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Khoảng giá
                </label>
                <div className="px-2">
                  <Range
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    values={priceRange}
                    onChange={(values) => setPriceRange(values)}
                    renderTrack={({ props, children }) => {
                      const [minVal, maxVal] = priceRange;

                      return (
                        <div
                          {...props}
                          className="h-2 w-full rounded-full bg-gray-200 relative"
                          style={{ ...props.style }}
                        >
                          <div
                            className="absolute h-full  rounded-full customRange"
                            style={{
                              left: `${((minVal - MIN) / (MAX - MIN)) * 100}%`,
                              width: `${
                                ((maxVal - minVal) / (MAX - MIN)) * 100
                              }%`,
                            }}
                          />
                          {children}
                        </div>
                      );
                    }}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className="w-5 h-5 bg-yellow-500 rounded-full shadow-lg border-2 border-white cursor-pointer"
                      />
                    )}
                  />

                  <div className="flex justify-between mt-2 text-sm font-semibold">
                    <span>{priceRange[0].toLocaleString()} đ</span>
                    <span>{priceRange[1].toLocaleString()} đ</span>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative ">
                  <div className="flex flex-col gap-y-3  ">
                    <div>
                      <h1 className="text-[#141415] font-medium text-xl">
                        Hãng bay
                      </h1>
                    </div>
                    <div
                      className="w-full justify-between h-12 p-3 rounded-xl bg-[#F4F5F6] flex items-center cursor-pointer "
                      onClick={() => {
                        setIsShowAirline(!isShowAirline);
                      }}
                    >
                      {airlineSelected ? (
                        <div className="flex gap-x-2 items-center">
                          <span className="text-base text-[#252627]">
                            {airlineSelected}
                          </span>
                          <span className="text-xs font-medium text-[#B9BDC1] ">
                            (
                            {options.find(
                              (option) => option.label === airlineSelected
                            )?.count || 0}
                            )
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-x-2 items-center">
                          <span className="text-base text-[#252627]">
                            {" "}
                            Tất cả{" "}
                          </span>
                          <span className="text-xs font-medium text-[#B9BDC1] ">
                            (4)
                          </span>
                        </div>
                      )}

                      <div className="size-6">
                        <img
                          src={arrow_drop_down}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  {isShowAirline && (
                    <div className="absolute top-full left-0 mt-2 z-100">
                      <Dropdown
                        locations={airline}
                        selected={airlineSelected}
                        onSelect={(value) => {
                          setAirlineSelected(value);
                          setIsShowAirline(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative ">
                  <div className="flex flex-col gap-y-3  ">
                    <div>
                      <h1 className="text-[#141415] font-medium text-xl">
                        Loại tour
                      </h1>
                    </div>
                    <div
                      className="w-full justify-between h-12 p-3 rounded-xl bg-[#F4F5F6] flex items-center cursor-pointer "
                      onClick={() => {
                        setIsShowTourType(!isShowTourType);
                      }}
                    >
                      {tourType ? (
                        <div className="flex gap-x-2 items-center">
                          <span className="text-base text-[#252627]">
                            {tourType}
                          </span>
                          <span className="text-xs font-medium text-[#B9BDC1] ">
                            (
                            {options.find((option) => option.label === tourType)
                              ?.count || 0}
                            )
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-x-2 items-center">
                          <span className="text-base text-[#252627]">
                            Nội địa
                          </span>
                          <span className="text-xs font-medium text-[#B9BDC1] ">
                            (2)
                          </span>
                        </div>
                      )}

                      <div className="size-6">
                        <img
                          src={arrow_drop_down}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  {isShowTourType && (
                    <div className="absolute top-full left-0 mt-2 z-100">
                      <Dropdown
                        locations={listTourType}
                        selected={tourType}
                        onSelect={(value) => {
                          setTourType(value);
                          setIsShowTourType(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[157px] z-10">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img src={listTourImage} alt="" />
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
                    className="rounded-2xl border border-[#D6D9DC] h-12 p-3 w-[315px] pl-11"
                  />
                </div>
                <div className="rounded-2xl border border-[#D6D9DC] h-12 p-3  bg-white relative w-[150px] text-end cursor-pointer">
                  <img
                    src={filterIcon}
                    alt=""
                    className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                  />
                  Sắp xếp theo
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 z-20">
            <TourCard />
          </div>
          <div className="mt-8 z-20">
            <TourCard />
          </div>
          <div className="mt-8 z-20">
            <TourCard />
          </div>
          <div className="mt-8 z-20">
            <TourCard />
          </div>
        </div>
        <div className="flex items-center justify-center  mt-10">
          <CustomPagination
            currentPage={1}
            totalPages={100}
            pageSize={10}
            onChange={(page) => console.log("page:", page)}
          />
        </div>
      </div>
      <div className="w-full absolute bottom-[-20px] z-1">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </div>
  );
};
