import React, { useContext, useEffect, useState } from "react";
import FriendItem from "./FriendItem";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import {
  getConversationList,
  deleteConversation,
} from "../../api/conversationApi";
import ReactModal from "react-modal";

const FriendList = ({
  setIsOpenChat,
  setCurrentConversationId,
  currentConversationId,
}) => {
  let { currentUser } = useContext(AuthContext);

  let { newestConversationUpdate } = useContext(SocketContext);

  const [conversationList, setConversationList] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [deleteConversationId, setDeteleConversationId] = useState();

  useEffect(() => {
    const getConversation = async (currentUser) => {
      if (currentUser == null) return;
      if (conversationList.length > 0) return;
      const data = await getConversationList(currentUser.phone);
      setConversationList(data.data);
    };

    getConversation(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const updateConversationList = (newestConv) => {
      if (newestConv == null) return;
      setConversationList((pre) =>
        pre.filter(
          (conv) =>
            conv.conversation.conversation_id !=
            newestConv.conversation.conversation_id
        )
      );
      setConversationList((pre) => [newestConv, ...pre]);

      // console.log(
      //   conversationList
      //     .filter(
      //       (conv) =>
      //         conv.conversation.conversation_id !=
      //         newestConv.conversation.conversation_id
      //     )
      //     .push({ ...newestConv })
      // );
    };
    updateConversationList(newestConversationUpdate);
  }, [newestConversationUpdate]);

  const handleSetDeleteId = (conversation_id) => {
    setIsOpenModal(true);
    setDeteleConversationId(conversation_id);
  };

  const handleDeleteConversation = async () => {
    const deletedConversationId = await deleteConversation(
      deleteConversationId,
      currentUser.phone
    );
    setConversationList((pre) =>
      pre.filter(
        (conv) =>
          conv.conversation.conversation_id != deletedConversationId.data
      )
    );
    setIsOpenModal(false);
  };

  const isDeletedConversation = (conv) => {
    // return conv.conversation.deleteConversationUsers.some(
    //   (user) => user.user_phone == currentUser.phone
    // );

    return false;
  };

  return (
    <>
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
          Bạn có chắc chắn muốn xoá đoạn hội thoại này chứ ?
        </div>
        <div className="w-100 py-3 height-sm d-flex align-items-center flex-row-reverse">
          <div
            className="w-25 h-100 text-center text-danger cursor-pointer bg-danger text-white rounded"
            onClick={handleDeleteConversation}
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
      <div className="w-100 overflow-y-auto mh-90">
        {conversationList?.length > 0 ? (
          conversationList.map(
            (conv) =>
              !isDeletedConversation(conv) && (
                <FriendItem
                  key={conv.conversation?.conversation_id}
                  handleSetDeleteId={handleSetDeleteId}
                  conversation={conv}
                  setIsOpenChat={setIsOpenChat}
                  currentConversationId={currentConversationId}
                  setCurrentConversationId={setCurrentConversationId}
                />
              )
          )
        ) : (
          <div className="fst-italic align-self-center text-center">
            Không có cuộc trò chuyện
          </div>
        )}
      </div>
    </>
  );
};

export default FriendList;
