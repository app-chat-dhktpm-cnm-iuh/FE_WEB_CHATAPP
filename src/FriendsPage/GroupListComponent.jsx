import { useState } from "react";
import icGroupList from "../assets/iconGroupList.svg"

function GroupListComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="col-8 bg-gray">
        <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img src={icGroupList} className='align-self-center' width="25" height="25" />
            <div className='font-weight-bold align-self-center text-padding'>Danh sách nhóm</div>
          </div>
        </div>

        <div className="row height-sm">
          <h6 className="font-weigth-bold align-self-center">Nhóm (10)</h6>
        </div>
        <div className="row height-lg bg-white mx-2 rounded-top-cus"></div>
      </div>
    </>
  );
}

export default GroupListComponent;
