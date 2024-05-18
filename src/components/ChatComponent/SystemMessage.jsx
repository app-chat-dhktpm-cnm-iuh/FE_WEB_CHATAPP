import React from "react";

const SystemMessage = ({ message }) => {
 
  return (
    <div className="chat-container w-100 d-flex align-items-center justify-content-center gap-3">
      <div className="mw-50 rounded bg-white  text-break p-2 gap-2">
        <div>{message.content}</div>
      </div>
    </div>
  );
};

export default SystemMessage;
