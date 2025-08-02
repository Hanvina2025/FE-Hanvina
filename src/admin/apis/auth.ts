import axiosInstance from '../axiosConfig';
import { UserLogin } from '../types/api';

export const postLogin = async (email: string, password: string): Promise<UserLogin> => {
  try {
    const response = await axiosInstance.post<UserLogin>('/account/login', { username: email, password });
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    throw error;
  }
};

export const updatePassWord = async (
  data: FormData
) => {
  try {
    const url = `/account/change-password`;
    const response = await axiosInstance.put(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateAccount = async (
  data: FormData
) => {
  try {
    const url = `/account/change-password`;
    const response = await axiosInstance.put(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};