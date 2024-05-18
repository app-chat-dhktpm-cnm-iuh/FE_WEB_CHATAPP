import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import icAva from "../../assets/btnProfile.svg";
import icTrash from "../../assets/iconTrash.svg";
import { SocketContext } from "../../context/SocketContext";
import { useSelector } from "react-redux";

const FriendItem = ({
  conversation,
  setIsOpenChat,
  handleSetDeleteId,
  setCurrentConversationId,
  currentConversationId,
}) => {
  const [membersName, setMembersName] = useState("");
  const [lastMessage, setLastMessage] = useState();
  const [lastMessageNoti, setLastMessageNoti] = useState("");
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [isCurrentItem, setIsCurrrentItem] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState();

  let { messageReceive } = useContext(SocketContext);

  let currentUser = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    setIsCurrrentItem(
      conversation.conversation.conversation_id == currentConversationId
    );
  }, [conversation, currentConversationId]);

  useEffect(() => {
    const getLastMessage = (conversation) => {
      let lastMessageList = conversation?.conversation.messages;
      setLastMessage(lastMessageList[lastMessageList?.length - 1]);
    };

    getLastMessage(conversation);
    setIsGroupChat(conversation?.conversation._group);
  }, [conversation]);

  useEffect(() => {
    const updateLastMessage = (messageReceive, conversation) => {
      if (messageReceive == null) return;
      if (
        messageReceive?.conversation_id !=
        conversation.conversation.conversation_id
      )
        return;
      setLastMessage(messageReceive);
    };

    updateLastMessage(messageReceive, conversation);
  }, [messageReceive, conversation]);

  useEffect(() => {
    const setChatTitle = (conversation) => {
      let nameArray = null;
      if (!isGroupChat) {
        nameArray = conversation.memberDetails
          ?.filter((member) => member.name != currentUser.name)
          .map((member) => member.name);
        return setMembersName(nameArray);
      } else if (!conversation?.conversation.title) {
        nameArray = conversation.memberDetails?.map((member) => member.name);
        let nameString = nameArray.join(", ");
        return setMembersName(nameString);
      } else return setMembersName(conversation?.conversation.title);
    };

    const setLastMessageTimeSent = (lastMessage) => {
      return setLastMessageTime(
        moment(lastMessage?.sent_date_time).format("DD/MM/YYYY")
      );
    };

    const setLastMessageSent = (lastMessage) => {
      let message = "";
      let messageContent = lastMessage?.content;
      let messageImageCount = lastMessage?.images.length;
      let messageAttachCount = lastMessage?.attaches.length;
      console.log(lastMessage)
      if (messageContent != null) {
        message = messageContent;
      } else if (messageImageCount > 0) {
        message = `(Đã gửi ${messageImageCount} hình ảnh)`;
      } else if (
        messageContent == null &&
        messageImageCount == 0 &&
        messageAttachCount > 0
      ) {
        message = `(Đã gửi ${messageAttachCount} tệp đính kèm)`;
      }

      if (lastMessage?.sender_phone == currentUser?.phone) {
        return setLastMessageNoti("Bạn: " + message);
      } else {
        if (isGroupChat) {
          console.log(lastMessage);
          return setLastMessageNoti(`${lastMessage?.sender_name}: ${message}`);
        } else {
          return setLastMessageNoti(message);
        }
      }
    };

    setChatTitle(conversation);
    setLastMessageTimeSent(lastMessage);
    setLastMessageSent(lastMessage);
  }, [lastMessage]);

  // const setMemberPhonesString = () => {
  //   members?.map((member, index) => {
  //     memberString += member.toString();
  //     if (index > 0 && index < members.length) memberString += ", ";
  //   });
  // };

  const handleClick = () => {
    setIsOpenChat(true);
    setCurrentConversationId(conversation.conversation.conversation_id);
  };

  return (
    <>
      <div
        className={`w-100 position-relative date-hover row cursor-pointer ${
          isCurrentItem ? "bg-box-chat-green" : "bg-list-hover"
        }`}
      >
        <img
          src={icTrash}
          className="w-10 delete-conv ratio bg-white bg-opacity-25 ratio-1x1 delete-button position-absolute rounded border border-danger top-10 end-5 z-1"
          onClick={() =>
            handleSetDeleteId(conversation.conversation.conversation_id)
          }
        />
        <div
          className={`w-100 px-3 pt-2 pb-2 position-relative date-hover row cursor-pointer `}
          onClick={handleClick}
        >
          <div className="col-2 align-self-center">
            <img src={icAva} alt="User Icon" className="" />
          </div>
          <div className="col-10 align-self-center">
            <div className="row">
              <div className="col-7 text-truncate">{membersName}</div>
              <div className="col-5 message-to position-relative d-flex flex-row-reverse">
                <div className="date">{lastMessageTime}</div>
              </div>
            </div>
            <div className="row">
              <div className="col message-to text-truncate">
                {lastMessageNoti}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendItem;
