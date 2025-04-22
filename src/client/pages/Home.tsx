import React, { useState, useEffect } from "react";
import "./Home.scss";
// import imageButton from "../../../public/assets/images/Union.svg";
import backgroundWave from "../../../public/assets/images/backgroundWave.svg";
import location from "../../../public/assets/images/location.svg";
import destination from "../../../public/assets/images/destination.svg";
import dateTime from "../../../public/assets/images/dateTime.svg";
import circle1 from "../../../public/assets/images/circle1.svg";
import circle2 from "../../../public/assets/images/circle2.svg";
import circle3 from "../../../public/assets/images/circle3.svg";
import userTravel from "../../../public/assets/images/userTravel.svg";
import town from "../../../public/assets/images/town-place.svg";
import dot from "../../../public/assets/images/dot.svg";
import light1 from "../../../public/assets/images/light1.svg";
import light2 from "../../../public/assets/images/light2.svg";
import locationRed from "../../../public/assets/images/locationRed.svg";
import plane from "../../../public/assets/images/plane.svg";
import placePdf from "../../../public/assets/images/placePdf.svg";

const Home = () => {
  return (
    <div className="">
      <div className="grid grid-cols-7 gap-[66px] max-w-7xl mx-auto">
        <div className="col-span-4">
          <div className="max-w-[560px]">
            <h1 className="text-[48px] font-bold leading-[56px] text-[#333]">
              Chuyên tour trọn gói ghép khách lẻ cho đại lý, CTV
            </h1>
          </div>
          <div className="mt-4 max-w-[533px]">
            <span className="text-base text-[#333]">
              HanVina Travel - Nơi mà chuyến du lịch của bạn trở nên đáng nhớ và
              tuyệt vời. Với cam kết về uy tín, chất lượng dịch vụ và đội ngũ
              chuyên viên tư vấn giàu kinh nghiệm, chúng tôi tự hào là đối tác
              tin cậy của bạn trên hành trình khám phá thế giới.
            </span>
          </div>

          <div className="bg-white shadow-[0px_10px_24px_rgba(20,20,21,0.09)] rounded-[20px] p-6 max-w-7xl mx-auto mt-10">
            <div className="flex items-center justify-between gap-6">
              {/* Điểm đi */}
              <div className="flex items-center gap-4 py-2 rounded-full  ">
                <img src={location} alt="" />
                <div>
                  <div className="font-semibold text-[#333]">Điểm đi</div>
                  <div className="text-[#767A7F] text-sm whitespace-nowrap">
                    Chọn điểm khởi hành
                  </div>
                </div>
              </div>

              {/* Điểm đến */}
              <div className="flex items-center gap-4 py-2 rounded-full  ">
                <img src={destination} alt="" />
                <div>
                  <div className="font-semibold text-[#333]">Điểm đến</div>
                  <div className="text-[#767A7F] text-sm whitespace-nowrap">
                    Chọn điểm đến
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2 rounded-full  ">
                <img src={dateTime} alt="" />
                <div>
                  <div className="font-semibold text-[#333]">Thời gian</div>
                  <div className="text-[#767A7F] text-sm whitespace-nowrap">
                    Trong khoảng thời gian
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 relative">
              <button className="border border-[#F68E1E] !bg-[#BB2C26] w-full text-center h-12 rounded-3xl relative  bg-transparent text-white text-base font-medium">
                Tìm kiếm
              </button>

              <img
                src={backgroundWave}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover z-20 pointer-events-none"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
        </div>
        <div className=" col-span-3 z-50">
          <div className="relative   rounded-[230px]">
            <img src={circle1} alt="" />
            <img
              src={circle2}
              alt=""
              className="absolute top-[35px] left-[45px]"
            />
            <img
              src={circle3}
              alt=""
              className="absolute top-[80px] left-[81px]"
            />
            <img
              src={dot}
              alt=""
              className="absolute top-[270px] left-[20px]"
            />
            <img
              src={town}
              alt=""
              className="absolute top-[50px] left-[-25px]"
            />
            <img
              src={light1}
              alt=""
              className="absolute top-[40px] right-[8rem]"
            />
            <img
              src={light2}
              alt=""
              className="absolute top-[68px] right-[5.5rem]"
            />

            <img
              src={userTravel}
              alt=""
              className="absolute top-[95px] w-full left-[-40px]"
            />
            <div
              className=" px-4 py-2 gap-x-2 flex items-center  absolute top-[230px] right-0 w-[180px] h-10 bg-white rounded-3xl"
              style={{
                boxShadow:
                  "0px 2px 4px 0px rgba(40, 41, 61, 0.04), 0px 8px 16px 0px rgba(96, 97, 112, 0.16)",
              }}
            >
              <img src={plane} alt="" />
              <span className="text-[#36383A] text-base">Tour Trung Quốc</span>
            </div>

            <div
              className="w-[185px] rounded-2xl h-[170px] p-[6px] absolute bottom-[20px] bg-white left-[-48px]"
              style={{
                boxShadow:
                  "0px 2px 4px 0px rgba(40, 41, 61, 0.04), 0px 8px 16px 0px rgba(96, 97, 112, 0.16)",
              }}
            >
              <img
                src="https://media.istockphoto.com/id/482334184/vi/anh/%C4%91%C3%AAm-tr%C3%AAn-c%C3%A1c-t%C3%B2a-nh%C3%A0-khu-th%C6%B0%C6%A1ng-m%E1%BA%A1i-trung-t%C3%A2m-b%E1%BA%AFc-kinh-%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-c%E1%BA%A3nh-quan-th%C3%A0nh-ph%E1%BB%91-trung.jpg?s=612x612&w=0&k=20&c=tW9EyfWFR2P53veNXx9tkKnftnpSmlXF47Fy90uuC1w="
                alt=""
                className=" w-full rounded-xl max-h-[100px] object-cover"
              />
              <div className="mt-[14px] ml-1">
                <h1 className="font-bold text-sm text-[#333333]">
                  Bắc Kinh - Hàng Châu
                </h1>
                <div className="flex items-center gap-x-1">
                  <img src={locationRed} alt="" />
                  <span className="text-[#8F8F8F] text-[10px]">Trung quốc</span>
                </div>
              </div>
            </div>

            <div
              className="w-[155px] rounded-2xl h-[147px] p-[6px] absolute bottom-[110px] bg-white right-[10px]"
              style={{
                boxShadow:
                  "0px 2px 4px 0px rgba(40, 41, 61, 0.04), 0px 8px 16px 0px rgba(96, 97, 112, 0.16)",
              }}
            >
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos236719720xl-1724205148915.jpg"
                alt=""
                className=" w-full rounded-xl max-h-[84px] object-cover"
              />
              <div className="mt-[14px] ml-1">
                <h1 className="font-bold text-sm text-[#333333]">
                  Cáp Nhĩ Tân
                </h1>
                <div className="flex items-center gap-x-1">
                  <img src={locationRed} alt="" />
                  <span className="text-[#8F8F8F] text-[10px]">Trung quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[-webkit-fill-available] absolute bottom-0">
        <img src={placePdf} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Home;
