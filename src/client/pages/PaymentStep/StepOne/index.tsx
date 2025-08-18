import "./index.scss";
import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import arrRight from "/assets/images/arrow-right.svg";
import { CalendarEdit } from "iconsax-react"
import patternTitle from "/assets/images/patternTitle.svg";
import phoneYellow from "/assets/images/phoneYellow.svg";
import userYellow from "/assets/images/userYellow.svg";
import buttonMedium from "/assets/images/buttonMedium.svg";
import DropDownSelectDepartureDate from "@/client/components/DropDownSelectDepartureDate";

import { useNavigate, useLocation } from "react-router-dom";
import TitlePattern from "@/client/components/TitlePattern";
import TourPriceTable from "@/client/components/TourPriceTable";
import CustomerInformation from "@/client/components/CustomerInformation";
import DeductionServiceCard from "@/client/components/DeductionServiceCard";
import StepPayment from "@/client/components/StepPayment";
import {
  getTourStartDate,
  getTourPriceServices,
  postPreOrder, postOrderCustomer, postOrderDiscountPlus
} from "@/client/apis/tour";
import { PATH } from "@/libs/constants/path";
import ReservationList from "@/client/components/ReservationList"
import ConfirmTour from "@/client/components/ConfirmTour";
import { formatDateNotTime } from "@/utils/common";

