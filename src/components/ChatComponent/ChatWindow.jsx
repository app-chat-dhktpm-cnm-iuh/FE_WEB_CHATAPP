import React, { useContext, useEffect, useRef, useState } from "react";
import icAva from "../../assets/btnProfile.svg";
import icPhone from "../../assets/iconPhone.svg";
import icCamera from "../../assets/iconCamera.svg";
import icExpand from "../../assets/iconExpand.svg";
import icMicrophone from "../../assets/iconMicrophone.svg";
import icImage from "../../assets/iconImage.svg";
import icAttachment from "../../assets/iconAttachment.svg";
import icEmoji from "../../assets/iconEmoji.svg";
import icSend from "../../assets/iconSend.svg";
import icSticker from "../../assets/iconSticker.svg";

import UserMessage from "./UserMessage";
import FriendMessage from "./FriendMessage";
import { SocketContext } from "../../context/SocketContext";
import { AuthContext } from "../../context/AuthContext";
import { getConversationDetail } from "../../api/conversationApi";
import toast, { Toaster } from "react-hot-toast";

import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { deleteMessage } from "../../api/conversationApi";
import ReactModal from "react-modal";
import SystemMessage from "./SystemMessage";
import PopupDeleteMessage from "./PopupDeleteMessage";
import EditGroupChat from "./EditGroupChat";

