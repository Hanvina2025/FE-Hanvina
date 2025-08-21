import React from "react";
import TitlePattern from "./TitlePattern";
import countUser from "/assets/images/countUser.svg";
import minus from "/assets/images/minus.svg";
import plus from "/assets/images/plus.svg";
import { useParams } from "react-router-dom";

const CustomerInformation = ({
  onChange,
  tourData,
  statusPreOrder,
  departure
}: {
  onChange: any;
  tourData: any;
  statusPreOrder?: number;
  departure?: any;
}) => {
  const { id } = useParams();
  const [adultCount, setAdultCount] = React.useState(tourData?.adultCount ?? 0);
  const [childrenCount, setChildrenCount] = React.useState(tourData?.childrenCount ?? 0);
  const [babyCount, setBabyCount] = React.useState(tourData?.babyCount ?? 0);
  const isDisabled = statusPreOrder != 118;
  console.log('tourData', tourData);

  // Khi tourData thay đổi thì cập nhật lại state
  React.useEffect(() => {
    if (tourData) {
      setAdultCount(tourData.adultCount ?? 0);
      setChildrenCount(tourData.childrenCount ?? 0);
      setBabyCount(tourData.babyCount ?? 0);
    }
  }, [tourData]);

  // Gọi lên cha mỗi khi bất kỳ giá trị nào thay đổi
  React.useEffect(() => {
    onChange({ adultCount, childrenCount, babyCount });
  }, [adultCount, childrenCount, babyCount, onChange]);

  const totalAdultChildren = adultCount + childrenCount;
  const availableSeats = id ? tourData?.totalSeats : (departure?.totalSeat ?? 0) - (departure?.totalSeatBooked ?? 0);

  const Counter = ({ label, subLabel, note, count, setCount, plusDisabled, minusDisabled }) => (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-[#141415] font-semibold text-base">{label}</span>
        <span className="text-[#8F9499] text-base font-medium pl-1">{subLabel}</span>
        <p className="mt-1 text-[#8F9499] text-sm">{note}</p>
      </div>
      <div className="rounded-[40px] border border-[#D6D9DC] w-[110px] h-[48px] flex items-center justify-between px-2">
        <button
          className={`rounded-full w-[30px] h-[30px] flex items-center justify-center ${isDisabled
            ? "bg-[#FFF5C2] cursor-not-allowed"
            : minusDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "custom_bg_btn"
            }`}
          onClick={() => !minusDisabled && setCount(count - 1)}
          disabled={isDisabled || minusDisabled}
        >
          <img src={minus} alt="" />
        </button>
        <div>{count}</div>
        <button
          className={`rounded-full w-[30px] h-[30px] flex items-center justify-center ${isDisabled
            ? "bg-[#FFF5C2] cursor-not-allowed"
            : plusDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "custom_bg_btn"
            }`}
          onClick={() => !plusDisabled && setCount(count + 1)}
          disabled={isDisabled || plusDisabled}
        >
          <img src={plus} alt="" />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <TitlePattern title="Số lượng khách">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-x-3">
            <img src={countUser} alt="" />
            <h1 className="text-[#141415] font-semibold">Số chỗ khả dụng: {availableSeats}</h1>
          </div>
          <div className="flex flex-col space-y-6 !mt-6">
            <Counter
              label="Người lớn"
              subLabel="(>12 tuổi)"
              note="ADT - Adult"
              count={adultCount}
              setCount={setAdultCount}
              plusDisabled={totalAdultChildren >= availableSeats}
              minusDisabled={adultCount <= 0}
            />
            <Counter
              label="Trẻ em"
              subLabel="(2-12 tuổi)"
              note="CHD - Children"
              count={childrenCount}
              setCount={setChildrenCount}
              plusDisabled={totalAdultChildren >= availableSeats}
              minusDisabled={childrenCount <= 0}
            />
            <Counter
              label="Em bé"
              subLabel="(Dưới 2 tuổi)"
              note="INF - Infant"
              count={babyCount}
              setCount={setBabyCount}
              plusDisabled={false}
              minusDisabled={babyCount <= 0}
            />
          </div>
        </div>
      </TitlePattern>
    </div>
  );
};

export default CustomerInformation;