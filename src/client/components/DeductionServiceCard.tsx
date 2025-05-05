import { useState } from "react";
import minus from "/assets/images/minus.svg";
import plus from "/assets/images/plus.svg";
import "../pages/Reserve/index.scss";
import DiscountService from "/assets/images/DiscountService.svg";
import down from "/assets/images/arrow-down.svg";
import arrowUp from "/assets/images/arrowUp.svg";

const services = [
  { id: 1, name: "Khách đã có visa", amount: 500000 },
  { id: 2, name: "Khách đã có vé máy bay", amount: 500000 },
  { id: 3, name: "Khách hủy", amount: 500000 },
];

export default function DeductionServiceCard(props: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  const { title, subtitle, children } = props;
  const [counts, setCounts] = useState({ 1: 1, 2: 0, 3: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] + delta, 0),
    }));
  };

  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white w-full ">
      {/* Header */}

      <div
        className="relative h-[74px] cursor-pointer border-b border-dashed"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={DiscountService} alt="" className="h-[74px] " />
        <div className="absolute top-0 w-full h-full px-5 py-4 ">
          <div className="w-full flex items-center h-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-[#141415] text-xl font-medium">{title}</h1>
              {isOpen && (
                <div className=" border-gray-300 text-xs text-gray-500">
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
          {isOpen ? (
            <div>
              <img src={arrowUp} alt="" />
            </div>
          ) : (
            <div>
              <img src={down} alt="" />
            </div>
          )}
        </div>
      </div>

      {/* Subtitle (chỉ hiện khi mở) */}

      {/* Nội dung chính */}
      {isOpen && (
        <div className="space-y-6 p-[20px]">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between "
            >
              <div>
                <div className="text-[#141415] font-semibold text-base">
                  {service.name}
                </div>
                <div className="text-base text-[#53575A]">
                  Giá giảm: {service.amount.toLocaleString()}đ
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCount(service.id, -1)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    counts[service.id] < 1 ? "bg-gray-200" : "custom_bg_btn"
                  }`}
                >
                  <img src={minus} alt="" />
                </button>
                <div className="w-5 text-center font-medium">
                  {counts[service.id]}
                </div>
                <button
                  onClick={() => updateCount(service.id, 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white custom_bg_btn"
                >
                  <img src={plus} alt="" />
                </button>
              </div>
            </div>
          ))}
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}
