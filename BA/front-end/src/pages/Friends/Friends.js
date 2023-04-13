import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import { Grid } from "@mui/material";
import FriendCard from "../../components/FriendCard/FriendCard";

function Friends() {
  return (
    <>
      <Navbar />
      <FriendsPage>
        <section
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Left */}
          <section
            style={{
              backgroundColor: "ButtonFace",
              width: "70%",
              minHeight: "calc(100vh - 64px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#6d6d6d",
                letterSpacing: "1px",
              }}
            >
              Danh sách bạn bè
            </p>
            <div
              style={{
                height: "100%",
                width: "60%",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "InfoBackground",
                gap: "20px",
              }}
              className="container-listFriends"
            >
              <FriendCard />
              <FriendCard />
              <FriendCard />
            </div>
          </section>
          {/* Right */}
          <section
            style={{
              backgroundColor: "yellow",
              width: "30%",
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 64px)",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#6d6d6d",
                letterSpacing: "1px",
              }}
            >
              Tìm kiếm bạn bè
            </p>
          </section>
        </section>
      </FriendsPage>
    </>
  );
}
const FriendsPage = styled.section`
  min-height: calc(100vh - 64px);
  width: 100%;
  box-sizing: border-box;
  background-color: #ffd4d8;
`;
export default Friends;
