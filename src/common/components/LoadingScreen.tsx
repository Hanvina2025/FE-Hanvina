import React from 'react';
import { useMobileDetector } from '../hooks/useMobileDetector';

const LoadingScreen: React.FC = () => {
    const isMobile = useMobileDetector(992);

    // Chỉ hiển thị loading khi chưa xác định được kích thước màn hình
    if (isMobile !== null) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#fff] flex items-center justify-center z-[10000]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BB2C26] mx-auto mb-4"></div>
                <p className="text-[#BB2C26] text-lg">Đang tải...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
