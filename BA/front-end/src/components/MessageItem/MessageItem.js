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
  useEffect(() => {
    dispatch(
      CallApiUser({
        headers: { authorization: `Bearer ${authToken}` },
      })
    ).then((response) => {
      setUserCurrent(response.payload.account._id);
    });
  }, []);
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
              src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/338396944_3414763428841906_8598855593912962528_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sI6JpoICWroAX9hffq3&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfB07PZizt3NOJZcr-lsA_kUp_i6u49cct1GShDdml3P1A&oe=643BC02F"
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
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-1/52546705_1223312467816869_2812370694526992384_n.jpg?stp=dst-jpg_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=UBDB-WOwDWUAX_In5KK&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDsr4wYEGoaHCBUGDB9LupLVWpwrF-_rsXPNwjpbUj_jA&oe=645DE767"
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
