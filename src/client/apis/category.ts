import axiosInstance from "./axiosConfig";

export type typeTourCategory = {
  id?: number;
  name: string;
  type: number;
  active: boolean;
};

export const getTourCategory = async (params: string) => {
  try {
    const url = `/tour-category?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getTourActiveCategory = async (params: string) => {
  try {
    const url = `/tour-category/active?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postTourCategory = async (
  data: typeTourCategory
) => {
  try {
    const url = `/tour-category`;
    const response = await axiosInstance.post(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const putTourCategory = async (
  data: typeTourCategory
) => {
  try {
    const url = `/tour-category`;
    const response = await axiosInstance.put(
      url,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteTourCategory = async (id: string | number) => {
  try {
    const url = `/tour-category/${id}`;
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};