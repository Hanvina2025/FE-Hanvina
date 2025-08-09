import React, { useState, useEffect } from "react";
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
import { getChart, getSummary } from "@/client/apis/report";

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
  const [summaryLst, setSummaryLst] = useState([]);
  const [chartLst, setChartLst] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalRevenue: 0,
    totalTours: 0,
    totalCommission: 0
  });
  const [chartData, setChartData] = useState({
    type: "revenue",
    typeName: "Tổng doanh thu",
    chartData: []
  });

  // Khởi tạo dữ liệu chart mặc định
  const defaultChartData = [
    { date: "20/07", value: 0 },
    { date: "21/07", value: 0 },
    { date: "22/07", value: 0 },
    { date: "23/07", value: 0 },
    { date: "24/07", value: 0 },
    { date: "25/07", value: 0 },
    { date: "26/07", value: 0 },
    { date: "27/07", value: 0 },
    { date: "28/07", value: 0 },
    { date: "29/07", value: 0 },
    { date: "30/07", value: 0 },
    { date: "31/07", value: 0 },
    { date: "01/08", value: 0 },
    { date: "02/08", value: 0 }
  ];

  useEffect(() => {
    fetchSummary();
    fetchChart();
  }, []);

  useEffect(() => {
    fetchChart();
  }, [selectedDate]);

  const fetchSummary = async () => {
    try {
      const fetchedData = await getSummary();
      setSummaryLst(fetchedData);

      // Map dữ liệu từ summaryLst vào summaryData
      if (fetchedData) {
        const mappedData = {
          totalRevenue: fetchedData?.totalRevenue || 0,
          totalTours: fetchedData?.totalTours || 0,
          totalCommission: fetchedData?.totalCommission || 0
        };
        setSummaryData(mappedData);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const fetchChart = async () => {
    console.log("fetchChart", selectedDate);
    const chartTypes = ['revenue', 'tours', 'commission'];
    const currentType = chartTypes[selectedIndex];

    // Tạo object params thay vì URLSearchParams
    const params: any = {
      type: currentType
    };

    // Chỉ thêm date parameters nếu có selectedDate
    if (selectedDate) {
      const [start, end] = selectedDate.split(" - ");
      const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      params.fromDate = formatDate(start);
      params.toDate = formatDate(end);
    }

    console.log("API params:", params);

    try {
      const fetchedData = await getChart(params);
      setChartLst(fetchedData);

      // Cập nhật chartData với dữ liệu từ API
      if (fetchedData) {
        setChartData({
          type: currentType,
          typeName: getTypeName(currentType),
          chartData: fetchedData.chartData || defaultChartData
        });
      }
    } catch (error) {
      console.error("Error fetching chart:", error);
      // Fallback về dữ liệu mặc định nếu API lỗi
      setChartData({
        type: currentType,
        typeName: getTypeName(currentType),
        chartData: defaultChartData
      });
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'revenue':
        return 'Tổng doanh thu';
      case 'tours':
        return 'Tour đã đặt';
      case 'commission':
        return 'Tổng hoa hồng';
      default:
        return 'Tổng doanh thu';
    }
  };

  // Cập nhật chart khi selectedIndex thay đổi
  useEffect(() => {
    fetchChart();
  }, [selectedIndex]);

  const summaryDataArr = [
    {
      icon: totalRevenue,
      title: "Tổng doanh thu",
      value: summaryData.totalRevenue,
      unit: "Đồng",
    },
    {
      icon: tourBooked,
      title: "Tour đã đặt",
      value: summaryData.totalTours,
      unit: "Tour",
    },
    {
      icon: totalProfit,
      title: "Tổng hoa hồng",
      value: summaryData.totalCommission,
      unit: "Đồng",
    },
  ];

  return (
    <div className="container mx-auto bg-white p-5 rounded-[20px] boxShadowTourActive mb-[100px]">
      <h2 className="text-[20px] font-medium mb-5 text-[#141415] py-2">Báo cáo</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryDataArr.map((item, idx) => {
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
        <h3 className="text-[20px] font-medium">{chartData.typeName}</h3>
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
            data={chartData.chartData}
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
