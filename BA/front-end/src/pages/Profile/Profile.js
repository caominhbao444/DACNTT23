import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import Loading from "../../pages/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiUser,
  CallApiUserID,
  CallApiAllUsers,
  CallApiCheckFriends,
} from "../../features/userSlice";
import { useParams } from "react-router";
import axios from "axios";
function Profile() {
  let { userID } = useParams();
  const [textContentButton, setTextContentButton] = useState("Theo dõi");
  const [check, setcheck] = useState(true);
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const { userInforId, userInfor, allUserInfor, checkFriends } = useSelector(
    (state) => state.user
  );
  // console.log("userid", userInforId._id);
  // console.log("usercurrent", userInfor.account._id);
  // console.log("allusers", allUserInfor);

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
    // dispatch(
    //   CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    // );
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
  if (!userInforId && !userInfor && !userID && !checkFriends) {
    return <Loading />;
  }
  console.log(userInforId);
  return (
    <>
      <Navbar />
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
                    sx: { height: 30, width: 30, fontSize: 15, border: "none" },
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
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "70%",
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
                  Giới thiệu
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
                <button
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
                      {userInforId.education ? userInforId.education : "Empty"}
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
                    <span style={{ fontWeight: "bold" }}> 2.200 người </span>
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "70%",
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                    <Grid item xs={4} md={4} style={{ padding: "5px" }}>
                      <img
                        src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Grid container style={{ width: "100%" }}>
                  <Grid item xs={1} md={1}>
                    <img
                      src={userInforId.img}
                      width={50}
                      height={50}
                      alt=""
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <div style={{ position: "relative" }}>
                      <input
                        style={{
                          width: "100%",
                          fontSize: "15px",
                          border: "none",
                          height: "50px",
                          borderRadius: "20px",
                          backgroundColor: "#f0f0f0",
                          outline: "none",
                          padding: "0 0 0 10px",
                        }}
                        type="text"
                      ></input>
                      <ion-icon
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "10px",
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                        name="paper-plane-outline"
                      ></ion-icon>
                    </div>
                  </Grid>
                </Grid>
              </div>
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

              {/* ================================================ */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
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
                    src={userInforId.img}
                    className="img-src"
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {userInforId.fullname}
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
                  <Stack direction="row" spacing={-1}>
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
                  </Stack>
                  <span>Được thích bởi Tiến Minh and 2,200 người khác</span>
                </div>
                <div style={{ marginTop: "" }}>
                  <p>
                    <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                      Minh Bảo
                    </span>
                    <span>
                      {Readmore(
                        "Lorem Ipsum is simply dummy text of the printing an typesetting industry. Lorem Ipsum has been dustrystandard dummy text ever since the 1500s, when an unknown printer took a galley of type an scrambled it to make a type spec"
                      )}
                      ...
                    </span>
                  </p>
                </div>
              </div>
              {/* ================================================================================================================================ */}
            </div>
          </Grid>
        </Grid>
      </ProfilePage>
    </>
  );
}
const ProfilePage = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: #ffd4d8;
  .avata-item {
    height: 30px;
    width: 30px;
    font-size: 15px;
    border: none;
  }
  .css-1ytufz-MuiAvatarGroup-root .MuiAvatar-root {
    border: none;
  }
`;
export default Profile;
