import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import { COLORS } from "../../assets/Color";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  CallApiUser,
  CallApiUserID,
  CallApiAllUsers,
  CallApiFriends,
  CallConversation,
  CallGetInforConversation,
} from "../../features/userSlice";
function FriendCard(props) {
  const dispatch = useDispatch();
  const { userInforId, userInfor, allUserInfor, listFriends, conversation } =
    useSelector((state) => state.user);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const handleChatOpen = async () => {
    let userID = props.people._id;
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    console.log(userID);
    axios
      .post(`http://localhost:5001/api/conversations/${userID}`, null, {
        headers: headers,
      })
      .then((response) => {
        navigate(`/message/${userID}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate(`/message/${userID}`);
        } else {
          console.log(error);
        }
      });
  };

  if (
    !userInforId &&
    !userInfor &&
    !allUserInfor &&
    !listFriends &&
    !conversation
  ) {
    return <Loading />;
  }

  return (
    <CardFriend
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      className="card-item"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "10px",
          alignItems: "center",
          gap: "10px",
          width: "50%",
        }}
      >
        <img
          src={props.people.img}
          className="img-src"
          alt=""
          style={{
            height: "40px",
            width: "40px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        />
        <span style={{ fontWeight: "bold" }}>{props.people.fullname}</span>
        {/* <button onClick={handleRequestFriend}>Theo doi</button> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "50%",
          gap: "10px",
        }}
      >
        <button
          onClick={handleChatOpen}
          className="button_chat"
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Nhắn tin</span>
          <ion-icon
            name="navigate-outline"
            style={{ display: "inline-block" }}
          ></ion-icon>
        </button>
        <Link
          to={`/profile/${props.people._id}`}
          className="button_chat"
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            Trang cá nhân
          </span>
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
