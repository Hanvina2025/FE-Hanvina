import './index.scss'
import React, { useState, useEffect } from "react";
import BgLeft from '/assets/images/image-user-profile-left.png';
import Filled from '/assets/images/Filled.svg';
import Avatar from '/assets/images/ava.png';
import ButtonShort from "/assets/images/button-short.svg";
import { ArrowRight2 } from "iconsax-react";
import { Modal, Input, message } from "antd";
import { useAuth } from "@/admin/components/AuthProvider";
import { updatePassWord, updateAccount } from "@/admin/apis/auth";

const Profile = () => {
  const { userData } = useAuth();
  console.log('userData', userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // State cho form thông tin cá nhân
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // State cho form thay đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fill thông tin từ userData khi component mount
  useEffect(() => {
    if (userData?.info) {
      setProfileForm({
        name: userData.info.name || '',
        phone: userData.info.phone || '',
        email: userData.info.email || ''
      });
    }
  }, [userData]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    // Reset form khi đóng modal
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Xử lý thay đổi input thông tin cá nhân
  const handleProfileChange = (field: string, value: string) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Xử lý thay đổi input mật khẩu
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Xử lý lưu thông tin cá nhân
  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('id', userData?.info?.id);
      formData.append('name', profileForm.name);
      formData.append('phone', profileForm.phone);
      formData.append('email', profileForm.email);
      // TODO: Implement API update profile
      await updateAccount(formData);
      message.success('Cập nhật thông tin thành công!');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.errorMsg || error?.errorMsg || 'Lỗi không xác định';
      message.error(errorMsg);
      console.error('Error updating profile:', error);
    }
  };

  // Xử lý thay đổi mật khẩu
  const handleChangePassword = async () => {
    // Validate form
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      message.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      message.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);
    try {
      // Tạo FormData từ object
      const formData = new FormData();
      formData.append('id', userData?.info?.id?.toString() || '');
      formData.append('password', passwordForm.oldPassword);
      formData.append('newPassword', passwordForm.newPassword);

      await updatePassWord(formData);
      message.success('Thay đổi mật khẩu thành công!');
      handleCancel();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.errorMsg || error?.errorMsg || 'Lỗi không xác định';
      message.error(errorMsg);
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

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
                    value={profileForm.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div className='item mt-[24px]'>
                  <div className='font-[500]'>Số điện thoại</div>
                  <input
                    className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    type="number"
                    placeholder='Số điện thoại'
                    value={profileForm.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div className='item mt-[24px]'>
                  <div className='font-[500]'>Email</div>
                  <input
                    className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
                    type="email"
                    placeholder='Email'
                    value={profileForm.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-[24px]">
                  <div
                    className="relative h-[48px] cursor-pointer w-[192px]"
                    onClick={handleSaveProfile}
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
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Nhập mật khẩu cũ
            <Input.Password
              placeholder="********"
              className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
              value={passwordForm.oldPassword}
              onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
            />
          </label>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Nhập mật khẩu mới
            <Input.Password
              placeholder="************"
              className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
              value={passwordForm.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            />
          </label>
          <label className="block mb-[24px] font-[500] text-[16px]">
            Xác nhận mật khẩu
            <Input.Password
              placeholder="************"
              className="border border-[#D6D9DC] rounded-lg w-full p-3 mt-2"
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            />
          </label>
          <div className="flex justify-end mt-[24px]">
            <div
              className="relative h-[48px] cursor-pointer w-[192px]"
              onClick={handleChangePassword}
            >
              <img src={ButtonShort} className="w-full h-[48px]" />
              <div className="absolute w-full top-[10px] text-center font-[500] text-[16px] text-white">
                {loading ? 'Đang xử lý...' : 'Hoàn tất'}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
