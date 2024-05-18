import icAddConversation from "../../assets/iconAddConversation.svg";

import { useNavigate } from "react-router-dom";
import FriendProfile from "../../components/ChatComponent/FriendProfile";

import { useEffect, useContext, useState } from "react";
import FriendItem from "../../components/ChatComponent/FriendItem";
import { SocketContext } from "../../context/SocketContext";
import { getConversationList } from "../../api/conversationApi";
import ChatWindow from "../../components/ChatComponent/ChatWindow";
import { AuthContext } from "../../context/AuthContext";
import { getUserOnline } from "../../api/userApi";
import FriendSearch from "../../components/ChatComponent/FriendSearch";
import FriendList from "../../components/ChatComponent/FriendList";
import AddGroupChat from "../../components/ChatComponent/AddGroupChat";

function Chat() {
  const navigate = useNavigate();

  //const [conversationList, setConversationList] = useState();

  const [isOpenChat, setIsOpenChat] = useState(false);

  const [isOpenAddGroup, setIsOpenAddGroup] = useState(false);

  const [isSearchFriend, setIsSearchFriend] = useState(false);

  const [userOnline, setUserOnline] = useState();

  const [search, setSearch] = useState();

  let { currentUser } = useContext(AuthContext);

  const [currentConversationId, setCurrentConversationId] = useState();

  useEffect(() => {
    if (currentUser == null) return;

    
    const getUsersOnline = async () => {
      let data = await getUserOnline();
      if (data == null) return;
      setUserOnline([...data.data]);
    };
    
    //getConversationList();
    getUsersOnline();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenAddGroup = () => {
    setIsOpenAddGroup(true);
  };

  return (
    <>
      {/* Phần này là load danh sách chat */}
      <AddGroupChat
        isOpenAddGroup={isOpenAddGroup}
        setIsOpenAddGroup={setIsOpenAddGroup}
      />
      <div className="col-3 border-end mh-100">
        <div className="row height-sm">
          <div className="col-10 align-self-center">
            <input
              type="text"
              autoComplete="off"
              id="input-search"
              placeholder="Tìm kiếm"
              onChange={handleSearch}
              onFocus={() => setIsSearchFriend(true)}
            ></input>
          </div>
          <div className="col-2 align-self-center">
            <button id="add-conversation" onClick={handleOpenAddGroup}>
              <img src={icAddConversation} alt="btnAddConversation" />
            </button>
          </div>
        </div>
        {isSearchFriend ? (
          <FriendSearch
            setCurrentConversationId={setCurrentConversationId}
            search={search}
            setIsSearchFriend={setIsSearchFriend}
          />
        ) : (
          <FriendList
            currentConversationId={currentConversationId}
            setCurrentConversationId={setCurrentConversationId}
            setIsOpenChat={setIsOpenChat}
          />
        )}
      </div>

      {/* Phần này hiển thị trang chat */}
      {isOpenChat && (
        <ChatWindow
          userOnline={userOnline}
          isOpen={isOpenChat}
          currentConversationId={currentConversationId}
        />
      )}
    </>
  );
}
export default Chat;
