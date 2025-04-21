import axiosInstance from "../axiosConfig";
import { ApiResponse } from "../types/api";import {
    setting,
    settingUpdate,
    settingUpdateResponse
} from "../types/setting";

export const updateSetting = async (
    data: settingUpdate
  ): Promise<ApiResponse<settingUpdateResponse>> => {
    try {
      const url = `/setting/update`;
      const formData = new FormData();
      if (data.newHomeFile) {
        formData.append("newHomeFile", data.newHomeFile);
      }
      if (data.newLogoFile) {
        formData.append("newLogoFile", data.newLogoFile);
      }
      if (data.newFooterFile) {
        formData.append("newFooterFile", data.newFooterFile);
      }

      formData.append("settingDtoString", JSON.stringify(data.settingDtoString));

      const response = await axiosInstance.put<ApiResponse<settingUpdateResponse>>(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching criteria search:", error);
      throw error;
    }
  };

  export const detailSetting = async () => {
    try {
      const url = `/setting/detail`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching criteria search:", error);
      throw error;
    }
  };