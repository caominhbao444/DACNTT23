import React from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SideBar from "../../components/SideBar/SideBar";
import AvatarGroup from "@mui/material/AvatarGroup";
import RequestFriends from "../../components/RequestFriends/RequestFriends";
import { Link } from "react-router-dom";

function Profile() {
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
              src="https://images.unsplash.com/photo-1681111957389-ea67d854d70f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
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
                Minh Bảo
              </span>
              <span style={{ color: "GrayText", fontSize: "13px" }}>
                1.1K bạn bè
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
              justifyContent: "flex-end",
              padding: "0",
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
                    <span style={{ fontWeight: "bold" }}> Việt Nam</span>
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
                    <span style={{ fontWeight: "bold" }}> Tôn Đức Thắng</span>
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
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid container style={{ width: "100%" }}>
                  <Grid item xs={1} md={1}>
                    <img
                      src="https://images.unsplash.com/photo-1681111957389-ea67d854d70f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                      width={50}
                      height={50}
                      alt=""
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "15px",
                        border: "1px solid black",
                        height: "50px",
                        borderRadius: "20px",
                        backgroundColor: "#f0f0f0",
                        outline: "none",

                        padding: "0 0 0 10px",
                      }}
                      type="text"
                    ></input>
                  </Grid>
                </Grid>
              </div>
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
