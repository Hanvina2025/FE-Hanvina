import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import uploadImage from "/assets/images/upload.svg";
import { useParams } from "react-router-dom";
import {
  getListOrderCustomer,
  putOrderCustomerInfomation,
  getExportFile
} from "@/client/apis/tour";
import { ArrowDown } from 'iconsax-react'

export default function CustomerList() {
  const { id } = useParams();
  const [listCustomerPreOrder, setListCustomerPreOrder] = useState<any>([]);

  useEffect(() => {
    if (id) {
      fetchListPreOrder(id)
    }
  }, [id])

  const fetchListPreOrder = async (id: number | string) => {
    const query: any = new URLSearchParams({
      preOrderId: String(id)
    });
    try {
      const fetchedData = await getListOrderCustomer(query);
      setListCustomerPreOrder(fetchedData.data)
    } catch (error) {
      console.error("Error fetching home:", error);
    }
  };

  const handleUpload = async (file, customerIndex) => {
    try {
      // Tạo FormData để gửi lên API
      const formData = new FormData();

      // Thêm file mới
      formData.append('newFiles', file);

      // Tạo dto object
      const customer = listCustomerPreOrder[customerIndex];
      const dto = {
        id: customer.id,
        preOrderId: parseInt(id as string),
        orderId: customer.orderId,
        name: customer.name,
        filesKeysDelete: [] // Không có file nào bị xóa khi upload mới
      };

      // Thêm dto vào FormData
      formData.append('dtoString', JSON.stringify(dto));

      // Gọi API
      await putOrderCustomerInfomation(formData);

      // Refresh lại danh sách từ server
      await fetchListPreOrder(id);

    } catch (error) {
      console.error("Error uploading file:", error);
    }

    return false; // prevent auto upload
  };

  const handleRemoveFile = async (customerIndex, fileIndex) => {
    try {
      const customer = listCustomerPreOrder[customerIndex];
      const fileToDelete = customer.files[fileIndex];


      // Tạo FormData để gửi lên API
      const formData = new FormData();

      // Tạo dto object với filesKeysDelete chứa tên file bị xóa
      const dto = {
        id: customer.id,
        preOrderId: parseInt(id as string),
        orderId: customer.orderId,
        name: customer.name,
        filesKeysDelete: [fileToDelete.fileKey] // Tên file bị xóa
      };

      // Thêm dto vào FormData
      formData.append('dtoString', JSON.stringify(dto));

      // Gọi API
      await putOrderCustomerInfomation(formData);

      // Refresh lại danh sách từ server
      await fetchListPreOrder(id);

    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleDownloadFile = async (file: any) => {
    try {
      if (!file?.fileKey) return;

      const downloadedFile = await getExportFile(file.fileKey);
      const blobUrl = URL.createObjectURL(downloadedFile);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = file.fileName || downloadedFile.name || "file";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.errorMsg ||
        error?.errorMsg ||
        "Có lỗi khi tải file, vui lòng thử lại!";

      message.error(errorMsg);
      console.error("Error downloading file:", error);
    }
  };

  const handleDownloadAllFiles = async () => {
    const allFiles =
      listCustomerPreOrder?.flatMap((customer: any) => customer.files || []) || [];

    if (!allFiles || allFiles.length <= 1) return;

    for (const file of allFiles) {
      // Tải từng file, nếu lỗi thì bỏ qua file đó và tiếp tục
      // Không hiển thị message success cho từng file để tránh spam
      try {
        await handleDownloadFile(file);
      } catch {
        // lỗi đã được handle bên trong handleDownloadFile
      }
    }
  };

  const totalFiles =
    listCustomerPreOrder?.reduce(
      (sum: number, customer: any) => sum + (customer.files?.length || 0),
      0
    ) || 0;

  return (
    <div className="mx-auto bg-white rounded-xl ">
      <div className="rounded-[20px] overflow-hidden border border-[#D6D9DC]">
        <div className="grid grid-cols-12 bg-[#FDF3F3] text-sm font-medium ">
          <div className="col-span-1 px-5 py-3 m-auto text-[#141415] font-medium text-xl">
            STT
          </div>
          <div className="col-span-8 px-5 py-3  text-[#141415] font-medium text-xl flex items-center justify-between">
            <span>Khách hàng</span>
            {totalFiles > 1 && (
              <button
                type="button"
                className="text-sm text-[#006AF5] underline hover:no-underline flex items-center gap-1"
                onClick={handleDownloadAllFiles}
              >
                <ArrowDown size={16} /> Download tất cả
              </button>
            )}
          </div>
          <div className="col-span-3 px-5 py-3 m-auto  text-[#141415] font-medium text-xl">
            File đính kèm
          </div>
        </div>
        <div className="py-4">
          {listCustomerPreOrder.map((customer, index) => (
            <div key={index} className="grid grid-cols-12 items-start text-sm">
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
                        <div
                          className="text-sm text-[#006AF5] flex items-center cursor-pointer"
                          onClick={() => handleDownloadFile(file)}
                        >
                          <ArrowDown size={14} />{file.fileName}
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index, fileIndex)}
                          className="text-red-500 text-xs hover:bg-red-500 hover:text-white rounded-full p-1"
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
    </div>
  );
}