const ChatWindow = ({ isOpen, currentConversationId, userOnline }) => {
  const [messageList, setMessageList] = useState([]);

  const [membersName, setMembersName] = useState("");

  const [status, setStatus] = useState();

  const [messageToSend, setMessageToSend] = useState();

  const [imageToSend, setImageToSend] = useState([]);

  const [imageLength, setImageLength] = useState();

  const [attachToSend, setAttachToSend] = useState([]);

  const [attachLength, setAttachLength] = useState();

  const [currentConversation, setCurrentConversation] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenOption, setIsOpenOption] = useState(false);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [deleteMessageId, setDeleteMessageId] = useState();

  const messageRef = useRef();

  const inputRef = useRef();

  let { currentUser } = useContext(AuthContext);

  let { sendMessage, messageReceive, client, userStatus } =
    useContext(SocketContext);

  //Nhận conversation hiện tại đang hiển thị
  useEffect(() => {
    const getConversation = async (currentConversationId) => {
      let data = await getConversationDetail(
        currentConversationId,
        currentUser.phone
      );
      console.log(data.data);
      setCurrentConversation({ ...data?.data });
    };

    getConversation(currentConversationId);
  }, [currentConversationId]);

  //Nhận các thông tin của conversation hiện tại
  useEffect(() => {
    const getMessage = async (currentConversation) => {
      if (currentConversation == null) return;
      setMessageList(currentConversation.conversation.messages);
    };

    const getMemberPhonesString = (currentConversation) => {
      let nameArray = null;
      if (currentConversation == null) return;
      if (isPrivateChat(currentConversation)) {
        nameArray = currentConversation?.memberDetails
          ?.filter((member) => member.name != currentUser.name)
          .map((member) => member.name);
      } else
        nameArray = currentConversation?.memberDetails?.map(
          (member) => member.name
        );
      let nameString = nameArray.join(", ");
      setMembersName(nameString);
    };

    const getMessageStatus = (currentConversation) => {
      if (currentConversation == null) return;
      if (isPrivateChat(currentConversation)) {
        let friendUser = currentConversation?.memberDetails?.find(
          (member) => member.name != currentUser.name
        );
        let isFriendOnline = userOnline?.find(
          (user) => user.phone == friendUser.phone
        );
        isFriendOnline?._activated == true
          ? setStatus("Online")
          : setStatus("Offline");
      } else {
        setStatus(`${currentConversation?.memberDetails.length} thành viên`);
      }
    };

    getMessage(currentConversation);
    getMemberPhonesString(currentConversation);
    getMessageStatus(currentConversation);
  }, [currentConversation]);

  //Update lại tin nhắn khi có tin nhắn mới đến
  useEffect(() => {
    const updateMessage = (messageReceive) => {
      if (messageReceive == null) return;
      if (messageReceive.conversation_id != currentConversationId) return;
      setMessageList([...messageList, messageReceive]);
    };

    updateMessage(messageReceive);
  }, [messageReceive]);

  //Tự động scroll về tin nhắn cuối cùng
  useEffect(() => {
    messageRef?.current.scrollIntoView();
  }, [messageList]);

  //Cập nhật trạng thái của người dùng trong conversation
  useEffect(() => {
    const updatePrivateUserStatus = (currentConversation) => {
      if (!isPrivateChat(currentConversation)) return;
      if (isCurrentUser(userStatus.phone)) return;
      let isOnline = userStatus._activated;
      isOnline ? setStatus("Online") : setStatus("Offline");
    };

    updatePrivateUserStatus(currentConversation);
  }, [currentConversation, userStatus]);

  //Gửi tệp hình ảnh được trả về từ Firebase
  useEffect(() => {
    const sendImage = (imageToSend, imageLength) => {
      if (imageToSend.length != imageLength) return;
      handleSubmitImage(imageToSend);
    };

    sendImage(imageToSend, imageLength);
  }, [imageToSend, imageLength]);

  //Gửi têp attachment được trả về từ Firebase
  useEffect(() => {
    const sendAttach = (attachToSend, attachLength) => {
      if (attachToSend.length != attachLength) return;
      handleSubmitAttach(attachToSend);
    };

    sendAttach(attachToSend, attachLength);
  }, [attachToSend, attachLength]);

  //Đánh dấu conversation thuộc về inbox riêng hay inbox nhóm
  const isPrivateChat = (currentConversation) => {
    return (
      currentConversation?.memberDetails.length <= 2 &&
      currentConversation?.memberDetails.some(
        (member) => member.phone == currentUser.phone && member.name
      )
    );
  };

  //Đánh dấu bản thân trong conversation
  const isCurrentUser = (userPhone) => {
    return userPhone == currentUser.phone;
  };

  //Set tin nhắn cần gửi
  const handleChangeMessage = (e) => {
    setMessageToSend(e.target.value);
  };

  //Gửi tin nhắn chữ
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setMessageToSend("");
    inputRef.current.value = "";
    if (messageToSend?.split(" ").join("") == "") return;
    console.log(currentUser.avatar_url);
    let messageSend = {
      conversation_id: currentConversation.conversation.conversation_id,
      members: currentConversation.conversation.members,
      sender_phone: currentUser.phone,
      sender_name: currentUser.name,
      sender_avatar_url: currentUser.avatar_url,
      images: [],
      attaches: [],
      content: messageToSend,
      sent_date_time: Date.now(),
    };
    sendMessage(messageSend, client);
  };

  //Set hình ảnh cần gửi
  const handleChangeImage = (e) => {
    if (e.target.files.length == 0) return;
    for (let i = 0; i < e.target.files.length; i++) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(e.target.files[i].type))
        return toast.error("Vui lòng chọn định đạng file phù hợp.");
    }
    setImageLength(e.target.files.length);
    sendImageToStorage(e.target.files);
  };

  //Đưa tệp hình ảnh vào Firebase Store
  const sendImageToStorage = (files) => {
    if (files?.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      let storageRef = ref(storage, `chatImages/${files[i].name + v4()}`);
      uploadBytes(storageRef, files[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) =>
          setImageToSend((pre) => [...pre, url])
        );
      });
    }
  };

  //Gửi tin nhắn hình ảnh
  const handleSubmitImage = (image) => {
    if (image == null) return;
    setImageToSend([]);
    setImageLength(null);
    let messageSend = {
      content: null,
      conversation_id: currentConversation.conversation.conversation_id,
      members: currentConversation.conversation.members,
      sender_phone: currentUser.phone,
      sender_name: currentUser.name,
      sender_avatar_url: currentUser.avatar_url,
      images: image,
      attaches: [],
      sent_date_time: Date.now(),
    };
    sendMessage(messageSend, client);
  };

  //Set tệp attachment cần gửi
  const handleChangeAttachment = (e) => {
    if (e.target.files.length == 0) return;
    setAttachLength(e.target.files.length);
    sendAttachToStorage(e.target.files);
  };

  //Đưa tệp hình ảnh vào Firebase Store
  const sendAttachToStorage = (files) => {
    if (files?.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      let storageRef = ref(storage, `chatAttachments/${files[i].name + v4()}`);
      uploadBytes(storageRef, files[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) =>
          setAttachToSend((pre) => [
            ...pre,
            {
              url,
              name: files[i].name,
            },
          ])
        );
      });
    }
  };

  //Gửi tin nhắn attachment
  const handleSubmitAttach = (attach) => {
    if (attach == null) return;
    setAttachToSend([]);
    setAttachLength(null);
    let messageSend = {
      content: null,
      conversation_id: currentConversation.conversation.conversation_id,
      members: currentConversation.conversation.members,
      sender_phone: currentUser.phone,
      sender_name: currentUser.name,
      sender_avatar_url: currentUser.avatar_url,
      images: [],
      attaches: attach,
      sent_date_time: Date.now(),
    };
    sendMessage(messageSend, client);
  };

  const setDeleteMessage = (message_id) => {
    setIsOpenModal(true);
    setDeleteMessageId(message_id);
  };

  const handleOpenEdit = () => {
    setIsOpenEdit(true);
    setIsOpenOption(false);
  };

  return (
    <>
      <EditGroupChat
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        conversation={currentConversation}
      />
      <PopupDeleteMessage
        setMessageList={setMessageList}
        currentConversationId={currentConversationId}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        deleteMessageId={deleteMessageId}
      />
      <Toaster />
      <div
        className={`col-8 bg-gray vh-100 mw-100 ${
          !isOpen && "visually-hidden"
        }`}
      >
        <div className="row height-sm bg-white position-relative">
          <div className="col-1 align-self-center">
            <img src={icAva} alt="User Icon" className="" />
          </div>

          <div className="col-9 align-self-center">
            <div className="row fw-bold text-truncate">{membersName}</div>
            <div className="row">{status}</div>
          </div>

          <div className="col-2 align-self-center row">
            <div className="col-4 align-self-center cursor-pointer">
              <img src={icPhone} />
            </div>
            <div className="col-4 align-self-center cursor-pointer">
              <img src={icCamera} />
            </div>
            <div
              onClick={() => setIsOpenOption(true)}
              className="col-4 align-self-center cursor-pointer position-relative"
            >
              <img src={icExpand} />
            </div>
          </div>
          <ReactModal
            isOpen={isOpenOption}
            onRequestClose={() => setIsOpenOption(false)}
            className="position-absolute w-15 h-15 rounded p-3 top-10 shadow-sm d-flex flex-column gap-1 border end-0 outline-none bg-white z-1"
            overlayClassName="bg-rgba-transparent"
          >
            <div
              onClick={handleOpenEdit}
              className="cursor-pointer w-100 rounded hover-gray p-1 text-end"
            >
              Quản lý thành viên
            </div>
            <div className="cursor-pointer w-100 rounded hover-gray p-1 text-end text-danger">
              Xoá nhóm
            </div>
          </ReactModal>
        </div>

        <div className="w-100 height-lg overflow-y-auto py-3 d-flex flex-column gap-3 hide-scrollbar">
          {messageList.length > 0 ? (
            messageList?.map((message) =>
              message.sender_phone == null ? (
                <SystemMessage key={message.message_id} message={message} />
              ) : isCurrentUser(message.sender_phone) ? (
                <UserMessage
                  key={message.message_id}
                  setDeleteMessage={setDeleteMessage}
                  message={message}
                />
              ) : (
                <FriendMessage
                  key={message.message_id}
                  setDeleteMessage={setDeleteMessage}
                  conversation_id={currentConversationId}
                  avatar={message.sender_avatar_url}
                  message={message}
                />
              )
            )
          ) : (
            <div className="align-self-center text-center fst-italic">
              Không có tin nhắn
            </div>
          )}
          <div ref={messageRef}></div>
        </div>

        <div className="row justify-content-between height-sm bg-white">
          <div className="col-2 d-flex gap-2 justify-content-evenly">
            <div className="align-self-center cursor-pointer">
              <img src={icMicrophone} />
            </div>
            <label
              htmlFor="uploadImage"
              className="align-self-center cursor-pointer"
            >
              <img src={icImage} />
              <input
                id="uploadImage"
                type="file"
                name="url"
                onChange={handleChangeImage}
                className="d-none"
                multiple
              />
            </label>
            <div className="align-self-center cursor-pointer">
              <img src={icSticker} />
            </div>
            <label
              htmlFor="uploadAttach"
              className="align-self-center cursor-pointer"
            >
              <img src={icAttachment} />
              <input
                id="uploadAttach"
                type="file"
                name="url"
                onChange={handleChangeAttachment}
                className="d-none"
                multiple
              />
            </label>
          </div>

          <form
            className="col-10 align-self-center d-flex justify-content-between"
            onSubmit={handleSubmitMessage}
          >
            <div className="col-11 border rounded-pill overflow-hidden d-flex justify-content-end">
              <input
                ref={inputRef}
                onChange={handleChangeMessage}
                className="col-10 align-self-center border-none outline-none"
                placeholder="Chat"
              />
              <div className="col-1 align-self-center">
                <img src={icEmoji} />
              </div>
            </div>
            <button
              type="submit"
              className="align-self-center align-items-center"
            >
              <img src={icSend} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
