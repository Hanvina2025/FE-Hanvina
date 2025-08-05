import React, { useState, useEffect } from "react";
import { Breadcrumb, Upload, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "@/client/components/ConfirmTour"
import type { UploadProps } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import dayjs from "dayjs";
import { PATH } from "@/libs/constants/path";

import arrRight from "/assets/images/arrow-right.svg";
import StepPayment from "@/client/components/StepPayment";
import TitlePattern from "@/client/components/TitlePattern";
import TourPriceTable from "@/client/components/TourPriceTable";
import buttonMedium from "/assets/images/button-short.svg";
import buttonMediumDisable from "/assets/images/button-short-disable.svg";
import upload from "/assets/images/upload.svg";
import qrCode from "/assets/images/qrcode.svg";
import Chatbot from "../ChatMessage";

import {
  getDetailPreOrder,
  getDetailOrderCustomer,
  getDetailOrderDiscountPlus,
  postOrderPaymentSettlement
} from "@/client/apis/tour";

import paymentDealine from "/assets/images/paymentDealine.svg";
import DepartSmall from "/assets/images/DepartSmall.svg";
import CustomerList from "@/client/components/CustomerList";

const { Dragger } = Upload;

const PaymentStepFour = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preOrder, setPreOrder] = useState<any>({});
  const [preOrderCustomer, setPreOrderCustomer] = useState<any>({});
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [servicesDiscount, setServicesDiscount] = useState({ type: 1, items: [] });
  const [servicesPlus, setServicesPlus] = useState({ type: 2, items: [] });
  const [totalData, setTotalData] = useState(null);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [fileBill, setFileBill] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDetailPreOrder(id)
      fetchDetailPreOrderCustomer(id)
      fetchDetailServicesDiscount(id)
      fetchDetailServicesPlus(id)
    }
  }, [id])

  useEffect(() => {
    setTotalData(calcTotal());
  }, [
    preOrderCustomer,
    adultCount,
    childrenCount,
    babyCount,
    servicesDiscount,
    servicesPlus
  ]);

  const calcTotal = () => {
    if (!preOrderCustomer) return null;

    const adultPrice = preOrderCustomer.adultPrice || 0;
    const childrenPrice = preOrderCustomer.childrenPrice || 0;
    const commissionAdult = preOrderCustomer.commissionPriceAdult || 0;
    const commissionChildren = preOrderCustomer.commissionPriceChildren || 0;

    const adultTotal = adultPrice * adultCount;
    const childrenTotal = childrenPrice * childrenCount;
    const babyTotal = 0;

    const commissionTotal = (commissionAdult * adultCount) + (commissionChildren * childrenCount);

    const discountTotal = servicesDiscount.items.reduce((sum, item) => {
      return sum + (Number(item.price) * Number(item.count || 0));
    }, 0);

    const additionalTotal = servicesPlus.items.reduce((sum, item) => {
      return sum + (Number(item.price) * Number(item.count || 0));
    }, 0);

    const totalBeforeDiscount = adultTotal + childrenTotal + babyTotal;
    const finalTotal = totalBeforeDiscount - commissionTotal - discountTotal + additionalTotal;

    return {
      adultPrice,
      childrenPrice,
      commissionAdult,
      commissionChildren,
      adultTotal,
      childrenTotal,
      babyTotal,
      commissionTotal,
      discountTotal,
      additionalTotal,
      totalBeforeDiscount,
      finalTotal
    };
  };

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
        setAdultCount(fetchedData[0]?.adultCount)
        setChildrenCount(fetchedData[0]?.childrenCount)
        setBabyCount(fetchedData[0]?.babyCount)
      }
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchDetailServicesDiscount = async (id: number | string) => {
    try {
      const fetchedData = await getDetailOrderDiscountPlus({
        preOrderId: id,
        type: 1, // Discount
      });
      setServicesDiscount({
        type: 1,
        items: fetchedData
      })
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchDetailServicesPlus = async (id: number | string) => {
    try {
      const fetchedData = await getDetailOrderDiscountPlus({
        preOrderId: id,
        type: 2, // Plus
      });
      setServicesPlus({
        type: 1,
        items: fetchedData
      })
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const handleSave = async () => {
    if (!fileBill) {
      message.warning("Vui lòng tải lên hóa đơn trước khi xác nhận!");
      return;
    }
    setUploading(true);
    const data: any = {
      fileBill: fileBill ? fileBill : null,
      preOrderId: id,
    };

    try {
      await postOrderPaymentSettlement(data);
      message.success("Gửi hóa đơn thành công!");
      setIsModalConfirm(true)
    } catch (error) {
      message.error("Gửi hóa đơn thất bại!", error);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmApply = async () => {
    navigate(PATH.LIST_TOUR_ACTIVE)
  };

  const handleConfirmCancel = () => {
    navigate(PATH.LIST_TOUR_ACTIVE)
  };

  const handleRemoveImage = () => {
    setFileBill(null);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload(file) {
      console.log('file', file);

      setFileBill(file);
      return false;
    },
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
            {preOrder?.status != 123 && <div className="flex gap-x-[6px]">
              <p className="text-[#141415] text-xl font-medium">
                Hạn tất toán:
              </p>
              <p className="text-[#DC1F18] text-xl font-medium">
                {preOrder?.depositDateTime
                  ? (() => {
                    const now = dayjs();
                    const end = dayjs(preOrder.depositDateTime);
                    const diff = end.diff(now);
                    if (diff <= 0) return "Hết hạn";

                    const duration = dayjs.duration(diff);
                    const hours = String(duration.hours()).padStart(2, "0");
                    const minutes = String(duration.minutes()).padStart(2, "0");

                    return `${hours}:${minutes}`;
                  })()
                  : "--"}
              </p>
            </div>}
            {preOrder?.status == 123 &&
              <div className="text-[#006AF5] text-[20px] font-[500]">
                CHỜ DUYỆT TẤT TOÁN
              </div>}
          </div>
          <div className="flex gap-x-6">
            <div className="bg-white rounded-[20px] boxShadowCustom mt-6">
              <div className="relative custom_bg_btn-payment">
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
                    {preOrder?.status == 118 && <span className="text-[#141415] text-base font-semibold">
                      Số thứ tự giữ chỗ:
                    </span>}
                  </div>
                  <div className="space-y-4 flex flex-col">
                    <span className="text-[#BB2C26] text-base font-semibold">
                      {preOrder?.tourInformation?.startDate || ""}
                    </span>
                    <span className="text-[#BB2C26] text-base font-semibold">
                      {preOrder?.tourInformation?.endDate || ""}
                    </span>
                    {preOrder?.status == 118 &&
                      <div className="flex items-center gap-x-2">
                        <span className="text-[#BB2C26] text-base font-semibold">
                          {preOrder?.tourInformation?.orderNo || "01"}
                        </span>
                        <Link
                          to="/chi-tiet-tour"
                          className="text-sm text-[#006AF5]"
                        >
                          Chi tiết
                        </Link>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[20px] boxShadowCustom mt-6">
              <div className="relative custom_bg_btn-payment">
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
                      Người đại diện:
                    </span>
                    <span className="text-[#141415] text-base font-semibold">
                      Điện thoại liên hệ:
                    </span>
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
                    <span className="text-[#767A7F] text-base font-[500]">
                      {preOrder?.customerName ?? ""}
                    </span>
                    <span className="text-[#767A7F] text-base font-[500]">
                      {preOrder?.customerPhone ?? ""}
                    </span>
                    <span className="text-[#BB2C26] text-base font-[500]">
                      {preOrderCustomer?.adultCount ?? 0} chỗ
                    </span>
                    <span className="text-[#BB2C26] text-base font-[500]">
                      {preOrderCustomer?.childrenCount ?? 0} chỗ
                    </span>
                    <div className="flex items-center gap-x-2">
                      <span className="text-[#BB2C26] text-base font-[500]">
                        {preOrderCustomer?.babyCount ?? 0} chỗ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <TourPriceTable departure={preOrderCustomer} />
          </div>
          {preOrder?.status != 123 && <div className="mt-6">
            <TitlePattern title="Tất toán">
              <div className="pl-4 space-y-6">
                <div className="flex gap-x-2 ">
                  <span className="text-[#141415] opacity-80">Đã cọc:</span>
                  <span className="text-[#141415] opacity-80">
                    {totalData
                      ? `${preOrder?.settlementPrice?.toLocaleString()} đ`
                      : "0 đ"}
                  </span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <p className="text-[#141415] text-base font-semibold">
                    Cần thanh toán:
                  </p>
                  <span className="text-[#BB2C26] text-[24px] font-[700]">
                    {totalData
                      ? `${Math.round(Number(preOrder?.totalPrice) - Number(preOrder?.settlementPrice)).toLocaleString()} đ`
                      : "0 đ"}
                  </span>
                </div>
                <div className="flex gap-6">
                  <img
                    src={qrCode}
                    alt="QR"
                    className="object-contain w-[228px]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="text-sm leading-6">
                      <div className="text-base">
                        <span className="font-medium text-[#000D21]">
                          Tên chủ tài khoản:
                        </span>{" "}
                        Dương Văn A
                      </div>
                      <div className="text-base">
                        <span className="font-medium text-[#000D21]">
                          Số tài khoản:
                        </span>{" "}
                        1241234235
                      </div>
                      <div className="text-base">
                        <span className="font-medium text-[#000D21]">
                          Ngân hàng:
                        </span>{" "}
                        Vietcombank
                      </div>
                      <div className="text-base">
                        <span className="font-medium text-[#000D21]">
                          Nội dung chuyển khoản khuyến nghị:
                        </span>
                        <br />
                        <span>
                          “Họ và tên - Tất toán Tour [Tên tour]”
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {!fileBill ? (
                        <Dragger {...props} className="custom-dragger-supplier">
                          <button className="text-[#006AF5] text-sm underline hover:text-blue-700 flex gap-2 pt-2">
                            <img src={upload} alt="" className="w-5 h-5" />
                            Tải hóa đơn lên
                          </button>
                        </Dragger>
                      ) : (
                        <div className="flex justify-between items-center gap-2">
                          <button className="text-[#006AF5] text-sm underline hover:text-blue-700 flex gap-2">
                            <img src={upload} alt="" className="w-5 h-5" />
                            Tải hóa đơn lên
                          </button>
                          <div className="ml-2 text-[#006AF5] text-sm">{fileBill?.name}</div>
                          <CloseOutlined onClick={handleRemoveImage} />
                        </div>
                      )}
                    </div>
                    <button
                      className="relative h-[48px] cursor-pointer mt-4 w-[192px]"
                      onClick={() => handleSave()}
                      disabled={!fileBill}
                    >
                      <img src={fileBill ? buttonMedium : buttonMediumDisable} className="w-[192px] h-[48px]" />
                      <div
                        className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white"

                      >
                        Tôi đã thanh toán
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </TitlePattern>
          </div>}
          <div className="mt-6">
            <CustomerList />
          </div>
        </div>
        <div className="md:col-span-5 ">
          <div className="bg-white rounded-[20px] shadow-all p-[30px] ">
            <div className="border-b border-[#D6D9DC] border-dashed">
              <h2 className="text-[#BB2C26] font-medium text-xl mb-[20px]">
                Chi tiết đặt chỗ
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-base text-[#141415] font-medium">Hành trình</p>
                  <p className=" text-[#53575A] text-base mt-3">{preOrder?.tourInformation?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Điểm đi</p>
                  <p className="text-[#53575A]">{preOrder?.tourInformation?.tourFromName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Điểm đến</p>
                  <p className="text-[#53575A]">{preOrder?.tourInformation?.tourToName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Thời gian</p>
                  <p className="text-[#53575A]">{preOrder?.tourInformation?.tourTimeName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Ngày khởi hành</p>
                  <p className="text-[#53575A]">{preOrder?.tourInformation?.startDate}</p>
                </div>
                <div className="flex justify-between pb-6">
                  <p className="text-base text-[#141415] font-medium">Hãng bay</p>
                  <p className="text-[#53575A]">{preOrder?.tourInformation?.tourAirlineName}</p>
                </div>
              </div>
            </div>

            {/* Chi tiết giá */}
            <div className=" border-b border-[#D6D9DC] border-dashed py-6">
              <h2 className="text-[#BB2C26] font-medium text-xl mb-[20px]">
                Chi tiết giá
              </h2>
              {/* Giá bán */}
              <div className="mb-5">
                <div className="flex justify-between mb-[17px]">
                  <p className="text-base text-[#141415] font-semibold">
                    Giá bán
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-base text-[#53575A] font-medium">
                      Người lớn
                    </p>
                    <p>{totalData?.adultPrice.toLocaleString()} đ x {adultCount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base text-[#53575A] font-medium">
                      Trẻ em
                    </p>
                    <p>{totalData?.childrenPrice.toLocaleString()} đ x {childrenCount}</p>
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
                    <p>{totalData?.totalBeforeDiscount.toLocaleString()} đ</p>
                  </div>
                </div>
              </div>

              {/* Chiết khấu hoa hồng */}
              <div className="mb-5">
                <p className="font-semibold mb-4">Chiết khấu hoa hồng (-)</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Người lớn</p>
                    <p>{totalData?.commissionAdult.toLocaleString()} đ x {adultCount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Trẻ em</p>
                    <p>{totalData?.commissionChildren.toLocaleString()} đ x {childrenCount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Em bé</p>
                    <p>0 đ x {babyCount}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">{totalData?.commissionTotal.toLocaleString()} đ</p>
                  </div>
                </div>
              </div>

              {/* Dịch vụ giảm trừ */}
              <div className="mb-5">
                <p className="font-semibold mb-4">Dịch vụ giảm trừ (-)</p>
                <div className="space-y-2">
                  {servicesDiscount.items
                    .filter(item => (item.count || 0) > 0)
                    .map((item) => (
                      <div key={item.id || item.content} className="flex justify-between">
                        <p>{item.content}</p>
                        <p>{Number(item.price).toLocaleString()} đ x {item.count}</p>
                      </div>
                    ))}
                  <div className="flex justify-between">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">{totalData?.discountTotal.toLocaleString()} đ</p>
                  </div>
                </div>
              </div>

              {/* Dịch vụ cộng thêm */}
              <div>
                <p className="font-semibold mb-4">Dịch vụ cộng thêm (+)</p>
                <div className="space-y-2">
                  {servicesPlus.items
                    .filter(item => (item.count || 0) > 0)
                    .map((item) => (
                      <div key={item.id || item.content} className="flex justify-between">
                        <p>{item.content}</p>
                        <p>{Number(item.price).toLocaleString()} đ x {item.count}</p>
                      </div>
                    ))}
                  <div className="flex justify-between">
                    <p>Tổng</p>
                    <p className="text-[#141415] font-medium">{totalData?.additionalTotal.toLocaleString()} đ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="pt-6 flex justify-between font-bold text-[#BB2C26] text-xl">
              <p>Tổng tiền</p>
              <p>{preOrder?.totalPrice?.toLocaleString()} đ</p>
            </div>
          </div>
          <div className="bg-white rounded-[20px] shadow-all mt-8 p-5 ">
            <span className="text-[#BB2C26] text-xl font-medium">
              Tiến độ thanh toán
            </span>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <p className="text-[#252627] text-base">Đặt cọc</p>
                  <p className=" text-[#8F9499] text-sm">
                    {dayjs(preOrder?.createdTime).format("HH:mm - D/M/YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-[#252627] font-medium">
                    {preOrder?.depositPrice?.toLocaleString()} ₫
                  </p>
                </div>
              </div>
              {preOrder?.fileDeposit && (
                <div
                  className="text-blue-600 text-sm mt-2"
                >
                  {preOrder.fileDeposit.fileName}
                </div>
              )}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-x-3">
                  <p className="text-[#252627] text-base">Tất toán</p>
                  <p className=" text-[#8F9499] text-sm">
                    {preOrder?.settlementDate ? dayjs(preOrder.settlementDate).format("HH:mm - D/M/YYYY") : "Chưa có"}
                  </p>
                </div>
                <div>
                  <p className="text-[#252627] font-medium">
                    {preOrder?.settlementPrice?.toLocaleString()} ₫
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        visible={isModalConfirm}
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmApply}
        title="Đã gửi hóa đơn lên hệ thống!"
        description="Chúng tôi sẽ xác nhận thanh toán của bạn
        trong vòng 30 phút. Vui lòng theo dõi
        trạng thái đơn hàng. Xin cảm ơn!"
      />
      <Chatbot preOrder={preOrder} />
    </div>
  );
};

export default PaymentStepFour;
