import React, { useState } from "react";
import { Upload } from "antd";
import uploadImage from "/assets/images/upload.svg";

const initialCustomers = Array.from({ length: 14 }, (_, i) => ({
  name: `Khách hàng ${i + 1}`,
  files: [],
}));

export default function CustomerList() {
  const [customers, setCustomers] = useState(initialCustomers);

  const handleUpload = (file, customerIndex) => {
    setCustomers((prev) => {
      const newCustomers = [...prev];
      const exists = newCustomers[customerIndex].files.some(
        (f) => f.name === file.name && f.size === file.size
      );
      if (!exists) {
        newCustomers[customerIndex].files = [
          ...newCustomers[customerIndex].files,
          file,
        ];
      }
      return newCustomers;
    });
    return false; // prevent auto upload
  };

  const handleRemoveFile = (customerIndex, fileIndex) => {
    setCustomers((prev) => {
      const newCustomers = [...prev];
      newCustomers[customerIndex].files.splice(fileIndex, 1);
      return [...newCustomers];
    });
  };

  return (
    <div className=" mx-auto  bg-white rounded-xl ">
      <div className=" rounded-[20px] overflow-hidden border border-[#D6D9DC]">
        <div className="grid grid-cols-12 bg-[#FDF3F3] text-sm font-medium ">
          <div className="col-span-1 px-5 py-3 m-auto text-[#141415] font-medium text-xl">
            STT
          </div>
          <div className="col-span-8 px-5 py-3  text-[#141415] font-medium text-xl">
            Khách hàng
          </div>
          <div className="col-span-3 px-5 py-3 m-auto  text-[#141415] font-medium text-xl">
            File đính kèm
          </div>
        </div>
        {customers.map((customer, index) => (
          <div key={index} className="grid grid-cols-12 items-start  text-sm">
            <div className="col-span-1 px-3 py-2 text-base font-semibold text-[#141415] m-auto">
              {index + 1}
            </div>
            <div className="col-span-8 px-5 py-3 ">
              <div className="bg-[#F4F5F6] rounded-md border border-[#B9BDC1] p-3">
                {customer.name}
              </div>
              {customer.files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {customer.files.map((file, fileIndex) => (
                    <div
                      key={fileIndex}
                      className="flex items-center gap-1  px-2 py-1 rounded-md "
                    >
                      <span className="text-sm text-[#006AF5]">
                        {file.name}
                      </span>
                      <button
                        onClick={() => handleRemoveFile(index, fileIndex)}
                        className="text-red-500 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-3 px-5 py-3 flex items-center m-auto">
              <Upload
                showUploadList={false}
                beforeUpload={(file) => handleUpload(file, index)}
              >
                <button className="text-[#006AF5] hover:underline text-base flex items-center gap-2">
                  <img src={uploadImage} alt="" />
                  Tải lên
                </button>
              </Upload>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
