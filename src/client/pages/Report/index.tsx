import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import totalProfit from "/assets/images/totalProfit.svg";
import tourBooked from "/assets/images/tourBooked.svg";
import totalRevenue from "/assets/images/totalRevenue.svg";
import grayCalender from "/assets/images/grayCalender.svg";
import reportCardPattern from "/assets/images/reportCardPattern.svg";
import "./index.scss";
import DateRangePicker from "@/client/components/DateRangePicker";
const dataTotalProfit = [
  { date: "15/07", value: 50000000 },
  { date: "16/07", value: 150000000 },
  { date: "17/07", value: 100000000 },
  { date: "18/07", value: 400000000 },
  { date: "19/07", value: 300000000 },
  { date: "20/07", value: 350000000 },
  { date: "21/07", value: 250000000 },
];
const dataTourBooked = [
  { date: "15/07", value: 20 },
  { date: "16/07", value: 60 },
  { date: "17/07", value: 40 },
  { date: "18/07", value: 120 },
  { date: "19/07", value: 100 },
  { date: "20/07", value: 110 },
  { date: "21/07", value: 80 },
];
const dataTotalRevenue = [
  { date: "15/07", value: 10000000 },
  { date: "16/07", value: 40000000 },
  { date: "17/07", value: 30000000 },
  { date: "18/07", value: 90000000 },
  { date: "19/07", value: 70000000 },
  { date: "20/07", value: 80000000 },
  { date: "21/07", value: 60000000 },
];

const chartDataArr = [dataTotalProfit, dataTourBooked, dataTotalRevenue];

const formatCurrency = (value) => value.toLocaleString("vi-VN");

const CustomTooltip = ({ active, payload, label, selectedIndex }) => {
  if (active && payload && payload.length) {
    let unit = "";
    if (selectedIndex === 0 || selectedIndex === 2) unit = " đ";
    if (selectedIndex === 1) unit = " tour";
    return (
      <div className="bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
        <div className="text-sm text-[#141415] font-semibold mb-1">{label}</div>
        <div className="text-base text-[#BB2C26] font-medium">
          Giá trị: {formatCurrency(payload[0].value)}
          {unit}
        </div>
      </div>
    );
  }
  return null;
};

const summaryData = [
  {
    icon: totalProfit,
    title: "Tổng doanh thu",
    value: 420000000,
    unit: "Đồng",
  },
  {
    icon: tourBooked,
    title: "Tour đã đặt",
    value: 240,
    unit: "Tour",
  },
  {
    icon: totalRevenue,
    title: "Tổng hoa hồng",
    value: 90000000,
    unit: "Đồng",
  },
];

const formatYAxis = (value, selectedIndex) => {
  if (selectedIndex === 0 || selectedIndex === 2) {
    if (value === 0) return "0";
    return `${value.toLocaleString("vi-VN")} đ`;
  }
  return value;
};

export default function ReportChart() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="container mx-auto bg-white p-5 rounded-[20px] boxShadowTourActive mb-[100px]">
      <h2 className="text-[20px] font-medium mb-5 text-[#141415] py-2">Báo cáo</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryData.map((item, idx) => {
          let baseClass =
            "max-w-[400px] h-[217px] rounded-2xl px-6 py-2 cursor-pointer border  border-[#D6D9DC] relative ";

          // Nếu active và là thẻ 1 hoặc 3
          if (selectedIndex === idx) {
            baseClass += "customBg ";
          }
          return (
            <div
              key={item.title}
              className={baseClass}
              onClick={() => setSelectedIndex(idx)}
            >
              {selectedIndex === idx && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img src={reportCardPattern} alt="" />
                </div>
              )}

              <img src={item.icon} alt={item.title} className="relative z-10" />
              <div className="mt-2 z-20">
                <h2
                  className={`text-xl font-medium ${selectedIndex === idx ? "text-[#A35505]" : ""
                    }`}
                >
                  {item.title}
                </h2>
                <p
                  className={`text-xl font-medium my-2 ${selectedIndex === idx ? "text-[#723711]" : "text-[#BB2C26]"
                    }`}
                >
                  {item.value.toLocaleString("vi-VN")}
                </p>
                <span
                  className={`font-sm   ${selectedIndex === idx ? "text-[#A35505]" : "text-[#8F9499]"
                    }`}
                >
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[20px] font-medium">Tổng doanh thu</h3>
        <div className="relative">
          <div
            className="flex cursor-pointer items-center justify-between gap-2 text-sm text-[#141415] border border-[#E9EBED] rounded-[100px] min-w-[276px] px-4 py-3"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <div>
              <span>Thời gian: </span>
              <span className={selectedDate ? 'text-[#141415]' : 'text-[#B9BDC1]'}>{selectedDate ? selectedDate : "Tất cả"}</span>
            </div>
            {/* <CalendarIcon size={16} /> */}
            <img src={grayCalender} alt="calendar" />
          </div>
          {showDatePicker && (
            <div className="absolute top-full right-0 bg-white shadow-md z-50">
              <DateRangePicker
                onConfirm={(date) => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
                setIsShowDropdown={setShowDatePicker}
              />
            </div>
          )}
        </div>
      </div>
      {/* Chart Section */}
      <div className="bg-white p-4 rounded-2xl  border border-[#E9EBED]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartDataArr[selectedIndex]}
            margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{
                fontSize: 14,
                fill: "#8F9499",
                fontWeight: 400,
                dy: 15,
              }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 0 }}
              interval="preserveStartEnd"
              tickFormatter={(value) => `Ngày ${value}`}
            />
            <YAxis
              tickFormatter={(value) => formatYAxis(value, selectedIndex)}
              tick={{ fontSize: 14, fill: "#8F9499" }}
              width={110}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={
                <CustomTooltip
                  active={true}
                  payload={[]}
                  label=""
                  selectedIndex={selectedIndex}
                />
              }
              cursor={{ stroke: "#f59e0b", strokeWidth: 1, opacity: 0.1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#f59e0b",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
