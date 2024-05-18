import React from "react";
import ReactModal from "react-modal";
import { deleteMessage } from "../../api/conversationApi";
import { useSelector } from "react-redux";

const PopupDeleteMessage = ({ isOpenModal, setIsOpenModal, deleteMessageId, currentConversationId, setMessageList }) => {
  const currentUser = useSelector(state => state.authReducer.currentUser)

  const handleDeleteMessage = async () => {
    const deletedMessageId = await deleteMessage(
      currentConversationId,
      deleteMessageId,
      currentUser.phone
    );

    setMessageList((pre) =>
      pre.filter((message) => message.message_id != deletedMessageId.data)
    );
    setIsOpenModal(false);
  };

  return (
    <ReactModal
      isOpen={isOpenModal}
      className="w-40 outline-none position-absolute start-50 top-50 center-absolute rounded border bg-white p-3"
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setIsOpenModal(false)}
      // style={customStyles}
      ariaHideApp={false}
    >
      <div className="w-100 pb-2 text-center fs-4 fw-bold border-bottom d-flex align-items-center justify-content-center">
        Xác nhận xoá
      </div>
      <div className="h-25 pb-4">
        Bạn có chắc chắn muốn xoá tin nhắn này chứ ?
      </div>
      <div className="w-100 py-3 height-sm d-flex align-items-center flex-row-reverse">
        <div
          className="w-25 h-100 text-center text-danger cursor-pointer bg-danger text-white rounded"
          onClick={handleDeleteMessage}
        >
          Có
        </div>
        <div
          className="w-25 text-center text-dark cursor-pointer"
          onClick={() => setIsOpenModal(false)}
        >
          Không
        </div>
      </div>
    </ReactModal>
  );
};

export default PopupDeleteMessage;
