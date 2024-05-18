import React from "react";
import useValidateRegisterName from "../../js/useValidateRegisterName";

const RegisterInfo = ({ setStep, user, setUser }) => {
  const { valueUserName, handleAccountNameChange, renderError } =
    useValidateRegisterName();


  const handleSetInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const isSetInfo = () => {
    return user.name  && user.gender && user.date_of_birth
  }

  return (
    <form action="" method="post">
      <h3 className="text-green-bold text-center mb-4">Tên tài khoản</h3>

      <div className="form-group">
        <input
          type="text"
          //value={valueUserName}
          onChange={handleSetInfo}
          name="name"
          className="form-control mb-2"
          placeholder="Tên tài khoản"
        />
      </div>
      <div className="form-group d-flex gap-5">
        <div className="d-flex align-items-center gap-1">
          <input onChange={handleSetInfo} type="radio" id="man" name="gender" value="Nam" /> {" "}
          <label htmlFor="man">Nam</label>
        </div>
        <div className="d-flex align-items-center gap-1">
          <input onChange={handleSetInfo} type="radio" id="woman" name="gender" value="Nữ" /> {" "}
          <label htmlFor="woman">Nữ</label>
        </div>
      </div>
      <div className="form-group ">
        <input
          type="date"
          //value={valueUserName}
          onChange={handleSetInfo}
          name="date-of-birth"
          className="form-control mb-2"
        />
      </div>

      <div className="form-group text-center">
        <input
          disabled={!isSetInfo()}
          type="submit"
          id="btn-light-green"
          className="form-control"
          value="Tiếp tục"
          onClick={() => setStep((step) => step + 1)}
        />
      </div>
      <br />
      <div className="text-start mb-1">
        <span className="text-black-bold">Lưu ý:</span>
      </div>

      <div className="form-group">
        <span>Tên tài khoản phải từ 2-40 kí tự</span>
        <br />
        <span>
          Tên tài khoản nên là tên thật để bạn bè dễ dàng tìm kiếm bạn
        </span>
      </div>
    </form>
  );
};

export default RegisterInfo;
