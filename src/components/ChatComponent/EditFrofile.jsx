import React, { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../../thunks/userThunk";
import ReactDatePicker from "react-datepicker";

const EditFrofile = ({ isOpen, setIsOpen }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [userEdit, setUserEdit] = useState({
    name: "",
    gender: true,
    date_of_birth: Date.now(),
  });

  useEffect(() => {
    setUserEdit({
      name: currentUser?.name,
      gender: currentUser?.gender,
      date_of_birth: currentUser?.date_of_birth,
    });
  }, [currentUser]);

  const handleSetEdit = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetDate = (date) => {
    setUserEdit({
      ...userEdit,
      date_of_birth: date,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    let submitEditUser = {
      ...userEdit,
      user_id: currentUser.user_id,
      role: currentUser.role,
    };
    const data = await dispatch(editUserThunk(submitEditUser));
    if (data == null) return;
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      className="w-30 h-70 outline-none position-absolute top-50 start-50 center-absolute rounded border bg-white p-3 d-flex flex-column gap-2"
      overlayClassName="bg-rgba-white z-1"
    >
      <form className="w-100 h-100" onSubmit={handleSubmitEdit}>
        <div className="h-90">
          <div className="form-group w-100 d-flex flex-column gap-2">
            <label htmlFor="name">Tên hiển thị</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userEdit.name}
              onChange={handleSetEdit}
              className="form-control mb-2 w-100"
              placeholder="Tên tài khoản"
            />
          </div>
          <div className="form-group w-100 d-flex flex-column ">
            <label>Giới tính</label>
            <div className="form-group w-100 d-flex gap-5">
              <div className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  id="man"
                  name="gender"
                  value={true}
                  onChange={handleSetEdit}
                  defaultChecked={userEdit?.gender == true}
                />
                <label htmlFor="man">Nam</label>
              </div>
              <div className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  id="woman"
                  name="gender"
                  value={false}
                  onChange={handleSetEdit}
                  defaultChecked={userEdit?.gender == false}
                />
                <label htmlFor="woman">Nữ</label>
              </div>
            </div>
          </div>
          <div className="form-group w-100 d-flex flex-column gap-2">
            <label htmlFor="date-of-birth">Giới tính</label>
            {/* <input
              type="date"
              id="date-of-birth"
              name="date_of_birth"
              value={userEdit.date_of_birth}
              onChange={handleSetEdit}
              className="form-control mb-2"
              placeholder="Tên tài khoản"
            /> */}
            <ReactDatePicker
              selected={userEdit.date_of_birth}
              name="date_of_birth"
              dateFormat="dd-M-yyyy"
              onChange={handleSetDate}
            />
          </div>
        </div>
        <div className="w-100 height-sm border-top p-2 d-flex  align-items-center justify-content-end gap-1">
          <div
            className="cursor-pointer px-3 py-1 text-black fs-bold"
            onClick={() => setIsOpen(false)}
          >
            Huỷ bỏ
          </div>
          <input
            type="submit"
            value="Xác nhận"
            className="border-none outline-none cursor-pointer px-3 py-1 bg-success text-white fs-bold rounded"
          />
        </div>
      </form>
    </ReactModal>
  );
};

export default EditFrofile;
