import axiosInstance from "./axiosConfig";

export const getTour = async (params: string) => {
  try {
    const url = `/tour/tours-in-app?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getTourStartDate = async (params: string) => {
  try {
    const url = `/tour/tours-in-app-start-date?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};