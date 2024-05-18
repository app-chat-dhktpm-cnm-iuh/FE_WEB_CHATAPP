import React, { useState } from "react";
import useValidateRegisterPhone from "../../js/useValidateRegisterPhone";

const RegisterPhone = ({ setStep, user, setUser }) => {
  let { isValid, checkPhoneNumberValid } = useValidateRegisterPhone();

  const [isAgree, setIsAgree] = useState(false);

  const handleSetPhone = (e) => {
    setUser({
      ...user,
      phone: checkPhoneNumberValid(e.target.value),
    });
  };

  const handleAgree = () => {
    setIsAgree(!isAgree);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep((step) => step + 1);
  };

  return (
    <form action="" method="post">
      <h3 className="text-green-bold text-center mb-4">Số điện thoại</h3>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSetPhone}
          //   value={valuePhone}
          className="form-control mb-2"
          name="phone"
          placeholder="Số điện thoại"
        />
      </div>
      {!isValid && user.phone != null && (
        <div className="text-danger fst-italic">Số điện thoại không hợp lệ</div>
      )}
      <div className="form-group text-center">
        <input
          type="button"
          id="btn-light-green"
          disabled={!isAgree || !isValid}
          className="form-control"
          value="Tiếp tục"
          onClick={handleSubmit}
        />
      </div>

      <div className="cbx-row">
        <input
          id="cbxConfirm"
          type="checkbox"
          checked={isAgree}
          onChange={handleAgree}
        />
        <label htmlFor="cbxConfirm">
          Tôi đồng ý với các điều khoản sử dụng
        </label>
      </div>
    </form>
  );
};

export default RegisterPhone;
