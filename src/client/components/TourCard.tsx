import React, { useState, useEffect } from "react";
import iconDownload from "/assets/images/iconDownLoad.svg";
import airPlane from "/assets/images/airplane.svg";
import clock from "/assets/images/clock.svg";
import calender from "/assets/images/calender.svg";
import down from "/assets/images/arrow-down.svg";
import pen from "/assets/images/pen.svg";
import ButtonShort from "/assets/images/button-short.svg";
import IcPosition from "/assets/images/ic-position.svg";
import IcLocation from "/assets/images/ic-location.svg";
import IcLine from "/assets/images/ic-line-tour.svg";
import { getTourStartDate } from "@/client/apis/tour";
import { Modal, message } from "antd"
import { useNavigate } from "react-router-dom";
import DropDownSelectDepartureDate from "./DropDownSelectDepartureDate";
import { PATH } from "@/libs/constants/path";
import ReservationList from "@/client/components/ReservationList"
import { getExportFile } from "@/client/apis/tour"
import IcFire from "/assets/images/Ic-fire.svg";
import { formatDate, formatDateNotTime } from "@/utils/common";

const TourCard = ({ tourData }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departure, setDeparture] = useState(null);
  const [dataStartDate, setDataStartDate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tourData?.key) {
      fetchList(tourData?.key);
    }
  }, [tourData?.key]);

  useEffect(() => {
    if (dataStartDate.length > 0 && !departure) {
      setDeparture(dataStartDate[0]);  // Chọn đối tượng đầu tiên khi dataStartDate có dữ liệu
    }
  }, [dataStartDate, departure]);

  const fetchList = async (key: string) => {
    const query: any = new URLSearchParams({
      key: key || ""
    });
    try {
      const fetchedData = await getTourStartDate(query);
      console.log('Fetched start dates:', fetchedData.data);
      setDataStartDate(fetchedData.data);
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const handleNavigate = () => {
    navigate(PATH.RESERVE, { state: { tourData } });
  };

  const handleDateChange = (value) => {
    setDeparture(value);
    setShowDatePicker(false);
  };

  const handleExportFile = async () => {
    try {
      if (tourData?.fileKey) {
        const file = await getExportFile(tourData?.fileKey);

        const blobUrl = URL.createObjectURL(file); // tạo URL tạm
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = file.name; // => "Chương trình Tour"
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl); // giải phóng URL

        message.success("Tải chương trình Tour thành công");
      } else {
        message.error("Chưa có chương trình Tour")
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.errorMsg ||
        error?.errorMsg ||
        "Lỗi không xác định";

      message.error(errorMsg);
      console.error("Lỗi:", error);

    }
  }

  return (
    <div className={`container relative bg-white mx-auto p-8 py-[20px] rounded-[20px] shadow-all ${tourData?.special ? 'tour-special' : ''}`}>

      {tourData?.special && <img src={IcFire} alt="" className="absolute top-[13px] left-[-50px] z-10" />}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-[#141415] ">
            {tourData?.name || "[TOUR NOSHOPP] Default Tour"}
          </h1>
        </div>
        <div>
          <button onClick={() => handleExportFile()} className="border border-[#867FFE] h-10 rounded-[40px] text-[#6961FF] text-base font-medium flex items-center gap-x-2 px-3 py-2">
            <img src={iconDownload} alt="" />
            Tải chương trình tour
          </button>
        </div>
      </div>

      <div className="mt-[16px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-x-2">
            <img src={IcLocation} alt="" />
            <div className="flex items-center ">
              <p className="text-[#141415] font-medium text-xl pr-1">
                Điểm đi:
              </p>
              <span className="text-[#767A7F] text-xl font-medium">
                {tourData?.tourFromName || ""}
              </span>
            </div>
            <img src={IcLine} alt="" />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <img src={IcPosition} alt="" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-xl pr-1">
                  Điểm đến:
                </p>
                <span className="text-[#767A7F] text-xl font-medium">
                  {tourData?.tourToName || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[16px]">
        <div className="grid grid-cols-4">
          <div>
            <div className="flex items-center gap-x-2">
              <img src={airPlane} alt="" className="size-8" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-base pr-1">
                  Hãng bay:
                </p>
                <span className="text-[#767A7F] text-base font-medium">
                  {tourData?.tourAirlineName || ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={clock} alt="" className="size-8" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-base pr-1">
                  Thời gian:
                </p>
                <span className="text-[#767A7F] text-base font-medium">
                  {tourData?.numberOfDays || ""} ngày
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={calender} alt="" className="size-8" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-base pr-1">
                  Ngày khởi hành:
                </p>
                <div
                  className="relative rounded-lg border cursor-pointer border-[#B9BDC1] h-8 flex items-center justify-between "
                  onClick={() => { setShowDatePicker(!showDatePicker) }}
                >
                  <span className="px-2 text-base font-medium opacity-80">
                    {departure?.startDate ? formatDateNotTime(departure?.startDate) : ''}
                  </span>
                  <img src={down} alt="" className="size-[16px] mr-2" />

                  {showDatePicker && (
                    <div className="absolute top-full left-0 mt-2 z-[300]">
                      <DropDownSelectDepartureDate
                        locations={dataStartDate}
                        selected={departure}
                        setIsShowDropdown={setShowDatePicker}
                        onSelect={handleDateChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-dashed border-[#B9BDC1]">
            <div className="flex justify-center w-full">
              <div className="w-[184px]">
                <div className="flex gap-x-2 items-center justify-start">
                  <img src={pen} alt="" />
                  <h1 className="text-base font-medium text-[#141415]">
                    Ghi chú:
                  </h1>
                </div>
                <div className="w-full text-ce">
                  <div className="text-base text-[#767A7F] line-clamp-4">
                    {tourData?.noteExternal || ""}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-dashed border-[#B9BDC1]">
            <div className="w-full flex justify-center ">
              <div className="w-[260px]">
                <div className="flex gap-x-2 items-center justify-start">
                  <img src={pen} alt="" />
                  <h1 className="text-base font-semibold text-[#141415]">
                    Tình trạng giữ chỗ:
                  </h1>
                  <div
                    className="text-[#6961FF] underline text-base font-semibold cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Xem chi tiết
                  </div>
                </div>
                <div className="flex items-center text-base mt-5">
                  <span className="text-base font-semibold text-[#141415]">
                    Tổng số chỗ:
                  </span>
                  <span className="ml-1 text-[#767A7F] text-base font-medium">
                    {departure?.totalSeat || ""}
                  </span>

                  <div className="h-4 border-l border-gray-300 border-dashed mx-3" />

                  <span className="text-base font-semibold text-[#141415]">
                    Đã bán:
                  </span>
                  <span className="ml-1 text-[#767A7F] text-base font-medium">
                    {departure?.totalSeatBooked || "0"}
                  </span>
                </div>
                <div className="mt-2 ">
                  <h1 className="text-[#BB2C26] font-semibold">
                    Số chỗ còn lại: {
                      departure?.totalSeat != null
                        ? (departure.totalSeat - (departure.totalSeatBooked ?? 0)) + ' chỗ'
                        : ""
                    }
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-dashed border-[#B9BDC1]">
            <div className="flex justify-center w-full gap-x-6">
              <div>
                <p className="text-base font-[500] text-[#141415]">Giá tiền</p>
                <h1 className="text-[#BB2C26] text-xl font-semibold">
                  {departure?.adultPrice ? `${departure.adultPrice.toLocaleString()} đ` : "0 đ"}
                </h1>
              </div>
              <div>
                <p className="text-base font-[500] text-[#141415]">Hoa hồng</p>
                <h1 className="text-[#BB2C26]  text-xl font-semibold">
                  {departure?.commissionAdultPrice ? `${departure.commissionAdultPrice.toLocaleString()} đ` : "0 đ"}
                </h1>
              </div>
            </div>

            <div
              className="mt-[28px] relative h-[48px] cursor-pointer"
              onClick={handleNavigate}
            >
              <img src={ButtonShort} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white">
                Giữ chỗ
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        title={<span style={{ fontSize: 20, fontWeight: 500 }}>Danh sách giữ chỗ</span>}
        style={{ borderRadius: 20 }}
        footer={null}
      >
        <ReservationList id={departure?.id} />
      </Modal>
    </div>
  );
};

export default TourCard;
