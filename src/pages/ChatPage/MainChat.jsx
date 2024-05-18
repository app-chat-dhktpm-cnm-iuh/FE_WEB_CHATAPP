import { useContext, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import icProfile from "../../assets/btnProfile.svg";
import icTroChuyen from "../../assets/iconTroChuyen.svg";
import icDanhBa from "../../assets/iconDanhBa.svg";
import icSetting from "../../assets/iconSetting.svg";
import { SocketContext } from "../../context/SocketContext";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../../slice/authSlice";
import { AuthContext } from "../../context/AuthContext";
import FriendProfile from "../../components/ChatComponent/FriendProfile";
import ReactModal from "react-modal";

function MainChat() {
  let currentUser = useSelector((state) => state.authReducer.currentUser);

  const { logout, client } = useContext(SocketContext);

  const [openProfile, setOpenProfile] = useState(false);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(client);
    dispatch(authSlice.actions.logout());
    navigate("/");
    setIsOpenMenu(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
    setIsOpenMenu(false);
  };

  return (
    <>
\      <FriendProfile isOpen={openProfile} setIsOpen={setOpenProfile} />
      <div className="container-fluid vh-100 overflow-visible  ">
        <div className="row h-100 position-relative">
          <div className="col-1 left-side">
            <div className="row height-s mt-2 mb-2 img-left-side d-flex align-items-center justify-content-center">
              <img
                onClick={() => setIsOpenMenu(true)}
                className="align-self-center cursor-pointer rounded-circle overflow-hidden bg-white"
                style={{ width: "45px", height: "45px" }}
                src={currentUser.avatar_url || icProfile}
              />

              <ReactModal
                isOpen={isOpenMenu}
                ariaHideApp={false}
                onRequestClose={() => {
                  console.log("dsfdsfdsf");
                  setIsOpenMenu(false);
                }}
                overlayClassName="bg-rgba-transparent"
                className="border-none outline-none position-absolute top-fit-img w-25 left-fit-img rounded bg-white border shadow p-3 flex-column z-1"
              >
                <div className="p-2 fw-bold fs-5 border-bottom text-truncate">
                  {currentUser?.name}
                </div>
                <div
                  className="p-2 cursor-pointer rounded hover-gray"
                  onClick={handleOpenProfile}
                >
                  Sửa thông tin
                </div>
                <div
                  className="p-2 cursor-pointer rounded hover-gray"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </ReactModal>
            </div>

            <NavLink
              className="row height-s img-left-side"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#10c074" : "",
              })}
              to="/main-chat/chat"
            >
              <img
                className=" align-self-center"
                width="40"
                height="40"
                src={icTroChuyen}
              />
            </NavLink>
            <NavLink
              className="row height-s img-left-side"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#10c074" : "",
              })}
              to="/main-chat/friends/friends-list"
            >
              <img
                className=" align-self-center"
                width="40"
                height="40"
                src={icDanhBa}
              />
            </NavLink>
            <NavLink
              className="row height-s img-left-side"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#10c074" : "",
              })}
              to="/main-chat/settings"
            >
              <img
                className=" align-self-center"
                width="40"
                height="40"
                src={icSetting}
              />
            </NavLink>
          </div>

          {/* Phần này sẽ thay đổi components */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainChat;
