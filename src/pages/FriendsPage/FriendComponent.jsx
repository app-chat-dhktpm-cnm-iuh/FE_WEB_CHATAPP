import icFriendList from "../../assets/iconFriendList.svg";

import FriendPageItem from "../../components/FriendsPage/FriendPageItem";

import { getFriends } from "../../api/friendApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function FriendComponent() {
  const [friendList, setFriendList] = useState();

  let { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser == null) return;
    getFriendList(currentUser.phone);
  }, [currentUser]);

  const getFriendList = async (phone) => {
    const data = await getFriends(phone);
    setFriendList([...data.data]);
  };

  return (
    <>
      <div className="col-8 bg-gray">
        <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img
              src={icFriendList}
              className="align-self-center"
              width="30"
              height="30"
            />
            <div className="font-weight-bold align-self-center text-padding">
              Danh sách bạn bè
            </div>
          </div>
        </div>

        <div className="row height-sm">
          <h6 className="align-self-center">Bạn bè ({friendList?.length || 0})</h6>
        </div>
        <div className="overflow-y-auto height-lg bg-white mx-2 rounded-top-cus p-3 text-truncate">
          {friendList?.map((friend) => (
            <FriendPageItem key={friend.phone} name={friend.name} />
          ))}
        </div>
      </div>
    </>
  );
}
export default FriendComponent;
