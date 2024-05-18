import { createContext, useState, useEffect, useContext } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [messageReceive, setMessageReceive] = useState();

  const [newestConversationUpdate, setNewestConversationUpdate] = useState();

  const [newFriendRequest, setNewFriendRequest] = useState();

  const [deletedMessage, setDeleteMessage] = useState();

  const [reply, setReply] = useState();

  const [userStatus, setUserStatus] = useState();

  const [client, setClient] = useState();

  let { currentUser } = useContext(AuthContext);

  //Authentication
  useEffect(() => {
    if (currentUser == null) return;
    register();
  }, [currentUser]);

  let stompClient = null;
  const register = () => {
    let Sock = new SockJS("http://localhost:8080/websocket");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    stompClient.heartbeat.outgoing = 5000;
    stompClient.heartbeat.incoming = 5000;
  };

  const onConnected = () => {
    if (currentUser === null) return;
    setClient(stompClient);
    // stompClient.subscribe("/user" + receivePhone + "/queue/chat", );
    //stompClient.send("/app/message", {}, JSON.stringify("hello server"));
    //Nhận thông báo tin nhắn
    stompClient.subscribe(
      `/user/${currentUser.phone}/queue/messages`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessageReceive(receivedMessage);
      }
    );
    //Nhận thông báo kết bạn
    stompClient.subscribe(
      `/user/${currentUser.phone}/queue/friend-request`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        setNewFriendRequest(receivedMessage);
      }
    );

    //Nhận phản hồi lời kết bạn
    stompClient.subscribe(
      `/user/${currentUser.phone}/queue/friend-reply`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        setReply(receivedMessage);
      }
    );

    //Nhận tin nhắn
    stompClient.subscribe(
      `/user/${currentUser.phone}/queue/chat`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        setNewestConversationUpdate(receivedMessage);
      }
    );

    //Test connect
    // stompClient.subscribe("/user/messages", (message) => {
    //   const receivedMessage = JSON.parse(message.body);
    //   console.log(receivedMessage);
    // });

    //Danh sách các user login vào
    stompClient.subscribe("/topic/public", (message) => {
      const receivedData = JSON.parse(message.body);
      // console.log(receivedData);
      setUserStatus(receivedData);
    });
    userJoin();

  };

  const onError = (value) => {
    console.log(value);
    logout(client);
  };

  const userJoin = () => {
    if (currentUser == null) return;
    let user = {
      phone: currentUser.phone,
      role: currentUser.role,
    };
    stompClient.send("/app/user.userOnline", {}, JSON.stringify(user));
  };

  const logout = (client) => {
    let user = {
      phone: currentUser.phone,
      role: currentUser.role,
    };
    client.send("/app/user.disconnectUser", {}, JSON.stringify(user));
    //client.disconnect(onDisconnect);
  };

  //Gửi tin nhắn
  const sendMessage = (message, client) => {
    client.send("/app/chat", {}, JSON.stringify(message));
  };

  //Tạo nhóm chat
  const createGroupChat = (conv, client) => {
    client.send("/app/user.creatGroupChat", {}, JSON.stringify(conv));
  };

  //Gửi kết bạn
  const sendFriendRequest = (request, client) => {
    client.send("/app/user.addFriend", {}, JSON.stringify(request));
  };

  //Phản hồi kết bạn
  const replyFriendRequest = (request, client) => {
    client.send("/app/user.replyFriendRequest", {}, JSON.stringify(request));
  };


  return (
    <SocketContext.Provider
      value={{
        client,
        setClient,
        register,
        logout,
        sendMessage,
        createGroupChat,
        sendFriendRequest,
        replyFriendRequest,
        reply,
        messageReceive,
        newestConversationUpdate,
        newFriendRequest,
        userStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
