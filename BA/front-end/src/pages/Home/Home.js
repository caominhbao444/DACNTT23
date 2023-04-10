import React from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
function Home() {
  const number = 6;
  const hih = () => {
    alert("bao");
  };
  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  return (
    <>
      <Navbar />
      <HomePage style={{ backgroundColor: "ButtonFace" }}>
        {/* Left */}
        <Grid container style={{ padding: "0" }}>
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
                  textAlign: "center",
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
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    className="img-src"
                    alt=""
                  />
                </div>
                <div className="details">
                  <h4>Minh Bao</h4>
                  <p className="">@minhbaoo</p>
                </div>
              </Link>
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
                  to="/"
                  className="sidebar-item"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",

                    width: "100%",
                  }}
                >
                  <Grid container>
                    <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                      <ion-icon name="home-outline"></ion-icon>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                      <span>Home</span>
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
                    <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                      <ion-icon name="person-outline"></ion-icon>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                      <span>Profile</span>
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
                    <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                      <ion-icon name="mail-outline"></ion-icon>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                      <span>Message</span>
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
                    <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                      <ion-icon name="help-outline"></ion-icon>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                      <span>Help</span>
                    </Grid>
                  </Grid>
                </Link>
              </div>
            </section>
          </Grid>
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
                    backgroundColor: COLORS.mainColor,
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
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
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
                    src="https://images.unsplash.com/photo-1680955886049-ce69173143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
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
          <Grid item xs={3} md={3} style={{}}>
            <section
              className="right-component"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "60%",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <span style={{ fontWeight: "500", color: "GrayText" }}>
                  Lời mời kết bạn
                </span>
                {/* Card kết bạn */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
                      <span>8 bạn chung</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Đồng ý
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
                      <span>8 bạn chung</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Đồng ý
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
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
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Minh Bảo</span>
                      <span>8 bạn chung</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Đồng ý
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: COLORS.mainColor,
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </Grid>
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
