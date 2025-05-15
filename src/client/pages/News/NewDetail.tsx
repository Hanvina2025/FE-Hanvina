import "./index.scss";
import { ArrowRight2, ArrowRight } from "iconsax-react";
import { useNavigate } from "react-router-dom";
  
const data = {
    id: 1,
    date: 'Thứ sáu, 20/09/2024',
    image: 'https://hanvinatravel.vn//uploads/images/nh%C6%B0ng-diem-tam-linh-tai-tay-tang.jpg',
    title: 'HANVINA TRAVEL CHÍNH THỨC CÓ MẶT TẠI TP.HCM – SẴN SÀNG PHỤC VỤ QUÝ KHÁCH!',
    description: 'Sau nhiều mong đợi, Hanvina Travel chính thức khai trương văn phòng giao dịch tại TP.HCM! Từ ngày 17/02/2025, chúng tôi sẵn sàng mang đến cho Quý khách hàng những trải nghiệm dịch vụ tốt nhất ngay tại trung tâm thành phố!'
  }

const categoryLst = [
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
  }
]

const NewDetail = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="container mx-auto mb-[60px]">
      <div className="flex gap-[14px] items-center">
        <div className="text-[20px] text-[#292D32] underline">Tin tức</div>
        <ArrowRight2 size="24" color="#292D32" />
        <div className="text-[20px] text-[#BB2C26]">{ data?.title }</div>
      </div>
      <div className="text-[30px] mt-[50px] font-[700] text-[#1A1313]">{ data?.title }</div>
      <div className="text-[16px] mt-[12px] mb-[24px] text-[#53575A]">{ data?.date }</div>
      <div className="grid lg:grid-cols-[1fr_380px] gap-[60px]">
        <div className="new-detail-content">
          <div>
            <img src={data?.image} alt={data?.title} className="w-full mb-[24px]" />
          </div>
          <div 
            className="text-[16px]"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
        <div className="new-detail-list-category">
          <div className="text-[30px] font-[700] text-[#1A1313]">Đề xuất</div>
          <div>
            {categoryLst.map((item) => (
              <div key={item.id} className="news-item mt-[24px]">
                <img src={item.image} alt={item.title} className="w-full h-[300px] object-cover rounded-[16px]" />
                <div className="pt-[24px]">
                  <div className="text-[16px] text-[#53575A] mb-[12px]">{item.date}</div>
                  <div className="text-[20px] font-[700] text-[#252627] truncate-lines">{item.title}</div>
                </div>
                <div onClick={() => navigate(`/news/${item.id}`)} className="text-[16px] text-[#BB2C26] flex items-center gap-[4px] mt-[16px] font-[500] cursor-pointer">Xem thêm <ArrowRight/></div>
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
