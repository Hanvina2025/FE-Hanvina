import logo from "/assets/images/logo2.svg";
import fb from "/assets/images/fb.svg";
import zalo from "/assets/images/zalo.svg";
import "./Footer.scss";
import { Link } from 'react-router-dom';
import { PATH } from "@/libs/constants/path";

const Footer = () => {
  return (
    <footer>
      <div className="footer text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Logo + Slogan */}
          <div className="flex items-start space-x-4 col-span-3">
            <div className="shrink-0">
              <img src={logo} alt="header" className="" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">HanVina Travel</h2>
              <p className="text-sm text-gray-100 mt-2 leading-relaxed">
                Nơi mà chuyến du lịch của bạn trở nên đáng nhớ và tuyệt vời. Với
                cam kết về uy tín, chất lượng dịch vụ và đội ngũ chuyên viên tư
                vấn giàu kinh nghiệm, chúng tôi tự hào là đối tác tin cậy của
                bạn trên hành trình khám phá thế giới.
              </p>
            </div>
          </div>

          {/* Danh mục */}
          <div className=" flex flex-col items-center  col-span-2">
            <ul className="space-y-2 text-sm">
              <h3 className="text-[#FFC909] font-bold mb-3 text-base">
                Danh mục
              </h3>

              <li>
                <Link to={PATH.LIST_TOUR} className="hover:underline">
                  Khám phá tour
                </Link>
              </li>
              <li>
                <Link to={PATH.REPORT} className="hover:underline">
                  Báo cáo
                </Link>
              </li>
              <li>
                <Link to={PATH.NEWS} className="hover:underline">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to={PATH.CONTACT} className="hover:underline">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="flex flex-col  col-span-2">
            <h3 className="text-[#FFC909] font-bold mb-3">Thông tin liên hệ</h3>
            <ul className="text-sm flex items-center gap-x-[20px] ">
              <li className="flex items-center space-x-2">
                <img src={fb} alt="Zalo" className="size-6" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src={zalo} alt="Zalo" className="size-6" />
                <span>Zalo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-10 customFooter-bg flex justify-center items-center">
        <span className="text-sm text-[#141415]">
          Bản quyền thuộc về Hanvina Travel
        </span>
      </div>
    </footer>
  );
};

export default Footer;
