import "../pages/Home/index.scss";

export default function Dropdown({ locations, onSelect, selected }) {
  //   const [selected, setSelected] = useState("Tất cả");

  return (
    <div className="w-72 rounded-xl bg-white p-2 shadow-2xl">
      <div className="max-h-80 overflow-y-auto">
        {locations.map((location, index) => (
          <label
            key={index}
            className="flex items-center gap-2 px-3 py-3 border-b border-dotted border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="location"
              value={location}
              checked={selected === location}
              onChange={() => onSelect(location)}
              className="custom-radio appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-red-600 checked:bg-red-600 transition duration-200"
            />
            <span className="text-sm text-gray-800">{location}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
