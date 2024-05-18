import React, { useContext, useEffect, useState } from "react";
import useDebounce from "../../js/useDebounce";
import { getUserDetails } from "../../api/userApi";
import icAddFriend from "../../assets/iconAddFriend.svg";
import icAva from "../../assets/btnProfile.svg";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../api/friendApi";
import { SocketContext } from "../../context/SocketContext";

const FriendSearch = ({
  setCurrentConversationId,
  setIsSearchFriend,
  search,
}) => {
  let debounceSearch = useDebounce(search);

  let { currentUser } = useContext(AuthContext);

  let { client, sendFriendRequest } = useContext(SocketContext);

  let [friendList, setFriendList] = useState();

  const [isAdd, setIsAdd] = useState(false);

  const [friend, setFriend] = useState();

  const [role, setRole] = useState();

  const roleEnum = {
    myself: "BẠN",
    friend: "BẠN BÈ",
    stranger: "NGƯỜI LẠ",
  };

  useEffect(() => {
    const getFriendList = async (currentUser) => {
      const data = await getFriends(currentUser.phone);
      setFriendList(data.data);
    };

    getFriendList(currentUser);
  }, [debounceSearch, currentUser]);

  useEffect(() => {
    const getFriend = async (debounceSearch) => {
      const data = await getUserDetails(debounceSearch);
      if (data.data == "") return;
      setFriend(data.data);
      checkUserFriend(data.data);
    };

    getFriend(debounceSearch);
  }, [debounceSearch]);

  const checkUserFriend = (friendData) => {
    if (friendData.phone == currentUser.phone)
      return setRole(roleEnum.myself);
    if (friendList == null) return;
    const isFriendContained = friendList.some(
      (friend) => friend.phone == friendData.phone
    );
    setRole(isFriendContained ? roleEnum.friend : roleEnum.stranger);
  };

  const handleAddFriend = (friend) => {
    if (friend == null) return;
    let request = {
      sender_phone: currentUser.phone,
      receiver_phone: friend.phone,
      aceppted: false,
    };

    sendFriendRequest(request, client);
    setIsAdd(true)
  };

  return (
    <div className="row overflow-y-auto mh-90">
      <div className="w-100 d-flex justify-content-end">
        <div
          className="cursor-pointer text-success"
          onClick={() => setIsSearchFriend(false)}
        >
          Đóng
        </div>
      </div>
      <div className="w-100 d-flex flex-column gap-2">
        {friend && debounceSearch ? (
          <>
            <div className="w-100">{role}</div>
            <div
              className="row w-100"
              onClick={() => setCurrentConversationId()}
            >
              <div className="col-2 align-self-center">
                <img src={icAva} />
              </div>
              <div className="col-8 align-self-center d-flex flex-column">
                <div className="fw-bold">{friend.phone}</div>
                <div>{friend.name}</div>
              </div>
              {role && (
                <div
                  className="col-1 align-self-center"
                  onClick={() => handleAddFriend(friend)}
                >
                  <button className="btn btn-link" disabled={isAdd}>
                    <img className={`${isAdd ? "opacity-25" : "opacity-100"}`} src={icAddFriend} />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="align-self-center text-center">Không có kết quả.</div>
        )}
      </div>
    </div>
  );
};

export default FriendSearch;
