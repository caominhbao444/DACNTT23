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
  CallApiFriends,
} from "../../features/userSlice";
function Friends() {
  const [listPeople, setListPeople] = useState("");
  const [inputFullName, setInputFullName] = useState("");
  // const handleRequestFriend = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`http://localhost:5001/api/users/follow/${id}`)
  //     .then((response) => {
  //       alert(response);
  //     });
  // };
  const dispatch = useDispatch();
  const { userInforId, userInfor, allUserInfor, listFriends } = useSelector(
    (state) => state.user
  );
  let { userID } = useParams();

  console.log("allusers", allUserInfor);
  console.log("list friends", listFriends);
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
    dispatch(
      CallApiFriends({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  if (!userInforId && !userInfor && !allUserInfor && !listFriends) {
    return <Loading />;
  }
  console.log(listFriends);
  return (
    <>
      <Navbar />
      <FriendsPage>
        <section
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "#f0f0f0",
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
              {listFriends &&
                listFriends.map((people, index) => {
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
              placeholder="Nhập tên cần tìm"
              value={inputFullName}
              onChange={(e) => {
                setInputFullName(e.target.value);
              }}
            ></input>
            <div
              style={{
                marginTop: "10px",
                maxHeight: "300px",
                width: "80%",
                padding: "10px",
                overflowY: "scroll",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "InfoBackground",
                gap: "20px",
              }}
              className="container-listFriends"
            >
              {inputFullName.trim() === ""
                ? null
                : allUserInfor &&
                  allUserInfor
                    .filter((people1) => {
                      return people1.fullname.toLocaleLowerCase() === "" ? (
                        <>
                          <p>Không tìm thấy</p>
                        </>
                      ) : (
                        people1.fullname
                          .toLowerCase()
                          .includes(inputFullName.trim())
                      );
                    })
                    .map((people, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
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
                                src={people.img}
                                className="img-src"
                                alt=""
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                }}
                              />
                              <span
                                style={{ fontWeight: "bold", fontSize: "13px" }}
                              >
                                {people.fullname}
                              </span>
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
                                to={`/profile/${people._id}`}
                                className="button_chat"
                                style={{ textDecoration: "none" }}
                              >
                                <span style={{ fontSize: "13px" }}>
                                  Trang cá nhân
                                </span>
                                <ion-icon
                                  name="accessibility-outline"
                                  style={{ display: "inline-block" }}
                                ></ion-icon>
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })}
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
    background-color: #a2b3c3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    flex-direction: row;
    gap: 10px;
    color: white;
    font-weight: bold;
  }
  .container-listFriends::-webkit-scrollbar {
    display: none;
  }
`;
export default Friends;
