import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg"

function App() {
  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-6 left-side d-flex">
            <img src={logo} className="mx-auto my-auto" alt="logo" />
          </div>
          
          {/* Chỗ này sẽ thay đổi component */}
          <Outlet/>
        </div>
      </div>
    </>
  );
}
export default App;
