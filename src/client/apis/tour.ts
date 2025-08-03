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

export const getTourActive = async (params: string) => {
  try {
    const url = `/pre-order/activity-list?${params.toString()}`;
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

export const getListPreOrderTour = async (params: string) => {
  try {
    const url = `/pre-order/list-preorder-tour?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// Pre-Order
export const postPreOrder = async (
  data: any
) => {
  try {
    const url = `/pre-order`;
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const putPreOrder = async (
  data: any
) => {
  try {
    const url = `/pre-order`;
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getDetailPreOrder = async (id: number | string) => {
  try {
    const url = `/pre-order?id=${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// Order-Customer
export const postOrderCustomer = async (
  data: any
) => {
  try {
    const url = `/order-customer`;
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const putOrderCustomer = async (
  data: any
) => {
  try {
    const url = `/order-customer`;
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const getListOrderCustomer = async (params: string) => {
  try {
    const url = `/order-customer-information/list-by-pre-order?${params.toString()}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const getDetailOrderCustomer = async (id: number | string) => {
  try {
    const url = `/order-customer/list-by-pre-order?preOrderId=${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const putOrderCustomerInfomation = async (
  data: FormData
) => {
  try {
    const url = `/order-customer-information`;
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

// DV giảm trừ, DV cộng thêm
export const postOrderDiscountPlus = async (
  data: any
) => {
  try {
    const url = `/pre-order-discount-and-plus`;
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const putOrderDiscountPlus = async (
  data: any
) => {
  try {
    const url = `/pre-order-discount-and-plus`;
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getDetailOrderDiscountPlus = async (params: Record<string, any>) => {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = `/pre-order-discount-and-plus/list?${searchParams}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// Thanh toán cọc tất toán
export const postOrderPaymentDeposit = async (
  data: FormData
) => {
  try {
    const url = `/pre-order/user-payment-deposit`;
    const response = await axiosInstance.post(
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

// Tất toán
export const postOrderPaymentSettlement = async (
  data: FormData
) => {
  try {
    const url = `/pre-order/user-payment-settlement`;
    const response = await axiosInstance.post(
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

// Khi chưa Order
export const getTourPriceServices = async (id: number | string) => {
  try {
    const url = `/tour/tour-price-services?tourId=${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// download file
export const getExportFile = async (tourId: any) => {
  try {
    const url = `/tour/export-file?tourId=${tourId}`;
    const response = await axiosInstance.get(url, {
      responseType: "blob", // để xử lý PDF
    });

    const filename = `Chương trình Tour`;
    const file = new File([response.data], filename, {
      type: "application/pdf",
    });

    return file;
  } catch (error) {
    console.error("Lỗi khi lấy file từ HIS:", error);
    throw error;
  }
};