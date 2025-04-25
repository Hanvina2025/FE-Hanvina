import React from "react";
import iconDownload from "/assets/images/iconDownLoad.svg";
import location from "/assets/images/location.svg";
import destinationIcon from "/assets/images/destination.svg";
import airPlane from "/assets/images/airplane.svg";
import clock from "/assets/images/clock.svg";
import calender from "/assets/images/calender.svg";
import btnReserve from "/assets/images/btnReserve.svg";
import down from "/assets/images/arrow-down.svg";
// import down from "/assets/images/arrow-down.svg";
import pen from "/assets/images/pen.svg";
import ButtonShort from "/assets/images/button-short.svg";

import { Link } from "react-router-dom";

const TourCard = () => {
  return (
    <div className="max-w-7xl bg-white mx-auto p-8 py-[20px] rounded-[20px] shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-[#141415] ">
            [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU
          </h1>
        </div>
        <div>
          <button className="border border-[#867FFE] h-10 rounded-[40px] text-[#6961FF] text-base font-medium flex items-center gap-x-2 px-3 py-2">
            <img src={iconDownload} alt="" />
            Tải chương trình tour
          </button>
        </div>
      </div>
      <div className="mt-[16px]">
        <div className="grid grid-cols-4">
          <div className="flex items-center gap-x-2">
            <img src={location} alt="" className="size-8" />
            <div className="flex items-center ">
              <p className="text-[#141415] font-medium text-xl pr-1">
                Điểm đi:
              </p>
              <span className="text-[#767A7F] text-xl font-medium">Hà Nội</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="107"
              height="2"
              viewBox="0 0 107 2"
              fill="none"
            >
              <path
                d="M0.0585938 1L106.059 1"
                stroke="url(#paint0_linear_388_7038)"
                stroke-width="1.72059"
                stroke-dasharray="3.44 3.44"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_388_7038"
                  x1="112.064"
                  y1="0.468596"
                  x2="112.016"
                  y2="2.65269"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F68E1E" />
                  <stop offset="1" stop-color="#FFC909" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="">
            <div className="flex items-center gap-x-2">
              <img src={destinationIcon} alt="" className="size-8" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-xl pr-1">
                  Điểm đến:
                </p>
                <span className="text-[#767A7F] text-xl font-medium">
                  Bắc Kinh
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
                  Vietjet Air
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
                  5 ngày 4 đêm
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <img src={calender} alt="" className="size-8" />
              <div className="flex items-center ">
                <p className="text-[#141415] font-medium text-base pr-1">
                  Ngày khởi hành:
                </p>
                <div className=" rounded-lg border border-[#B9BDC1] h-8 flex items-center justify-between ">
                  <span className="px-2 text-base font-medium opacity-80">
                    31/03/2025
                  </span>
                  <img src={down} alt="" className="size-[16px] mr-2" />
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
                  <span className="text-base text-[#767A7F]">
                    Đặt trên 10 chỗ, tặng ngay 1 ô tô VF3 cho người nhanh tay
                    nhất
                  </span>
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
                  <Link
                    to="/chi-tiet-tour"
                    className="text-[#6961FF] underline text-base font-semibold "
                  >
                    Xem chi tiết
                  </Link>
                </div>
                <div className="flex items-center text-base mt-5">
                  <span className="text-base font-semibold text-[#141415]">
                    Tổng số chỗ:
                  </span>
                  <span className="ml-1 text-[#767A7F] text-base font-medium">
                    30
                  </span>

                  {/* Gạch kẻ dọc nét đứt */}
                  <div className="h-4 border-l border-gray-300 border-dashed mx-3" />

                  <span className="text-base font-semibold text-[#141415]">
                    Đã bán:
                  </span>
                  <span className="ml-1 text-[#767A7F] text-base font-medium">
                    5
                  </span>
                </div>
                <div className="mt-2 ">
                  <h1 className="text-[#BB2C26] font-semibold">
                    Số chỗ còn lại: 25 chỗ
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l border-dashed border-[#B9BDC1]">
            <div className="flex justify-center w-full gap-x-6">
              <div>
                <p>Giá tiền</p>
                <h1 className="text-[#BB2C26] text-xl font-semibold">
                  29,00,000 đ
                </h1>
              </div>
              <div>
                <p>Giá tiền</p>
                <h1 className="text-[#BB2C26]  text-xl font-semibold">
                  29,00,000 đ
                </h1>
              </div>
            </div>

            <div className="mt-[28px] relative h-[48px] cursor-pointer">
              <img src={ButtonShort} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[12px] text-center font-[500] text-[16px] text-white">
                Giữ chỗ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
