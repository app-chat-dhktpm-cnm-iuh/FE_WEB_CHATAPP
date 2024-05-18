import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFriends } from "../../api/friendApi";
import icAva from "../../assets/btnProfile.svg";
import { getUserDetails } from "../../api/userApi";
import { SocketContext } from "../../context/SocketContext";
import useDebounce from "../../js/useDebounce";
import ReactModal from "react-modal";

const AddGroupChat = ({ isOpenAddGroup, setIsOpenAddGroup }) => {
  const { currentUser } = useContext(AuthContext);

  const { createGroupChat, client } = useContext(SocketContext);

  const [friendList, setFriendList] = useState([]);

  const [friendAddGroup, setFriendAddGroup] = useState([]);

  const [searchFriend, setSearchFriend] = useState();

  const [filterFriendList, setFilterFriendList] = useState([]);

  let debouncedSearch = useDebounce(searchFriend);

  useEffect(() => {
    const getFriendList = async (currentUser) => {
      if (debouncedSearch != null) return;
      if (currentUser == null) return;
      let data = await getFriends(currentUser.phone);
      setFriendList([...data.data]);
    };

    getFriendList(currentUser);
  }, [currentUser, debouncedSearch]);

  useEffect(() => {
    const findFriendFromName = (friendList, debouncedSearch) => {
      if (friendList.length == 0) return;
      if (debouncedSearch == null) setFilterFriendList([...friendList]);
      else
        setFilterFriendList(
          friendList.filter((friend) =>
            friend.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        );
    };

    findFriendFromName(friendList, debouncedSearch);
  }, [friendList, debouncedSearch]);

  const handleCheck = (e) => {
    let { checked, value } = e.target;

    if (checked) {
      setFriendAddGroup((pre) => [...pre, value]);
    } else {
      setFriendAddGroup((pre) => pre.filter((friend) => friend != value));
    }
  };

  const handleSetGroup = () => {
    let conversation = {
      title: "",
      creator_phone: currentUser.phone,
      members: [...friendAddGroup, currentUser.phone],
      messages: [],
      updated_at: Date.now(),
      deleteConversationUsers:[],
      _group: true,
    };

    setFriendAddGroup([]);
    createGroupChat(conversation, client);
    setIsOpenAddGroup(false);
  };

  const handleCancel = () => {
    setIsOpenAddGroup(false);
    setFriendAddGroup([]);
  };

  const handleChangeSearch = (e) => {
    setSearchFriend(e.target.value);
  };

  return (
    <ReactModal
     isOpen={isOpenAddGroup}
     onRequestClose={() => setIsOpenAddGroup(false)}
     className="w-50 h-90 position-absolute start-50 top-50 center-absolute  rounded border bg-white p-3"
    >
      <div className="h-100 mh-100 bg-white rounded p-3">
        <div className="w-100 height-sm d-flex justify-center align-items-center p-3 border border-dark rounded-pill">
          <input
            className="align-self-center w-100 border-none outline-none"
            placeholder="Tìm bạn ..."
            onChange={handleChangeSearch}
          />
        </div>

        <div className="height-sm d-flex align-items-center fw-bold">
          Đã chọn {friendAddGroup.length}/{friendList.length}
        </div>

        <div className="h-70 mh-70 overflow-y-auto">
          {filterFriendList.length > 0 ? (
            filterFriendList.map((friend) => (
              <div
                key={friend.phone}
                className="d-flex align-items-center justify-content-center py-1"
              >
                <div className="col-1 d-flex align-items-center justify-content-center">
                  <input
                    className="align-self-center"
                    type="checkbox"
                    checked={friendAddGroup.includes(friend.phone)}
                    onChange={handleCheck}
                    value={friend.phone}
                  />
                </div>
                <div className="col-1">
                  <img src={icAva} />
                </div>
                <div className="col-10">{friend.name}</div>
              </div>
            ))
          ) : (
            <div className="fst-italic align-self-center">
              Không có bạn bẻ để hiển thị.
            </div>
          )}
        </div>

        <div className="height-sm d-flex align-items-center justify-content-evenly">
          <input
            type="button"
            id="btn-light-green"
            disabled={friendAddGroup.length < 2}
            className="cursor-pointer w-25 rounded-pill"
            onClick={handleSetGroup}
            value={"Xác nhận"}
          />

          <input
            type="button"
            className="cursor-pointer w-25 rounded-pill border border-success text-center fs-5 text-success"
            onClick={handleCancel}
            value={"Huỷ bỏ"}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default AddGroupChat;
