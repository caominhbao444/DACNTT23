import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../pages/Loading/Loading";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import SideBar from "../../components/SideBar/SideBar";
import RequestFriends from "../../components/RequestFriends/RequestFriends";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
import { CallApiAllPosts } from "../../features/postSlice";
const socket = io("http://localhost:5001");
function Home() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const { userInfor } = useSelector((state) => state.user);
  const { listPosts } = useSelector((state) => state.post);
  const [data, setData] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [textCommentValue, setTextCommentValue] = useState("");
  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
    dispatch(
      CallApiAllPosts({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);
  const hih = () => {
    alert("bao");
  };
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  const handleTextPost = (e) => {
    setTextValue(e.target.value);
  };
  const handleSubmitPost = () => {
    alert(textValue);
    setTextValue("");
  };

  // ================================================================

  const handleTextComment = (e) => {
    setTextCommentValue(e.target.value);
  };
  const handleComment = () => {
    alert(textCommentValue);
    setTextCommentValue("");
  };
  useEffect(() => {
    if (userInfor) {
      const textarea = document.querySelector("#myTextarea");
      const textcommentarea = document.querySelector("#textComment");
      if (textcommentarea) {
        textcommentarea.addEventListener("keyup", (e) => {
          textcommentarea.style.height = "50px";
          textcommentarea.style.height = `${e.target.scrollHeight}px`;
        });
      }
      if (textarea) {
        textarea.addEventListener("keyup", (e) => {
          textarea.style.height = "60px";
          textarea.style.height = `${e.target.scrollHeight}px`;
        });
      }
    }
  }, [userInfor]);
  if (!userInfor && !listPosts) {
    return <Loading />;
  }

  console.log(userInfor);

  return (
    <>
      <Navbar />
      <HomePage style={{ backgroundColor: "#FFD4D8", position: "relative" }}>
        <Grid container style={{ padding: "0" }}>
          {/* Left */}
          <SideBar />
          {/* Main */}
          <Grid item xs={6} md={6} style={{}}>
            <section
              className="main-component"
              style={{
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "20px",
                boxSizing: "border-box",
              }}
            >
              <section
                className="main-first"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <textarea
                  id="myTextarea"
                  value={textValue}
                  onChange={handleTextPost}
                ></textarea>
                {/* <input
                  style={{
                    border: "none",
                    width: "100%",
                    height: "60px",
                    outline: "none",
                    padding: "0",
                    boxSizing: "border-box",
                    paddingLeft: "10px",
                    borderRadius: "10px",
                  }}
                ></input> */}
                <button
                  onClick={() => {
                    alert("hi");
                  }}
                  className="btn_posts"
                  type="button"
                >
                  Đăng
                </button>
                <div style={{}} className="container_img">
                  <label
                    for="img_post"
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "ButtonFace",
                      padding: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </label>
                  <input
                    id="img_post"
                    style={{ display: "none" }}
                    type="file"
                  />
                </div>
              </section>
              {listPosts &&
                listPosts.map((post, index) => {
                  return (
                    <section
                      key={index}
                      className="main-post-item"
                      style={{
                        backgroundColor: "white",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          padding: "20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          className="img-container"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
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
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {post.fullname}
                            </span>
                            <span>10 phút trước</span>
                          </div>
                        </div>
                        <img
                          className="img-src"
                          alt=""
                          style={{
                            height: "400px",
                            width: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHBlb3BsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60"
                        ></img>
                        <div style={{ width: "100%" }}>{post.desc}</div>
                        <div
                          className="emotions"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "10px",
                            height: "40px",
                          }}
                        >
                          <ion-icon
                            style={{
                              cursor: "pointer",
                              color: "red",
                              height: "30px",
                              width: "30px",
                            }}
                            name="heart"
                            onClick={hih}
                          ></ion-icon>
                          <ion-icon
                            style={{
                              cursor: "pointer",
                              height: "30px",
                              width: "30px",
                            }}
                            name="chatbubble-outline"
                          ></ion-icon>
                          <ion-icon
                            style={{
                              cursor: "pointer",
                              color: "",
                              height: "30px",
                              width: "30px",
                            }}
                            name="share-social-outline"
                          ></ion-icon>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: "5px",
                          }}
                        >
                          {/* <Stack direction="row" spacing={-1}>
                      <Avatar
                        style={{
                          height: "30px",
                          width: "30px",
                          fontSize: "15px",
                        }}
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                      />
                      <Avatar
                        style={{
                          height: "30px",
                          width: "30px",
                          fontSize: "15px",
                        }}
                        alt="Travis Howard"
                        src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                      />
                      <Avatar
                        style={{
                          height: "30px",
                          width: "30px",
                          fontSize: "15px",
                        }}
                        alt="Cindy Baker"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                      />
                    </Stack> */}
                          <span>
                            Được thích bởi Tiến Minh and 2,200 người khác
                          </span>
                        </div>
                        <section
                          className="containerComment"
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                            className="img-src"
                            alt=""
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              position: "absolute",
                              left: "20px",
                              top: "15px",
                            }}
                          />
                          <textarea
                            key={index}
                            id="textComment"
                            value={textCommentValue}
                            onChange={handleTextComment}
                          ></textarea>
                          <button
                            onClick={handleComment}
                            type="button"
                            style={{
                              position: "absolute",
                              right: "20px",
                              top: "20px",
                              padding: "5px 10px",
                              borderRadius: "10px",
                              // backgroundColor: COLORS.mainColor,
                              backgroundColor: "#FC3208",
                              color: "white",
                              fontWeight: "bold",
                              border: "none",
                              boxSizing: "border-box",
                              cursor: "pointer",
                            }}
                          >
                            Đăng
                          </button>
                        </section>
                        <div style={{}}>
                          <div style={{ height: "100%", width: "100%" }}>
                            <div
                              style={{
                                display: "block",
                                marginRight: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Minh Bảo
                              <span style={{ marginLeft: "10px" }}>
                                {Readmore(
                                  "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been dustrystandard dummy text ever since the 1500s, when an unknown printer took a galley of type an scrambled it to make a type spec"
                                )}
                                ...
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            padding: "0",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              fontWeight: "bold",
                              marginRight: "5px",
                            }}
                          >
                            Minh Baro
                          </span>
                          <span>
                            {Readmore(
                              "Proident eiusmod quiProident eiusmod quiProident eiusmod quiProident eiusmod quiProident eiusmod qui s veniam eiusmod ad eu deserunt laborum excepteur dolore voluptate et. Laboris laborum  eiusmod aliquip sint cupidatat anim voluptate est commodo"
                            )}
                            ...
                          </span>
                        </div>
                        <div style={{}}>
                          <div style={{ height: "100%" }}>
                            <span
                              style={{
                                marginRight: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Minh Bảo
                            </span>
                            <span>
                              {Readmore(
                                "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been dustrystandard dummy text ever since the 1500s, when an unknown printer took a galley of type an scrambled it to make a type spec"
                              )}
                              ...
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                })}
            </section>
          </Grid>
          {/* Right */}
          <RequestFriends />
        </Grid>
      </HomePage>
    </>
  );
}

const HomePage = styled.section`
  min-height: 100vh;
  width: 100%;
  #myTextarea {
    width: 100%;
    height: 60px;
    display: block;
    padding: 15px 90px 15px 15px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    max-height: 200px;
  }
  #myTextarea::-webkit-scrollbar {
    width: 0;
  }
  .left-component {
    paddingright: 10px;
    display: flex;
    flex-direction: column;
    alignitems: flex-end;
    .img-src {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;
    }
    .sidebar-item:hover {
      border-left: 3px solid ${COLORS.mainColor};
    }
  }
  .containerComment {
    ${"" /* height: 50px; */}
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    form {
      height: 50px;
      width: 100%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px;
    }
  }

  #textComment {
    width: 100%;
    height: 50px;
    padding: 15px 80px 15px 60px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-radius: 5px;
    max-height: 100px;
  }
  #textComment::-webkit-scrollbar {
    width: 0;
  }
  .container_img {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    border-top: 1px solid darkgray;
    padding: 15px;
  }
  button[disabled] {
    background-color: gray;
    color: white;
  }
  .btn_posts {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fc3208;
    color: white;
    font-weight: bold;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
export default Home;
