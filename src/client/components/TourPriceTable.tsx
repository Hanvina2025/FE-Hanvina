export default function TourPriceTable() {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden w-full max-w-3xl mx-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-[#FDF3F3] text-black">
            <th className="px-4 py-3 flex font-medium text-xl text-[#141415]">
              Giá tour
            </th>
            <th className="px-4 py-3 font-medium text-xl">
              Người lớn <br />
              <span className="text-[#53575A] text-sm">{`(>12 tuổi)`}</span>
            </th>
            <th className="px-4 py-3 font-medium text-xl">
              Trẻ em <br />
              <span className="text-[#53575A] text-sm">(2-12 tuổi)</span>
            </th>
            <th className="px-4 py-3 font-medium text-xl">
              Em bé <br />
              <span className="text-[#53575A] text-sm">(&lt;2 tuổi)</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-t">
            <td className="px-4 py-3 font-semibold text-[#141415] text-base">
              Hoa hồng
            </td>
            <td className="px-4 py-3 text-[#141415]">500,000 đ</td>
            <td className="px-4 py-3 text-[#141415]">400,000 đ</td>
            <td className="px-4 py-3  text-[#141415]">0 đ</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-3 font-semibold text-[#141415] text-base">
              Giá bán
            </td>
            <td className="px-4 py-3 text-[#141415]">20,000,000 đ</td>
            <td className="px-4 py-3 text-[#141415]">19,000,000 đ</td>
            <td className="px-4 py-3 text-[#141415]">0 đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
