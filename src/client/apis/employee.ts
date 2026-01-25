import axiosInstance from "./axiosConfig";

export const getSalesByPhone = async (phone: string, page: number = 0, size: number = 10) => {
  try {
    const url = `/employee/sales?phone=${phone}&page=${page}&size=${size}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error;
  }
};

export const getMySales = async () => {
  try {
    const url = `/customer/my-sales`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching my sales:", error);
    throw error;
  }
};
