import React from "react";

export default function TourPriceTable({ departure }) {
  const adultPrice = departure?.adultPrice;
  const childrenPrice = departure?.childrenPrice;
  const babyPrice = departure?.babyPrice;
  const commissionAdultPrice = departure?.commissionAdultPrice | departure?.commissionPriceAdult;
  const commissionChildrenPrice = departure?.commissionChildrenPrice | departure?.commissionPriceChildren;
  const commissionBabyPrice = departure?.commissionBabyPrice || departure?.commissionPriceBaby;

  return (
    <div className="rounded-2xl shadow-all overflow-hidden w-full max-w-3xl mx-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-[#FDF3F3] text-black">
            <th className="px-4 py-3 flex font-medium text-xl text-[#141415]">
              Giá tour
            </th>
            <th className="px-4 py-3 font-medium text-xl text-center">
              Người lớn <br />
              <span className="text-[#53575A] text-sm">{`(>12 tuổi)`}</span>
            </th>
            <th className="px-4 py-3 font-medium text-xl text-center">
              Trẻ em <br />
              <span className="text-[#53575A] text-sm">(2-12 tuổi)</span>
            </th>
            <th className="px-4 py-3 font-medium text-xl text-center">
              Em bé <br />
              <span className="text-[#53575A] text-sm">(&lt;2 tuổi)</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-4 py-3 font-semibold text-[#141415] text-base">
              Hoa hồng
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {commissionAdultPrice ? `${commissionAdultPrice.toLocaleString()} đ` : "0 đ"}
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {commissionChildrenPrice ? `${commissionChildrenPrice.toLocaleString()} đ` : "0 đ"}
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {commissionBabyPrice ? `${commissionBabyPrice.toLocaleString()} đ` : "0 đ"}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-semibold text-[#141415] text-base">
              Giá bán
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {adultPrice ? `${adultPrice.toLocaleString()} đ` : "0 đ"}
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {childrenPrice ? `${childrenPrice.toLocaleString()} đ` : "0 đ"}
            </td>
            <td className="px-4 py-3 text-[#141415] text-center">
              {babyPrice ? `${babyPrice.toLocaleString()} đ` : "0 đ"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
