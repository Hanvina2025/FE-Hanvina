// import React, { useState } from "react";
// import { DatePicker, ConfigProvider, Button } from "antd";
// import type { RangePickerProps } from "antd/es/date-picker";
// import dayjs from "dayjs";
// import "dayjs/locale/vi";
// import viVN from "antd/locale/vi_VN";
// import "antd/dist/reset.css"; // reset style của antd nếu bạn muốn dùng Tailwind nhiều

// const { RangePicker } = DatePicker;

// const DateRangePicker = () => {
//   const [open, setOpen] = useState(false);
//   const [dates, setDates] = useState<RangePickerProps["value"]>(null);

//   const handleConfirm = () => {
//     console.log("Confirmed dates:", dates);
//     setOpen(false);
//   };

//   const handleCancel = () => {
//     setDates(null);
//     setOpen(false);
//   };

//   return (
//     <ConfigProvider locale={viVN}>
//       <div className="flex flex-col items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
//         <RangePicker
//           open={open}
//           onOpenChange={setOpen}
//           value={dates}
//           onChange={(val) => setDates(val)}
//           format="DD/MM/YYYY"
//           className="w-full"
//           style={{ borderRadius: "0.75rem", padding: "0.5rem" }}
//           renderExtraFooter={() => (
//             <div className="flex justify-between mt-2">
//               <Button
//                 onClick={handleCancel}
//                 className="border-red-500 text-red-500 hover:bg-red-50"
//               >
//                 Hủy lọc
//               </Button>
//               <Button
//                 type="primary"
//                 className="bg-red-600 hover:bg-red-700"
//                 onClick={handleConfirm}
//               >
//                 Xác nhận
//               </Button>
//             </div>
//           )}
//         />
//         <Button onClick={() => setOpen(true)} className="bg-gray-100">
//           Chọn khoảng thời gian
//         </Button>
//       </div>
//     </ConfigProvider>
//   );
// };

// export default DateRangePicker;



// File: components/DateRangePicker.tsx
// File: components/DateRangePicker.tsx
import { useState } from "react";

const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const padCalendar = (month: number, year: number) => {
  const currentMonthDays = getDaysInMonth(month, year);
  const firstDay = currentMonthDays[0].getDay() || 7;

  const padStart = [];
  const prevDate = new Date(year, month, 0); // last day of the previous month
  for (let i = firstDay - 2; i >= 0; i--) {
    const day = new Date(prevDate);
    day.setDate(prevDate.getDate() - i);
    padStart.push({ date: day, isDisabled: true });
  }

  const currentDays = currentMonthDays.map((date) => ({
    date,
    isDisabled: false,
  }));

  const totalDays = padStart.length + currentDays.length;
  const padEnd = [];
  const nextMonthDate = new Date(year, month + 1, 1);
  for (let i = 1; totalDays + i <= 42; i++) {
    const day = new Date(nextMonthDate);
    day.setDate(i);
    padEnd.push({ date: day, isDisabled: true });
  }

  return [...padStart, ...currentDays, ...padEnd];
};

const DateRangePicker = ({onConfirm}) => {
  const [leftMonth, setLeftMonth] = useState(6); 
  const [leftYear, setLeftYear] = useState(2025);
  const [rightMonth, setRightMonth] = useState(7); 
  const [rightYear, setRightYear] = useState(2025);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null); 
    } else if (date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      setEndDate(date);
    }
  };

  const isSelected = (date: Date) => {
    return (
      (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString())
    );
  };

  const renderCalendar = (month: number, year: number) => {
    const days = padCalendar(month, year);
    return (
      <div className="w-[220px]">
        <div className="flex justify-center gap-x-2 mb-2">
          <select
            className="border rounded-lg border-[#D6D9DC] text-sm w-[90px]  h-[28px]"
            value={month}
            onChange={(e) => {
              if (month === leftMonth) {
                setLeftMonth(+e.target.value);
              } else {
                setRightMonth(+e.target.value);
              }
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{`Tháng ${i + 1}`}</option>
            ))}
          </select>
          <select
            className="border rounded-lg border-[#D6D9DC] text-sm w-[68px] h-[28px] "
            value={year}
            onChange={(e) => {
              if (month === leftMonth) {
                setLeftYear(+e.target.value);
              } else {
                setRightYear(+e.target.value);
              }
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={2020 + i}>{2020 + i}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 font-medium mb-1">
          {DAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {days.map((day, i) => (
            <div
              key={i}
              className={`h-8 flex items-center justify-center rounded-full cursor-pointer
                ${day.isDisabled ? "text-gray-400" : isSelected(day.date) ? "bg-red-500 text-white" : "hover:bg-red-100"}`}
              onClick={() => !day.isDisabled && handleSelect(day.date)}
            >
              {day.date ? day.date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
      <div className="flex gap-4 border-b pb-4">
        {renderCalendar(leftMonth, leftYear)}
        {renderCalendar(rightMonth, rightYear)}
      </div>
      <div className="flex  mt-4 px-2 gap-x-3 ">
        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            onConfirm('')
          }}
          className="border border-red-500 text-red-500 rounded-full h-[36px] px-6 py-1 w-full"
        >
          Hủy lọc
        </button>
        <button
          onClick={() => {
            if (startDate && endDate) {
              const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
              const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
           
              onConfirm(`${formattedStartDate} - ${formattedEndDate}`);
            }
          }}
          className="bg-[#D3362F] text-white rounded-full px-6 py-1 h-[36px] hover:bg-red-700 w-full"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
