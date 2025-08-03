import "./index.scss";
import React, { useState, useEffect } from 'react';
import { ArrowRight2, ArrowRight } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsList, detailNews } from "@/client/apis/news";
import { formatDateNotTime } from "@/utils/common";

const NewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newsLst, setNewsLst] = useState([])
  const [data, setData] = useState<any>({})
  useEffect(() => {
    fetchList();
  }, []);
  useEffect(() => {
    if (id) {
      fetchDetail(id)
    }
  }, [id]);

  const fetchDetail = async (id: number | string) => {
    setLoading(true)
    try {
      const fetchedData = await detailNews(id);
      setData(fetchedData)
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false)
    }
  };

  const fetchList = async () => {
    const query: any = new URLSearchParams({
      page: "0",
      size: "3",
      title: "",
      type: "",
      active: "true"
    });
    try {
      const fetchedData = await getNewsList(query);
      setNewsLst(fetchedData.data);
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };
  return (
    <>
      <div className="container mx-auto mb-[60px]">
        <div className="flex gap-[14px] items-center">
          <div className="text-[20px] text-[#292D32] underline cursor-pointer" onClick={() => navigate('/news')}>Tin tức</div>
          <ArrowRight2 size="24" color="#292D32" />
          <div className="text-[20px] text-[#BB2C26]">{data?.title}</div>
        </div>
        <div className="text-[30px] mt-[50px] font-[700] text-[#1A1313]">{data?.title}</div>
        <div className="text-[16px] mt-[12px] mb-[24px] text-[#53575A]">{data?.datePush ? formatDateNotTime(data?.datePush) : ''}</div>
        <div className="grid lg:grid-cols-[1fr_380px] gap-[60px]">
          <div className="new-detail-content">
            <div>
              {data?.file?.fileKey && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/file/download-file?fileKey=${data.file.fileKey}`}
                  alt={data?.title}
                  className="w-full rounded-[16px]"
                />
              )}
            </div>
            <div
              className="text-[16px] mt-6"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
          <div className="new-detail-list-category">
            <div className="text-[30px] font-[700] text-[#1A1313]">Đề xuất</div>
            <div>
              {newsLst.map((item) => (
                <div key={item.id} className="news-item mt-[24px]">
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
                    <div className="text-[16px] text-[#53575A] mb-[12px]">{item.date}</div>
                    <div className="text-[20px] font-[700] text-[#252627] truncate-lines">{item.title}</div>
                  </div>
                  <div onClick={() => navigate(`/news/${item.id}`)} className="text-[16px] text-[#BB2C26] flex items-center gap-[4px] mt-[16px] font-[500] cursor-pointer">Xem thêm <ArrowRight /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDetail;
