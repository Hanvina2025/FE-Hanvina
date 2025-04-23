import React, { useState } from "react";
import "../pages/Home/index.scss";

const DateRangePicker = ({ onConfirm }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonths, setShowMonths] = useState(false);

  // Tạo danh sách các tháng
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // Tạo lịch cho tháng hiện tại
  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    let days = [];
    let day = 1;

    // Thêm các ngày từ tháng trước
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="date-picker-day other-month">
          {prevMonthLastDay - startingDay + i + 1}
        </div>
      );
    }

    // Thêm các ngày trong tháng
    for (day; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={`current-${day}`}
          className={`date-picker-day ${isSelected ? "selected" : ""}`}
          onClick={() =>
            setSelectedDate(new Date(currentYear, currentMonth, day))
          }
        >
          {day}
        </div>
      );
    }

    // Thêm các ngày từ tháng sau
    let nextMonthDay = 1;
    while (days.length % 7 !== 0) {
      days.push(
        <div
          key={`next-${nextMonthDay}`}
          className="date-picker-day other-month"
        >
          {nextMonthDay++}
        </div>
      );
    }

    return days;
  };

  // Chuyển tháng
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h3 onClick={() => setShowMonths(!showMonths)}>
          {months[currentMonth]} {currentYear}
        </h3>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {showMonths && (
        <div className="date-picker-months-grid">
          {months.map((month, index) => (
            <div
              key={month}
              className={`date-picker-month ${
                currentMonth === index ? "selected-month" : ""
              }`}
              onClick={() => {
                setCurrentMonth(index);
                setShowMonths(false);
              }}
            >
              {month}
            </div>
          ))}
        </div>
      )}

      <div className="date-picker-weekdays">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div key={day} className="date-picker-weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="date-picker-days-grid">{renderCalendar()}</div>

      <div className="date-picker-actions">
        <button className="cancel-btn" onClick={() => onConfirm(null)}>
          Hủy
        </button>
        <button
          className="confirm-btn"
          onClick={() => onConfirm(selectedDate)}
          disabled={!selectedDate}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