const Reserve = () => {
  const location = useLocation();
  const { tourData } = location.state || {};
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();
  const [departure, setDeparture] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [servicesTour, setServicesTour] = useState(null);
  const [dataStartDate, setDataStartDate] = useState([]);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [servicesDiscount, setServicesDiscount] = useState({ type: 1, items: [] });
  const [servicesPlus, setServicesPlus] = useState({ type: 2, items: [] });
  const [customServicesPlus, setCustomServicesPlus] = useState([]);
  const [customInput, setCustomInput] = useState({
    content: "",
    price: "",
    quantity: 1
  });
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourVisible, setIsTourVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const calcTotal = () => {
    if (!departure) return null;

    const adultPrice = departure.adultPrice || 0;
    const childrenPrice = departure.childrenPrice || 0;
    const commissionAdult = departure.commissionAdultPrice || 0;
    const commissionChildren = departure.commissionChildrenPrice || 0;

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
  useEffect(() => {
    if (tourData?.key) {
      fetchStartDate(tourData?.key);
    }
  }, [tourData?.key]);

  useEffect(() => {
    if (tourData?.key) {
      fetchStartDate(tourData?.key);
    }
  }, [tourData?.key]);

  useEffect(() => {
    if (dataStartDate.length > 0 && !departure) {
      setDeparture(dataStartDate[0]);
    }
  }, [dataStartDate, departure]);

  useEffect(() => {
    if (departure) {
      fetchTourService(departure?.id)
    }
  }, [departure]);

  useEffect(() => {
    setTotalData(calcTotal());
  }, [
    departure,
    adultCount,
    childrenCount,
    babyCount,
    servicesDiscount,
    servicesPlus
  ]);

  const fetchStartDate = async (key: string) => {
    const query: any = new URLSearchParams({
      key: key || ""
    });
    try {
      const fetchedData = await getTourStartDate(query);
      setDataStartDate(fetchedData.data);
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const fetchTourService = async (id: number) => {
    setLoading(true);
    try {
      const fetchedData = await getTourPriceServices(id);
      setServicesTour(fetchedData)
      setServicesDiscount({
        type: 1,
        items: (fetchedData?.servicesDiscount || []).map(item => ({
          ...item,
          count: 0
        })),
      })
      setServicesPlus({
        type: 2,
        items: (fetchedData?.servicesPlus || []).map(item => ({
          ...item,
          isCustom: false,
          count: 0
        })),
      });
      setCustomServicesPlus(fetchedData?.servicesPlus)
    } catch (error) {
      console.error("Error fetching home:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    // Validate
    if (!customerName.trim()) {
      alert("Vui lòng nhập tên đại diện đoàn");
      return;
    }
    if (!customerPhone.trim()) {
      alert("Vui lòng nhập số điện thoại liên hệ");
      return;
    }

    // Chuẩn bị dữ liệu gửi lên từng API
    const preOrderPayload = {
      tourId: departure?.id,
      customerName,
      customerPhone,
      status: 118,
      totalPrice: totalData?.finalTotal,
      totalSeatsCheck: adultCount + childrenCount,
    };

    let preOrderId = null;

    const orderCustomerPayload = {
      // preOrderId sẽ gán sau khi có kết quả postPreOrder
      adultPrice: totalData?.adultPrice,
      commissionPriceAdult: totalData?.commissionAdult,
      adultCount,
      childrenPrice: totalData?.childrenPrice,
      commissionPriceChildren: totalData?.commissionChildren,
      childrenCount,
      babyCount,
      totalSeats: adultCount + childrenCount,
    };

    const orderDiscountPayload = {
      // preOrderId sẽ gán sau khi có kết quả postPreOrder
      type: 1,
      items: Array.isArray(servicesDiscount?.items) && servicesDiscount.items.length > 0
        ? servicesDiscount.items.map(item => ({
          content: item.content,
          price: item.price,
          count: item.count,
          totalPrice: Number(item.price) * (item.count || 1),
        }))
        : [],
    };

    const orderPlusPayload = {
      // preOrderId sẽ gán sau khi có kết quả postPreOrder
      type: 2,
      items: Array.isArray(servicesPlus.items) && servicesPlus.items.length > 0
        ? servicesPlus.items.map(item => ({
          content: item.content,
          price: item.price,
          count: item.count,
          totalPrice: Number(item.price) * (item.count || 1),
        }))
        : [],
    };

    try {
      // 1. Gọi postPreOrder
      const preOrderRes = await postPreOrder(preOrderPayload);
      preOrderId = preOrderRes?.id;
      if (!preOrderId) throw new Error("Không lấy được preOrderId");

      // 2. Gọi postOrderCustomer
      const orderCustomerData = { ...orderCustomerPayload, preOrderId };
      await postOrderCustomer(orderCustomerData);

      // 3. Gọi postOrderDiscount cho dịch vụ giảm trừ
      const orderDiscountData = { ...orderDiscountPayload, preOrderId };
      await postOrderDiscountPlus(orderDiscountData);

      // 4. Gọi postOrderPlus cho dịch vụ cộng thêm
      const orderPlusData = { ...orderPlusPayload, preOrderId };
      await postOrderDiscountPlus(orderPlusData);
      setIsTourVisible(true);

    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      console.error(error);
    }
  };

  const handleDateChange = (value) => {
    setDeparture(value);
    setShowDatePicker(false);
  };

  const handleCustomerChange = useCallback(({ adultCount, childrenCount, babyCount }) => {
    setAdultCount(adultCount);
    setChildrenCount(childrenCount);
    setBabyCount(babyCount);
  }, []);

  const handleAddCustomInput = () => {
    if (!customInput.content || !customInput.price) {
      alert("Vui lòng nhập đầy đủ nội dung, giá và số lượng");
      return;
    }

    const newService = {
      id: Date.now(), // unique
      content: customInput.content,
      price: Number(customInput.price),
      count: Number(customInput.quantity),
      tourId: tourData?.id || 0,
      type: 2,
      isCustom: true,
    };

    setServicesPlus(prev => ({
      ...prev,
      items: [...prev.items, newService],
    }));
    setCustomInput({ content: "", price: "", quantity: 1 }); // reset form
  };


  const handleCustomInputChange = (field, value) => {
    setCustomInput(prev => ({ ...prev, [field]: value }));
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
            <span className="text-[#53575A] text-xl underline cursor-pointer" onClick={() => navigate(PATH.LIST_TOUR)}>
              Danh sách tour
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="text-[#BB2C26] font-medium text-xl">
              {tourData?.name}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-6">
        <h1 className="text-[#141415] font-semibold text-3xl">
          {tourData?.name}
        </h1>
      </div>
      <div className="mt-8">
        <StepPayment />
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-12 gap-x-8 ">
        <div className="md:col-span-7">
          <div className="bg-white rounded-[20px] shadow-all">
            <div className="relative border-b border-[#D6D9DC] border-dashed">
              <img src={patternTitle} alt="" />
              <div className="absolute top-0 w-full h-full px-5 py-4">
                <div className="w-full flex items-center h-full justify-between">
                  <h1 className="text-[#141415] text-xl font-medium">
                    Khởi hành
                  </h1>
                  <div className="flex items-center gap-x-2 cursor-pointer">
                    <CalendarEdit color="#006AF5" size={18} />
                    <span className="text-[#006AF5] text-sm font-medium relative" onClick={() => { setShowDatePicker(!showDatePicker) }}>
                      Đổi ngày khởi hành
                      {showDatePicker && (
                        <div className="absolute top-full right-0 mt-2 z-100">
                          <DropDownSelectDepartureDate
                            locations={dataStartDate}
                            selected={departure}
                            setIsShowDropdown={setShowDatePicker}
                            onSelect={handleDateChange}
                          />
                        </div>
                      )}
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
                    {departure?.startDate ? formatDateNotTime(departure?.startDate) : ''}
                  </span>
                  <span className="text-[#BB2C26] text-base font-semibold">
                    {departure?.endDate ? formatDateNotTime(departure?.endDate) : ''}
                  </span>
                  <div className="flex items-center gap-x-2">
                    <span className="text-[#BB2C26] text-base font-semibold">
                      {departure?.orderNo || "01"}
                    </span>
                    <div
                      className="text-[#6961FF] underline text-base font-semibold cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Chi tiết
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <TourPriceTable departure={departure} />
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
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
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
                      type="number"
                      placeholder="Nhập số điện thoại"
                      name="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    />
                  </div>
                </div>
              </div>
            </TitlePattern>
          </div>
          <div className="mt-6">
            <CustomerInformation onChange={handleCustomerChange} tourData={tourData} statusPreOrder={118} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6">
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ giảm trừ"
                subtitle="(Giảm trừ khi đã có các dịch vụ dưới đây)"
                type={1}
                services={servicesDiscount.items}
                statusPreOrder={118}
                onChange={(data) => setServicesDiscount(data)}
              />
            </div>
            <div className="col-span-1">
              <DeductionServiceCard
                title="Dịch vụ cộng thêm"
                subtitle="(Phát sinh thêm ngoài chương trình Tour)"
                type={2}
                statusPreOrder={118}
                services={servicesPlus.items}
                onChange={(data) => setServicesPlus(data)}
                onRemove={(id) => {
                  setServicesPlus(prev => ({
                    ...prev,
                    items: prev.items.filter(item => item.id !== id),
                  }));
                }}
              >
                <div>
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
                        value={customInput.price}
                        onChange={(e) =>
                          handleCustomInputChange("price", e.target.value)
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
                </div>
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
                  <p className=" text-[#53575A] text-base mt-3">{tourData?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Điểm đi</p>
                  <p className="text-[#53575A]">{tourData?.tourFromName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Điểm đến</p>
                  <p className="text-[#53575A]">{tourData?.tourToName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Thời gian</p>
                  <p className="text-[#53575A]">{tourData?.tourTimeName}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base text-[#141415] font-medium">Ngày khởi hành</p>
                  <p className="text-[#53575A]">{departure?.startDate}</p>
                </div>
                <div className="flex justify-between pb-6">
                  <p className="text-base text-[#141415] font-medium">Hãng bay</p>
                  <p className="text-[#53575A]">{tourData?.tourAirlineName}</p>
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

          <div className="mt-8 pt-0">
            <button
              className=" relative h-[48px] cursor-pointer"
              onClick={handleConfirm}
            >
              <img src={buttonMedium} className="w-full h-[48px] mx-auto" />
              <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white">
                Xác nhận giữ chỗ
              </div>
            </button>
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
      <ConfirmTour
        visible={isTourVisible}
        onCancel={() => setIsTourVisible(false)}
        onConfirm={() => navigate(PATH.LIST_TOUR_ACTIVE)}
        title="Giữ chỗ thành công!"
        description="Bạn là người giữ chỗ đầu tiên! Hãy thanh toán luôn để không bỏ lỡ cơ hội."
        buttonTxtClose="Đóng"
        buttonTxtConfirm="Xem đơn"
      />
    </div>
  );
};

export default Reserve;
