import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { vi } from "date-fns/locale";

import Navbar from "../../components/Navbar/Navbar";
import { formatDistance } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
import {
  CallApiAllPosts,
  CallApiCreatePost,
  CallApiEditPost,
} from "../../features/postSlice";
import {
  CircularProgress,
  Box,
  TextareaAutosize,
  Button,
  Dialog,
  Textarea,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
const MySwal = withReactContent(Swal);
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialogId, setOpenDialogId] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const [postStates, setPostStates] = useState({});
  const { userInfor } = useSelector((state) => state.user);
  const { listPosts, postCreate, postEdit } = useSelector(
    (state) => state.post
  );
  const [data, setData] = useState([]);
  const [dialogData, setDialogData] = useState(null);
  const [listComment, setListComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [showComments, setShowComments] = useState([]);
  const [textCommentValue, setTextCommentValue] = useState("");
  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
    dispatch(
      CallApiAllPosts({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  const Readmore = (e) => {
    return e.slice(0, 100);
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
  // if (!userInfor && !listPosts && !SideBar) {
  //   return <Loading />;
  // }
  const [comments, setComments] = useState("");
  const daybefore = (time) => {
    const date = new Date(time);
    const timeDifference = formatDistance(date, new Date(), {
      addSuffix: true,
      locale: vi,
    });
    const capitalizedTimeDifference =
      timeDifference.charAt(0).toUpperCase() + timeDifference.slice(1);
    return capitalizedTimeDifference;
  };
  const handleShowComments = (index, postId) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .get(`http://localhost:5001/api/comments/${postId}`, {
        headers: headers,
      })
      .then((response) => {
        // setListComment(response.data);
        setPostStates((prevState) => ({
          ...prevState,
          [postId]: {
            showComments: !prevState[postId]?.showComments,
            listComment: response.data,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    // const newShowComments = [...showComments];
    // newShowComments[index] = !newShowComments[index];
    // setShowComments(newShowComments);
  };
  console.log(userInfor);
  console.log(listComment);
  const handleOpenDialog = (postId) => {
    setOpenDialogId(postId);
  };

  const handleCloseDialog = () => {
    setOpenDialogId(null);
    setContent();
  };
  const handleEditPost = (postId) => {
    dispatch(
      CallApiEditPost({
        headers: { authorization: `Bearer ${authToken}` },
        postId: postId,
        desc: content,
      })
    ).then(() => {
      setOpenDialogId(false);
      Swal.fire({
        title: "Thành công",
        text: "Bài viết đã được đăng",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload(); // Reload the page after clicking "OK"
      });
    });
  };

  return (
    <>
      {!userInfor && !listPosts ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar />
          <HomePage
            style={{ backgroundColor: "#FFD4D8", position: "relative" }}
          >
            <Grid container style={{ padding: "0" }}>
              {/* Left */}
              <SideBar />
              {/* Main */}
              <Grid item xs={8} md={8} style={{}}>
                <section
                  className="main-component"
                  style={{
                    padding: "20px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  {listPosts &&
                    listPosts
                      .slice()
                      .reverse()
                      .map((post, index) => {
                        return (
                          <>
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
                                <div style={{ display: "flex" }}>
                                  <div
                                    className="img-container"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      gap: "10px",
                                      width: "100%",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      navigate(`/profile/${post.account._id}`)
                                    }
                                  >
                                    <img
                                      src={post.account.img}
                                      className="img-src"
                                      alt=""
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {post.account.fullname}
                                      </span>
                                      <span>{daybefore(post.createdAt)}</span>
                                    </div>
                                  </div>
                                  <ion-icon
                                    onClick={() =>
                                      handleOpenDialog(post.postId)
                                    }
                                    name="ellipsis-horizontal-outline"
                                    style={{
                                      display: "block",
                                      height: "20px",
                                      width: "30px",
                                      padding: "10px",
                                      cursor: "pointer",
                                    }}
                                  ></ion-icon>
                                </div>

                                <img
                                  className="img-src"
                                  alt=""
                                  style={{
                                    height: "auto",
                                    width: "100%",
                                    maxWidth: "100%",
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                  src={post.img}
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
                                  ></ion-icon>
                                  <ion-icon
                                    onClick={() =>
                                      handleShowComments(index, post.postId)
                                    }
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
                                  <span>
                                    Được thích bởi Tiến Minh and 2,200 người
                                    khác
                                  </span>
                                </div>
                                {postStates[post.postId]?.showComments &&
                                postStates[post.postId]?.listComment ? (
                                  <>
                                    <section
                                      className="containerComment"
                                      style={{
                                        width: "100%",
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        src={userInfor.account.img}
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
                                      {/* <textarea
                                  key={index}
                                  id="textComment"
                                  value={textCommentValue}
                                  onChange={handleTextComment}
                                ></textarea> */}
                                      <textarea
                                        key={index}
                                        id={"textComment"}
                                        value={comments[index]}
                                        onChange={(e) => {
                                          const newComments = [...comments];
                                          newComments[index] = e.target.value;
                                          setComments(newComments);
                                        }}
                                      ></textarea>
                                      <button
                                        onClick={() => {
                                          // alert(comments[index]);
                                          alert(post.postId);
                                        }}
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
                                    {postStates[post.postId]?.listComment.map(
                                      (comment, index) => {
                                        return (
                                          <div
                                            key={index}
                                            style={{
                                              width: "100%",
                                              padding: "0",
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              alignItems: "center",
                                            }}
                                          >
                                            <img
                                              alt=""
                                              src={comment.userimg}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                marginRight: "5px",
                                              }}
                                            />
                                            <span
                                              onClick={() => {
                                                navigate(
                                                  `/profile/${comment.userId}`
                                                );
                                              }}
                                              style={{
                                                cursor: "pointer",
                                                display: "inline-block",
                                                fontWeight: "bold",
                                                marginRight: "5px",
                                              }}
                                            >
                                              {comment.fullname
                                                .charAt(0)
                                                .toUpperCase() +
                                                comment.fullname.slice(1)}
                                            </span>
                                            <span>
                                              {Readmore(comment.content)}
                                            </span>
                                          </div>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              {openDialogId === post.postId && (
                                <Dialog
                                  open={openDialogId === post.postId}
                                  onClose={handleCloseDialog}
                                  style={{}}
                                  key={index}
                                >
                                  <DialogTitle
                                    style={{ backgroundColor: COLORS.green }}
                                  >
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      alignItems="center"
                                    >
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          color: "white",
                                        }}
                                      >
                                        Chỉnh sửa bài viết
                                      </span>
                                      <ion-icon
                                        name="close-circle-outline"
                                        onClick={handleCloseDialog}
                                        style={{
                                          cursor: "pointer",
                                          width: "30px",
                                          height: "30px",
                                          display: "block",
                                          border: "none",
                                          zIndex: "6",
                                          fontWeight: "bold",
                                          color: "white",
                                        }}
                                      ></ion-icon>
                                    </Box>
                                  </DialogTitle>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-around",
                                      position: "relative",
                                      padding: "40px",
                                      maxWidth: "600px",
                                      height: "400px",
                                      gap: "10px",
                                    }}
                                  >
                                    <Box
                                      maxWidth="600px"
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        position: "relative",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "300px",
                                          position: "relative",
                                        }}
                                      >
                                        {loading ? (
                                          <>
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "253px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              <CircularProgress />
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <img
                                              src={post.img}
                                              width="100%"
                                              alt="bag photos"
                                              style={{
                                                display: "block",
                                                height: "253px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                              }}
                                            />
                                            <input
                                              onChange={{}}
                                              type="file"
                                              style={{
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                width: "100%",
                                                height: "100%",
                                                opacity: "0",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </>
                                        )}
                                      </div>
                                      <textarea
                                        aria-label="empty textarea"
                                        placeholder={post.desc}
                                        style={{
                                          width: "300px",
                                          height: "253px", // change this to a smaller value
                                          minHeight: "100px", // set a smaller minHeight value
                                          border: "none",
                                          resize: "none",
                                          outline: "none",
                                          overflowY: "scroll",
                                          overflow: "hidden",
                                        }}
                                        value={content}
                                        onChange={(e) =>
                                          setContent(e.target.value)
                                        }
                                      />
                                    </Box>
                                    <Button
                                      onClick={() =>
                                        handleEditPost(post.postId)
                                      }
                                      variant="contained"
                                      style={{
                                        backgroundColor: COLORS.green,
                                        borderRadius: "0",
                                        fontWeight: "bold",
                                      }}
                                      fullWidth
                                    >
                                      Cập nhật
                                    </Button>
                                  </div>
                                </Dialog>
                              )}
                            </section>
                          </>
                        );
                      })}
                </section>
              </Grid>
            </Grid>
          </HomePage>
        </>
      )}
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
    background-color: red;
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
