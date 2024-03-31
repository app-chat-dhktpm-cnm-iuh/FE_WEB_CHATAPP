import useValidateRegisterValidCode from "../js/useValidateRegisterValidCode"
import icBack from '../assets/iconBack.svg'
import { useNavigate } from 'react-router-dom';
function RegisterValidationCode() {
    const { formData, errors, handleInputChange } = useValidateRegisterValidCode();
    const navigate = useNavigate();
    return (
        <>
            <div className="col-6">
                <img width="40" src={icBack} className="btnBack" onClick={() => navigate("/register-phone")} />

                <div className="d-flex justify-content-center">
                    <form action="" method="post">
                        <h3 className="text-green-bold text-center mb-3">Mã xác thực</h3>
                        <div className="mb-4 text-center">Mã xác thực đã được gửi tới 09***84</div>
                        <div className="form-group-otp">
                            <div className="row">
                                <div className="col-sm">
                                    <input type="text" className="form-control otp" name="field1" maxLength={1} value={formData.field1} onChange={handleInputChange} />
                                    {errors.field1 && <p style={{ color: 'red' }}>{errors.field1}</p>}
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control otp" name="field2" maxLength={1} value={formData.field2} onChange={handleInputChange} />
                                    {errors.field2 && <p style={{ color: 'red' }}>{errors.field2}</p>}
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control otp" name="field3" maxLength={3} value={formData.field3} onChange={handleInputChange} />
                                    {errors.field3 && <p style={{ color: 'red' }}>{errors.field3}</p>}
                                </div>
                                <div className="col-sm">
                                    <input type="text" className="form-control otp" name="field4" maxLength={1} value={formData.field4} onChange={handleInputChange} />
                                    {errors.field4 && <p style={{ color: 'red' }}>{errors.field4}</p>}
                                </div>
                            </div>
                        </div>
                        {/* 
                        <div className="text-end-re mb-3">
                            <span className="text-register-3-2">Không nhận được mã? </span>
                            <button href="" className="text-green-bold link-text-decoration btn-gis3" onClick={handleClick} disabled={isDisabled}>Gửi lại mã?</button>
                        </div>
                        <div className="text-end-re mb-3 txt-otp">
                            {isDisabled && <p>OTP gửi lại sau: {countdown} giây</p>}
                        </div> */}
                        <div className="form-group text-center">
                            <input type="submit" id="btn-light-green" className="form-control mt-4" value="Nhập mã" />
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}
export default RegisterValidationCode;