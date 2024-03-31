import useValidateRegisterName from "../js/useValidateRegisterName";
import { useNavigate } from 'react-router-dom';
import icBack from '../assets/iconBack.svg'

function RegisterUserName() {
  const { valueUserName, handleAccountNameChange, renderError } = useValidateRegisterName();
  const navigate = useNavigate();
  return (
    <>
      <div className="col-6">
        <img width="40" src={icBack} className="btnBack" onClick={() => navigate("/login")} />

        <div className="d-flex justify-content-center">
          <form action="" method="post">
            <h3 className="text-green-bold text-center mb-4">Tên tài khoản</h3>

            <div className="form-group">
              <input
                type="text"
                value={valueUserName}
                onChange={handleAccountNameChange}
                className="form-control mb-2"
                placeholder="Tên tài khoản"
              />
              {renderError()}
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="btn-light-green"
                className="form-control"
                value="Tiếp tục"
              />
            </div>
            <br />
            <div className="text-start mb-1">
              <span className="text-black-bold">Lưu ý:</span>
            </div>

            <div className="form-group">
              <span>Tên tài khoản phải từ 2-40 kí tự</span>
              <br />
              <span>
                Tên tài khoản nên là tên thật để bạn bè dễ dàng tìm kiếm bạn
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default RegisterUserName;