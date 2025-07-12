import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";

import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import {
  getDetailPreOrder,
  getDetailOrderCustomer
} from "@/client/apis/tour";

import arrRight from "/assets/images/arrow-right.svg";
import StepPayment from "@/client/components/StepPayment";
import userYellow from "/assets/images/userYellow.svg";
import phoneYellow from "/assets/images/phoneYellow.svg";
import countUser from "/assets/images/countUser.svg";
import CustomerList from "@/client/components/CustomerList";
import ButtonShort from "/assets/images/button-short.svg";

import ConfirmModal from "@/client/components/ConfirmModal"

const PaymentStepThree = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preOrder, setPreOrder] = useState<any>({});
  const [preOrderCustomer, setPreOrderCustomer] = useState<any>({});
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDetailPreOrder(id)
      fetchDetailPreOrderCustomer(id)
    }
  }, [id])

  const fetchDetailPreOrder = async (id: number | string) => {
    try {
      const fetchedData = await getDetailPreOrder(id);
      setPreOrder(fetchedData)
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchDetailPreOrderCustomer = async (id: number | string) => {
    try {
      const fetchedData = await getDetailOrderCustomer(id);
      if (fetchedData) {
        setPreOrderCustomer(fetchedData[0])
      }
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const handleConfirmCancel = () => {
    navigate(PATH.LIST_TOUR_ACTIVE)
  };

  const handleConfirmApply = async () => {
    navigate(`/reserve/step4/${preOrder?.id}`)
  };

  return (
    <div className="container mx-auto mb-10">
      <div className="flex items-center justify-between">
        <Breadcrumb
          separator={<img src={arrRight} alt="" className="size-6" />}
          className="custom-ant-breadcrumb-separator "
        >
          <Breadcrumb.Item>
            <span className="text-[#53575A] text-xl underline cursor-pointer"
              onClick={() => navigate(PATH.LIST_TOUR_ACTIVE)}
            >
              Hoạt động
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="text-[#BB2C26] font-medium text-xl">
              {preOrder?.tourInformation?.name || ""}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-6">
        <h1 className="text-[#141415] text-3xl font-semibold">
          {preOrder?.tourInformation?.name || ""}
        </h1>
      </div>
      <div className="mt-8">
        <StepPayment />
      </div>
      <div className="mt-9 boxShadowCustom p-5 rounded-[20px]">
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
              value={preOrder?.customerName}
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
              value={preOrder?.customerPhone}
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
                ADT {preOrderCustomer?.adultCount ?? 0} chỗ, CHD {preOrderCustomer?.childrenCount ?? 0} chỗ, INF {preOrderCustomer?.babyCount ?? 0} chỗ
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="text-2xl text-[#141415] font-medium pb-6 pt-2">
              Danh sách khách hàng
            </h2>
            <CustomerList />
          </div>
          <div className="mt-6 flex justify-end" onClick={() => setIsModalConfirm(true)}>
            <div className="relative h-[48px] w-[180px] cursor-pointer">
              <img src={ButtonShort} className="h-[48px] w-full" />
              <div className="absolute inset-0 flex items-center justify-center font-[500] text-[16px] text-white">
                Nộp hồ sơ
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        visible={isModalConfirm}
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmApply}
        buttonTxtClose="Hoàn tất"
        buttonTxtConfirm="Tất toán ngay"
        title="Nộp hồ sơ khách hàng thành công!"
        description="Hồ sơ khách hàng của bạn đã được gửi lên hệ thống thành công"
      />
    </div>
  );
};

export default PaymentStepThree;
