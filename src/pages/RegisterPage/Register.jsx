import useValidateRegisterPassword from "../../js/useValidateRegisterPassword";
import icBack from "../../assets/iconBack.svg";
import { useNavigate } from "react-router-dom";

import RegisterInfo from "../../components/RegisterComponent/RegisterInfo";
import RegisterPassword from "../../components/RegisterComponent/RegisterPassword";
import RegisterPhone from "../../components/RegisterComponent/RegisterPhone";
import RegisterValidationCode from "../../components/RegisterComponent/RegisterValidationCode";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    phone: null,
    name: null,
    date_of_birth: null,
    gender: null,
    password: null,
    role: "USER",
  });

  return (
    <>
    <Toaster position="top-center" />
      <div className="col-6">
        <div className="height-sm">
          {step > 0 && (
            <img
              width="40"
              src={icBack}
              className="btnBack cursor-pointer"
              onClick={() => setStep(step - 1)}
            />
          )}
        </div>

        <div className="d-flex justify-content-center">
          {step == 0 && (
            <RegisterPhone setStep={setStep} user={user} setUser={setUser} toast={toast} />
          )}
          {step == 1 && (
            <RegisterInfo setStep={setStep} user={user} setUser={setUser} />
          )}
          {step == 2 && (
            <RegisterValidationCode setStep={setStep} user={user} toast={toast} />
          )}
          {step == 3 && (
            <RegisterPassword setStep={setStep} user={user} setUser={setUser} toast={toast} />
          )}
        </div>
      </div>
    </>
  );
}
export default Register;
