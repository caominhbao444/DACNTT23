import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import io from "socket.io-client";
import { CircularProgress, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MessageItem from "../../components/MessageItem/MessageItem";
import Conversation from "../../components/Conversation/Conversation";
import ChatStatus from "../../components/ChatStatus/ChatStatus";
import axios from "axios";
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
import Loading from "../Loading/Loading";

const ENDPOINT = "http://localhost:5001"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;
function Message() {
  const [newID, setNewID] = useState("1");
  let { userID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [isOur, setIsOur] = useState("our");
  const [socketConnected, setSocketConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [conversationID, setConversationID] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState("");
  const [allmess, setAllMess] = useState("");
  const [userCurrent, setUserCurrent] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const [listOnline, setListOnline] = useState("");
  const [listChat, setListChat] = useState("1");
  const [loadingMess, setLoadingMess] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [bao, setBao] = useState("bao");

  if (!userID) {
    userID = newID;
  }

  useEffect(() => {
    dispatch(
      CallGetAllConversation({
        headers: { authorization: `Bearer ${authToken}` },
      })
    ).then((response) => {
      setAllConversations(response.payload);
    });
  }, []);

  useEffect(() => {
    dispatch(
      CallApiUser({
        headers: { authorization: `Bearer ${authToken}` },
      })
    ).then((response) => {
      setUserCurrent(response.payload.account._id);
    });
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userID);

    socket.on("new message", (data) => {
      console.log(`New message: ${data.message}`);
      setAllMess((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userID]);

  useEffect(() => {
    dispatch(
      CallGetInforConversation({
        headers: { authorization: `Bearer ${authToken}` },
        userID,
      })
    ).then((response) => {
      setConversationID(response.payload[0].conversationId);
    });
  }, [userID]);

  useEffect(() => {
    if (conversationID) {
      dispatch(
        CallGetMessage({
          headers: { authorization: `Bearer ${authToken}` },
          conversationID,
        })
      ).then((response) => {
        setLoadingMess(false);
        setAllMess(response.payload);
      });
      socket.emit("join chat", conversationID);
    }
  }, [conversationID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      CallPostMessage({
        headers: { authorization: `Bearer ${authToken}` },
        conversationID,
        text: messageContent,
      })
    );
    console.log(response.payload);
    socket.emit("new message", {
      text: response.payload.text,
      fullname: response.payload.fullname,
      room: response.payload.conversationId,
      img: response.payload.img,
    });
    setMessageContent("");
  };

  useEffect(() => {
    if (postMessage) {
      dispatch(
        CallGetMessage({
          headers: { authorization: `Bearer ${authToken}` },
          conversationID: postMessage.conversationId,
        })
      ).then((response) => {
        setAllMess(response.payload);
      });
    }
  }, [postMessage, authToken]);
  if (
    !userInforId &&
    !userInfor &&
    !allUserInfor &&
    !listFriends &&
    !getConversation &&
    !getAllConversations &&
    !getMessage &&
    !postMessage
  ) {
    return <Loading />;
  }

  // ================================================================
  // console.log("All Message", allmess);
  console.log("Nhan tin nhan", getMessage);
  // console.log("Gui tin nhan", postMessage);
  // // console.log("User dang login", userCurrent);
  // console.log("All conversations", allConversations);
  // console.log("Current Chat", currentChat);
  // // console.log("getConversation", getConversation);
  // console.log("conversation id :", getConversation);
  // ================================================================
  return (
    <>
      <Navbar />
      <MessagePage>
        {/* left */}
        <Grid container style={{ width: "100%" }}>
          <Grid
            item
            xs={3}
            md={3}
            style={{
              // backgroundColor: "green",
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              padding: "0",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "80%",
                padding: "10px 20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",

                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Tin nhắn
                </span>
                <div
                  style={{
                    height: "250px",
                    overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                  }}
                  className="scrollBarofLeft"
                >
                  {!allConversations ? (
                    <>
                      <p>Không có cuộc hội thoại</p>
                    </>
                  ) : (
                    allConversations.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            onClick={() => {
                              setNewID(item.id);
                              if (userID) {
                                userID = item.id;
                                setConversationID(item.conversationId);
                                navigate(`/message/${userID}`);
                              }
                            }}
                            className="message-item"
                            style={{
                              textDecoration: "none",
                              color: "black",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "5px",
                              cursor: "pointer",
                              width: "100%",
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              src={item.img}
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
                                alignItems: "flex-start",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                {item.fullname}
                              </span>
                              <span>Bấm vào để trò chuyện</span>
                            </div>
                          </div>
                        </>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={9}
            md={9}
            style={{
              // backgroundColor: "green",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "0",
              gap: "20px",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "90%",
                padding: "10px 20px",
                height: "100%",
              }}
            >
              <div
                style={{
                  height: "calc(100vh - 104px)",
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                {getConversation[0] ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        borderBottom: "1px solid black",
                        width: "100%",
                        paddingBottom: "5px",
                      }}
                    >
                      <img
                        src={getConversation[0].img}
                        className="img-src"
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {getConversation[0].fullname}
                          {/* {currentChat.fullname} */}
                        </span>
                        <span style={{}}>Đang hoạt động</span>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        overflowY: "scroll",
                        scrollBehavior: "smooth",
                        right: "-17px",
                        direction: "revert",
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column-reverse",
                      }}
                      className="message-area"
                    >
                      {getMessage && !loadingMess ? (
                        <>
                          {allmess &&
                            allmess
                              .slice()
                              .reverse()
                              .map((mess, index) => {
                                return (
                                  <>
                                    <MessageItem
                                      key={getMessage.length - index}
                                      name={mess.fullname}
                                      sender={mess.senderId}
                                      content={mess.text}
                                      userCurrent={userCurrent}
                                      img={mess.img}
                                    />
                                  </>
                                );
                              })}
                        </>
                      ) : (
                        <CircularProgress
                          style={{ height: "100%", width: "100%" }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        height: "50px",
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      <input
                        style={{
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                          border: "1px solid black",
                          outline: "none",
                          padding: "0 10px",
                        }}
                        value={messageContent}
                        onChange={(e) => {
                          setMessageContent(e.target.value);
                        }}
                      ></input>
                      <button
                        onClick={handleSubmit}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "10px",
                          bottom: "5px",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          borderRadius: "10px",
                          padding: "0 10px",
                          backgroundColor: "Highlight",
                          border: "none",
                        }}
                      >
                        Gửi
                      </button>
                      {/* <ion-icon
                        name="send-outline"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          cursor: "pointer",
                        }}
                        onSubmit={handleSubmit}
                      ></ion-icon> */}
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        textAlign: "center",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      Hãy mở một cuộc hội thoại
                    </p>
                  </>
                )}
              </div>
            </div>
          </Grid>

          {/* Right-area */}

          {/* <Grid
            item
            xs={3}
            md={3}
            style={{
              // backgroundColor: "green",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",

              padding: "0",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "80%",
                padding: "10px 20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                  Đang hoạt động
                </span>
                {listOnline ? (
                  <>
                    <ChatStatus />
                  </>
                ) : (
                  <>
                    <p>Không có ai đang hoạt động</p>
                  </>
                )}
              </div>
            </div>
          </Grid> */}
        </Grid>
      </MessagePage>
    </>
  );
}
const MessagePage = styled.section`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: #f6f6f6;
  .message-item {
    background-color: none;
  }
  .message-item:hover {
    background-color: whitesmoke;
  }
  .message-area::-webkit-scrollbar {
    display: none;
  }
  .scrollBarofLeft::-webkit-scrollbar {
    display: none;
  }
`;
export default Message;
