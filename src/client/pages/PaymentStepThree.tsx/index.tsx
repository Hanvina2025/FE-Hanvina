import React from "react";
import { Breadcrumb } from "antd";
import arrRight from "/assets/images/arrow-right.svg";
import StepPayment from "@/client/components/StepPayment";
import userYellow from "/assets/images/userYellow.svg";
import phoneYellow from "/assets/images/phoneYellow.svg";
import countUser from "/assets/images/countUser.svg";
import CustomerList from "@/client/components/CustomerList";
import ButtonShort from "/assets/images/button-short.svg";

const PaymentStepThree = () => {
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
      <div className="mt-9">
        <div className="grid grid-cols-4 gap-x-6">
          <div className="col-span-1">
            <div className="flex items-center gap-x-2 mb-2">
              <img src={userYellow} alt="" />
              <span className="text-[#141415] font-semibold text-base">
                Đại diện đoàn
              </span>
            </div>
            <input
              type="text"
              name="userName"
              placeholder="Nhập tên người đại diện"
              className="border border-[#D6D9DC] rounded-lg w-full p-3"
            />
          </div>
          <div className="col-span-1">
            <div className="flex items-center gap-x-2 mb-2">
              <img src={phoneYellow} alt="" />
              <span className="text-[#141415] font-semibold text-base">
                Điện thoại liên hệ
              </span>
              <span className="text-base text-[#767A7F] pl-1">(Đại lý)</span>
            </div>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              name="phone"
              className="border border-[#D6D9DC] rounded-lg w-full p-3"
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-x-3 ">
            <img src={countUser} alt="" />
            <div className="flex gap-x-1">
              <p className="text-[#252627] text-sm">Số lượng khách:</p>
              <p className="text-[#BB2C26] text-sm">
                ADT 12 chỗ, CHD 2 chỗ, INF 0 chỗ
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-2xl text-[#141415] font-medium pb-6 pt-2">
              Danh sách khách hàng
            </h2>
            <CustomerList />
          </div>
          <div className="mt-6 flex justify-end">
            <div className="relative h-[48px] w-[180px] cursor-pointer">
              <img src={ButtonShort} className="h-[48px] w-full" />
              <div className="absolute inset-0 flex items-center justify-center font-[500] text-[16px] text-white">
                Nộp hồ sơ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStepThree;
