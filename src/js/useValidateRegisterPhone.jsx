import { useEffect, useState } from "react";
import validator from "validator";

function useValidateRegisterPhone() {
  const [isValid, setIsValid] = useState(true);

  const checkPhoneNumberValid = (phone) => {
    setIsValid(phone != null && validator.isMobilePhone(phone, "vi-VN"));
    return phone;
  };

  return { isValid, checkPhoneNumberValid };

  //   const checkValidData = (valuePhone) => {
  //     var value = valuePhone.target.value;
  //     setValuePhone(value);
  //     const checkCBConfirm = document.getElementById("cbxConfirm");

  //     function checkedValid() {
  //       if (!checkCBConfirm.checked) {
  //         setIsChecked(false);
  //       } else setIsChecked(true);
  //     }

  //     if (value == "") {
  //       setIsValid(false);
  //       checkedValid();
  //     } else if (!isValid) {
  //       setIsChecked(false);
  //       checkedValid();
  //     } else if (isValid) {
  //       checkedValid();
  //     } else {
  //       setIsValid(true);
  //       setIsChecked(true);
  //     }
  //   };

  //   const handlePhoneNumberChange = (valuePhone) => {
  //     var value = valuePhone.target.value;
  //     setValuePhone(valuePhone.target.value);

  //     if (value == "") {
  //       setIsValid(true);
  //     } else if (validator.isMobilePhone(value, "vi-VN")) {
  //       setIsValid(true);
  //     } else setIsValid(false);

  //     return value;
  //   };

  //   const renderEr = () => {
  //     if (isValid) {
  //       return <></>;
  //     } else
  //       return (
  //         <>
  //           <span className="text-danger fst-italic">Số điện thoại không hợp lệ</span>
  //         </>
  //       );
  //   };

  //   const renderErCB = () => {
  //     if (isChecked) {
  //       return <></>;
  //     } else
  //       return (
  //         <>
  //           <span className="text-danger">Bạn phải đồng ý để tiếp tục</span>
  //         </>
  //       );
  //   };

  //   return {
  //     valuePhone,
  //     renderEr,
  //     renderErCB,
  //     handlePhoneNumberChange,
  //     checkValidData,
  //   };
}
export default useValidateRegisterPhone;
