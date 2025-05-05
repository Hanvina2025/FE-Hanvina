import React from "react";
import { Breadcrumb } from "antd";
import arrRight from "/assets/images/arrow-right.svg";

import patternTitle from "/assets/images/patternTitle.svg";
import phoneYellow from "/assets/images/phoneYellow.svg";
import userYellow from "/assets/images/userYellow.svg";
import close from "/assets/images/close.svg";
import addCircle from "/assets/images/add-circle.svg";
import buttonMedium from "/assets/images/buttonMedium.svg";

import { Link, useNavigate } from "react-router-dom";

import "./index.scss";
import TitlePattern from "@/client/components/TitlePattern";
import TourPriceTable from "@/client/components/TourPriceTable";
import CustomerInformation from "@/client/components/CustomerInformation";
import DeductionServiceCard from "@/client/components/DeductionServiceCard";
import { PATH } from "@/libs/constants/path";
import StepPayment from "@/client/components/StepPayment";
const Reserve = () => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate(PATH.STEP_TWO_PROCESS);
  };
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="flex items-center justify-between mt-8">
        <Breadcrumb
          separator={<img src={arrRight} alt="" className="size-6" />}
          className="custom-ant-breadcrumb-separator "
        >
          <Breadcrumb.Item>
            <span className="text-[#53575A] text-xl underline cursor-pointer">
              Danh sách tour
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="text-[#BB2C26] font-medium text-xl">
              [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-6">
        <h1 className="text-[#141415] font-semibold text-3xl">
          [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU
        </h1>
      </div>
      <div className="mt-8">
        <StepPayment />
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-12 gap-x-8 ">
        <div className="md:col-span-7">
          <div className="bg-white rounded-[20px] shadow-md  ">
            <div className="relative ">
              <img src={patternTitle} alt="" />
              <div className="absolute top-0 w-full h-full px-5 py-4">
                <div className="w-full flex items-center h-full justify-between">
                  <h1 className="text-[#141415] text-xl font-medium">
                    Khởi hành
                  </h1>
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M6 4.3125C5.6925 4.3125 5.4375 4.0575 5.4375 3.75V1.5C5.4375 1.1925 5.6925 0.9375 6 0.9375C6.3075 0.9375 6.5625 1.1925 6.5625 1.5V3.75C6.5625 4.0575 6.3075 4.3125 6 4.3125Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M12 4.3125C11.6925 4.3125 11.4375 4.0575 11.4375 3.75V1.5C11.4375 1.1925 11.6925 0.9375 12 0.9375C12.3075 0.9375 12.5625 1.1925 12.5625 1.5V3.75C12.5625 4.0575 12.3075 4.3125 12 4.3125Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M6.375 10.875C6.2775 10.875 6.18 10.8526 6.09 10.8151C5.9925 10.7776 5.91751 10.725 5.84251 10.6575C5.70751 10.515 5.625 10.32 5.625 10.125C5.625 9.93004 5.70751 9.73505 5.84251 9.59255C5.91751 9.52505 6 9.47253 6.09 9.43503C6.27 9.36003 6.48 9.36003 6.66 9.43503C6.75 9.47253 6.83249 9.52505 6.90749 9.59255C6.93749 9.63005 6.97499 9.66755 6.99749 9.70505C7.02749 9.75005 7.05001 9.79504 7.06501 9.84004C7.08751 9.88504 7.10251 9.93003 7.11001 9.97503C7.11751 10.0275 7.125 10.08 7.125 10.125C7.125 10.32 7.04249 10.515 6.90749 10.6575C6.83249 10.725 6.75 10.7776 6.66 10.8151C6.57 10.8526 6.4725 10.875 6.375 10.875Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M9 10.875C8.9025 10.875 8.805 10.8525 8.715 10.815C8.6175 10.7775 8.54251 10.725 8.46751 10.6575C8.33251 10.515 8.25 10.32 8.25 10.125C8.25 10.08 8.25749 10.0275 8.26499 9.97501C8.27249 9.93001 8.28749 9.88501 8.30999 9.84001C8.32499 9.79501 8.34751 9.75002 8.37751 9.70502C8.40751 9.66752 8.43751 9.63002 8.46751 9.59252C8.74501 9.31502 9.24749 9.31502 9.53249 9.59252C9.56249 9.63002 9.59249 9.66752 9.62249 9.70502C9.65249 9.75002 9.67501 9.79501 9.69001 9.84001C9.71251 9.88501 9.72751 9.93001 9.73501 9.97501C9.74251 10.0275 9.75 10.08 9.75 10.125C9.75 10.32 9.66749 10.515 9.53249 10.6575C9.38999 10.7925 9.2025 10.875 9 10.875Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M6.375 13.5C6.2775 13.5 6.18 13.4776 6.09 13.4401C6 13.4026 5.91751 13.35 5.84251 13.2825C5.70751 13.14 5.625 12.945 5.625 12.75C5.625 12.705 5.63249 12.6525 5.63999 12.6075C5.64749 12.555 5.66249 12.51 5.68499 12.465C5.69999 12.42 5.72251 12.375 5.75251 12.33C5.77501 12.2925 5.81251 12.2551 5.84251 12.2176C5.91751 12.1501 6 12.0975 6.09 12.06C6.27 11.985 6.48 11.985 6.66 12.06C6.75 12.0975 6.83249 12.1501 6.90749 12.2176C6.93749 12.2551 6.97499 12.2925 6.99749 12.33C7.02749 12.375 7.05001 12.42 7.06501 12.465C7.08751 12.51 7.10251 12.555 7.11001 12.6075C7.11751 12.6525 7.125 12.705 7.125 12.75C7.125 12.945 7.04249 13.14 6.90749 13.2825C6.83249 13.35 6.75 13.4026 6.66 13.4401C6.57 13.4776 6.4725 13.5 6.375 13.5Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M15.375 7.38H2.625C2.3175 7.38 2.0625 7.125 2.0625 6.8175C2.0625 6.51 2.3175 6.255 2.625 6.255H15.375C15.6825 6.255 15.9375 6.51 15.9375 6.8175C15.9375 7.125 15.6825 7.38 15.375 7.38Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M11.8652 17.085C11.5802 17.085 11.3102 16.98 11.1152 16.785C10.8827 16.5525 10.7777 16.215 10.8302 15.8625L10.9727 14.8499C11.0102 14.5874 11.1677 14.2725 11.3552 14.085L14.0102 11.43C14.3702 11.07 14.7227 10.8825 15.1052 10.845C15.5777 10.8 16.0352 10.995 16.4702 11.43C16.9277 11.8875 17.5427 12.8174 16.4702 13.8899L13.8152 16.545C13.6277 16.7325 13.3127 16.89 13.0502 16.9275L12.0377 17.07C11.9777 17.0775 11.9252 17.085 11.8652 17.085ZM15.2327 11.9625C15.2252 11.9625 15.2177 11.9625 15.2102 11.9625C15.1052 11.97 14.9627 12.0674 14.8052 12.2249L12.1502 14.88C12.1277 14.9025 12.0902 14.9775 12.0902 15.0075L11.9552 15.945L12.8927 15.8099C12.9227 15.8024 12.9976 15.765 13.0201 15.7425L15.6752 13.0875C16.0052 12.7575 16.0502 12.5925 15.6752 12.2175C15.5552 12.105 15.3827 11.9625 15.2327 11.9625Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M15.69 14.4374C15.6375 14.4374 15.5849 14.4299 15.5399 14.4149C14.5499 14.1374 13.7624 13.35 13.4849 12.36C13.4024 12.06 13.5749 11.7524 13.8749 11.6624C14.1749 11.5799 14.4824 11.7525 14.5724 12.0525C14.7449 12.6675 15.2324 13.1549 15.8474 13.3274C16.1474 13.4099 16.3199 13.725 16.2374 14.025C16.1624 14.2725 15.9375 14.4374 15.69 14.4374Z"
                        fill="#006AF5"
                      />
                      <path
                        d="M9 17.0625H6C3.2625 17.0625 1.6875 15.4875 1.6875 12.75V6.375C1.6875 3.6375 3.2625 2.0625 6 2.0625H12C14.7375 2.0625 16.3125 3.6375 16.3125 6.375V9C16.3125 9.3075 16.0575 9.5625 15.75 9.5625C15.4425 9.5625 15.1875 9.3075 15.1875 9V6.375C15.1875 4.23 14.145 3.1875 12 3.1875H6C3.855 3.1875 2.8125 4.23 2.8125 6.375V12.75C2.8125 14.895 3.855 15.9375 6 15.9375H9C9.3075 15.9375 9.5625 16.1925 9.5625 16.5C9.5625 16.8075 9.3075 17.0625 9 17.0625Z"
                        fill="#006AF5"
                      />
                    </svg>
                    <span className="text-[#006AF5] text-sm font-medium">
                      Đổi ngày khởi hành
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-[20px]">
              <div className="flex gap-x-4">
                <div className="space-y-4 flex flex-col">
                  <span className="text-[#141415] text-base font-semibold">
                    Ngày khởi hành:
                  </span>
                  <span className="text-[#141415] text-base font-semibold">
                    Ngày về:
                  </span>
                  <span className="text-[#141415] text-base font-semibold">
                    Số thứ tự giữ chỗ:
                  </span>
                </div>
                <div className="space-y-4 flex flex-col">
                  <span className="text-[#BB2C26] text-base font-semibold">
                    Thứ 2, 31/3/2025
                  </span>
                  <span className="text-[#BB2C26] text-base font-semibold">
                    Thứ 6, 4/4/2025
                  </span>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#BB2C26] text-base font-semibold">
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
          <div className="mt-6">
            <TourPriceTable />
          </div>
          <div className="mt-6">
            <TitlePattern title="Thông tin khách hàng">
              <div className="flex gap-x-4">
                <div className="w-1/2">
                  <div className="flex items-center gap-x-2">
                    <img src={userYellow} alt="" />
                    <span className="text-[#141415] font-semibold text-base">
                      Đại diện đoàn
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Nhập tên người đại diện"
                      className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center ">
                    <img src={phoneYellow} alt="" />
                    <span className="text-[#141415] font-semibold text-base pl-2">
                      Điện thoại liên hệ
                    </span>
                    <span className="text-base text-[#767A7F] pl-1">
                      (Đại lý)
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      name="phone"
                      className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    />
                  </div>
                </div>
              </div>
            </TitlePattern>
          </div>
          <div className="mt-6">
            <CustomerInformation />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6">
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ giảm trừ"
                subtitle="(Giảm trừ khi đã có các dịch vụ dưới đây)"
              />
            </div>
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ cộng thêm"
                subtitle="(Phát sinh thêm ngoài chương trình Tour)"
              >
                <div>
                  <h1 className="text-[#141415] text-base font-medium">
                    Phát sinh thêm
                  </h1>
                  <div className="mt-2 rounded-lg p-2 bg-[#F4F5F6]">
                    <div className="flex justify-between items-center gap-x-[10px]">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Nhập nội dung"
                        className="border border-[#D6D9DC)] w-full p-3 rounded-lg"
                      />
                      <button className="mr-1">
                        <img src={close} alt="" />
                      </button>
                    </div>
                    <div className="flex justify-between gap-x-2 mt-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Nhập số tiền"
                        className="border border-[#D6D9DC)] w-full p-3 rounded-lg"
                      />
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Nhập số lượng"
                        className="border border-[#D6D9DC)] w-full p-3 rounded-lg"
                      />
                    </div>
                    <button className="mt-4 flex items-center gap-x-2">
                      <img src={addCircle} alt="" />
                      <span className="text-[#006AF5] text-sm font-medium">
                        Thêm nội dung mới
                      </span>
                    </button>
                    <div className="w-full flex justify-end">
                      <button className="px-4 py-3 rounded-[44px] bg-[#D3362F] w-[92px] text-white font-medium">
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </DeductionServiceCard>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 ">
          <div className="bg-white rounded-[20px] shadow-md p-[30px] ">
            <div className="border-b border-[#D6D9DC]pb-6">
              <h2 className="text-[#BB2C26] font-medium text-xl mb-[20px]">
                Chi tiết đặt chỗ
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-base text-[#141415] font-medium">
                    Hành trình
                  </p>
                  <p className=" text-[#53575A] text-base mt-3">
                    [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU (5
                    NGÀY 4 ĐÊM)
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">
                    Điểm đi
                  </p>
                  <p>Hà Nội</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">
                    Điểm đến
                  </p>
                  <p>Bắc Kinh</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">
                    Thời gian
                  </p>
                  <p>5 ngày 4 đêm</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">
                    Ngày khởi hành
                  </p>
                  <p>T2, 31/3/2025</p>
                </div>
                <div className="flex justify-between pb-6">
                  <p className="text-base text-[#141415] font-medium">
                    Hãng bay
                  </p>
                  <p>Vietjet</p>
                </div>
              </div>
            </div>

            {/* Chi tiết giá */}
            <div className=" border-b border-[#D6D9DC] py-6">
              <h2 className="text-[#BB2C26] font-medium text-xl mb-[20px]">
                Chi tiết giá
              </h2>

              {/* Giá bán */}
              <div className="mb-5">
                <div className="flex justify-between mb-[17px]">
                  <p className="text-base text-[#141415] font-medium">
                    Giá bán
                  </p>
                  {/* <p>20,000,000 đ x 12</p> */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-base text-[#53575A] font-medium">
                      Người lớn
                    </p>
                    <p>20,000,000 đ x 12</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base text-[#53575A] font-medium">
                      Trẻ em
                    </p>
                    <p>19,000,000 đ x 2</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base text-[#53575A] font-medium">
                      Em bé
                    </p>
                    <p>0 đ</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p className="text-base  text-[#141415] font-medium">
                      Tổng
                    </p>
                    <p>278,000,000 đ</p>
                  </div>
                </div>
              </div>

              {/* Chiết khấu hoa hồng */}
              <div className="mb-5">
                <p className="font-semibold mb-4">Chiết khấu hoa hồng (-)</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Người lớn</p>
                    <p>500,000 đ x 12</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Trẻ em</p>
                    <p>400,000 đ x 2</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Em bé</p>
                    <p>0 đ x 0</p>
                  </div>
                  <div className="flex justify-between ">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">6,800,000 đ</p>
                  </div>
                </div>
              </div>

              {/* Dịch vụ giảm trừ */}
              <div className="mb-5">
                <p className="font-semibold mb-4">Dịch vụ giảm trừ (-)</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Khách đã có visa</p>
                    <p>500,000 đ x 1</p>
                  </div>
                  <div className="flex justify-between ">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">500,000 đ</p>
                  </div>
                </div>
              </div>

              {/* Dịch vụ cộng thêm */}
              <div>
                <p className="font-semibold pb-6">Dịch vụ cộng thêm (+)</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Phụ thu phòng đơn</p>
                    <p>500,000 đ x 2</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">1,000,000 đ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="px-4 pt-6 flex justify-between font-bold text-[#BB2C26] text-xl">
              <p>Tổng tiền</p>
              <p>271,700,000 đ</p>
            </div>
          </div>

          <div className="mt-8 pt-0">
            {/* <button className="w-full  rounded-full bg-gradient-to-r from-[#b32c1b] to-[#c73f22] text-white font-semibold shadow-md hover:opacity-90">
         
            </button> */}
            <button
              className=" relative h-[48px] cursor-pointer"
              onClick={handleConfirm}
            >
              <img src={buttonMedium} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[12px] text-center font-[500] text-[16px] text-white">
                Xác nhận giữ chỗ
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
