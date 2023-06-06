import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiUser,
  CallApiUserID,
  CallApiAllUsers,
  CallApiCheckFriends,
  CallGetInforConversation,
  CallGetAllConversation,
  CallPostMessage,
  CallGetMessage,
} from "../../features/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading/Loading";
function MessageItem(props) {
  const {
    userInforId,
    userInfor,
    allUserInfor,
    listFriends,
    getConversation,
    getAllConversations,
    postMessage,
    getMessage,
  } = useSelector((state) => state.user);
  const authToken = localStorage.getItem("authToken");
  const [userCurrent, setUserCurrent] = useState("");
  const dispatch = useDispatch();
  // console.log(userCurrent);

  if (!props) return <Loading />;
  return (
    <>
      {props.sender === props.userCurrent ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "80%",
              marginLeft: "20%",
              height: "auto",
              gap: "10px",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={props.img}
              className="img-src"
              alt=""
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{props.name}</span>
              <span
                style={{
                  display: "block",
                  textAlign: "justify",
                }}
              >
                {props.content}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              padding: "5px",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "80%",

              marginRight: "20%",
              border: "1px solid gray",
              height: "auto",
              gap: "10px",
              borderRadius: "10px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={props.img}
              className="img-src"
              alt=""
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{props.name}</span>
              <span
                style={{
                  display: "block",
                  textAlign: "justify",
                }}
              >
                {props.content}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MessageItem;
