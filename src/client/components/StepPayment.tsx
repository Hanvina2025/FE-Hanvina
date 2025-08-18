import React from "react";
import { useLocation } from "react-router-dom";
import IcPhase1Active from "/assets/images/Phase1Active.svg";
import IcPhase2 from "/assets/images/phase2.svg";
import IcPhase2Active from "/assets/images/phase2Active.svg";
import IcPhase3 from "/assets/images/phase3.svg";
import IcPhase3Active from "/assets/images/phase3Active.svg";
import IcPhase4 from "/assets/images/phase4.svg";
import IcPhase4Active from "/assets/images/phase4Active.svg";
import IcPhaseDone from "/assets/images/phaseDone.svg";

// Component SVG nối các bước
const StepConnector = ({ active }: { active: boolean }) => (
  <svg width="205" height="6" viewBox="0 0 205 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 3.14331L202.666 2.85659"
      stroke={active ? "#FFD245" : "#E9EBED"}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const StepPayment = () => {
  const location = useLocation();
  const path = location.pathname;

  // Xác định trạng thái từng giai đoạn
  let phase1Img = IcPhase1Active;
  let phase2Img = IcPhase2;
  let phase3Img = IcPhase3;
  let phase4Img = IcPhase4;

  // Trạng thái active cho từng phase
  let phase1Active = false;
  let phase2Active = false;
  let phase3Active = false;
  let phase4ActiveFlag = false;

  if (path.startsWith("/reserve/step2")) {
    phase1Img = IcPhaseDone;
    phase2Img = IcPhase2Active;
    phase1Active = true;
  }
  if (path.startsWith("/reserve/step3")) {
    phase1Img = IcPhaseDone;
    phase2Img = IcPhaseDone;
    phase3Img = IcPhase3Active;
    phase1Active = true;
    phase2Active = true;
  }
  if (path.startsWith("/reserve/step4")) {
    phase1Img = IcPhaseDone;
    phase2Img = IcPhaseDone;
    phase3Img = IcPhaseDone;
    phase4Img = IcPhase4Active;
    phase1Active = true;
    phase2Active = true;
    phase3Active = true;
  }
  if (path.startsWith("/reserve/step-done")) {
    phase1Img = IcPhaseDone;
    phase2Img = IcPhaseDone;
    phase3Img = IcPhaseDone;
    phase4Img = IcPhaseDone;
    phase1Active = true;
    phase2Active = true;
    phase3Active = true;
    phase4ActiveFlag = true;
  }

  // Hàm xác định màu chữ cho từng giai đoạn
  const getLabelColor = (active: boolean) => active ? "#252627" : "#B9BDC1";
  const getTextColor = (active: boolean) => active ? "#BB2C26" : "#B9BDC1";

  return (
    <div className="bg-white rounded-[12px] p-6 flex gap-x-5">
      <div className="flex items-center step-item">
        <img src={phase1Img} alt="" className="" />
        <div className="ml-3">
          <div className="text-sm" style={{ color: "#252627" }}>Giai đoạn 1</div>
          <div className="text-sm font-[500]" style={{ color: "#BB2C26" }}>Giữ chỗ</div>
        </div>
        <div className="ml-4">
          <StepConnector active={phase1Active} />
        </div>
      </div>
      <div className="flex items-center step-item">
        <img src={phase2Img} alt="" />
        <div className="ml-3">
          <div className="text-sm" style={{ color: getLabelColor(phase1Active) }}>Giai đoạn 2</div>
          <div className="text-sm font-[500]" style={{ color: getTextColor(phase1Active) }}>Thanh toán cọc</div>
        </div>
        <div className="ml-1">
          <StepConnector active={phase2Active} />
        </div>
      </div>
      <div className="flex items-center step-item">
        <img src={phase3Img} alt="" />
        <div className="ml-3">
          <div className="text-sm" style={{ color: getLabelColor(phase2Active) }}>Giai đoạn 3</div>
          <div className="text-sm font-[500]" style={{ color: getTextColor(phase2Active) }}>Nộp hồ sơ</div>
        </div>
        <div className="ml-1">
          <StepConnector active={phase3Active} />
        </div>
      </div>
      <div className="flex items-center step-item">
        <img src={phase4Img} alt="" />
        <div className="ml-3">
          <div className="text-sm" style={{ color: getLabelColor(phase3Active) }}>Giai đoạn 4</div>
          <div className="text-sm font-[500]" style={{ color: getTextColor(phase3Active) }}>Tất toán</div>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;