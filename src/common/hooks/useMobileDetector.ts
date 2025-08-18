import { useState, useEffect } from 'react';

export const useMobileDetector = (breakpoint: number = 992) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Kiểm tra kích thước màn hình ban đầu
        checkScreenSize();

        // Thêm event listener để lắng nghe thay đổi kích thước màn hình
        window.addEventListener('resize', checkScreenSize);

        // Cleanup event listener khi component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [breakpoint]);

    return isMobile;
};
