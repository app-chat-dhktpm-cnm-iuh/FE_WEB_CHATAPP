import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import icProfile from "../assets/btnProfile.svg"
import icTroChuyen from "../assets/iconTroChuyen.svg"
import icDanhBa from "../assets/iconDanhBa.svg"
import icSetting from "../assets/iconSetting.svg"

function MainChat() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-1 left-side">
            <div className="row height-s mt-2 mb-2 img-left-side"><img className="align-self-center" width="45" height="45" src={icProfile} /></div>

            <Link to="/main-chat/chat">
              <div className="row height-s img-left-side"><img className=" align-self-center" width="40" height="40" src={icTroChuyen} /></div>
            </Link>
            <Link to="/main-chat/friends/friends-list">
              <div className="row height-s img-left-side"><img className=" align-self-center" width="40" height="40" src={icDanhBa} /></div>
            </Link>
            <Link to="/main-chat/settings">
              <div className="row height-s img-left-side"><img className=" align-self-center" width="40" height="40" src={icSetting} /></div>
            </Link>
          </div>
          
          {/* Phần này sẽ thay đổi components */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainChat;
