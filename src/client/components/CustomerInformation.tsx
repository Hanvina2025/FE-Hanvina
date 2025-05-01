import React from "react";
import TitlePattern from "./TitlePattern";
import countUser from "/assets/images/countUser.svg";
import minus from "/assets/images/minus.svg";
import plus from "/assets/images/plus.svg";
import "../pages/Reserve/index.scss";
const CustomerInformation = () => {
  const [count, setCount] = React.useState(1);
  return (
    <div>
      <TitlePattern title="Thông tin khách hàng">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-x-3 ">
            <img src={countUser} alt="" />
            <h1 className="text-[#141415] font-semibold">
              Số chỗ khả dụng: 25
            </h1>
          </div>
          <div className="flex flex-col space-y-6 !mt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#141415] font-semibold text-base">
                  Người lớn
                </span>
                <span className="text-[#8F9499] text-base font-medium pl-1">{`(>12 tuổi)`}</span>
                <p className="mt-1 text-[#8F9499] text-sm">ADT - Adult</p>
              </div>
              <div className="rounded-[40px] border border-[#D6D9DC] w-[110px] h-[48px] flex items-center justify-between px-2">
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count - 1)}
                >
                  <img src={minus} alt="" />
                </button>
                <div>{count}</div>
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count + 1)}
                >
                  <img src={plus} alt="" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#141415] font-semibold text-base">
                  Trẻ em
                </span>
                <span className="text-[#8F9499] text-base font-medium pl-1">{`(2-12 tuổi)`}</span>
                <p className="mt-1 text-[#8F9499] text-sm">CHD - Children</p>
              </div>
              <div className="rounded-[40px] border border-[#D6D9DC] w-[110px] h-[48px] flex items-center justify-between px-2">
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count - 1)}
                >
                  <img src={minus} alt="" />
                </button>
                <div>{count}</div>
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count + 1)}
                >
                  <img src={plus} alt="" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#141415] font-semibold text-base">
                  Em bé
                </span>
                <span className="text-[#8F9499] text-base font-medium pl-1">{`(Dưới 2 tuổi)`}</span>
                <p className="mt-1 text-[#8F9499] text-sm">INF - Infant</p>
              </div>
              <div className="rounded-[40px] border border-[#D6D9DC] w-[110px] h-[48px] flex items-center justify-between px-2">
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count - 1)}
                >
                  <img src={minus} alt="" />
                </button>
                <div>{count}</div>
                <button
                  className="rounded-full custom_bg_btn w-[30px] h-[30px] flex items-center justify-center"
                  onClick={() => setCount(count + 1)}
                >
                  <img src={plus} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TitlePattern>
    </div>
  );
};

export default CustomerInformation;
