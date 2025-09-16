import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Modal, Upload, message, Popover, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import {
  getDetailPreOrder,
  getDetailOrderCustomer,
  getDetailOrderDiscountPlus,
  postOrderPaymentDeposit,
  putPreOrder,
  putOrderCustomer,
  putOrderDiscountPlus,
  getPaymentActive
} from "@/client/apis/tour";
import type { UploadProps } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import dayjs from "dayjs";
import ReservationList from "@/client/components/ReservationList"
import { formatDateNotTime } from "@/utils/common";
import IcLoading from "/assets/images/step-loading.svg";

import Chatbot from "../ChatMessage";

import arrRight from "/assets/images/arrow-right.svg";
import StepPayment from "@/client/components/StepPayment";
import CustomerInformation from "@/client/components/CustomerInformation";
import TitlePattern from "@/client/components/TitlePattern";
import TourPriceTable from "@/client/components/TourPriceTable";
import DeductionServiceCard from "@/client/components/DeductionServiceCard";
import phoneYellow from "/assets/images/phoneYellow.svg";
import userYellow from "/assets/images/userYellow.svg";
import buttonMedium from "/assets/images/buttonMedium.svg";
import buttonMediumNotBG from "/assets/images/buttonMediumNotBG.svg";
import buttonMediumDisable from "/assets/images/buttonMediumDisable.svg";
import paymentDealine from "/assets/images/paymentDealine.svg";
import DepartSmall from "/assets/images/DepartSmall.svg";
import upload from "/assets/images/upload.svg";
import qrCode from "/assets/images/qrcode.svg";
import ConfirmTour from "@/client/components/ConfirmTour";

const { Dragger } = Upload;

