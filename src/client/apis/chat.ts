import axiosInstance from "@/admin/axiosConfig";

export const getChatbot = async (params: string) => {
  try {
    const url = `/block?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const detailChatbot = async (id: string | number) => {
  try {
    const url = `/block/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postChatbot = async (
  data: FormData
) => {
  try {
    const url = `/block`;
    const response = await axiosInstance.post(
      url,
      data,
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const putChatbot = async (
  data: FormData
) => {
  try {
    const url = `/block`;
    const response = await axiosInstance.put(
      url,
      data,
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteChatbot = async (id: string | number) => {
  try {
    const url = `/block/${id}`;
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getButtonBlock = async (params: string) => {
  try {
    const url = `/button-block?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const detailButtonBlock = async (id: string | number) => {
  try {
    const url = `/button-block/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postButtonBlock = async (
  data: FormData
) => {
  try {
    const url = `/button-block`;
    const response = await axiosInstance.post(
      url,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const putButtonBlock = async (
  data: FormData
) => {
  try {
    const url = `/button-block`;
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

export const deleteButtonBlock = async (id: string | number) => {
  try {
    const url = `/button-block/${id}`;
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching criteria search:", error);
    throw error;
  }
};

export const getUserChat = async (params: string) => {
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

export const messageSenderReceiver = async (senderId: string | number, receiverId: string | number) => {
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