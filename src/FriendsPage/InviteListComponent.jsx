import icInviteList from '../assets/iconInviteList.svg'
function InviteListComponent() {
  return (
    <>
      <div className="col-8 bg-gray">
      <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img src={icInviteList} className='align-self-center' width="30" height="30" />
            <div className='font-weight-bold align-self-center text-padding'>Lời mời kết bạn</div>
          </div>
        </div>
        <div className="row height-sm">
          <h6 className="font-weigth-bold align-self-center">Lời mời kết bạn (10)</h6>
        </div>
        <div className="row height-lg bg-white mx-2 rounded-top-cus"></div>
      </div>
    </>
  );
}

export default InviteListComponent;
