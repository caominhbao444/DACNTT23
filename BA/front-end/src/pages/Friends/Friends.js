import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import { Grid } from "@mui/material";
import FriendCard from "../../components/FriendCard/FriendCard";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { COLORS } from "../../assets/Color";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  CallApiUser,
  CallApiUserID,
  CallApiAllUsers,
} from "../../features/userSlice";
function Friends() {
  const [listPeople, setListPeople] = useState("");
  // const handleRequestFriend = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`http://localhost:5001/api/users/follow/${id}`)
  //     .then((response) => {
  //       alert(response);
  //     });
  // };
  const dispatch = useDispatch();
  const { userInforId, userInfor, allUserInfor } = useSelector(
    (state) => state.user
  );
  let { userID } = useParams();
  console.log("userid", userInforId._id);
  console.log("usercurrent", userInfor._id);
  console.log("allusers", allUserInfor);
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    dispatch(
      CallApiUserID({
        headers: { authorization: `Bearer ${authToken}` },
        userID,
      })
    );
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
    dispatch(
      CallApiAllUsers({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);
  console.log(listPeople);
  if (!userInforId && !userInfor && !allUserInfor) {
    return <Loading />;
  }
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
              {listPeople &&
                listPeople.map((people, index) => {
                  return <FriendCard key={index} people={people} />;
                })}
            </div>
          </section>
          {/* Right */}
          <section
            style={{
              backgroundColor: "white",
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
            <input
              style={{
                outline: "none",
                width: "80%",
                height: "30px",
                borderRadius: "10px",
                borderWidth: "1px",
                paddingLeft: "10px",
              }}
            ></input>
            <div
              style={{
                marginTop: "10px",
                height: "100%",
                width: "80%",
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
              {/* {listPeople &&
                listPeople.map((people, index) => {
                  return <FriendCard key={index} people={people} />;
                })} */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "red",
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
                  <span style={{ fontWeight: "bold" }}></span>
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
                  <Link
                    to={`/profile/${1}`}
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
              </div>
            </div>
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
export default Friends;
