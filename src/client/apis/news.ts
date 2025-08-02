import axiosInstance from "./axiosConfig";

export const getNewsList = async (params: string) => {
	try {
		const url = `/news/list?${params.toString()}`;
		const response = await axiosInstance.get(url);
		return response.data;
	} catch (error) {
		console.error("Error", error);
		throw error;
	}
};

export const detailNews = async (id: string | number) => {
	try {
		const url = `/news/detail/${id}`;
		const response = await axiosInstance.get(url);
		return response.data;
	} catch (error) {
		console.error("Error", error);
		throw error;
	}
};

export const postNews = async (data: FormData) => {
	try {
		const url = `/news/create`;
		const response = await axiosInstance.post(url, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};


export const putNews = async (data: FormData) => {
	try {
		const url = `/news/update`;
		const response = await axiosInstance.put(
			url,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const deleteNews = async (id: string | number) => {
	try {
		const url = `/news/delete/${id}`;
		const response = await axiosInstance.delete(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching criteria search:", error);
		throw error;
	}
};