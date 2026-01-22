import React from "react";
import patternTitle from "/assets/images/patternTitle.svg";

const TitlePattern = ({ children, title, color = "text-[#141415]" }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-all ">
      <div className="relative border-b border-[#D6D9DC] border-dashed">
        <img src={patternTitle} alt="" />
        <div className="absolute top-0 w-full h-full px-5 py-4">
          <div className="w-full flex items-center h-full justify-between">
            <h1 className={`${color} text-xl font-medium`}>{title}</h1>
          </div>
        </div>
      </div>
      <div className="p-[20px]">{children}</div>
    </div>
  );
};

export default TitlePattern;
