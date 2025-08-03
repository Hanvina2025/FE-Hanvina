import { Modal } from "antd";
import IcNotifyPopup from "/assets/images/IcCheckPopup.svg";
import IcButtonRight from "/assets/images/button-confirm-right.svg"
import IcButtonLeft from "/assets/images/button-confirm-left.svg"

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
        <div className="grid grid-cols-2 justify-center py-4">
          <button
            onClick={onCancel}
            className="font-[500] text-base relative"
          >
            <img src={IcButtonLeft} />
            <div className="absolute top-[10px] left-[50px] text-[#BB2C26]">{buttonTxtClose}</div>
          </button>
          <button
            onClick={onConfirm}
            className="text-white font-[500] text-base relative"
          >
            <img src={IcButtonRight} />
            <div className="absolute w-full flex items-center justify-center top-[10px]">{buttonTxtConfirm}</div>
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