const PaymentStepTwo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tourData: any = {}
  const [customInput, setCustomInput] = useState({
    content: "",
    sellPrice: "",
    quantity: 1
  });
  const [preOrder, setPreOrder] = useState<any>({});
  const [paymentActiveList, setPaymentActiveList] = useState<any>([]);
  const [preOrderCustomer, setPreOrderCustomer] = useState<any>({});
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [servicesDiscount, setServicesDiscount] = useState({ type: 1, items: [] });
  const [servicesPlus, setServicesPlus] = useState({ type: 2, items: [] });
  const [totalData, setTotalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [fileBill, setFileBill] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpenTB, setIsModalOpenTB] = useState(false);
  const [isModalHuy, setIsModalHuy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentActive()
    if (id) {
      fetchDetailPreOrder(id)
      fetchDetailPreOrderCustomer(id)
      fetchDetailServicesDiscount(id)
      fetchDetailServicesPlus(id)
    }
  }, [id])

  // Tự động cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const fetchPaymentActive = async () => {
    try {
      const fetchedData = await getPaymentActive();
      setPaymentActiveList(fetchedData)
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchDetailPreOrder = async (id: number | string) => {
    setLoading(true);
    try {
      const fetchedData = await getDetailPreOrder(id);
      console.log('fetchDetailPreOrder', fetchedData);

      setPreOrder(fetchedData)
    } catch (error) {
      console.error("Error fetching home:", error);
    } finally {
      setLoading(false);
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

  const handleCustomerChange = useCallback(({ adultCount, childrenCount, babyCount }) => {
    console.log('handleCustomerChange', adultCount, childrenCount, babyCount);

    setAdultCount(adultCount);
    setChildrenCount(childrenCount);
    setBabyCount(babyCount);
  }, []);

  const handleAddCustomInput = () => {
    if (!customInput.content || !customInput.sellPrice) {
      alert("Vui lòng nhập đầy đủ nội dung, giá và số lượng");
      return;
    }

    const newService = {
      id: `temp-${Date.now()}`, // unique
      content: customInput.content,
      sellPrice: Number(customInput.sellPrice),
      count: Number(customInput.quantity),
      tourId: tourData?.id || 0,
      type: 2,
      isCustom: true,
    };

    setServicesPlus(prev => ({
      ...prev,
      items: [...prev.items, newService],
    }));
    setCustomInput({ content: "", sellPrice: "", quantity: 1 }); // reset form
  };


  const handleCustomInputChange = (field, value) => {
    setCustomInput(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmCancel = () => {
    setIsModalConfirm(false);
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

    const preOrderPayload = {
      id: preOrder?.id,
      tourId: preOrder?.tourId,
      customerName: preOrder?.customerName,
      customerPhone: preOrder?.customerPhone,
      status: 119,
      totalPrice: totalData?.finalTotal,
      totalSeatsCheck: adultCount + childrenCount,
    };


    const orderCustomerPayload = {
      id: preOrderCustomer?.id,
      preOrderId: preOrderCustomer?.preOrderId,
      adultPrice: preOrderCustomer?.adultPrice,
      childrenPrice: preOrderCustomer?.childrenPrice,
      commissionPriceAdult: preOrderCustomer?.commissionPriceAdult,
      commissionPriceChildren: preOrderCustomer?.commissionPriceChildren,
      adultCount,
      childrenCount,
      babyCount,
      totalSeats: adultCount + childrenCount,
    };

    const orderDiscountPayload = {
      preOrderId: preOrder?.id,
      type: 1,
      items: Array.isArray(servicesDiscount?.items) && servicesDiscount.items.length > 0
        ? servicesDiscount.items.map(item => ({
          id: item.id,
          content: item.content,
          price: item.price,
          count: item.count,
          totalPrice: Number(item.price) * (item.count || 1),
          tourDiscountPlusId: item.id?.toString().startsWith('temp-') ? null : item.tourDiscountPlusId,
        }))
        : [],
    };

    const orderPlusPayload = {
      preOrderId: preOrder?.id,
      type: 2,
      items: Array.isArray(servicesPlus.items) && servicesPlus.items.length > 0
        ? servicesPlus.items.map(item => {
          const payloadItem: any = {
            content: item.content,
            price: item.price,
            count: item.count,
            totalPrice: Number(item.price) * (item.count || 1),
            tourDiscountPlusId: item.id?.toString().startsWith('temp-') ? null : item.tourDiscountPlusId,
          };

          if (item.id && !item.isCustom) {
            payloadItem.id = item.id;
          }

          return payloadItem;
        })
        : [],
    };

    try {
      await postOrderPaymentDeposit(data);

      await putPreOrder(preOrderPayload)
      await putOrderCustomer(orderCustomerPayload)
      await putOrderDiscountPlus(orderDiscountPayload)
      await putOrderDiscountPlus(orderPlusPayload)

      message.success("Gửi hóa đơn thành công!");
      setIsModalConfirm(true)
    } catch (error) {
      const errorMsg =
        error?.response?.data?.errorMsg ||
        error?.errorMsg ||
        "Lỗi không xác định";

      message.error(errorMsg);
      console.error("Lỗi:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmApply = async () => {
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
  if (loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: "#BB2C26" }} spin />} size="large" />
      </div>
    );
  }

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
        <h1 className="text-[#141415] text-[30px] font-semibold">
          {preOrder?.tourInformation?.name || ""}
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
              {
                preOrder?.status == 118 &&
                <>

                  <p className="text-[#141415] text-xl font-medium">
                    Hạn thanh toán cọc:
                  </p>
                  <p className="text-[#DC1F18] text-xl font-medium">
                    {[118, 119].includes(preOrder?.status) && preOrder?.depositDateTime
                      && (() => {
                        const end = dayjs(preOrder.depositDateTime);
                        const diff = end.diff(currentTime);
                        if (diff <= 0) return "Hết hạn";

                        const duration = dayjs.duration(diff);
                        const hours = String(duration.hours()).padStart(2, "0");
                        const minutes = String(duration.minutes()).padStart(2, "0");
                        const seconds = String(duration.seconds()).padStart(2, "0");

                        return `${hours}:${minutes}`;
                      })()}
                    {[120, 121, 122, 123].includes(preOrder?.status) && preOrder?.settlementDate
                      &&
                      preOrder?.settlementDate ? formatDateNotTime(preOrder?.settlementDate) : ''
                    }
                  </p>
                </>
              }
              {
                preOrder?.status == 119 &&
                <div className="text-[#006AF5] text-[20px] font-[500]">CHỜ DUYỆT THANH TOÁN CỌC</div>
              }
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="bg-white rounded-[20px] shadow-md  mt-6">
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
                      {preOrder?.tourInformation?.startDate ? formatDateNotTime(preOrder?.tourInformation?.startDate) : ''}
                    </span>
                    <span className="text-[#BB2C26] text-base font-semibold">
                      {preOrder?.tourInformation?.backDate ? formatDateNotTime(preOrder?.tourInformation?.backDate) : ''}
                    </span>
                    {preOrder?.status == 118 &&
                      <div className="flex items-center gap-x-2">
                        <span className="text-[#BB2C26] text-base font-semibold">
                          {preOrder?.orderNo || "01"}
                        </span>
                        <div
                          className="text-sm text-[#006AF5] cursor-pointer"
                          onClick={() => setIsModalOpenTB(true)}
                        >
                          Chi tiết
                        </div>
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
                      {preOrderCustomer?.adultCount ?? 0} chỗ
                    </span>
                    <span className="text-[#BB2C26] text-base font-semibold">
                      {preOrderCustomer?.childrenCount ?? 0} chỗ
                    </span>
                    <div className="flex items-center gap-x-2">
                      <span className="text-[#BB2C26] text-base font-semibold">
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
                      value={preOrder?.customerName}
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
                      value={preOrder?.customerPhone}
                      className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    />
                  </div>
                </div>
              </div>
            </TitlePattern>
          </div>
          <div className="mt-6">
            <CustomerInformation
              onChange={handleCustomerChange}
              tourData={preOrderCustomer}
              statusPreOrder={preOrder?.status}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6">
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ giảm trừ"
                subtitle="(Giảm trừ khi đã có các dịch vụ dưới đây)"
                type={1}
                statusPreOrder={preOrder?.status}
                services={servicesDiscount.items}
                onChange={(data) => setServicesDiscount(data)}
              />
            </div>
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ cộng thêm"
                subtitle="(Phát sinh thêm ngoài chương trình Tour)"
                type={2}
                statusPreOrder={preOrder?.status}
                services={servicesPlus.items}
                onChange={(data) => setServicesPlus(data)}
                onRemove={(id) => {
                  setServicesPlus(prev => ({
                    ...prev,
                    items: prev.items.filter(item => item.id !== id),
                  }));
                }}
              >
                {preOrder?.status == 118 && <div>
                  <h1 className="text-[#141415] text-base font-medium">
                    Phát sinh thêm
                  </h1>
                  <div className="mt-2 rounded-lg p-2 bg-[#F4F5F6]">
                    <div className="flex justify-between items-center gap-x-[10px]">
                      <input
                        type="text"
                        placeholder="Nhập nội dung"
                        value={customInput.content}
                        onChange={(e) =>
                          handleCustomInputChange("content", e.target.value)
                        }
                        className="border border-[#D6D9DC] w-full p-3 rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between gap-x-2 mt-2">
                      <input
                        type="number"
                        placeholder="Nhập số tiền"
                        value={customInput.sellPrice}
                        onChange={(e) =>
                          handleCustomInputChange("sellPrice", e.target.value)
                        }
                        className="border border-[#D6D9DC] w-full p-3 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Nhập số lượng"
                        value={customInput.quantity}
                        onChange={(e) =>
                          handleCustomInputChange("quantity", e.target.value)
                        }
                        className="border border-[#D6D9DC] w-full p-3 rounded-lg"
                      />
                    </div>
                    <div className="w-full flex justify-end mt-4" onClick={handleAddCustomInput}>
                      <button className="px-4 py-3 rounded-[44px] bg-[#D3362F] w-[92px] text-white font-medium">
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>}
              </DeductionServiceCard>
            </div>
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
              <p>{totalData?.finalTotal.toLocaleString()} đ</p>
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
                    {totalData?.finalTotal ? (totalData.finalTotal / 2).toLocaleString() : "0"} ₫
                  </p>
                </div>
              </div>
              {preOrder?.fileDeposit && (
                <a
                  className="text-blue-600 text-sm mt-2"
                  href={preOrder?.fileDeposit ? `${import.meta.env.VITE_API_BASE_URL}/file/download-file?fileKey=${preOrder.fileDeposit.fileKey}` : "#"}
                  target="_blank"
                >
                  <img src={IcLoading} alt="Loading" className="inline mr-2 w-4 h-4" />
                  {preOrder.fileDeposit.fileName}
                </a>
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
                    {totalData?.finalTotal ? (totalData?.finalTotal / 2).toLocaleString() : "0"} ₫
                  </p>
                </div>
              </div>
            </div>
          </div>
          {preOrder?.status == 118 && <div className="mt-8 pt-0">
            <button
              className="relative h-[48px] cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={buttonMedium} className="w-full h-[48px] mx-auto" />
              <div
                className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white"

              >
                Đặt chỗ
              </div>
            </button>
            <button className="mt-4 relative h-[48px] cursor-pointer"
              onClick={() => setIsModalHuy(true)}>
              <img src={buttonMediumNotBG} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-[#BB2C26]"
              >
                Huỷ đặt chỗ
              </div>
            </button>
          </div>}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={734}
        title={<span style={{ fontSize: 20, fontWeight: 500 }}>Thanh toán cọc</span>}
        style={{ borderRadius: 20 }}
        footer={
          <div className="flex justify-center gap-3 py-4 border-t border-[#D6D9DC] mt-5 pt-5">
            <button
              className="relative h-[48px] cursor-pointer"
              onClick={() => handleSave()}
              disabled={!fileBill}
            >
              <img src={fileBill ? buttonMedium : buttonMediumDisable} className="w-full h-[48px] mx-auto" />
              <div
                className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white"

              >
                Tôi đã thanh toán
              </div>
            </button>
          </div>
        }
      >
        <div className="">
          <div className="flex gap-x-2 items-center border-t border-[#D6D9DC] pt-4 px-4">
            <p className="text-[#141415] text-[20px] font-semibold">
              Cần thanh toán:
            </p>
            <span className="text-[#BB2C26] text-[24px] font-[700]">
              {totalData
                ? `${Math.round(Number(totalData.finalTotal) * 0.5).toLocaleString()} đ`
                : "0 đ"}
            </span>
          </div>
          {paymentActiveList.map((paymentActive) => (
            <div className="flex gap-6 border-t border-[#D6D9DC] border-dashed pt-5 mt-4 px-4">
              <img
                src={paymentActive?.file && paymentActive?.file?.fileKey ? `${import.meta.env.VITE_API_BASE_URL}/file/download-file?fileKey=${paymentActive.file.fileKey}` : qrCode}
                alt="QR"
                className="object-contain w-[180px]"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="text-sm leading-6">
                  <div className="text-base">
                    <span className="font-medium text-[#000D21]">
                      Tên chủ tài khoản:
                    </span>{" "}
                    {paymentActive?.userName}
                  </div>
                  <div className="text-base">
                    <span className="font-medium text-[#000D21]">
                      Số tài khoản:
                    </span>{" "}
                    {paymentActive?.stk}
                  </div>
                  <div className="text-base">
                    <span className="font-medium text-[#000D21]">
                      Ngân hàng:
                    </span>{" "}
                    {paymentActive?.bank}
                  </div>
                  <div className="text-base">
                    <span className="font-medium text-[#000D21]">
                      Nội dung chuyển khoản khuyến nghị:
                    </span>
                    <br />
                    <span>
                      “Họ và tên - Thanh toán cọc Tour [Tên tour]”
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                <div className="ml-2 text-[#006AF5] max-w-[222px] truncate">{fileBill?.name}</div>
                <CloseOutlined onClick={handleRemoveImage} />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <ConfirmTour
        visible={isModalConfirm}
        onCancel={handleConfirmCancel}
        onConfirm={handleConfirmApply}
        title="Đã gửi hóa đơn lên hệ thống!"
        description="Chúng tôi sẽ xác nhận thanh toán của bạn
        trong vòng 30 phút. Vui lòng theo dõi
        trạng thái đơn hàng. Xin cảm ơn!"
        imgCheck={true}
      />
      <ConfirmTour
        visible={isModalHuy}
        onCancel={() => setIsModalHuy(false)}
        onConfirm={() => {
          setIsModalHuy(false);
        }}
        title="Bạn muốn huỷ đặt chỗ cho tour này không?"
        description="Sau khi huỷ, chỗ của bạn có thể được mở lại cho khách khác."
        buttonTxtClose="Quay lại"
        buttonTxtConfirm="Xác nhận"
        imgCheck={false}
      />
      <Modal
        open={isModalOpenTB}
        onCancel={() => setIsModalOpenTB(false)}
        width={1000}
        title={<span style={{ fontSize: 20, fontWeight: 500 }}>Danh sách giữ chỗ</span>}
        style={{ borderRadius: 20 }}
        footer={null}
      >
        <ReservationList id={preOrder?.tourId} />
      </Modal>
      <Chatbot preOrder={preOrder} />
    </div>
  );
};

export default PaymentStepTwo;

