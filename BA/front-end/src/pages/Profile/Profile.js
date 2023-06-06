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
import Post from "../../components/Post/Post";
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
  const [openUpdateField, setOpenUpdateField] = useState(false);
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
  const handleOpenDialogInfor = () => {
    setOpenInfor(false);
    if (openUpdateField) {
      setOpenUpdateField(false);
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
  console.log(openUpdateField);
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
                    {userInforId.followers ? userInforId.followers.length : 0}{" "}
                    người theo dõi
                  </span>
                  {/* <AvatarGroup
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
                  </AvatarGroup> */}
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
                      <DialogTitle style={{ backgroundColor: "#a2b3c3" }}>
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
                            backgroundColor: "#a2b3c3",
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
                          onClose={handleOpenDialogInfor}
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
                                backgroundColor: "#a2b3c3",
                              }}
                            >
                              <p style={{ color: "white", fontWeight: "bold" }}>
                                Chỉnh sửa thông tin cá nhân
                              </p>
                              <ion-icon
                                name="close-circle-outline"
                                onClick={handleOpenDialogInfor}
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
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  padding: "10px 20px 0",
                                }}
                              >
                                <label>Họ và tên</label>
                                {openUpdateField ? (
                                  <>
                                    <input
                                      placeholder={userInfor.account.fullname}
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        border: "1px solid black",
                                        outline: "none",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                      }}
                                    ></input>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        display: "block",
                                        margin: "0",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {userInfor.account.fullname}
                                    </p>
                                  </>
                                )}
                              </Grid>

                              <Grid
                                item
                                xs={6}
                                md={6}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  padding: "10px 10px 0 20px",
                                }}
                              >
                                <label>Quốc tịch</label>
                                {openUpdateField ? (
                                  <>
                                    <input
                                      placeholder={userInfor.account.from}
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        border: "1px solid black",
                                        outline: "none",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                      }}
                                    ></input>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        display: "block",
                                        margin: "0",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {userInfor.account.from}
                                    </p>
                                  </>
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                md={6}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  padding: "10px 20px 0 10px",
                                }}
                              >
                                <label>Thành phố</label>
                                {openUpdateField ? (
                                  <>
                                    <input
                                      placeholder={userInfor.account.city}
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        border: "1px solid black",
                                        outline: "none",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                      }}
                                    ></input>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        display: "block",
                                        margin: "0",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {userInfor.account.city}
                                    </p>
                                  </>
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                md={6}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  padding: "10px 10px 0 20px",
                                }}
                              >
                                <label>Học vấn</label>
                                {openUpdateField ? (
                                  <>
                                    <input
                                      placeholder={userInfor.account.education}
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        border: "1px solid black",
                                        outline: "none",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                      }}
                                    ></input>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        display: "block",
                                        margin: "0",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {userInfor.account.education}
                                    </p>
                                  </>
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                md={6}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                  padding: "10px 20px 0 10px",
                                }}
                              >
                                <label>Số điện thoại</label>
                                {openUpdateField ? (
                                  <>
                                    <input
                                      placeholder={userInfor.account.phone}
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        border: "1px solid black",
                                        outline: "none",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                      }}
                                    ></input>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      style={{
                                        padding: "10px",
                                        boxSizing: "border-box",
                                        display: "block",
                                        margin: "0",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {userInfor.account.phone}
                                    </p>
                                  </>
                                )}
                              </Grid>
                            </Grid>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 20px",
                                justifyContent: "flex-end",
                                gap: "10px",
                              }}
                            >
                              {!openUpdateField ? (
                                <>
                                  <button
                                    onClick={() => {
                                      setOpenUpdateField(true);
                                    }}
                                    style={{
                                      padding: "10px 20px",
                                      backgroundColor: "#a2b3c3",
                                      color: "white",
                                      border: "none",
                                      outline: "none",
                                      cursor: "pointer",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Chỉnh sửa
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                              {openUpdateField ? (
                                <>
                                  <button
                                    onClick={() => {
                                      setOpenUpdateField(false);
                                    }}
                                    style={{
                                      padding: "10px 20px",
                                      backgroundColor: "#a2b3c3",
                                      color: "white",
                                      border: "none",
                                      outline: "none",
                                      cursor: "pointer",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Hủy bỏ
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                              <button
                                style={{
                                  padding: "10px 20px",
                                  backgroundColor: "#a2b3c3",
                                  color: "white",
                                  border: "none",
                                  outline: "none",
                                  cursor: "pointer",
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
                      <span className="text-infor">
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
                      <span className="text-infor">
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
                      <span className="text-infor">
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
                      <span className="text-infor">
                        Người theo dõi
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {userInforId.followers
                            ? userInforId.followers.length
                            : 0}{" "}
                          người
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

                    <div style={{ width: "100%" }}>
                      <Grid container style={{ width: "100%" }}>
                        {listSixImg &&
                          listSixImg.map((item, index) => {
                            return (
                              <Grid
                                key={index}
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
                            <Post
                              key={post.postId}
                              accountId={post.id}
                              imgAccountId={post.userimg}
                              fullnameAccountId={post.fullname}
                              creatAt={post.createdAt}
                              userInfor={userInfor}
                              postId={post.postId}
                              postImg={post.img}
                              postDesc={post.desc}
                              authToken={authToken}
                              postLike={post.like}
                              postNumlike={post.numLike}
                              userID={userID}
                            />
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
  .input-infor {
    border: none;
    outline: none;
    padding: 10px;
  }
  .avata-item {
    height: 30px;
    width: 30px;
    font-size: 15px;
    border: none;
  }
  .css-1ytufz-MuiAvatarGroup-root .MuiAvatar-root {
    border: none;
  }
  .text-infor {
    font-size: 14px;
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
