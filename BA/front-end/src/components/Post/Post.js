import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { formatDistance } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import {
  CallApiAllPosts,
  CallApiCreatePost,
  CallApiEditPost,
  CallApiPostNewComment,
  CallApiDeleteComment,
  CallApiEditComment,
  CallApiLike,
  CallApiDeletePost,
  CallApiGetPostId,
} from "../../features/postSlice";
import { COLORS } from "../../assets/Color";
import styled from "styled-components";
import Swal from "sweetalert2";
const Post = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialogId, setOpenDialogId] = useState(null);
  const [postStates, setPostStates] = useState({});
  const [showComments, setShowComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [openDialogCommentId, setOpenDialogCommentId] = useState(null);
  const [openDialogLike, setOpenDialogLike] = useState(null);
  const [contentEdit, setContentEdit] = useState("");
  const [content, setContent] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const {
    listPosts,
    postCreate,
    postEdit,
    postNewComment,
    deleteComment,
    editComment,
    like,
  } = useSelector((state) => state.post);

  useEffect(() => {
    if (props.userInfor) {
      const textarea = document.querySelector("#myTextarea");
      const textcommentarea = document.querySelector("#textComment");
      const texteditcommentarea = document.querySelector("#textEditComment");
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
      if (texteditcommentarea) {
        texteditcommentarea.addEventListener("keyup", (e) => {
          texteditcommentarea.style.height = "60px";
          texteditcommentarea.style.height = `${e.target.scrollHeight}px`;
        });
      }
    }
  }, [props.userInfor]);
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
  const check = (postOfId) => {
    if (props.userInfor) {
      if (props.userInfor.account._id === postOfId) {
        return true;
      } else return false;
    }
  };
  const handleOpenDialog = (postId) => {
    setOpenDialogId(postId);
  };

  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5001/api/posts/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${props.authToken}`,
        },
      })
      .then(() => {
        dispatch(
          CallApiAllPosts({
            headers: { authorization: `Bearer ${props.authToken}` },
          })
        );
        dispatch(
          CallApiGetPostId({
            headers: { authorization: `Bearer ${props.authToken}` },
            userID: props.userID,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const CheckLike = (listLike) => {
    if (props.userInfor && listPosts) {
      for (let i = 0; i < listLike.length; i++) {
        const postlike = listLike[i];
        if (postlike.accountId === props.userInfor.account._id) {
          return true; // Stop the iteration and return true
        }
      }
    }
    return false; // Return false if the condition is not met or the loop completes
  };
  const [bao, setBao] = useState(false);
  const handleShowComments = (index, postId) => {
    setBao(true);
    const headers = {
      Authorization: `Bearer ${props.authToken}`,
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
  };

  const handlePostNewComment = (postId, contentComment, index) => {
    dispatch(
      CallApiPostNewComment({
        headers: { authorization: `Bearer ${props.authToken}` },
        postId: postId,
        content: contentComment,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${props.authToken}`,
      };
      axios
        .get(`http://localhost:5001/api/comments/${postId}`, {
          headers: headers,
        })
        .then((response) => {
          setPostStates((prevState) => ({
            ...prevState,
            [postId]: {
              ...prevState[postId],
              listComment: response.data,
            },
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  const checkComment = (commentOfId) => {
    if (bao && props.userInfor) {
      if (props.userInfor.account._id === commentOfId) {
        return true;
      } else return false;
    }
  };
  const handleOpenDialogComment = (commentId) => {
    setOpenDialogCommentId(commentId);
  };
  const handleCloseDialogComment = () => {
    setOpenDialogCommentId(null);
    setContentEdit();
  };

  const handleOpenDialogLike = (postId) => {
    setOpenDialogLike(postId);
  };
  const handleCloseDialogLike = () => {
    setOpenDialogLike(null);
  };

  const handleDeleteComment = (commentId, postId) => {
    dispatch(
      CallApiDeleteComment({
        headers: { authorization: `Bearer ${props.authToken}` },
        commentId: commentId,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${props.authToken}`,
      };
      axios
        .get(`http://localhost:5001/api/comments/${postId}`, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setPostStates((prevState) => ({
            ...prevState,
            [postId]: {
              ...prevState[postId],
              listComment: response.data,
            },
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const handleEditComment = (postId, commentId) => {
    dispatch(
      CallApiEditComment({
        headers: { authorization: `Bearer ${props.authToken}` },
        commentId: commentId,
        postId: postId,
        content: contentEdit,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${props.authToken}`,
      };
      axios
        .get(`http://localhost:5001/api/comments/${postId}`, {
          headers: headers,
        })
        .then((response) => {
          setOpenDialogCommentId(false);
          setContentEdit("");
          setPostStates((prevState) => ({
            ...prevState,
            [postId]: {
              ...prevState[postId],
              listComment: response.data,
            },
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const handleCloseDialog = () => {
    setOpenDialogId(null);
    setContent();
  };
  const handleEditPost = (postId) => {
    dispatch(
      CallApiEditPost({
        headers: { authorization: `Bearer ${props.authToken}` },
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
        setContent("");
        dispatch(
          CallApiAllPosts({
            headers: { authorization: `Bearer ${props.authToken}` },
          })
        );
        dispatch(
          CallApiGetPostId({
            headers: { authorization: `Bearer ${props.authToken}` },
            userID: props.userID,
          })
        );
        setOpenOption(false); // Reload the page after clicking "OK"
      });
    });
  };
  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Bỏ bài viết?",
      text: "Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quay lại",
      cancelButtonText: "Xóa",
    }).then((result) => {
      if (result.isDismissed) {
        dispatch(
          CallApiDeletePost({
            headers: { authorization: `Bearer ${props.authToken}` },
            postId: postId,
          })
        ).then(() => {
          Swal.fire("Xóa", "Bài viết nháp đã được xóa.", "success");
          dispatch(
            CallApiAllPosts({
              headers: { authorization: `Bearer ${props.authToken}` },
            })
          );
          dispatch(
            CallApiGetPostId({
              headers: { authorization: `Bearer ${props.authToken}` },
              userID: props.userID,
            })
          );
          window.scrollTo(0, 0);
          setOpenOption(false);
        });
      } else {
      }
    });
  };
  if (!props) return <Loading />;
  return (
    <>
      <PostContainer
        key={props.postId}
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
              onClick={() => navigate(`/profile/${props.accountId}`)}
            >
              <img
                src={props.imgAccountId}
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
                  {props.fullnameAccountId}
                </span>
                <span>{daybefore(props.creatAt)}</span>
              </div>
            </div>
            {check(props.accountId) ? (
              <div style={{ position: "relative" }}>
                <ion-icon
                  onClick={() => {
                    if (openOption) {
                      setOpenOption(false);
                    } else {
                      setOpenOption(true);
                    }
                  }}
                  name="ellipsis-horizontal-outline"
                  style={{
                    display: "block",
                    height: "20px",
                    width: "30px",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                ></ion-icon>
                {openOption ? (
                  <>
                    <div
                      style={{
                        left: "-30px",
                        position: "absolute",
                        height: "70px",
                        width: "100px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",

                        justifyContent: "center",
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          borderBottom: "1px solid black",
                          textAlign: "center",
                          boxSizing: "border-box",
                          padding: "5px",
                        }}
                        onClick={() => handleOpenDialog(props.postId)}
                      >
                        Chỉnh sửa
                      </div>

                      <div
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                          padding: "5px",
                        }}
                        onClick={() => handleDeletePost(props.postId)}
                      >
                        Xóa
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {!props.postImg ? (
            <Skeleton
              variant="rectangular"
              height={500}
              style={{ width: "813px" }}
            />
          ) : (
            <>
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
                src={props.postImg}
              ></img>
            </>
          )}

          <div style={{ width: "100%" }}>{props.postDesc}</div>
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
              onClick={() => handleLike(props.postId)}
              aria-hidden="true"
              style={{
                cursor: "pointer",
                color: CheckLike(props.postLike) ? "red" : "black",
                height: "30px",
                width: "30px",
              }}
              name="heart-outline"
            ></ion-icon>
            <ion-icon
              onClick={() => handleShowComments(props.key, props.postId)}
              style={{
                cursor: "pointer",
                height: "30px",
                width: "30px",
                fill: "white",
                color: "black",
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
              cursor: "pointer",
            }}
          >
            <span onClick={() => handleOpenDialogLike(props.postId)}>
              Được thích bởi {props.postNumlike} người khác
            </span>
            {openDialogLike === props.postId && (
              <Dialog
                open={openDialogLike === props.postId}
                onClose={handleCloseDialogLike}
                style={{ width: "100%" }}
                key={props.key}
              >
                <div
                  style={{
                    display: "flex",
                    width: "400px",
                    flexDirection: "column",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 20px",
                      justifyContent: "space-between",
                      backgroundColor: "#a2b3c3",
                    }}
                  >
                    <p style={{ color: "white", fontWeight: "bold" }}>
                      Danh sách người thích
                    </p>
                    <ion-icon
                      name="close-circle-outline"
                      onClick={handleCloseDialogLike}
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
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      overflow: "auto",
                      height: "300px",
                    }}
                  >
                    {props.postLike &&
                      props.postLike.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px",
                              boxSizing: "border-box",
                              gap: "10px",
                            }}
                          >
                            <img
                              src="http://res.cloudinary.com/djhhzmcps/image/upload/v1685902599/zf3btsotrtrnaeuvnesm.jpg"
                              width={50}
                              height={50}
                              alt=""
                              style={{ borderRadius: "50%" }}
                            />
                            <span style={{ fontSize: "14px" }}>
                              {item.fullname}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Dialog>
            )}
          </div>
          {postStates[props.postId]?.showComments &&
          postStates[props.postId]?.listComment ? (
            <>
              <section
                className="containerComment"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <img
                  src={props.userInfor.account.img}
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
                  key={props.key}
                  id={"textComment"}
                  value={comments[props.key]}
                  onChange={(e) => {
                    const newComments = [...comments];
                    newComments[props.key] = e.target.value;
                    setComments(newComments);
                  }}
                ></textarea>
                <button
                  onClick={() => {
                    handlePostNewComment(
                      props.postId,
                      comments[props.key],
                      props.key
                    );
                    setComments((prevComments) => {
                      const newComments = [...prevComments];
                      newComments[props.key] = ""; // Set the comment to an empty string
                      return newComments;
                    });
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
                  Bình luận
                </button>
              </section>
              {postStates[props.postId]?.listComment.map((comment, index) => {
                return (
                  <div
                    key={index}
                    className="comment_item"
                    style={{
                      width: "100%",
                      padding: "0 0 0 10px",
                      boxSizing: "border-box",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
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
                          navigate(`/profile/${comment.userId}`);
                          window.scrollTo(0, 0);
                        }}
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.fullname.charAt(0).toUpperCase() +
                          comment.fullname.slice(1)}
                      </span>

                      <span>{Readmore(comment.content)}</span>
                    </div>
                    {checkComment(comment.userId) ? (
                      <div
                        style={{
                          display: "flex",
                          marginRight: "10px",
                          gap: "10px",
                          position: "relative",
                        }}
                      >
                        <ion-icon
                          onClick={() => handleOpenDialogComment(comment._id)}
                          name="create-outline"
                          style={{ display: "block" }}
                        ></ion-icon>
                        <ion-icon
                          onClick={() =>
                            handleDeleteComment(comment._id, props.postId)
                          }
                          name="trash-outline"
                          style={{ display: "block" }}
                        ></ion-icon>
                      </div>
                    ) : (
                      <></>
                    )}
                    {openDialogCommentId === comment._id && (
                      <Dialog
                        open={openDialogCommentId === comment._id}
                        onClose={handleCloseDialogComment}
                        style={{}}
                        key={index}
                      >
                        <DialogTitle
                          style={{
                            backgroundColor: "#a2b3c3",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              Chỉnh sửa bình luận
                            </span>
                            <ion-icon
                              name="close-circle-outline"
                              onClick={handleCloseDialogComment}
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
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            flexDirection: "column",
                            padding: "20px",
                            gap: "10px",
                          }}
                        >
                          <textarea
                            placeholder={comment.content}
                            id="textEditComment"
                            style={{
                              resize: "none",
                              outline: "none",
                              border: "none",
                            }}
                            value={contentEdit}
                            onChange={(e) => setContentEdit(e.target.value)}
                          ></textarea>
                          <BtnEditComment
                            onClick={() =>
                              handleEditComment(props.postId, comment._id)
                            }
                          >
                            Cập nhật
                          </BtnEditComment>
                        </div>
                      </Dialog>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        {openDialogId === props.postId && (
          <Dialog
            open={openDialogId === props.postId}
            onClose={handleCloseDialog}
            style={{}}
            key={props.key}
          >
            <DialogTitle style={{ backgroundColor: "#a2b3c3" }}>
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
                        src={props.postImg}
                        width="100%"
                        alt="bag photos"
                        style={{
                          display: "block",
                          height: "253px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      {/* <input
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
                      /> */}
                    </>
                  )}
                </div>
                <textarea
                  aria-label="empty textarea"
                  placeholder={props.postDesc}
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
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>
              <Button
                onClick={() => handleEditPost(props.postId)}
                variant="contained"
                style={{
                  backgroundColor: "#a2b3c3",
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
      </PostContainer>
    </>
  );
};
const PostContainer = styled.section`
  .comment_item:hover {
    background-color: #f5f5f5;
    margin-right: 20px;
  }
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
  #textEditComment {
    width: 100%;
    height: 50px;
    padding: 15px 80px 15px 60px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-radius: 5px;
    background-color: white;
    max-height: 100px;
  }
  #textEditComment::-webkit-scrollbar {
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
const BtnEditComment = styled.section`
  background-color: "#a2b3c3",
  padding: 5px 10px;
  text-align: center;
  color: white;
  font-weight: bold;
  border: 1px solid #58a168;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #58a168;
  }
`;
export default Post;
