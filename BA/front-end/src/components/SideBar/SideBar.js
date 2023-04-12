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

function SideBar() {
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
              to="/profile"
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
