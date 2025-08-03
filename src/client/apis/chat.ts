import axiosInstance from "./axiosConfig";

export const getUserChat = async (params: string) => {
  try {
    const url = `/account?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getUserChatSearch = async (params: string) => {
  try {
    const url = `/account/user-chat?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getSummaryUser = async (id: string | number) => {
  try {
    const url = `/chat/room/summary-for-user?userId=${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getdetailUserChat = async (id: string | number) => {
  try {
    const url = `/chat/room/summary-for-user?userId=${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const createRoomSenderReceiver = async (senderId: string | number, receiverId: string | number) => {
  try {
    const url = `/chat/room/create-with-sender?senderId=${senderId}&receiverId=${receiverId}`;
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const putMarkRead = async (id: string | number) => {
  try {
    const url = `/chat/message/mark-read?roomId=${id}`;
    const response = await axiosInstance.put(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getChatRoomHistory = async (params: string) => {
  try {
    const url = `/chat/message/history?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};