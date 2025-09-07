import axiosInstance from "./axiosConfig";

export const getNotify = async (id: any, params: any) => {
    try {
        const url = `/notifications/user/${id}/types`;
        const response = await axiosInstance.get(url, params);
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

export const getNotifyCount = async (id: any) => {
    try {
        const url = `/notifications/user/${id}/unread-count/types?notificationTypes=GIAO_VIEC,DON_HANG,BAO_CAO,TOUR`;
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

export const markRead = async (id: any) => {
    try {
        const url = `/notifications/${id}/read`;
        const response = await axiosInstance.put(url);
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};