import { useState } from "react";

function useValidateRegisterPassword() {
    // State lưu trữ giá trị của input Password
    const [inputValue, setInputValue] = useState('');

    // State lưu trữ giá trị của input  Confirm Password
    const [confirmPassword, setConfirmPassword] = useState('');

    // State lưu trữ thông báo lỗi Input Password
    const [error, setError] = useState('');

    // State lưu trữ thông báo lỗi Confirm Password
    const [errorcon, setErrorcon] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[()+\-\/!@#$%^&*]).{6,}$/;



    
    // Xử lý khi giá trị khi input thay đổi
    const handleInputChange = (inputValue) => {
      setInputValue(inputValue.target.value);
    // Validate giá trị nhập vào
    if (!passwordRegex.test(inputValue.target.value)) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
    } else {
      setError('');
    }
  };

    // Xử lý khi giá trị của input confirm password thay đổi
  const handleConfirmPasswordChange = (confirmPassword) => {     
    setConfirmPassword(confirmPassword.target.value); 
    // Kiểm tra confirm password
    if (confirmPassword.target.value !== inputValue) {
      setErrorcon('Mật khẩu xác nhận không khớp');
    } else {
      setErrorcon('');
    }
  };

  return {
      error,
      errorcon,
      inputValue,
      confirmPassword,
      handleConfirmPasswordChange,
      handleInputChange
  }
}

export default useValidateRegisterPassword;