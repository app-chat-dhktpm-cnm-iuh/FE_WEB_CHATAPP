function Login() {
  return (
    <>
      <div className="col-6 align-self-center">
        <div className="d-flex justify-content-center">
          <form action="" method="post">
            <h3 className="text-green-bold text-center mb-4">Đăng nhập</h3>

            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                name="phone"
                placeholder="Số điện thoại"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="password"
                className="form-control"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="text-end mb-3">
              <a href="#" className="text-green-bold link-text-decoration">
                Quên mật khẩu ?
              </a>
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="btn-dark-green"
                className="form-control mb-2"
                value="Đăng nhập"
              />
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                id="btn-light-green"
                className="form-control"
                value="Đăng ký"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login
