import { Modal } from "antd";
import IcNotifyPopup from "/assets/images/IcCheckPopup.svg";

const ConfirmDeleteModal = ({
  visible,
  onCancel,
  onConfirm,
  buttonTxtClose = "Đóng",
  buttonTxtConfirm = "Hoàn tất",
  title = "Đã gửi hóa đơn lên hệ thống!",
  description =
  "Chúng tôi sẽ xác nhận thanh toán của bạn trong vòng 30 phút. Vui lòng theo dõi trạng thái đơn hàng. Xin cảm ơn!",
  imgCheck = true
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      closable={false}
      maskClosable={false}
      footer={
        <div className="grid grid-cols-2 justify-center gap-3 py-4">
          <button
            onClick={onCancel}
            className="px-10 py-3 flex-1 border border-[#BB2C26] rounded-full text-[#BB2C26] font-[500] text-base"
          >
            {buttonTxtClose}
          </button>
          <button
            onClick={onConfirm}
            className=" py-3 flex-1 bg-[#BB2C26] rounded-full text-white font-[500] text-base"
            style={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)' }}
          >
            {buttonTxtConfirm}
          </button>
        </div>
      }
      style={{ borderRadius: "20px", textAlign: "center" }}
      width={410}
    >
      {imgCheck && <div className="flex justify-center mb-4">
        <img src={IcNotifyPopup} alt="warning icon" />
      </div>}
      <div className="text-[20px] font-[500] max-w-full mx-auto mb-2">{title}</div>
      <div className="text-[16px] text-[#8F9499] font-[400] max-w-[85%] mx-auto">
        {description}
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
