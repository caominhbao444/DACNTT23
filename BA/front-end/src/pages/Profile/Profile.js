import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Button, Dialog, DialogTitle, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import Loading from "../../pages/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import { vi } from "date-fns/locale";
import { CircularProgress } from "@mui/material";
import { formatDistance } from "date-fns";
import Avatar from "@mui/material/Avatar";

import AvatarGroup from "@mui/material/AvatarGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiUser,
  CallApiUserID,
  CallApiCheckFriends,
} from "../../features/userSlice";
import {
  CallApiAllPosts,
  CallApiGetPostId,
  CallApiCreatePost,
  CallApiEditComment,
  CallApiEditPost,
  CallApiPostNewComment,
  CallApiDeleteComment,
  CallApiDeletePost,
} from "../../features/postSlice";
import { useParams } from "react-router";
import axios from "axios";
function Profile() {
  let { userID } = useParams();
  const navigate = useNavigate();
  const [bao, setBao] = useState(false);
  const [postStates, setPostStates] = useState({});
  const [contentEdit, setContentEdit] = useState("");
  const [openOption, setOpenOption] = useState(false);

  const [comments, setComments] = useState("");
  const [openDialogId, setOpenDialogId] = useState(null);
  const [openDialogCommentId, setOpenDialogCommentId] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [textContentButton, setTextContentButton] = useState("Theo dõi");

  const [open, setOpen] = useState(false);
  const [openInfor, setOpenInfor] = useState(false);
  const [contentEditPost, setContentEditPost] = useState("");
  const listSixImg = [];
  const [Urlimg, setUrlimg] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [content, setContent] = useState("");
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const {
    userInforId = {},
    userInfor = {},
    allUserInfor,
    checkFriends,
  } = useSelector((state) => state.user);
  const { postUserId, postEdit, listPosts } = useSelector(
    (state) => state.post
  );
  const [loading, setLoading] = useState(false);
  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setUrlimg(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  // console.log("userid", userInforId._id);
  // console.log("usercurrent", userInfor.account._id);
  // console.log("allusers", allUserInfor);
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
  const checkInfor = (a, b) => {
    if (a.account && a.account._id === b._id) {
      return true;
    } else return false;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (
      imageUrl !==
        "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6" ||
      content
    ) {
      Swal.fire({
        title: "Bỏ bài viết?",
        text: "Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bỏ!",
        cancelButtonText: "Tiếp tục",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpen(false);
          setImageUrl(
            "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
          );
          setContent(""); // clear the content state
          Swal.fire("Bỏ", "Bài viết nháp đã được xóa.", "success");
        } else {
          setOpen(true);
        }
      });
    }
  };

  const handleCreatePost = () => {
    dispatch(
      CallApiCreatePost({
        headers: { authorization: `Bearer ${authToken}` },
        img: imageUrl,
        desc: content,
      })
    ).then(() => {
      setOpen(false);
      Swal.fire({
        title: "Thành công",
        text: "Bài viết đã được đăng",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setContent("");
        dispatch(
          CallApiGetPostId({
            headers: { authorization: `Bearer ${authToken}` },
            userID,
          })
        );
      });
    });
  };
  useEffect(() => {
    dispatch(
      CallApiUserID({
        headers: { authorization: `Bearer ${authToken}` },
        userID,
      })
    );
    dispatch(
      CallApiCheckFriends({
        headers: { authorization: `Bearer ${authToken}` },
        userID,
      })
    );
    dispatch(
      CallApiGetPostId({
        headers: { authorization: `Bearer ${authToken}` },
        userID,
      })
    ).then(() => {
      setLoading1(false);
    });
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
    // dispatch(
    //   CallApiAllUsers({ headers: { authorization: `Bearer ${authToken}` } })
    // );
  }, [userID, authToken, dispatch]);
  const handleOpenDialog = (postId) => {
    setOpenDialogId(postId);
  };
  const check = (postOfId) => {
    if (userInfor) {
      if (userInfor.account._id === postOfId) {
        return true;
      } else return false;
    }
  };
  const handleCloseDialog = () => {
    setOpenDialogId(null);
    setContentEditPost();
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
        setContent("");
        dispatch(
          CallApiGetPostId({
            headers: { authorization: `Bearer ${authToken}` },
            userID,
          })
        );
      });
    });
  };
  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5001/api/posts/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        dispatch(
          CallApiGetPostId({
            headers: { authorization: `Bearer ${authToken}` },
            userID,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const CheckLike = (listLike) => {
    if (userInfor && listPosts) {
      for (let i = 0; i < listLike.length; i++) {
        const postlike = listLike[i];
        if (postlike.accountId === userInfor.account._id) {
          return true; // Stop the iteration and return true
        }
      }
    }
    return false; // Return false if the condition is not met or the loop completes
  };
  const handleFollower = async () => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .post(`http://localhost:5001/api/accounts/follow/${userID}`, null, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setTextContentButton("Ban be");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkComment = (commentOfId) => {
    if (bao && userInfor) {
      if (userInfor.account._id === commentOfId) {
        return true;
      } else return false;
    }
  };
  const handlePostNewComment = (postId, contentComment, index) => {
    dispatch(
      CallApiPostNewComment({
        headers: { authorization: `Bearer ${authToken}` },
        postId: postId,
        content: contentComment,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${authToken}`,
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
  const handleShowComments = (index, postId) => {
    setBao(true);
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
  };
  const handleOpenDialogComment = (commentId) => {
    setOpenDialogCommentId(commentId);
  };
  const handleDeleteComment = (commentId, postId) => {
    dispatch(
      CallApiDeleteComment({
        headers: { authorization: `Bearer ${authToken}` },
        commentId: commentId,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${authToken}`,
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
        headers: { authorization: `Bearer ${authToken}` },
        commentId: commentId,
        postId: postId,
        content: contentEdit,
      })
    ).then(() => {
      const headers = {
        Authorization: `Bearer ${authToken}`,
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
  const handleCloseDialogComment = () => {
    setOpenDialogCommentId(null);
    setContentEdit();
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
            headers: { authorization: `Bearer ${authToken}` },
            postId: postId,
          })
        ).then(() => {
          Swal.fire("Xóa", "Bài viết nháp đã được xóa.", "success");
          dispatch(
            CallApiGetPostId({
              headers: { authorization: `Bearer ${authToken}` },
              userID,
            })
          );
          window.scrollTo(0, 0);
          setOpenOption(false);
        });
      } else {
      }
    });
  };
  if (!userInforId && !userInfor && !userID && !checkFriends && !postUserId) {
    return <Loading />;
  }
  if (postUserId) {
    const lastIndex = postUserId.length - 1;
    const startIndex = Math.max(0, lastIndex - 5);
    for (let i = lastIndex; i >= startIndex; i--) {
      listSixImg.push(postUserId[i].img);
    }
  }
  console.log("bao", postUserId);
  console.log("bao2", listSixImg);
  console.log(userInfor);
  return (
    <>
      <Navbar />
      {userInforId ? (
        <>
          <ProfilePage>
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.9em 2em",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={userInforId.img}
                  width={100}
                  height={100}
                  alt=""
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {userInforId.fullname}
                  </span>
                  <span style={{ color: "GrayText", fontSize: "13px" }}>
                    1.1k bạn bè
                  </span>
                  <AvatarGroup
                    max={4}
                    componentsProps={{
                      additionalAvatar: {
                        sx: {
                          height: 30,
                          width: 30,
                          fontSize: 15,
                          border: "none",
                        },
                      },
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      className="avata-item"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                      className="avata-item"
                    />
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                      className="avata-item"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/static/images/avatar/4.jpg"
                      className="avata-item"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/static/images/avatar/5.jpg"
                    />
                  </AvatarGroup>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  {checkFriends.check === 0 ? (
                    <>
                      <button
                        onClick={handleFollower}
                        style={{
                          padding: "10px 20px",
                          border: "none",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          backgroundColor: "#58A168",
                          cursor: "pointer",
                        }}
                      >
                        {textContentButton}
                      </button>
                    </>
                  ) : checkFriends.check === 1 ? (
                    <>
                      <button
                        style={{
                          padding: "10px 20px",
                          border: "none",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          backgroundColor: "#58A168",
                          cursor: "pointer",
                        }}
                      >
                        Bạn bè
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Grid>
            <Grid
              container
              style={{
                width: "100%",
                padding: "0",
                // backgroundColor: "red",
                margin: "0",

                boxSizing: "border-box",
              }}
            >
              {/* Left */}
              <Grid
                item
                xs={4}
                md={4}
                style={{
                  // backgroundColor: "green",
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",

                  padding: "0",
                  gap: "10px",
                }}
              >
                {checkInfor(userInfor, userInforId) ? (
                  <div
                    style={{
                      width: "70%",
                      padding: "10px 20px 0 10px",
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
                        fontWeight: "bold",
                        cursor: "pointer",
                        alignItems: "flex-start",
                      }}
                      onClick={handleClickOpen}
                    >
                      Đăng bài
                    </div>
                    <Dialog open={open} onClose={handleClose} style={{}}>
                      <DialogTitle style={{ backgroundColor: COLORS.green }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <span style={{ fontWeight: "bold", color: "white" }}>
                            Tạo bài viết
                          </span>
                          <ion-icon
                            name="close-circle-outline"
                            onClick={handleClose}
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
                          <div style={{ width: "300px", position: "relative" }}>
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
                                  src={imageUrl}
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
                                  onChange={handleFileChange}
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
                            placeholder="Bạn đang nghĩ gì..."
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
                          onClick={handleCreatePost}
                          variant="contained"
                          style={{
                            backgroundColor: COLORS.green,
                            borderRadius: "0",
                            fontWeight: "bold",
                          }}
                          fullWidth
                        >
                          Đăng bài
                        </Button>
                      </div>
                    </Dialog>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  style={{
                    width: "70%",
                    padding: "10px 20px 0 10px",
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
                      Giới thiệu
                    </span>
                    {checkInfor(userInfor, userInforId) ? (
                      <>
                        <button
                          onClick={() => {
                            setOpenInfor(true);
                          }}
                          style={{
                            cursor: "pointer",
                            border: "none",
                            width: "100%",
                            padding: "10px 0",
                            fontWeight: "bold",
                            borderRadius: "10px",
                          }}
                        >
                          Chỉnh sửa thông tin
                        </button>
                        <Dialog
                          open={openInfor}
                          onClose={() => {
                            setOpenInfor(false);
                          }}
                          style={{ width: "100%" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "600px",
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
                                backgroundColor: COLORS.green,
                              }}
                            >
                              <p style={{ color: "white" }}>
                                Chỉnh sửa thông tin cá nhân
                              </p>
                              <ion-icon
                                name="close-circle-outline"
                                onClick={() => {
                                  setOpenInfor(false);
                                }}
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
                                padding: "10px 20px 0",
                              }}
                            >
                              <label>Họ và tên</label>
                              <input></input>
                            </div>{" "}
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                padding: "0 20px",
                                flexDirection: "column",
                              }}
                            >
                              <label>Email</label>
                              <input></input>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                padding: "0 20px",
                                flexDirection: "column",
                              }}
                            >
                              <label>Quốc tịch</label>
                              <input></input>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                padding: "0 20px",
                                flexDirection: "column",
                              }}
                            >
                              <label>Thành phố</label>
                              <input></input>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                padding: "0 20px",
                                flexDirection: "column",
                              }}
                            >
                              <label>Học vấn</label>
                              <input></input>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                padding: "0 20px",
                                flexDirection: "column",
                              }}
                            >
                              <label>Số điện thoại</label>
                              <input></input>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 20px",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                style={{
                                  padding: "10px 20px",
                                  backgroundColor: COLORS.green,
                                  color: "white",
                                  border: "none",
                                  outline: "none",
                                  borderRadius: "5px",
                                }}
                              >
                                Cập nhật
                              </button>
                            </div>
                          </div>
                        </Dialog>
                      </>
                    ) : (
                      <></>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <ion-icon name="location-outline"></ion-icon>
                      <span>
                        Sống tại
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {userInforId.city}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <ion-icon name="book-outline"></ion-icon>
                      <span>
                        Học tại
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {userInforId.education
                            ? userInforId.education
                            : "Empty"}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <ion-icon name="book-outline"></ion-icon>
                      <span>
                        Đến từ
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {userInforId.from}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <ion-icon name="people-outline"></ion-icon>
                      <span>
                        Số bạn bè
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          2.200 người{" "}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "70%",
                    padding: "10px 20px 0 10px",
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
                      Album ảnh
                    </span>
                    {/* <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    padding: "10px",
                    width: "100%",
                    backgroundColor: "whitesmoke",
                    display: "block",
                  }}
                >
                  <p>Chỉnh sửa thông tin</p>
                </Link> */}

                    <div style={{ width: "100%" }}>
                      <Grid container style={{ width: "100%" }}>
                        {listSixImg &&
                          listSixImg.map((item, index) => {
                            return (
                              <Grid
                                item
                                xs={4}
                                md={4}
                                style={{ padding: "5px" }}
                              >
                                <img
                                  src={item}
                                  className="img-src"
                                  alt=""
                                  style={{
                                    height: "70px",
                                    width: "100%",
                                    objectFit: "cover",
                                    overflow: "hidden",
                                  }}
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              {/* Right */}
              <Grid
                item
                xs={8}
                md={8}
                style={{
                  // backgroundColor: "green",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    width: "85%",
                    padding: "10px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "5px 20px",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>Bài viết</p>
                  </div>
                  {/* Post item */}
                  {postUserId == false && !loading1 ? (
                    <>
                      <p
                        style={{
                          backgroundColor: "white",
                          width: "100%",
                          borderRadius: "10px",
                          padding: "20px",
                          boxSizing: "border-box",
                        }}
                      >
                        Chưa có bài viết
                      </p>
                    </>
                  ) : (
                    postUserId &&
                    postUserId
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
                                      navigate(`/profile/${post.id}`)
                                    }
                                  >
                                    <img
                                      src={post.userimg}
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
                                        {post.fullname}
                                      </span>
                                      <span>{daybefore(post.createdAt)}</span>
                                    </div>
                                  </div>
                                  {/* {check(post.id) ? (
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
                                  ) : (
                                    <></>
                                  )} */}

                                  {check(post.id) ? (
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
                                              onClick={() =>
                                                handleOpenDialog(post.postId)
                                              }
                                            >
                                              Chỉnh sửa
                                            </div>

                                            <div
                                              style={{
                                                cursor: "pointer",
                                                textAlign: "center",
                                                padding: "5px",
                                              }}
                                              onClick={() =>
                                                handleDeletePost(post.postId)
                                              }
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
                                {!post.img ? (
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
                                      src={post.img}
                                    ></img>
                                  </>
                                )}

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
                                    onClick={() => handleLike(post.postId)}
                                    aria-hidden="true"
                                    style={{
                                      cursor: "pointer",
                                      color: CheckLike(post.like)
                                        ? "red"
                                        : "black",
                                      height: "30px",
                                      width: "30px",
                                    }}
                                    name="heart-outline"
                                  ></ion-icon>
                                  <ion-icon
                                    onClick={() =>
                                      handleShowComments(index, post.postId)
                                    }
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
                                  }}
                                >
                                  <span>
                                    Được thích bởi {post.numLike} người khác
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
                                          handlePostNewComment(
                                            post.postId,
                                            comments[index],
                                            index
                                          );
                                          setComments((prevComments) => {
                                            const newComments = [
                                              ...prevComments,
                                            ];
                                            newComments[index] = ""; // Set the comment to an empty string
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
                                    {postStates[post.postId]?.listComment.map(
                                      (comment, index) => {
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
                                                  window.scrollTo(0, 0);
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
                                                  onClick={() =>
                                                    handleOpenDialogComment(
                                                      comment._id
                                                    )
                                                  }
                                                  name="create-outline"
                                                  style={{ display: "block" }}
                                                ></ion-icon>
                                                <ion-icon
                                                  onClick={() =>
                                                    handleDeleteComment(
                                                      comment._id,
                                                      post.postId
                                                    )
                                                  }
                                                  name="trash-outline"
                                                  style={{ display: "block" }}
                                                ></ion-icon>
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                            {openDialogCommentId ===
                                              comment._id && (
                                              <Dialog
                                                open={
                                                  openDialogCommentId ===
                                                  comment._id
                                                }
                                                onClose={
                                                  handleCloseDialogComment
                                                }
                                                style={{}}
                                                key={index}
                                              >
                                                <DialogTitle
                                                  style={{
                                                    backgroundColor:
                                                      COLORS.green,
                                                  }}
                                                >
                                                  <Box
                                                    style={{
                                                      display: "flex",
                                                      justifyContent:
                                                        "space-between",
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
                                                      onClick={
                                                        handleCloseDialogComment
                                                      }
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
                                                    placeholder={
                                                      comment.content
                                                    }
                                                    id="textEditComment"
                                                    style={{
                                                      resize: "none",
                                                      outline: "none",
                                                      border: "none",
                                                    }}
                                                    value={contentEdit}
                                                    onChange={(e) =>
                                                      setContentEdit(
                                                        e.target.value
                                                      )
                                                    }
                                                  ></textarea>
                                                  <BtnEditComment
                                                    onClick={() =>
                                                      handleEditComment(
                                                        post.postId,
                                                        comment._id
                                                      )
                                                    }
                                                  >
                                                    Cập nhật
                                                  </BtnEditComment>
                                                </div>
                                              </Dialog>
                                            )}
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
                                            {/* <input
                                              onChange={handleFileChange}
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
                      })
                  )}
                </div>
              </Grid>
            </Grid>
          </ProfilePage>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
const ProfilePage = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: #f6f6f6;
  .avata-item {
    height: 30px;
    width: 30px;
    font-size: 15px;
    border: none;
  }
  .css-1ytufz-MuiAvatarGroup-root .MuiAvatar-root {
    border: none;
  }
  .MuiPaper-root
    .MuiPaper-elevation
    .MuiPaper-rounded
    .MuiPaper-elevation24
    .MuiDialog-paper
    .MuiDialog-paperScrollPaper
    .MuiDialog-paperWidthSm
    .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    max-width: 0;
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
`;
const BtnEditComment = styled.section`
  background-color: #58a168;
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

export default Profile;
