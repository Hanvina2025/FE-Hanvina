import React, { useState, useEffect } from "react";
import searchIcon from "/assets/images/search.svg";
import filterIcon from "/assets/images/filter.svg";
import listActive from "/assets/images/listActive.svg";
import patternListTour from "/assets/images/patternListTour.svg";
import calendarBlack from "/assets/images/calendarBlack.svg";
import DateRangePicker from "@/client/components/DateRangePicker";
import TourCardListActive from "@/client/components/TourCardListActive";
import CustomPagination from "@/client/components/Pagination";
import { useSearchParams } from 'react-router-dom';
import { getTourActive } from "@/client/apis/tour";
import { getTourCategory } from "@/client/apis/category";
import loadingGif from "/assets/images/loading.gif"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ActivityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "10", 10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataLst, setDataLst] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchList();
  }, [
    pageIndex,
    pageSize,
    name,
    selectedDate
  ]);

  const fetchList = async () => {
    setLoading(true);

    const queryParams: Record<string, any> = {
      page: (pageIndex - 1).toString(),
      size: pageSize.toString(),
    };

    if (name) queryParams.name = name;

    if (selectedDate) {
      const [start, end] = selectedDate.split(" - ");
      const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      queryParams.startDateFrom = formatDate(start);
      queryParams.startDateTo = formatDate(end);
    }
    const query: any = new URLSearchParams(queryParams);

    try {
      const fetchedData = await getTourActive(query);
      setDataLst(fetchedData.data);
      setTotalRecords(fetchedData.totalElements);
    } catch (error) {
      console.error("Error fetching tour list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto pb-10">
      <div>
        <div className="w-full flex justify-center">
          <div className="relative">
            <img src={listActive} alt="" />
            <img src={patternListTour} alt="" className="absolute top-0" />
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex gap-x-3">
              <div className="relative">
                <img
                  src={searchIcon}
                  alt=""
                  className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                />
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Tìm kiếm"
                  className="rounded-2xl border border-[#D6D9DC] h-12 p-3 w-[278px] pl-11"
                />
              </div>
              <div className="relative cursor-pointer">
                <div
                  className="rounded-2xl bg-white p-3 "
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <img src={calendarBlack} alt="" />
                </div>
                {showDatePicker && (
                  <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-lg">
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
              <div className="rounded-2xl border border-[#D6D9DC] h-12 p-3  bg-white relative w-[128px] text-end cursor-pointer">
                <img
                  src={filterIcon}
                  alt=""
                  className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                />
                Trạng thái
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        loading ?
          <div className="flex items-center justify-center mt-8">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: "#BB2C26" }} spin />} size="large" />
          </div>
          :
          <>
            <div className="mt-8 space-y-5">
              {dataLst.map((tourActive) => (
                <TourCardListActive
                  key={tourActive?.id}
                  tourActiveData={tourActive}
                  isDeposited={tourActive?.isDeposited ?? false}
                />
              ))}
            </div>
            {dataLst.length > 0 && <div className="flex items-center justify-center mt-10">
              <CustomPagination
                currentPage={pageIndex}
                totalPages={totalRecords}
                pageSize={pageSize}
                onChange={(page) => {
                  setSearchParams({ page: page.toString(), size: pageSize.toString() });
                }}
              />
            </div>}
          </>
      }
    </div>
  );
};

export default ActivityList;
