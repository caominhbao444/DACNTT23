import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MessageItem from "../../components/MessageItem/MessageItem";
import Conversation from "../../components/Conversation/Conversation";
import ChatStatus from "../../components/ChatStatus/ChatStatus";
import axios from "axios";
function Message() {
  const [isOut, setIsOut] = useState("our");
  const [messageContent, setMessageContent] = useState("");
  const [currentChat, setCurrentChat] = useState("1");
  const [listOnline, setListOnline] = useState("");
  const [listChat, setListChat] = useState("1");
  const [bao, setBao] = useState("bao");
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:5001/api/conversations/", {
    //   members: {
    //     senderId: messageContent,
    //     receiverId: "1",
    //   },
    // });
    alert(messageContent);
  };

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
                  {listChat ? (
                    <>
                      <Conversation />
                    </>
                  ) : (
                    <p>Không có cuộc hội thoại</p>
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
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
                {currentChat ? (
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
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                        <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
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
                      <MessageItem />
                      <MessageItem />
                      <MessageItem isOut={isOut} />
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
                        type="submit"
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

          <Grid
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
          </Grid>
        </Grid>
      </MessagePage>
    </>
  );
}
const MessagePage = styled.section`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: #ffd4d8;
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
