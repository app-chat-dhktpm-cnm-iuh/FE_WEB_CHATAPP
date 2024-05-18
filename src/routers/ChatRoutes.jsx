import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainChat from "../pages/ChatPage/MainChat";
import Chat from "../pages/ChatPage/Chat";
import Login from "../pages/LoginPage/Login";
import App from "../pages/AppPage/App";
import Setting from "../pages/SettingPage/Setting";
import MainFriend from "../pages/FriendsPage/MainFriend";
import FriendComponent from "../pages/FriendsPage/FriendComponent";
import InviteListComponent from "../pages/FriendsPage/InviteListComponent";
import GroupListComponent from "../pages/FriendsPage/GroupListComponent";

import "react-datepicker/dist/react-datepicker.css";

import { SocketContextProvider } from "../context/SocketContext";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/RegisterPage/Register";

function ChatRoutes() {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route index element={<Login />} />
            </Route>
            <Route path="main-chat" element={<MainChat />}>
              <Route path="chat" element={<Chat />} />
              <Route path="settings" element={<Setting />} />
              <Route path="friends" element={<MainFriend />}>
                <Route path="friends-list" element={<FriendComponent />} />
                <Route path="groups" element={<GroupListComponent />} />
                <Route path="invites" element={<InviteListComponent />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketContextProvider>
    </AuthContextProvider>
  );
}
export default ChatRoutes;
