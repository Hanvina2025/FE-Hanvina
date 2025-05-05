import React from "react";
import Phase1Active from "/assets/images/Phase1Active.svg";
import phase2 from "/assets/images/phase2.svg";
import phase3 from "/assets/images/phase3.svg";
import phase4 from "/assets/images/phase4.svg";
const StepPayment = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-8 flex gap-x-6">
      <div className="flex items-center ">
        <img src={Phase1Active} alt="" className="" />
        <div className="ml-3">
          <span className="text-sm text-[#252627]">Giai đoạn 1</span>
          <p className="text-[#BB2C26] text-sm">Giữ chỗ</p>
        </div>
        <div className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="6"
            viewBox="0 0 205 6"
            fill="none"
          >
            <path
              d="M2 3.14331L202.666 2.85659"
              stroke="#E9EBED"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center">
        <img src={phase2} alt="" />
        <div className="ml-3">
          <span className="text-sm text-[#252627]">Giai đoạn 2</span>
          <p className="text-[#BB2C26] text-sm">Giữ chỗ</p>
        </div>
        <div className="ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="6"
            viewBox="0 0 205 6"
            fill="none"
          >
            <path
              d="M2 3.14331L202.666 2.85659"
              stroke="#E9EBED"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center">
        <img src={phase3} alt="" />
        <div className="ml-3">
          <span className="text-sm text-[#252627]">Giai đoạn 3</span>
          <p className="text-[#BB2C26] text-sm">Giữ chỗ</p>
        </div>
        <div className="ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="6"
            viewBox="0 0 205 6"
            fill="none"
          >
            <path
              d="M2 3.14331L202.666 2.85659"
              stroke="#E9EBED"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <img src={phase4} alt="" />
        <div>
          <span className="text-sm text-[#252627]">Giai đoạn 4</span>
          <p className="text-[#BB2C26] text-sm">Giữ chỗ</p>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;
