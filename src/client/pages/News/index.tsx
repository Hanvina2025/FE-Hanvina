import "./index.scss";
import placePdf from "/assets/images/placePdf.svg";
import { ArrowRight } from "iconsax-react";
import CustomPagination from "@/client/components/Pagination";

const News = () => {
  const data = [
    {
      id: 1,
      date: 'Thứ sáu, 20/09/2024',
      image: 'https://hanvinatravel.vn//uploads/images/nh%C6%B0ng-diem-tam-linh-tai-tay-tang.jpg',
      title: 'HANVINA TRAVEL CHÍNH THỨC CÓ MẶT TẠI TP.HCM – SẴN SÀNG PHỤC VỤ QUÝ KHÁCH!',
      description: 'Sau nhiều mong đợi, Hanvina Travel chính thức khai trương văn phòng giao dịch tại TP.HCM! Từ ngày 17/02/2025, chúng tôi sẵn sàng mang đến cho Quý khách hàng những trải nghiệm dịch vụ tốt nhất ngay tại trung tâm thành phố!'
    },
    {
      id: 2,
      date: 'Thứ sáu, 20/09/2024',
      image: 'https://hanvinatravel.vn//uploads/images/nguoi-tuyet-khong-lo-cap-nhi-tan_1.jpg',
      title: 'HANVINA TRAVEL CHÍNH THỨC CÓ MẶT TẠI TP.HCM – SẴN SÀNG PHỤC VỤ QUÝ KHÁCH!',
      description: 'Sau nhiều mong đợi, Hanvina Travel chính thức khai trương văn phòng giao dịch tại TP.HCM! Từ ngày 17/02/2025, chúng tôi sẵn sàng mang đến cho Quý khách hàng những trải nghiệm dịch vụ tốt nhất ngay tại trung tâm thành phố!'
    },
    {
      id: 3,
      date: 'Thứ sáu, 20/09/2024',
      image: 'https://hanvinatravel.vn//uploads/images/san-van-dong-to-chim-bac-kinh-7.jpg',
      title: 'HANVINA TRAVEL CHÍNH THỨC CÓ MẶT TẠI TP.HCM – SẴN SÀNG PHỤC VỤ QUÝ KHÁCH!',
      description: 'Sau nhiều mong đợi, Hanvina Travel chính thức khai trương văn phòng giao dịch tại TP.HCM! Từ ngày 17/02/2025, chúng tôi sẵn sàng mang đến cho Quý khách hàng những trải nghiệm dịch vụ tốt nhất ngay tại trung tâm thành phố!'
    },
    {
      id: 4,
      date: 'Thứ sáu, 20/09/2024',
      image: 'https://hanvinatravel.vn//uploads/images/Tour-Cap-nhi-tan-thang-12_1.jpg',
      title: 'HANVINA TRAVEL CHÍNH THỨC CÓ MẶT TẠI TP.HCM – SẴN SÀNG PHỤC VỤ QUÝ KHÁCH!',
      description: 'Sau nhiều mong đợi, Hanvina Travel chính thức khai trương văn phòng giao dịch tại TP.HCM! Từ ngày 17/02/2025, chúng tôi sẵn sàng mang đến cho Quý khách hàng những trải nghiệm dịch vụ tốt nhất ngay tại trung tâm thành phố!'
    },
  ]
  return (
    <>
    <div className="container mx-auto pb-[218px] relative">
      <div className="news-title text-[48px] font-[700] text-[#252627] text-center">Khám phá những tin tức nổi bật</div>
      <div className="news-title text-[20px] text-[#53575A] text-center mt-[16px] md:max-w-[55vw] mx-auto">
        Hanvina mong muốn cung cấp đến quý  khách hàng, đối tác những thông tin hữu ích và cập nhật liên tục.
        Cùng Hanvina săn đón những tin tức mới nhất về các tour du lịch nhé!
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[40px]">
        {data.map((item) => (
          <div key={item.id} className="news-item overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-[300px] object-cover rounded-[16px]" />
            <div className="pt-[24px]">
              <div className="text-[16px] text-[#53575A] mb-[16px]">{item.date}</div>
              <div className="text-[20px] font-[700] text-[#252627] truncate-lines">{item.title}</div>
              <div className="text-[14px] text-[#8F9499] mt-[8px]">{item.description}</div>
            </div>
            <div className="text-[16px] text-[#BB2C26] flex items-center gap-[4px] mt-[16px] font-[500] cursor-pointer">Xem thêm <ArrowRight/></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <CustomPagination
          currentPage={1}
          totalPages={100}
          pageSize={10}
          onChange={(page) => console.log("page:", page)}
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
