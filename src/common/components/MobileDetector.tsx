import React from 'react';
import { useMobileDetector } from '../hooks/useMobileDetector';
import BannerMobile from "/assets/images/banner-mobile.svg"
import IcAppStore from "/assets/images/Appstore.svg"
import IcCHPlay from "/assets/images/CH Play.svg"
import IcLogo from "/assets/images/logo.svg"

const MobileDetector: React.FC = () => {
    const isMobile = useMobileDetector(992);

    // Hiển thị loading hoặc null khi chưa xác định được kích thước màn hình
    if (isMobile === null) {
        return null;
    }

    if (!isMobile) {
        return null; // Không hiển thị gì nếu màn hình >= 992px
    }

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#fff] text-white text-center flex items-center justify-center z-[10000]">
            <div>
                <img src={BannerMobile} alt="Banner Mobile" className='absolute bottom-0 left-0 w-full object-cover' />
                <div className='absolute top-[38px] left-0 w-full flex items-center justify-center'>
                    <img src={IcLogo} alt="IcLogo" />
                </div>

                <div className='text-[#BB2C26] text-[20px] font-[600] absolute top-[150px] left-0 w-full text-center'>
                    Mời quý khách hàng tải và sử dụng<br />
                    trên ứng dụng để đạt được<br />
                    trải nghiệm tốt nhất
                </div>

                <div className='absolute top-[300px] left-0 w-full flex items-center justify-center'>
                    <div className='grid grid-cols-2 gap-4 px-4'>
                        <div
                            className='cursor-pointer hover:opacity-80 transition-opacity'
                            onClick={() => window.open('https://apps.apple.com/vn/app/hanvina-travel/id6749199945?l=vi', '_blank')}
                        >
                            <img src={IcAppStore} alt="IcAppStore" />
                        </div>
                        <div
                            className='cursor-pointer hover:opacity-80 transition-opacity'
                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.hanvina&pcampaignid=web_share', '_blank')}
                        >
                            <img src={IcCHPlay} alt="IcCHPlay" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDetector;
