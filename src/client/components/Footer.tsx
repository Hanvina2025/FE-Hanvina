import { Link } from "react-router-dom";
import { useAuth } from "@/admin/components/AuthProvider";
import logo from "../../../public/assets/images/logo2.svg";

const darkenColor = (hexColor: string, amount: number): string => {
  let color = hexColor.replace("#", "");

  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

const Footer = () => {
  const { settingValue } = useAuth();
  const footerColor = settingValue?.footerColor || "#0056D2";
  const darkerColor = darkenColor(footerColor, 15);
  return (
    <footer className="bg-gradient-to-br from-[#a61414] to-[#c72727] text-white py-10 px-6">
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
              vấn giàu kinh nghiệm, chúng tôi tự hào là đối tác tin cậy của bạn
              trên hành trình khám phá thế giới.
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
              <a href="#" className="hover:underline">
                Khám phá tour
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex flex-col  col-span-2">
          <h3 className="text-[#FFC909] font-bold mb-3">Thông tin liên hệ</h3>
          <ul className="text-sm flex items-center gap-x-[20px] ">
            <li className="flex items-center space-x-2">
              {/* <FaFacebookF className="text-white" /> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                alt="Zalo"
                className="w-4 h-4"
              />
              <span>Facebook</span>
            </li>
            <li className="flex items-center space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                alt="Zalo"
                className="w-4 h-4"
              />
              <span>Zalo</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
