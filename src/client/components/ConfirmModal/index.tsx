import { Modal } from "antd";
import IcNotifyPopup from "/assets/images/IcCheckPopup.svg";

const ConfirmDeleteModal = ({
  visible,
  onCancel,
  onConfirm,
  title = "Đã gửi hóa đơn lên hệ thống!",
  description =
  "Chúng tôi sẽ xác nhận thanh toán của bạn trong vòng 30 phút. Vui lòng theo dõi trạng thái đơn hàng. Xin cảm ơn!",
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      closable={false}
      maskClosable={false}
      footer={
        <div className="flex justify-center gap-3 py-4">
          <button
            onClick={onCancel}
            className="px-10 py-2 flex-1 border border-[#D3362F] rounded-full text-[#F17D78] font-[500]"
          >
            Đóng
          </button>
          <button
            onClick={onConfirm}
            className="px-10 py-2 flex-1 bg-[#D3362F] rounded-full text-white font-[500]"
          >
            Hoàn tất
          </button>
        </div>
      }
      style={{ borderRadius: "20px", textAlign: "center" }}
      width={410}
    >
      <div className="flex justify-center mb-4">
        <img src={IcNotifyPopup} alt="warning icon" />
      </div>
      <div className="text-[20px] font-[500] max-w-full mx-auto mb-2">{title}</div>
      <div className="text-[16px] text-[#8F9499] font-[400] max-w-[85%] mx-auto">
        {description}
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
