import { Link, Outlet } from "react-router-dom";
import icFriendList from '../../assets/iconFriendList.svg'
import icGroupList from '../../assets/iconGroupList.svg'
import icInviteList from '../../assets/iconInviteList.svg'
import icAddConversation from '../../assets/iconAddConversation.svg'

function MainFriend() {

  return (
    <>
      <div className="col-3">
        

        <Link to="/main-chat/friends/friends-list">
          <div className="nav-clicked row height-sm active" tabIndex="1">
            <div className="col-2 align-self-center">
              <img src={icFriendList} alt="icFriends" />
            </div>
            <div className="col-10 align-self-center">
              <span className="fw-bold remove-link">Danh sách bạn bè</span>
            </div>
          </div>
        </Link>
        <Link to="/main-chat/friends/groups">
          <div className="nav-clicked row height-sm" tabIndex="2">
            <div className="col-2  align-self-center">
              <img src={icGroupList} alt="icGroup" />
            </div>
            <div className="col-10 align-self-center">
              <span className="fw-bold remove-link">Danh sách nhóm</span>
            </div>
          </div>
        </Link>
        <Link to="/main-chat/friends/invites">
          <div className="nav-clicked row height-sm" tabIndex="3">
            <div className="col-2 align-self-center">
              <img src={icInviteList} alt="icInvite" />
            </div>
            <div className="col-10 align-self-center">
              <span className="fw-bold remove-link">Lời mời kết bạn</span>
            </div>
          </div>
        </Link>
      </div>
      {/* Phần này sẽ thay đổi components */}
      <Outlet />
    </>
  );
}

export default MainFriend;
