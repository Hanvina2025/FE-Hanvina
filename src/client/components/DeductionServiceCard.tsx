import { useState, useEffect } from "react";
import minus from "/assets/images/minus.svg";
import plus from "/assets/images/plus.svg";
import DiscountService from "/assets/images/DiscountService.svg";
import { ArrowUp2, ArrowDown2 } from "iconsax-react"
import { CloseOutlined } from "@ant-design/icons"

export default function DeductionServiceCard(props: {
  title: string;
  subtitle: string;
  type: number; // 1 = giảm trừ, 2 = cộng thêm
  statusPreOrder?: number;
  services?: Array<{
    id?: number;
    content: string;
    price: number;
    count?: number;
    isCustom?: boolean;
  }>;
  onChange: (data: {
    type: number;
    items: {
      content: string;
      price: number;
      count: number;
      totalPrice: number;
    }[];
  }) => void;
  onRemove?: (id?: number) => void;
  children?: React.ReactNode;
}) {
  const { title, subtitle, services = [], onChange, type, statusPreOrder, children, onRemove } = props;

  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [isOpen, setIsOpen] = useState(true);
  const isDisabled = statusPreOrder != 118;

  // Init count map từ services
  useEffect(() => {
    const initialCounts = Object.fromEntries(
      services.map((s, idx) => [s.id ?? `temp-${idx}`, s.count ?? 0])
    );
    setCounts(initialCounts);
  }, [services]);

  const updateCount = (key: string | number, delta: number) => {
    const newCount = Math.max((counts[key] ?? 0) + delta, 0);
    const updated = {
      ...counts,
      [key]: newCount,
    };
    setCounts(updated);

    // Tạo danh sách gửi lên cha
    const items = services.map((s, idx) => {
      const countKey = s.id ?? `temp-${idx}`;
      const count = updated[countKey] ?? 0;
      return {
        id: s.id,
        content: s.content,
        price: s.price,
        count,
        isCustom: s.isCustom,
        totalPrice: (s.price * count),
      };
    });

    onChange({
      type,
      items,
    });
  };

  return (
    <div className="rounded-[20px] shadow-all overflow-hidden bg-white w-full">
      {/* Header */}
      <div
        className="relative h-[74px] cursor-pointer border-b border-dashed"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={DiscountService} alt="" className="h-[74px]" />
        <div className="absolute top-0 w-full h-full px-5 py-4">
          <div className="w-full flex items-center h-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-[#141415] text-xl font-medium">{title}</h1>
              {isOpen && (
                <div className="text-xs text-gray-500">{subtitle}</div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
          {isOpen ? <ArrowUp2 /> : <ArrowDown2 />}
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="space-y-6 p-[20px]">
          {services.map((service, idx) => {
            const key = service.id ?? `temp-${idx}`;
            return (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="text-[#141415] font-semibold text-base">
                    {service.content}
                    {service.isCustom && onRemove && (
                      <button
                        className="ml-2 text-black"
                        onClick={() => onRemove(service.id)}
                      >
                        <CloseOutlined />
                      </button>
                    )}
                  </div>
                  <div className="text-base text-[#53575A]">
                    Giá: {service.price.toLocaleString()}đ
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCount(key, -1)}
                    disabled={isDisabled}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${isDisabled
                      ? "bg-[#FFF5C2]"
                      : counts[key] < 1
                        ? "bg-gray-200"
                        : "custom_bg_btn"
                      }`}
                  >
                    <img src={minus} alt="minus" />
                  </button>
                  <div className="w-5 text-center font-medium">
                    {Number(counts[key]) || 0}
                  </div>
                  <button
                    onClick={() => updateCount(key, 1)}
                    disabled={isDisabled}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${isDisabled
                      ? "bg-[#FFF5C2]"
                      : "custom_bg_btn"
                      }`}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                </div>
              </div>
            );
          })}
          {/* Children (ví dụ phần nhập tay dịch vụ cộng thêm) */}
          {children && <div>{children}</div>}
        </div>
      )}
    </div>
  );
}
