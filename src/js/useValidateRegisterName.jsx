import { useState } from "react";

function useValidateRegisterName() {
    const [isValidText, setIsValidText] = useState(true);
    const [isNumberText, setIsNumberText] = useState(false);
    const [isCharacterText, setIsCharacterText] = useState(false);
    const [valueUserName, setValueUserName] = useState('');


    const accountNameRegex = /^[a-zA-Z_]{2,40}$/; // Allows alphanumeric characters and underscores, with a length of 2 to 40 characters
    const numberRegex = /[0-9_]/;
    const characterRegex = /[!@#$%^&*(),.?":{}|<>_=+-;]/;

    const handleAccountNameChange = (valueUserName) => {
        const value = valueUserName.target.value;
        setValueUserName(value)
        
        if(value == "") {
            setIsValidText(true);
        } else if(numberRegex.test(value)) {
            setIsNumberText(true);
            setIsCharacterText(false)
            setIsValidText(false);
        } else if(characterRegex.test(value)) {
            console.log(characterRegex.test(value))
            setIsCharacterText(true);
            setIsNumberText(false)
            setIsValidText(false);
        } else if(accountNameRegex.test(value)) {
            setIsValidText(true);
            setIsCharacterText(false);
            setIsNumberText(false)
        } else {
            setIsValidText(false);
            setIsCharacterText(false);
            setIsNumberText(false)
        }

    };

    const renderError = () => {
        if(isValidText) {
            return <></>;
        } else if(isNumberText){
            return <><span className="text-danger">Tên tài khoản không được chứa số</span></>
        } else if(isCharacterText){
            return <><span className="text-danger">Tên tài khoản không được chứa kí tự đặc biệt</span></>
        } else return <><span className="text-danger">Tên tài khoản không hợp lệ</span></>
    }
    return {
        valueUserName,
        handleAccountNameChange,
        renderError
    }
}
export default useValidateRegisterName;