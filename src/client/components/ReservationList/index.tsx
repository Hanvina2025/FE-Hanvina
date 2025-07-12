import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "./index.scss";
import type { ColumnsType } from "antd/es/table";
import clock from "/assets/images/clock.svg";
import { useSearchParams } from 'react-router-dom';
import { getListPreOrderTour } from "@/client/apis/tour";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface RawData {
    id: number;
    totalSeats: number | null;
    depositDateTime: string;
    createdTime: string;
    createdId: number;
    createdName: string;
    itsMe: boolean;
}

interface ReservationData {
    key: number;
    stt: number;
    name: string;
    seats: number;
    startTime: string;
    endTime: string;
    remainingTime: string;
    isCurrentUser?: boolean;
}

const ReservationList = ({ id }) => {
    const [dataLst, setDataLst] = useState<ReservationData[]>([]);
    const [searchParams] = useSearchParams();
    const pageIndex = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("size") || "20", 20);
    const [loading, setLoading] = useState(false);

    const columns: ColumnsType<ReservationData> = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: "center",
            width: 60
        },
        {
            title: "Tên đại lý",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: 170,
            render: (text, record) => (
                <span style={{ color: record.isCurrentUser ? "red" : "inherit" }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Số lượng chỗ đang giữ",
            dataIndex: "seats",
            key: "seats",
            align: "center",
            width: 200,
            render: (seats) => (
                <div className="text-[#DC1F18]">{seats} chỗ</div>
            ),
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: "startTime",
            key: "startTime",
            align: "center",
            width: 190,
            render: (text) => (
                <div className="flex items-center justify-center gap-1">
                    <img src={clock} alt="" className="size-8" />
                    {text}
                </div>
            ),
        },
        {
            title: "Thời gian kết thúc",
            key: "endTime",
            align: "center",
            render: (_, record) => (
                <div className="flex items-center justify-center gap-1">
                    <img src={clock} alt="" className="size-8" />
                    {record.endTime}
                    <span className="text-[#DC1F18] pl-[6px]">({record.remainingTime})</span>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchList();
    }, [id]);

    const fetchList = async () => {
        setLoading(true);

        const queryParams: Record<string, any> = {
            page: (pageIndex - 1).toString(),
            size: pageSize.toString(),
            tourId: id,
        };
        const query: any = new URLSearchParams(queryParams);

        try {
            const fetchedData = await getListPreOrderTour(query);
            const mapped: ReservationData[] = (fetchedData.data || []).map(
                (item: RawData, index: number) => {
                    const now = dayjs();
                    const end = dayjs(item.depositDateTime);
                    const diff = dayjs.duration(end.diff(now));
                    const remaining =
                        diff.asMilliseconds() <= 0
                            ? "đã hết hạn"
                            : `còn ${String(diff.hours()).padStart(2, "0")} giờ ${String(
                                diff.minutes()
                            ).padStart(2, "0")} phút`;

                    return {
                        key: item.id,
                        stt: index + 1,
                        name: item.itsMe ? "Tôi" : item.createdName,
                        seats: item.totalSeats ?? 0,
                        startTime: dayjs(item.createdTime).format("HH:mm - D/M/YYYY"),
                        endTime: dayjs(item.depositDateTime).format("HH:mm - D/M/YYYY"),
                        remainingTime: remaining,
                        isCurrentUser: item.itsMe,
                    };
                }
            );
            setDataLst(mapped);
        } catch (error) {
            console.error("Error fetching tour list:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Table
            className="custom-reservation-table"
            columns={columns}
            dataSource={dataLst}
            pagination={false}
            loading={loading}
            rowClassName={(record) =>
                record.isCurrentUser ? "highlighted-row" : ""
            }
            style={{
                backgroundColor: "#fff",
                marginTop: 16,
            }}
            scroll={{ y: '65vh' }}
        />
    );
};

export default ReservationList;
