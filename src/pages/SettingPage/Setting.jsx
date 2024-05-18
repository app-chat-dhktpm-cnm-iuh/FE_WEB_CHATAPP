import icSetting from '../../assets/iconSetting.svg';
function Setting() {
  return (
    <>
      <div className="col-3">
        <div className="row height-sm">
          <div className="col-10"></div>
          <div className="col-2"></div>
        </div>
      </div>

      <div className="col-8 bg-gray">
        <div className="row bg-white height-sm">
          <div className="col d-flex align-self-center">
            <img src={icSetting} className='align-self-center' width="30" height="30" />
            <div className='font-weight-bold align-self-center text-padding'>Cài đặt</div>
          </div>
        </div>
        <div className="row height-sm">
          <h6 className="font-weigth-bold align-self-center">Chức năng đang được phát triển</h6>
        </div>
        <div className="row height-lg bg-white mx-2 rounded-top-cus"></div>
      </div>
    </>
  );
}
export default Setting;
