export function objectToQueryParams(obj: Record<string, any>): string {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => {
    return value !== undefined && value !== null && value !== "";
  });

  const queryParams = new URLSearchParams(filteredEntries);
  return queryParams.toString();
}

export function formatDate(date?: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const [timePart, datePart] = formattedDate.split(" ");
  const finalFormat = `${datePart} ${timePart}`;

  return finalFormat;
}

export function formatDateDay(date?: string | null): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  const weekday = parsedDate.toLocaleString("vi-VN", { weekday: "long" });

  const datePart = parsedDate.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const timePart = parsedDate.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });

  return `${weekday}, ${datePart} ${timePart}`;
}

export function formatDateNotTime(date?: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const [timePart, datePart] = formattedDate.split(" ");
  const finalFormat = `${datePart}`;

  return finalFormat;
}


// Hàm tính ngày về từ startDate và numberOfDays
export const calculateEndDate = (startDate: string, numberOfDays: number): string => {
  if (!startDate || !numberOfDays) return '';

  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + numberOfDays - 1); // Trừ 1 vì ngày đầu tiên cũng tính là 1 ngày

  return end.toISOString().split('T')[0]; // Trả về format YYYY-MM-DD
};