import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import { COLORS } from "../../assets/Color";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
function FriendCard(props) {
  const handleChatOpen = () => {
    console.log(props.people._id);
  };
  const handleProfileOpen = () => {
    alert(props.people._id);
  };
  return (
    <CardFriend
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
      }}
      className="card-item"
    >
      <div
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
        <span style={{ fontWeight: "bold" }}>{props.people.username}</span>
        {/* <button onClick={handleRequestFriend}>Theo doi</button> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link to="" className="button_chat" style={{ textDecoration: "none" }}>
          <span>Chat</span>
          <ion-icon
            name="navigate-outline"
            style={{ display: "inline-block" }}
          ></ion-icon>
        </Link>
        <Link
          to={`/profile/${props.people._id}`}
          className="button_chat"
          style={{ textDecoration: "none" }}
        >
          <span>Profile</span>
          <ion-icon
            name="accessibility-outline"
            style={{ display: "inline-block" }}
          ></ion-icon>
        </Link>
      </div>
    </CardFriend>
  );
}
const CardFriend = styled.section`
  .button_chat {
    background-color: ${COLORS.green};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    flex-direction: row;
    gap: 10px;
    color: white;
    font-weight: bold;
  }
`;
export default FriendCard;
