 
import { Link } from "react-router-dom";
import { useAuth } from "@/admin/components/AuthProvider";

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

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
};


const Footer = () => {
  const { settingValue } = useAuth();
  const footerColor = settingValue?.footerColor || "#0056D2";
  const darkerColor = darkenColor(footerColor, 15);
  return (
    <footer className="footer">
      <div className="footer-top py-[24px]" style={{background: footerColor || '#0056D2'}}>
        <div className="container m-auto">
          <div className="grid lg:grid-cols-2 text-white md:gap-[50px]">
            <div className="md:grid grid-cols-[116px_1fr] gap-[24px]">
              <img
                src={settingValue?.footerFile?.fileKey ? 
                  `${ import.meta.env.VITE_API_BASE_URL }/file/download-file-all-type?fileKey=${settingValue?.footerFile?.fileKey}` 
                  : "/assets/images/logo.svg"
                }
                alt="Huy hiệu đoàn logo"
                className="md:w-full w-[50%] mb-6 md:mb-0"
              />
              <div className="">
                <div
                  className={`text-[16px] text-white font-[700] mb-[12px]`}
                  dangerouslySetInnerHTML={{
                    __html: settingValue?.footerName
                  }}
                />
                {/* <div className="text-[16px] text-white font-[700] mb-[12px]">
                  ĐOÀN THANH NIÊN <br />
                  CỘNG SẢN HỒ CHÍ MINH
                </div> */}
                <div
                  className={`text-[14px] text-white`}
                  dangerouslySetInnerHTML={{
                    __html: settingValue?.footerInformation
                  }}
                />
              </div>
            </div>
            <div className="mt-[15px] lg:mt-[0]">
              <div className="grid md:grid-cols-2 gap-[20px] mb-[12px]">
              <div className="mt-[15px] lg:mt-[0]">
                <Link to="/"><div className="text-[14px] font-[600]">Trang chủ</div></Link>
                <Link to="/cuoc-thi"><div className="text-[14px] font-[600] mt-[15px]">Cuộc thi</div></Link>
                <Link to="/gioi-thieu-to-chuc-doan"><div className="text-[14px] font-[600] mt-[15px]">Tổ chức đoàn</div></Link>
              </div>
              <div>
                <div className="text-[14px] font-[600] mb-[12px] mt-4 md:mt-0">Mạng xã hội</div>
                <div className="flex md:block items-center gap-[15px] mt-2">
                  <Link to={settingValue?.facebook || ""} target="_blank">
                    <div className="flex items-center">
                      <div className="ms-[10px] text-[14px]">Facebook</div>
                    </div>
                  </Link>
                  <Link to={settingValue?.zalo || ""} target="_blank">
                    <div className="flex md:mt-[14px]">
                      <div className="ms-[10px] text-[14px]">Zalo</div>
                    </div>
                  </Link>
                  <Link to={settingValue?.youtube || ""} target="_blank">
                    <div className="flex md:mt-[14px]">
                      <div className="ms-[10px] text-[14px]">Youtube</div>
                    </div>
                  </Link>
                </div>
              </div>
              
            </div>
              </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center text-[14px] text-white p-[10px]"
        style={{background: darkerColor || '#003177'}}>
        Bản quyền thuộc về Đoàn thanh niên Cộng sản Hồ Chí Minh
      </div>
    </footer>
  );
};

export default Footer;
