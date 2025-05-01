import React from "react";
import patternTitle from "/assets/images/patternTitle.svg";

const TitlePattern = ({ children, title }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-md  ">
      <div className="relative ">
        <img src={patternTitle} alt="" />
        <div className="absolute top-0 w-full h-full px-5 py-4">
          <div className="w-full flex items-center h-full justify-between">
            <h1 className="text-[#141415] text-xl font-medium">{title}</h1>
          </div>
        </div>
      </div>
      <div className="p-[20px]">{children}</div>
    </div>
  );
};

export default TitlePattern;
