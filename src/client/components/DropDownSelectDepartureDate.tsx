import "../pages/Home/index.scss";

export default function DropDownSelectDepartureDate({
  locations,
  onSelect,
  selected,
}) {
  return (
    <div className="w-[480px] rounded-2xl bg-white p-4 shadow-xl text-sm font-medium">
      {/* Header */}
      <div className="grid grid-cols-3 bg-[#FBCFCD] rounded-[6px] px-6 py-3 text-gray-800">
        <div className="font-medium text-[#252627] text-base">
          Ngày khởi hành
        </div>
        <div className="border-l border-gray-300 pl-4 font-medium text-[#252627] text-base">
          Giá
        </div>
        <div className="border-l border-gray-300 pl-4 font-medium text-[#252627] text-base">
          Số chỗ còn lại
        </div>
      </div>

      {/* Body */}
      <div className="max-h-80 overflow-y-auto">
        {locations.map((location, index) => (
          <label
            key={index}
            className={`grid grid-cols-3 mt-[6px] items-center rounded-[6px] py-4 bg-[#F4F5F6] cursor-pointer ${
              index !== locations.length - 1 ? "border-b border-gray-100" : ""
            } hover:bg-gray-50`}
            onClick={() => onSelect(location)}
          >
            <div className="flex items-center gap-2 px-2">
              <input
                type="radio"
                name="location"
                value={location.date}
                checked={selected?.date === location.date}
                readOnly
                className="appearance-none w-4 h-4 rounded-full border-2 border-gray-400 custom-radio transition duration-200"
              />
              <span className="text-gray-900">{location.date}</span>
            </div>
            <div className="border-l border-gray-200 pl-4 text-gray-900">
              {location.price}
            </div>
            <div className="border-l border-gray-200 pl-4 text-gray-900">
              {location.seatsLeft}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
