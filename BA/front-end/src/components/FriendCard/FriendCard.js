import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function FriendCard(props) {
  const handleChatOpen = () => {
    console.log(props.people._id);
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
      <ion-icon onClick={handleChatOpen} name="navigate-outline"></ion-icon>
    </CardFriend>
  );
}
const CardFriend = styled.section``;
export default FriendCard;
