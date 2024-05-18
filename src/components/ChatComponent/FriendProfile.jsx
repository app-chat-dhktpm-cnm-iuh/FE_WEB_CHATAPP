import React, { useContext, useState } from "react";
import icAva from "../../assets/btnProfile.svg";
import icAddAvatar from "../../assets/iconAddAvatar.svg";
import background from "../../assets/background.svg";
import ReactModal from "react-modal";
import EditFrofile from "./EditFrofile";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "../../firebase/firebase";
import { editUserThunk } from "../../thunks/userThunk";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const FriendProfile = ({ isOpen, setIsOpen }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSetAvatar = (e) => {
    if (e.target.files.length == 0) return;
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(e.target.files[0].type))
      return toast.error("Vui lòng chọn định đạng file phù hợp.");
    setIsLoading(true);
    let storageRef = ref(
      storage,
      `avatarImages/${e.target.files[0].name + v4()}`
    );
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => handleSubmitAvatar(url));
    });
  };

  const handleSubmitAvatar = async (url) => {
    console.log(url);

    let submitAvatar = {
      user_id: currentUser.user_id,
      role: currentUser.role,
      avatar_url: url,
    };

    const data = await dispatch(editUserThunk(submitAvatar));
    setIsLoading(false);
    if (data.payload.data == null)
      return toast.error("Đăng tải ảnh đại diện thất bại, vui lòng thử lại.");
    return toast.success("Đăng tải ảnh đại diện thành công.");
  };

  return (
    <>
      <EditFrofile isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        className="w-30 h-70 position-absolute top-50 start-50 center-absolute border rounded outline-none"
      >
        <div className="w-100 h-100 d-flex flex-column gap-1 rounded w-25 height-lg bg-gray overflow-hidden">
          <div className="height-sm bg-white d-flex align-items-center justify-content-between p-3">
            <div className="fs-6 fw-bold">Thông tin tài khoản</div>
            <div
              className="w-10 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Đóng
            </div>
          </div>
          <div className="d-flex flex-column h-50 bg-white">
            <div className="bg-secondary overflow-hidden">
              <img src={background} />
            </div>
            <div className="h-25 d-flex gap-3 align-items-center overflow-y-visible px-3">
              <div className="position-relative" style={{ height: "80px" }}>
                <img
                  style={{ height: "80px", width: "80px" }}
                  className="rounded-circle overflow-hidden bg-white border"
                  src={currentUser.avatar_url || icAva}
                />
                <label
                  htmlFor="uploadAvatar"
                  className={`${
                    isLoading ? "opacity-25" : "opacity-100 cursor-pointer"
                  }`}
                >
                  <div
                    className="d-flex align-items-center justify-content-center text-center  position-absolute top-50 end-0 border rounded-circle bg-white"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img src={icAddAvatar} />
                  </div>
                  <input
                    disabled={isLoading}
                    className="d-none"
                    id="uploadAvatar"
                    type="file"
                    onChange={handleSetAvatar}
                  />
                </label>
              </div>
              <div className="fw-medium">{currentUser?.name}</div>
            </div>
          </div>
          <div className="h-40 bg-white p-3">
            <div className="fw-bold fs-4">Thông tin cá nhân</div>
            <div className=" d-flex flex-column gap-1">
              <div className="w-100 d-flex align-items-center justify-content-between">
                <div>Ngày sinh:</div>
                <div
                  className={`${
                    currentUser?.date_of_birth == null && "italic"
                  }`}
                >
                  {moment(currentUser?.date_of_birth).format("DD/MM/YYYY") ||
                    "(Chưa tạo)"}
                </div>
              </div>

              <div className="w-100 d-flex align-items-center justify-content-between">
                <div>Giới tính:</div>
                <div className={`${currentUser?.gender == null && "italic"}`}>
                  {currentUser?.gender == true ? "Nam" : "Nữ" || "(Chưa tạo)"}
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 p-1 height-sm bg-white d-flex align-items-center justify-content-center">
            <div
              onClick={() => setIsOpenEdit(true)}
              className="align-self-center w-90 rounded hover-gray text-center fs-5 fw-bold cursor-pointer"
            >
              Sửa thông tin
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default FriendProfile;
