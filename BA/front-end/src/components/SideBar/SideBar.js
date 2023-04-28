import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
import Loading from "../../pages/Loading/Loading";
function SideBar() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("authToken");
  const { userInfor, isLoading } = useSelector((state) => state.user);
  // const [isFriends, setIsFriends] = useState(true);
  console.log(userInfor.account);
  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  if (!userInfor.account) {
    return <Loading />;
  }
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
                style={{ width: "60px", height: "60px" }}
              />
            </div>
            <div className="details" style={{ boxSizing: "border-box" }}>
              <h4>{userInfor.account.fullname}</h4>
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
                <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                  <ion-icon name="home-outline"></ion-icon>
                </Grid>
                <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                  <span>Home</span>
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
                <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                  <ion-icon name="person-outline"></ion-icon>
                </Grid>
                <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                  <span>Profile</span>
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
                <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                  <ion-icon name="mail-outline"></ion-icon>
                </Grid>
                <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                  <span>Message</span>
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
                <Grid item xs={6} md={6} style={{ textAlign: "center" }}>
                  <ion-icon name="people-outline"></ion-icon>
                </Grid>
                <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
                  <span>Friends</span>
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
    </>
  );
}

export default SideBar;
