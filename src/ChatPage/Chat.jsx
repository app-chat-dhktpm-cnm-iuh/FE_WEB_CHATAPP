import icAddConversation from '../assets/iconAddConversation.svg'
import icAva from '../assets/btnProfile.svg'
function Chat() {
  return (
    <>
      {/* Phần này là load danh sách chat */}
      <div className="col-3">
        <div className="row height-sm mt-2 mb-2">
          <div className="col-10 align-self-center">
            <input type="text" id="input-search" placeholder="Tìm kiếm"></input>
          </div>
          <div className="col-2 align-self-center">
            <button id="add-conversation"><img src={icAddConversation} alt="btnAddConversation" /></button>
          </div>
        </div>

        <div className="row">
          <div className="row pt-2 pb-2">
            <div className="col-2 align-self-center">
              <img src={icAva} alt="User Icon" className="" />
            </div>
            <div className="col-10 align-self-center">
              <div className="row">
                <div className="col-7">Tên tài khoản</div>
                <div className="col-5 message-to"> 28/03/2024</div>
              </div>
              <div className="row">
                <div className="col message-to">Tin nhắn đến</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần này hiển thị trang chat */}
      <div className="col-8 bg-gray">
        <div className="row height-sm">
          <div className="col-1"></div>
          <div className="col-11"></div>
        </div>
      </div>
    </>
  );
}
export default Chat;
