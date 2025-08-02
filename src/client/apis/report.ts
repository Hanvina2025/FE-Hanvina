import axiosInstance from "@/admin/axiosConfig";

export const getSummary = async () => {
    try {
        const url = `/dashboard/financial-summary`;
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};

export const getChart = async (params: any) => {
    try {
        const queryString = new URLSearchParams();
        Object.keys(params).forEach(key => {
            queryString.append(key, params[key]);
        });

        const url = `/dashboard/financial-chart?${queryString.toString()}`;
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
};