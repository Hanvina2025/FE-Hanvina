import React from 'react';
import { useMobileDetector } from '../hooks/useMobileDetector';

interface MobileWrapperProps {
    children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
    const isMobile = useMobileDetector(992);

    // Nếu là mobile thì ẩn tất cả nội dung
    if (isMobile) {
        return null;
    }

    // Nếu không phải mobile thì hiển thị nội dung bình thường
    return <>{children}</>;
};

export default MobileWrapper;
