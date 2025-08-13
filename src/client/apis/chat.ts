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
    const url = `/chat/room/summary-for-user?userId=${id}&chatType=CUSTOMER`;
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

export const createRoomSenderReceiver = async (params: any) => {
  try {
    const url = `/chat/room/create-with-sender?${params}`;
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const createRoomGroup = async (params: any) => {
  try {
    const url = `/chat/room/create-group?${params}`;
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const createMemberToGroup = async (params: any) => {
  try {
    const url = `/chat/room/add-member?${params}`;
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updateGroupInfo = async (params: any) => {
  try {
    const url = `/chat/room/update-group-info?${params}`;
    const response = await axiosInstance.put(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deleteMemberToGroup = async (params: any) => {
  try {
    const url = `/chat/room/remove-member?${params}`;
    const response = await axiosInstance.delete(url);
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