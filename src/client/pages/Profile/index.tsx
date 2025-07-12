import './index.scss'
import React, { useState } from "react";
import BgLeft from '/assets/images/image-user-profile-left.png';
import Filled from '/assets/images/Filled.svg';
import Avatar from '/assets/images/ava.png';
import ButtonShort from "/assets/images/button-short.svg";
import { ArrowRight2 } from "iconsax-react";
import { Modal, Input, Button } from "antd";
import { useAuth } from "@/admin/components/AuthProvider";

const Profile = () => {
  const { userData } = useAuth();
  console.log('userData', userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className='container mx-auto mb-[60px]'>
      <div className='grid lg:grid-cols-[405px_1fr] gap-[32px]'>
        <div><img src={BgLeft} className='w-full object-cover' /></div>
        <div className='profile-right'>
          <div className='profile-right-info'>
            <div className='grid lg:grid-cols-[125px_1fr] gap-[60px]'>
              <div>
                <img src={Avatar} className='w-[125px] h-[125px] rounded-full object-cover' />
                <div className='text-[13px] text-[#BB2C26] mt-[18px] text-center'>Đổi ảnh đại diện</div>
              </div>
              <div className='profile-right-info-content'>
                <div className='item'>
                  <div className='font-[500]'>Tên đại lý</div>
                  <input
                    className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    type="text"
                    placeholder='Tên đại lý'
                    value={userData?.info?.name}
                  />
                </div>
                <div className='item mt-[24px]'>
                  <div className='font-[500]'>Số điện thoại</div>
                  <input
                    className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    type="number"
                    placeholder='Số điện thoại'
                    value={userData?.info?.phone}
                  />
                </div>
                <div className='item mt-[24px]'>
                  <div className='font-[500]'>Email</div>
                  <input
                    className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    type="email"
                    placeholder='Email'
                    value={userData?.info?.email}
                  />
                </div>
                <div className="flex justify-end mt-[24px]">
                  <div
                    className="relative h-[48px] cursor-pointer w-[192px]"
                  >
                    <img src={ButtonShort} className="w-full h-[48px]" />
                    <div className="absolute w-full top-[11px] text-center font-[500] text-[16px] text-white">
                      Lưu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-right-password mt-[24px]'>
            <div className='font-[500]'>Thay đổi mật khẩu</div>
            <div className='mt-[8px] flex justify-between items-center bg-[#F4F5F6] p-[12px] rounded-[8px] cursor-pointer'
              onClick={showModal}
            >
              <img src={Filled} />
              <ArrowRight2 size='24px' color='#767A7F' />
            </div>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      <Modal
        title={
          <div className="flex items-center justify-between border-b border-[#D6D9DC] pb-[12px] mb-[16px]">
            <span className="text-[20px] font-[500] text-[#252627]">Thay đổi mật khẩu</span>
          </div>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={<span style={{ fontSize: 24, fontWeight: "bold" }}>×</span>}
        width={600}
      >
        <form>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Nhập mật khẩu cũ
            <Input.Password placeholder="********" className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2" />
          </label>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Nhập mật khẩu mới
            <Input.Password placeholder="************" className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2" />
          </label>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Xác nhận mật khẩu
            <Input.Password placeholder="************" className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2" />
          </label>
          <div className="flex justify-end mt-[24px]">
            <div
              className="relative h-[48px] cursor-pointer w-[192px]"
            >
              <img src={ButtonShort} className="w-full h-[48px]" />
              <div className="absolute w-full top-[10px] text-center font-[500] text-[16px] text-white">
                Hoàn tất
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
