import "./index.scss";
import placePdf from "/assets/images/placePdf.svg";
import BgContactFormLeft from "/assets/images/bg-contact-form-left.png";
import { CallCalling, Sms, Location } from "iconsax-react";
import ButtonShort from "/assets/images/button-short.svg";
import IcSend1 from "/assets/images/letter_send 1.png";
import IcSend2 from "/assets/images/letter_send 2.png";

const Contact = () => {

  return (
    <>
      <div className="container mx-auto pb-[218px] relative">
        <div className="news-title text-[48px] font-[700] text-[#252627] text-center">Liên hệ với chúng tôi</div>
        <div className="news-title text-[20px] text-[#53575A] text-center mt-[16px] md:max-w-[55vw] mx-auto">
          Điền form để chúng tôi giúp bạn góp ý tùy chỉnh cho những chuyến đi đến tay khách hàng của bạn được trở nên phù hợp nhất
        </div>


        <div className="contact-form mt-[40px] p-[10px]">
          <div className="grid lg:grid-cols-[395px_1fr] gap-[40px]">
            <div className="contact-form-left p-[25px] text-[#fff] relative">
              <div className="text-[24px] font-[700]">Thông tin liên lạc</div>
              <div className="contact-form-left-content">
                <div className="grid grid-cols-[24px_1fr] gap-[12px] mt-[24px]">
                  <CallCalling size="24" variant="Bold" />
                  <div className="text-[16px]">
                    Tổng đài: 0243.62.72.777 (Giờ hành chính)<br />
                    Tổng đài CSKH: 0889.12.9999
                  </div>
                </div>
                <div className="grid grid-cols-[24px_1fr] gap-[12px] mt-[24px]">
                  <Sms size="24" variant="Bold" />
                  <div className="text-[16px]">info@hanvinatravel.vn</div>
                </div>
                <div className="grid grid-cols-[24px_1fr] gap-[12px] mt-[24px]">
                  <Location size="24" variant="Bold" />
                  <div className="text-[16px]">
                    Hà Nội: 204 Lê Trọng Tấn, phường Khương Mai, quận Thanh Xuân, Hà Nội<br />
                    Hồ Chí Minh: 20 Thân Nhân Trung, Phường 13, Quận Tân Bình, TP.HCM
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full hidden lg:block">
                <img src={BgContactFormLeft} alt="" className="w-full rounded-bl-[15px] rounded-br-[15px]" />
              </div>
            </div>
            <div className="contact-form-right md:pr-[30px] relative">
              <div className="text-[24px] text-[#BB2C26] font-[600] pt-[10px]">Đóng góp cho chúng tôi !</div>
              <div className="contact-form-right-content">
                <div className="mt-[40px]">
                  <label className="text-[16px] text-[#36383A] font-[500]">Họ và tên</label>
                  <input type="text" className="w-full custom-input" />
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-[40px]">
                  <div className="mt-[32px]">
                    <label className="text-[16px] text-[#36383A] font-[500]">Số điện thoại</label>
                    <input type="text" className="w-full custom-input" />
                  </div>
                  <div className="mt-[32px]">
                    <label className="text-[16px] text-[#36383A] font-[500]">Email</label>
                    <input type="text" className="w-full custom-input" />
                  </div>
                </div>
                <div className="mt-[32px]">
                  <label className="text-[16px] text-[#36383A] font-[500]">Góp ý</label>
                  <input type="text" className="w-full custom-input" />
                </div>
                <div className="flex justify-end mt-[40px] mb-[15px]">
                  <div
                    className="relative h-[48px] cursor-pointer w-[192px]"
                  >
                    <img src={ButtonShort} className="w-full h-[48px]" />
                    <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white">
                      Giữ chỗ
                    </div>
                  </div>
                </div>
              </div>
              <img src={IcSend1} className="absolute left-[-50px] bottom-[-10px]" />
              <img src={IcSend2} className="absolute top-[-10px] right-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[-20px] z-[-1]">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </>
  );
};

export default Contact;
