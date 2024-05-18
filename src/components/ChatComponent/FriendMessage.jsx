import { ImageList, ImageListItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import icDownload from "../../assets/iconDownload.svg";
import icTrash from "../../assets/iconTrash.svg";
import { AuthContext } from "../../context/AuthContext";

const FriendMessage = ({ setDeleteMessage, avatar, message }) => {
  const [imageCol, setImageCol] = useState(0);

  const { currentUser } = useContext(AuthContext);

  

  useEffect(() => {
    if (message.images == null) return;
    if (message.images?.length == 0) return;
    let col = Math.floor(Math.log2(message.images.length) + 1);
    setImageCol(col);
  }, [message.images]);

  const isDeletedMessage = (message) => {
    return false;
  };

  return (
    <>
      {!isDeletedMessage(message) && (
        <div className="chat-container d-flex gap-3">
          <div className="">
            <img style={{width: "45px", height: "45px"}} className="rounded-circle overflow-hidden bg-white border" src={avatar} alt="User Icon"   />
          </div>
          <div className="mw-50 rounded bg-white text-break p-2 d-flex flex-column gap-1">
            <div className="fst-italic fs-7">{message.sender_name}</div>
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
      )}
    </>
  );
};

export default FriendMessage;
