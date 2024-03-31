import useValidateRegisterPhone from "../js/useValidateRegisterPhone";
import icBack from '../assets/iconBack.svg'
import { useNavigate } from 'react-router-dom';

function RegisterPhone() {
  const { valuePhone, renderEr, renderErCB, handlePhoneNumberChange, checkValidData } = useValidateRegisterPhone();
  const navigate = useNavigate();
  return (
    <>
      <div className="col-6">
        <img width="40" src={icBack} className="btnBack" onClick={() => navigate("/register-name")} />


        <div className="d-flex justify-content-center">
          <form action="" method="post">
            <h3 className="text-green-bold text-center mb-4">Số điện thoại</h3>

            <div className="form-group">
              <input
                type="text"
                onChange={handlePhoneNumberChange}
                value={valuePhone}
                className="form-control mb-2"
                name="phone"
                placeholder="Số điện thoại"
              />
              {renderEr()}
            </div>

            <div className="form-group text-center">
              <input
                type="button"
                onClick={checkValidData}
                id="btn-light-green"
                className="form-control"
                value="Tiếp tục"
              />
            </div>

            <div className="cbx-row">
              <input id="cbxConfirm" type="checkbox" />
              <label htmlFor="cbxConfirm">
                Tôi đồng ý với các điều khoản sử dụng
              </label>
            </div>
            {renderErCB()}
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPhone;
