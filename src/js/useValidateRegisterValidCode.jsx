import { useState } from "react";

function useValidateRegisterValidCode() {
    // State để lưu trữ giá trị của các field và thông báo lỗi tương ứng
    const [formData, setFormData] = useState({
        field1: '',
        field2: '',
        field3: '',
        ield4: '',
    });

    const [errors, setErrors] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
    });

  // Xử lý khi giá trị của một field khi thay đổi
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
        // Kiểm tra nếu giá trị nhập vào không phải là số
        if (!(/^\d+$/.test(value))) {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: 'Vui lòng chỉ nhập số',
        }));
        return;
        }

        // Kiểm tra độ dài của giá trị nhập vào bằng 1
        if (value.length !== 1) {
            //cập nhật state của error
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: 'Vui lòng chỉ nhập 1 số',
        }));
        } else {
            //cập nhật state của error
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
        }));
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        }
};
return {
    formData,
    errors,
    handleInputChange
}

//     const [isDisabled, setIsDisabled] = useState(false);
//     const [countdown, setCountdown] = useState(60);

//     // Hàm xử lý khi nhấn nút
//     const handleClick = () => {
//     // Kiểm tra nếu đã bị vô hiệu hóa, không làm gì cả
//     if (isDisabled) {
//         return;
//     }

//     // Vô hiệu hóa nút
//     setIsDisabled(true);
//     };

//     // Thiết lập hiệu ứng đếm ngược
//     useEffect(() => {
//     let timer = null;

//     // Bắt đầu đếm ngược nếu nút đã được nhấn
//     if (isDisabled) {
//         timer = setInterval(() => {
//             setCountdown((prevCountdown) => prevCountdown - 1);
//         }, 1000);
//     }

//     // Dừng đếm ngược khi hết thời gian
//     if (countdown === 0) {
//         clearInterval(timer);
//         setIsDisabled(false);
//         setCountdown(60);
//     }

//     // Cleanup
//     return () => clearInterval(timer);
// }, [isDisabled, countdown]);
}
export default useValidateRegisterValidCode;