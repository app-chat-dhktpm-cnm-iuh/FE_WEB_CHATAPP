import { useState } from "react";

function useValidateRegisterPhone() {
    const [isValid, setIsValid] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [valuePhone, setValuePhone] = useState('');

    const checkValidData = (valuePhone) => {
        var value = valuePhone.target.value;
        setValuePhone(value)
        const checkCBConfirm = document.getElementById("cbxConfirm");

        function checkedValid() {
            if (!checkCBConfirm.checked) {
                setIsChecked(false);
            } else setIsChecked(true);
        }

        if (value == "") {
            setIsValid(false);
            checkedValid();
        } else if (!isValid) {
            setIsChecked(false);
            checkedValid();
        } else if (isValid) {
            checkedValid();
        } else {
            setIsValid(true);
            setIsChecked(true);
        }
    };

    const handlePhoneNumberChange = (valuePhone) => {
        var value = valuePhone.target.value;

        if (value == "") {
            setIsValid(true);
        } else if (validator.isMobilePhone(value, "vi-VN")) {
            setIsValid(true);
        } else setIsValid(false);
    };

    const renderEr = () => {
        if (isValid) {
            return <></>;
        } else
            return (
                <>
                    <span className="text-danger">số điện thoại không hợp lệ</span>
                </>
            );
    };

    const renderErCB = () => {
        if (isChecked) {
            return <></>;
        } else
            return (
                <>
                    <span className="text-danger">bạn phải đồng ý để tiếp tục</span>
                </>
            );
    };

    return {
        valuePhone,
        renderEr,
        renderErCB,
        handlePhoneNumberChange,
        checkValidData
    }
}
export default useValidateRegisterPhone;