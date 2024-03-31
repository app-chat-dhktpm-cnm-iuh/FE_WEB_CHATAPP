import icFriendList from '../assets/iconFriendList.svg'

function FriendComponent() {
  return (
    <>
      <div className="col-8 bg-gray">
        <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img src={icFriendList} className='align-self-center' width="30" height="30"/>
            <div className='font-weight-bold align-self-center text-padding'>Danh sách bạn bè</div>
          </div>
        </div>
        
        <div className="row height-sm">
          <h6 className="align-self-center">Bạn bè (10)</h6>
        </div>
        <div className="row height-lg bg-white mx-2 rounded-top-cus">

        </div>
      </div>
    </>
  );
}
export default FriendComponent;
