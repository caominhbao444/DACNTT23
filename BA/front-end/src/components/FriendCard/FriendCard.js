import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
function FriendCard() {
  const [id, setId] = useState("643514a3556bd01cfc62dcda");
  const handleRequestFriend = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5001/api/users/follow/${id}`)
      .then((response) => {
        alert(response);
      });
  };
  const handleListFriend = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5001/api/users/friends")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <span style={{ fontWeight: "bold" }}>Minh Bao</span>
        <button onClick={handleRequestFriend}>Theo doi</button>
        <button onClick={handleListFriend}>Xem</button>
      </div>
      <ion-icon onClick={() => {}} name="navigate-outline"></ion-icon>
    </CardFriend>
  );
}
const CardFriend = styled.section``;
export default FriendCard;
