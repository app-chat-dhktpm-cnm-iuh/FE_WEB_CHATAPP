import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../thunks/authThunk";
import useValidateRegisterPhone from "../../js/useValidateRegisterPhone";
import useValidateRegisterPassword from "../../js/useValidateRegisterPassword";
import icBack from "../../assets/iconBack.svg";
import { SocketContext } from "../../context/SocketContext";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const {
    inputValue,
    confirmPassword,
    error,
    errorcon,
    handleInputChange,
    handleConfirmPasswordChange,
  } = useValidateRegisterPassword();
  const {
    valuePhone,
    renderEr,
    renderErCB,
    handlePhoneNumberChange,
    checkValidData,
  } = useValidateRegisterPhone();
  const { messageRequest, register } = useContext(SocketContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const userLoginData = {
      //  phone: valuePhone,
      //  password: inputValue
      phone: document.getElementById("phonenum").value,
      password: document.getElementById("pass").value,
    };
    const data = await dispatch(loginThunk(userLoginData));
    if (data.payload == null) {
      toast.error(
        "Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác"
      );
    }
    // register();
    else {
      toast.success("Đăng nhập thành công")
      navigate("/main-chat/chat");
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <div className="col-6 align-self-center">
        <div className="d-flex justify-content-center">
          <form method="post" onSubmit={handleSubmitLogin}>
            <h3 className="text-green-bold text-center mb-4">Đăng nhập</h3>

            <div className="form-group">
              <input
                id="phonenum"
                type="text"
                className="form-control mb-2"
                name="phone"
                placeholder="Số điện thoại"
                // onChange={handlePhoneNumberChange}
                // value={valuePhone}
              />
            </div>

            <div className="form-group">
              <input
                id="pass"
                type="password"
                name="password"
                className="form-control"
                placeholder="Mật khẩu"
                // value={inputValue} onChange={handleInputChange}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="text-end mb-3">
              <a
                href="#"
                className="text-green-bold link-text-decoration"
                onClick={() => navigate("/register-password")}
              >
                Quên mật khẩu ?
              </a>
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="btn-dark-green"
                className="form-control mb-2"
                value={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                disabled={isLoading}
              />
            </div>

            <div className="form-group text-center">
              <input
                type="button"
                id="btn-light-green"
                className="form-control"
                value="Đăng ký"
                onClick={() => navigate("/register")}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
