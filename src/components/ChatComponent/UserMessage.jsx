import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import icDownload from "../../assets/iconDownload.svg";
import icTrash from "../../assets/iconTrash.svg";

const UserMessage = ({ setDeleteMessage, message }) => {
  const [imageCol, setImageCol] = useState(0);

  useEffect(() => {
    if (message.images == null) return;
    if (message.images?.length == 0) return;
    let col = Math.floor(Math.log2(message.images.length) + 1);
    setImageCol(col);
  }, [message.images]);

  return (
    <div className="chat-container w-100 d-flex flex-row-reverse gap-3">
      <div className="mw-50 rounded bg-box-chat-green text-break p-2 gap-2">
        <div>{message.content}</div>
        {message.images?.length > 0 && (
          <ImageList
            variant="quilted"
            cols={imageCol}
            rowHeight={200}
            className="d-flex flex-wrap mw-100 rounded overflow-hidden gap-1"
          >
            {message.images.map((image) => (
              <ImageListItem
                key={image}
                className="bg-gray overflow-hidden flex-fill"
              >
                <img
                  className="align-self-center w-100 h-100 ratio ratio-1x1"
                  src={image}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        {message.attaches?.length > 0 && (
          <div className="d-flex flex-column flex-wrap mw-100 rounded overflow-hidden gap-1">
            {message.attaches.map((attach) => (
              <a
                key={attach.url}
                download
                href={attach.url}
                className="text-dark link-underline link-underline-opacity-0 p-3 rounded border border-dark"
              >
                <div className="w-100 rounded d-flex justify-content-center gap-3 align-items-center">
                  <div className="d-flex">
                    <img src={icDownload} />
                  </div>
                  <div className="w-100 d-flex flex-column">
                    <div className="w-100 d-flex flex-row-reverse">
                      {attach.name}
                    </div>
                    <div className="w-100 d-flex flex-row-reverse fs-7 italic">
                      (Click vào để download)
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div
        className="delete-button h-100 flex-column-reverse cursor-pointer"
        onClick={() => setDeleteMessage(message.message_id)}
      >
        <img src={icTrash} />
      </div>
    </div>
  );
};

export default UserMessage;
