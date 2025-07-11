import React, { useState, useEffect } from "react";
import "./index.scss";
import listTourImage from "/assets/images/listTourImage.svg";
import patternListTour from "/assets/images/patternListTour.svg";
import searchIcon from "/assets/images/search.svg";
import filterIcon from "/assets/images/filter.svg";
import placePdf from "/assets/images/placePdf.svg";
import TourCard from "@/client/components/TourCard";
import CustomPagination from "@/client/components/Pagination";
import { useSearchParams } from 'react-router-dom';
import { getTourActive } from "@/client/apis/tour";

const ListTourActive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "10", 10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataLst, setDataLst] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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

    // Xử lý ngày bắt đầu (startDateFrom, startDateTo)
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
      console.log('fetchedData', fetchedData);

      setDataLst(fetchedData.data);
      setTotalRecords(fetchedData.totalElements);
    } catch (error) {
      console.error("Error fetching tour list:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#FFF5F5] pb-[218px]">
      <div className="z-10">
        <div className="w-full flex justify-center">
          <div className="relative">
            <img src={listTourImage} alt="" />
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
                  className="rounded-2xl border border-[#D6D9DC] h-12 p-3 w-[315px] pl-11"
                />
              </div>
              <div className="rounded-2xl border border-[#D6D9DC] h-12 p-3  bg-white relative w-[150px] text-end cursor-pointer">
                <img
                  src={filterIcon}
                  alt=""
                  className="absolute  top-1/2 -translate-y-1/2 left-3 size-6"
                />
                Sắp xếp theo
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 z-20">
          <TourCard />
        </div>
        <div className="mt-8 z-20">
          <TourCard />
        </div>
        <div className="mt-8 z-20">
          <TourCard />
        </div>
        <div className="mt-8 z-20">
          <TourCard />
        </div>
      </div>
      <div className="flex items-center justify-center  mt-10">
        <CustomPagination
          currentPage={1}
          totalPages={100}
          pageSize={10}
          onChange={(page) => console.log("page:", page)}
        />
      </div>
      <div className="w-full absolute bottom-[-20px]">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default ListTourActive;