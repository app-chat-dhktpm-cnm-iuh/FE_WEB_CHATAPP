import useValidateRegisterPassword from "../js/useValidateRegisterPassword";
import icBack from '../assets/iconBack.svg'
import { useNavigate } from 'react-router-dom';

function RegisterPassword() {
    const { inputValue, confirmPassword, error, errorcon, handleInputChange, handleConfirmPasswordChange } = useValidateRegisterPassword();
    const navigate = useNavigate();
    return (
        <>
            <div className="col-6">
                <img width="40" src={icBack} className="btnBack" onClick={() => navigate("/register-validcode")} />

                <div className="d-flex justify-content-center">
                    <form action="" method="post">
                        <h3 className="text-green-bold text-center mb-4">Thiết lập mật khẩu</h3>

                        <div className="form-group">
                            <input type="password" className="form-control mb-2" name="password" placeholder="Mật khẩu" value={inputValue} onChange={handleInputChange} />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>

                        <div className="form-group">
                            <input type="password" name="confirmpassword" className="form-control" placeholder="Nhập lại mật khẩu" value={confirmPassword}
                                onChange={handleConfirmPasswordChange} />
                            {errorcon && <p style={{ color: 'red' }}>{errorcon}</p>}
                        </div>

                        <div className="text-end mb-3 cbx-row">
                            <input type="checkbox" id="showpassword" name="showpassword" />
                            <label htmlFor="showpassword" className="label-checkbox-regis4">Hiển thị mật khẩu</label>
                        </div>

                        <div className="form-group text-center">
                            <input type="submit" id="btn-light-green" className="form-control" value="Tiếp tục" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default RegisterPassword;