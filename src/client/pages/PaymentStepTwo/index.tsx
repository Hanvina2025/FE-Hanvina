import { Breadcrumb } from "antd";
import React from "react";
import arrRight from "/assets/images/arrow-right.svg";
import StepPayment from "@/client/components/StepPayment";
import CustomerInformation from "@/client/components/CustomerInformation";
import TitlePattern from "@/client/components/TitlePattern";
import TourPriceTable from "@/client/components/TourPriceTable";
import DeductionServiceCard from "@/client/components/DeductionServiceCard";
import phoneYellow from "/assets/images/phoneYellow.svg";
import userYellow from "/assets/images/userYellow.svg";
import close from "/assets/images/close.svg";
import addCircle from "/assets/images/add-circle.svg";
import buttonMedium from "/assets/images/buttonMedium.svg";

import paymentDealine from "/assets/images/paymentDealine.svg";
import DepartSmall from "/assets/images/DepartSmall.svg";
import { Link } from "react-router-dom";
import "../PaymentStepTwo/index.scss";
const PaymentStepTwo = () => {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="flex items-center justify-between mt-8">
        <Breadcrumb
          separator={<img src={arrRight} alt="" className="size-6" />}
          className="custom-ant-breadcrumb-separator "
        >
          <Breadcrumb.Item>
            <span className="text-[#53575A] text-xl underline cursor-pointer">
              Hoạt động
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
        <h1 className="text-[#141415] text-3xl font-semibold">
          [TOUR NOSHOPP] THƯỢNG HẢI - TÔ CHÂU - Ô TRẤN - HÀNG CHÂU
        </h1>
      </div>
      <div className="mt-8">
        <StepPayment />
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-12 gap-x-8 ">
        <div className="md:col-span-7">
          <div className="mt-9 flex items-center gap-x-7">
            <img src={paymentDealine} alt="" />
            <div className="flex gap-x-[6px]">
              <p className="text-[#141415] text-xl font-medium">
                Hạn thanh toán cọc:
              </p>
              <p className="text-[#DC1F18] text-xl font-medium">Còn 23:25</p>
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="bg-white rounded-[20px] shadow-md  mt-6">
              <div className="relative custom_bg_btn">
                <img src={DepartSmall} alt="" />
                <div className="absolute top-0 w-full h-full px-5 py-4">
                  <div className="w-full flex items-center h-full justify-between">
                    <h1 className="text-[#141415] text-xl font-medium">
                      Khởi hành
                    </h1>
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
            <div className="bg-white rounded-[20px] shadow-md  mt-6">
              <div className="relative custom_bg_btn">
                <img src={DepartSmall} alt="" />
                <div className="absolute top-0 w-full h-full px-5 py-4">
                  <div className="w-full flex items-center h-full justify-between">
                    <h1 className="text-[#141415] text-xl font-medium">
                      Thông tin đặt chỗ
                    </h1>
                  </div>
                </div>
              </div>
              <div className="p-[20px]">
                <div className="flex gap-x-4">
                  <div className="space-y-4 flex flex-col">
                    <span className="text-[#141415] text-base font-semibold">
                      Người lớn:
                    </span>
                    <span className="text-[#141415] text-base font-semibold">
                      Trẻ em:
                    </span>
                    <span className="text-[#141415] text-base font-semibold">
                      Em bé:
                    </span>
                  </div>
                  <div className="space-y-4 flex flex-col">
                    <span className="text-[#BB2C26] text-base font-semibold">
                      12 chỗ
                    </span>
                    <span className="text-[#BB2C26] text-base font-semibold">
                      2 chỗ
                    </span>
                    <div className="flex items-center gap-x-2">
                      <span className="text-[#BB2C26] text-base font-semibold">
                        0 chỗ
                      </span>
                    </div>
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
          <div className="bg-white rounded-[20px] shadow-md mt-8 p-5 ">
            <span className="text-[#BB2C26] text-xl font-medium">
              Tiến độ thanh toán
            </span>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <p className="text-[#252627] text-base">Đặt cọc</p>
                  <p className=" text-[#8F9499] text-sm">15:20 - 29/2/2025</p>
                </div>
                <div>
                  <p className="text-[#252627] font-medium">135,850,000 đ</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-x-3">
                  <p className="text-[#252627] text-base">Tất toán</p>
                  <p className=" text-[#8F9499] text-sm">15:20 - 29/2/2025</p>
                </div>
                <div>
                  <p className="text-[#252627] font-medium">135,850,000 đ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-0">
            {/* <button className="w-full  rounded-full bg-gradient-to-r from-[#b32c1b] to-[#c73f22] text-white font-semibold shadow-md hover:opacity-90">
         
            </button> */}
            <button className="relative h-[48px] cursor-pointer">
              <img src={buttonMedium} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[12px] text-center font-[500] text-[16px] text-white">
                Đặt chỗ
              </div>
            </button>
            <button className="mt-4 relative h-[48px] cursor-pointer">
              <img src={buttonMedium} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[12px] text-center font-[500] text-[16px] text-white">
                Huỷ đặt chỗ
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStepTwo;
