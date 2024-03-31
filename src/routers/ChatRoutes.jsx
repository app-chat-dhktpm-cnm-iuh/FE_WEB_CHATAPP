import { Route, Routes } from "react-router-dom";
import MainChat from "../ChatPage/MainChat";
import Chat from "../ChatPage/Chat";
import Login from "../LoginPage/Login";
import RegisterPhone from "../RegisterPage/RegisterPhone";
import RegisterUserName from "../RegisterPage/RegisterUserName";
import App from "../AppPage/App";
import Setting from "../SettingPage/Setting";
import MainFriend from "../FriendsPage/MainFriend";
import FriendComponent from "../FriendsPage/FriendComponent";
import InviteListComponent from "../FriendsPage/InviteListComponent";
import GroupListComponent from "../FriendsPage/GroupListComponent";
import RegisterValidationCode from "../RegisterPage/RegisterValidationCode";
import RegisterPassword from "../RegisterPage/RegisterPassword";

function ChatRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register-phone" element={<RegisterPhone />} />
          <Route path="register-name" element={<RegisterUserName />} />
          <Route path="register-validcode" element={<RegisterValidationCode />} />
          <Route path="register-password" element={<RegisterPassword />} />
          <Route index element={<Login/>} />
        </Route>
        <Route path="main-chat" element={<MainChat />}>
            <Route path="chat" element={<Chat />} />
            <Route path="settings" element={<Setting />} />
            <Route path="friends" element={<MainFriend />}>
              <Route path="friends-list" element={<FriendComponent />}/>
              <Route path="groups" element={<GroupListComponent />} />
              <Route path="invites" element={<InviteListComponent />}/>
            </Route>
          </Route>
      </Routes>
    </>
  );
}
export default ChatRoutes;
