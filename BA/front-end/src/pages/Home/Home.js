import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../pages/Loading/Loading";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SideBar from "../../components/SideBar/SideBar";
import RequestFriends from "../../components/RequestFriends/RequestFriends";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
function Home() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const { userInfor } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  const hih = () => {
    alert("bao");
  };
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  if (!userInfor) {
    return <Loading />;
  }
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
                <input
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
                ></input>
                <button
                  type="submit"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    padding: "10px 20px",
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

              <section
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
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
              </section>
              <section
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
                      src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
                      <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
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
                    src="https://images.unsplash.com/photo-1486649567693-aaa9b2e59385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fHBlb3BsZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60"
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
              </section>
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
`;
export default Home;
