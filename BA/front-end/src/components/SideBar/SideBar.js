import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { COLORS } from "../../assets/Color";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
import Loading from "../../pages/Loading/Loading";
import axios from "axios";
import {
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

function SideBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [Urlimg, setUrlimg] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const authToken = localStorage.getItem("authToken");
  const { userInfor, isLoading } = useSelector((state) => state.user);
  // const [isFriends, setIsFriends] = useState(true);
  console.log(userInfor.account);
  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  const [content, setContent] = useState("");

  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
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

  if (!userInfor.account) {
    return <Loading />;
  }

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
  return (
    <>
      <Grid item xs={3} md={3} style={{}}>
        <section
          className="left-component"
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          <Link
            to="/home"
            className="profile-component"
            style={{
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "black",
              backgroundColor: "white",
              padding: "20px",
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              borderRadius: "10px",
            }}
          >
            <div className="profile-photo">
              {/* <img src="https://images.unsplash.com/photo-1680726621439-85ee92b6eeb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60" /> */}
              <img
                src={userInfor.account.img}
                className="img-src"
                alt=""
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div className="details" style={{ boxSizing: "border-box" }}>
              <h4>{userInfor.account.fullname}</h4>
            </div>
          </Link>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "black",
              backgroundColor: "white",
              padding: "20px",
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              borderRadius: "10px",
              outline: "none",
              cursor: "pointer",
              fontWeight: "bold",
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
                style={{ display: "flex", gap: "10px", position: "relative" }}
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
          <div
            className="sidebar"
            style={{
              textDecoration: "none",
              color: "black",
              backgroundColor: "white",
              padding: "20px",
              width: "60%",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Link
              to="/home"
              className="sidebar-item"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",

                width: "100%",
              }}
            >
              <Grid container>
                <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                  <ion-icon name="home-outline"></ion-icon>
                </Grid>
                <Grid item xs={9} md={9} style={{ textAlign: "left" }}>
                  <span>Trang chủ</span>
                </Grid>
              </Grid>
            </Link>
            <Link
              to={`/profile/${userInfor.account._id}`}
              className="sidebar-item"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Grid container>
                <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                  <ion-icon name="person-outline"></ion-icon>
                </Grid>
                <Grid item xs={9} md={9} style={{ textAlign: "left" }}>
                  <span>Trang cá nhân</span>
                </Grid>
              </Grid>
            </Link>
            <Link
              to="/message"
              className="sidebar-item"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Grid container>
                <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                  <ion-icon name="mail-outline"></ion-icon>
                </Grid>
                <Grid item xs={9} md={9} style={{ textAlign: "left" }}>
                  <span>Tin nhắn</span>
                </Grid>
              </Grid>
            </Link>
            <Link
              to="/friends"
              className="sidebar-item"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Grid container>
                <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                  <ion-icon name="people-outline"></ion-icon>
                </Grid>
                <Grid item xs={9} md={9} style={{ textAlign: "left" }}>
                  <span>Bạn bè</span>
                </Grid>
              </Grid>
            </Link>
            <Link
              to="/"
              className="sidebar-item"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Grid container>
                <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                  <ion-icon name="help-outline"></ion-icon>
                </Grid>
                <Grid item xs={9} md={9} style={{ textAlign: "left" }}>
                  <span>Báo cáo</span>
                </Grid>
              </Grid>
            </Link>
          </div>
        </section>
      </Grid>
    </>
  );
}

export default SideBar;
