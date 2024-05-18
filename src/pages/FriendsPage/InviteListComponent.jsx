import icInviteList from "../../assets/iconInviteList.svg";
import { getFriendRequest } from "../../api/friendApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import icAva from "../../assets/btnProfile.svg";

function InviteListComponent() {
  const [requestList, setRequestList] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { newFriendRequest, client, replyFriendRequest, reply } =
    useContext(SocketContext);

  useEffect(() => {
    const getRequestList = async (currentUser) => {
      if (currentUser == null) return;
      const data = await getFriendRequest(currentUser.phone);
      setRequestList(data.data);
    };
    getRequestList(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const updateRequestList = (newFriendRequest) => {
      if (newFriendRequest == null) return;
      setRequestList((pre) => [...pre, newFriendRequest]);
    };

    updateRequestList(newFriendRequest);
  }, [currentUser, newFriendRequest]);

  useEffect(() => {
    const filterRequestedFriend = (reply) => {
      if (reply == null) return;
      setRequestList((pre) =>
        pre.filter((request) => request.id != reply.id)
      );
    };

    filterRequestedFriend(reply);
  }, [reply]);

  const handleAccept = (request) => {
    if (request == null) return;
    let dataRequest = {
      ...request,
      aceppted: true,
    };

    replyFriendRequest(dataRequest, client);
  };

  const handleCancel = (request) => {
    if (request == null) return;
    let dataRequest = {
      ...request,
      aceppted: false,
    };

    replyFriendRequest(dataRequest, client);
  };

  return (
    <>
      <div className="col-8 bg-gray">
        <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img
              src={icInviteList}
              className="align-self-center"
              width="30"
              height="30"
            />
            <div className="font-weight-bold align-self-center text-padding">
              Lời mời kết bạn
            </div>
          </div>
        </div>
        <div className="row height-sm">
          <h6 className="font-weigth-bold align-self-center">
            Lời mời kết bạn ({requestList?.length})
          </h6>
        </div>
        <div className="height-lg bg-white mx-2 rounded-top-cus p-3">
          {requestList?.length > 0 ? (
            requestList.map((request, index) => (
              <div
                key={index}
                className=" height-sm d-flex align-items-center border-bottom"
              >
                <div className="col-1">
                  <img src={icAva} />
                </div>

                <div className="col-9 fw-bold text-truncate">
                  {request.sender_phone}
                </div>
                <div className="col-2 cursor-pointer d-flex justify-content-between gap-1">
                  <button
                    onClick={() => handleAccept(request)}
                    className="w-50 bg-success text-white rounded-pill"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => handleCancel(request)}
                    className="w-50 bg-danger text-white rounded-pill"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Không có bạn bè để hiển thị.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default InviteListComponent;
