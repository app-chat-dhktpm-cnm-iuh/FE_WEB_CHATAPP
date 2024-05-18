import React, { useEffect, useState } from "react";
import useValidateRegisterValidCode from "../../js/useValidateRegisterValidCode";
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";

const RegisterValidationCode = ({ setStep, user }) => {
  // const { formData, errors, handleInputChange } =
  //   useValidateRegisterValidCode();
  const [otp, setOtp] = useState("");

  const [otpPending, setOtpPending] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);

  const onCaptchaVerify = () => {
    if (window.recaptchaVerifier) return;
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-verifier",
      {
        size: "invisible",
        callback: (res) => {},
        "expired-callback": () => {
          console.log("Expired");
          sendOtp(false);
        },
      }
    );
  };

  const onSendOTP = () => {
    onCaptchaVerify();
    setSendOtp(true);

    const appVerifier = window.recaptchaVerifier;
    if (user.phone == null) return;

    let formatPhone = "+84" + user.phone.slice(1);
    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("Mã OTP được gửi thành công");
      })
      .catch((err) => console.log(err));
  };

  const onOTPVerify = () => {
    setOtpPending(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        toast.success("Xác nhận mã OTP thành công");
        setOtpPending(false);
        setStep((step) => step + 1);
      })
      .catch((err) => {
        setOtpPending(false);
        toast.error("Mã OTP sai, vui lòng nhập lại");
      });
  };

  return (
    <div>
      <Toaster />
      <div id="recaptcha-verifier"></div>
      <h3 className="text-green-bold text-center mb-3">Mã xác thực</h3>
      <div className="mb-4 text-center">Mã xác thực đã được gửi tới</div>
      <div className="form-group-otp">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus
          renderInput={(props) => (
            <input
              {...props}
              type="text"
              className="form-control w-50 otp"
              maxLength={1}
            />
          )}
        />
       
      </div>
      
      <div className="form-group text-center">
        <button
          id="btn-light-green"
          disabled={otpPending}
          className="form-control mt-4"
          onClick={onOTPVerify}
        >
          {otpPending ? "Đang xác nhận..." : "Xác nhận mã OTP "}
        </button>
      </div>

      <div className="form-group text-center">
        <button
          id="btn-light-green"
          className="form-control mt-4"
          disabled={sendOtp}
          value="Nhận mã OTP"
          onClick={onSendOTP}
        >
          Gửi mã OTP
        </button>
      </div>
    </div>
  );
};

export default RegisterValidationCode;
