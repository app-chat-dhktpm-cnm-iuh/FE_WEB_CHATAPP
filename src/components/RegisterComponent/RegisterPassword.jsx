import React, { useState } from "react";
import useValidateRegisterPassword from "../../js/useValidateRegisterPassword";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

const RegisterPassword = ({ setStep, user, setUser }) => {
  const {
    inputValue,
    confirmPassword,
    error,
    errorcon,
    handleInputChange,
    handleConfirmPasswordChange,
  } = useValidateRegisterPassword();

  const navigate = useNavigate();

  const [rePassword, setRePassword] = useState("");

  const handleSetPassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleSetRePassword = (e) => {
    setRePassword(e.target.value);
  };

  const isRePasswordValid = () => {
    return user.password === rePassword;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isRePasswordValid) return;
    let data = await registerUser(user);
    if (data.data == null) return;
    setStep(0);
    navigate("/");
  };

  return (
    <form action="" method="post">
      <h3 className="text-green-bold text-center mb-4">Thiết lập mật khẩu</h3>

      <div className="form-group">
        <input
          type="password"
          className="form-control mb-2"
          name="password"
          placeholder="Mật khẩu"
          //value={inputValue}
          onChange={handleSetPassword}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="confirmpassword"
          className="form-control"
          placeholder="Nhập lại mật khẩu"
          onChange={handleSetRePassword}
        />
        {errorcon && <p style={{ color: "red" }}>{errorcon}</p>}
      </div>

      <div className="text-end mb-3 cbx-row">
        <input type="checkbox" id="showpassword" name="showpassword" />
        <label htmlFor="showpassword" className="label-checkbox-regis4">
          Hiển thị mật khẩu
        </label>
      </div>

      <div className="form-group text-center">
        <input
          type="submit"
          id="btn-light-green"
          className="form-control"
          value="Tiếp tục"
          onClick={handleRegister}
        />
      </div>
    </form>
  );
};

export default RegisterPassword;
