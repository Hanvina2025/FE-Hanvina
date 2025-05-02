import React from "react";
// import arrLeft from "/assets/images/arrow-left.svg";
// import arrRight from "/assets/images/arrow-right.svg";
import "../pages/ListTour/index.scss";
import { Pagination } from "antd";
const CustomPagination = ({ currentPage, totalPages, pageSize, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Pagination
        defaultCurrent={currentPage}
        total={totalPages}
        onChange={onChange}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CustomPagination;
