import "./index.scss";
import React, { useState, useEffect } from 'react';
import placePdf from "/assets/images/placePdf.svg";
import { ArrowRight } from "iconsax-react";
import CustomPagination from "@/client/components/Pagination";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNewsList } from "@/client/apis/news";

const News = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "12", 10);
  const [loading, setLoading] = useState(false);
  const [dataLst, setDataLst] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchList();
  }, [pageIndex, pageSize]);

  const fetchList = async () => {
    setLoading(true);
    const query: any = new URLSearchParams({
      page: (pageIndex - 1).toString(),
      size: pageSize.toString(),
      title: "",
      type: "",
      active: "true"
    });
    try {
      const fetchedData = await getNewsList(query);
      setDataLst(fetchedData.data);
      setTotalRecords(fetchedData.totalElements);
    } catch (error) {
      console.error("Error fetching home:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto pb-[218px] relative">
        <div className="news-title text-[48px] font-[700] text-[#252627] text-center">Khám phá những tin tức nổi bật</div>
        <div className="news-title text-[20px] text-[#53575A] text-center mt-[16px] md:max-w-[55vw] mx-auto">
          Hanvina mong muốn cung cấp đến quý  khách hàng, đối tác những thông tin hữu ích và cập nhật liên tục.
          Cùng Hanvina săn đón những tin tức mới nhất về các tour du lịch nhé!
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[40px]">
          {dataLst.map((item) => (
            <div key={item.id} className="news-item overflow-hidden">
              {item?.file?.fileKey ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/file/download-file?fileKey=${item.file.fileKey}`}
                  alt={item?.title}
                  className="w-full h-[300px] object-cover rounded-[16px]"
                />
              ) : (
                <div className="w-full h-[300px] bg-gray-200 rounded-[16px]"></div>
              )}
              <div className="pt-[24px]">
                <div className="text-[16px] text-[#53575A] mb-[16px]">{item.date}</div>
                <div className="text-[20px] font-[700] text-[#252627] truncate-lines">{item.title}</div>
                <div className="text-[14px] text-[#8F9499] mt-[8px] line-clamp-3">{item.content}</div>
              </div>
              <div onClick={() => navigate(`/news/${item.id}`)} className="text-[16px] text-[#BB2C26] flex items-center gap-[4px] mt-[16px] font-[500] cursor-pointer">Xem thêm <ArrowRight /></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <CustomPagination
            currentPage={pageIndex}
            totalPages={totalRecords}
            pageSize={pageSize}
            onChange={(page) => {
              setSearchParams({ page: page.toString(), size: pageSize.toString() });
            }}
          />
        </div>
      </div>

      <div className="w-full absolute bottom-[-20px] z-[-1]">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </>
  );
};

export default News;
