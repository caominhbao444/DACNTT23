import React, { lazy, Suspense, useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { vi } from "date-fns/locale";

import Navbar from "../../components/Navbar/Navbar";
import { formatDistance } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { CallApiUser } from "../../features/userSlice";
import {
  CallApiAllPosts,
  CallApiCreatePost,
  CallApiEditPost,
  CallApiPostNewComment,
  CallApiDeleteComment,
  CallApiEditComment,
  CallApiLike,
} from "../../features/postSlice";
import {
  CircularProgress,
  Box,
  TextareaAutosize,
  Button,
  Dialog,
  Skeleton,
  Textarea,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
const Post = lazy(() => import("../../components/Post/Post"));
const MySwal = withReactContent(Swal);
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialogId, setOpenDialogId] = useState(null);
  const [openDialogCommentId, setOpenDialogCommentId] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const [postStates, setPostStates] = useState({});
  const { userInfor } = useSelector((state) => state.user);
  const { listPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(
      CallApiUser({ headers: { authorization: `Bearer ${authToken}` } })
    );
    dispatch(
      CallApiAllPosts({ headers: { authorization: `Bearer ${authToken}` } })
    );
  }, []);

  const Readmore = (e) => {
    return e.slice(0, 100);
  };
  // ================================================================

  return (
    <>
      {!userInfor && !listPosts ? (
        <CircularProgress />
      ) : userInfor && listPosts ? (
        <>
          <Navbar />
          <HomePage
            style={{ backgroundColor: "#FFD4D8", position: "relative" }}
          >
            <Grid container style={{ padding: "0" }}>
              {/* Left */}
              <SideBar />
              {/* Main */}
              <Grid item xs={8} md={8} style={{}}>
                <section
                  className="main-component"
                  style={{
                    padding: "20px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <Suspense
                    fallback={
                      <div
                        style={{
                          width: "100%",
                          minHeight: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    }
                  >
                    {listPosts &&
                      listPosts
                        .slice()
                        .reverse()
                        .map((post, index) => {
                          return (
                            <>
                              <Post
                                key={index}
                                accountId={post.account._id}
                                imgAccountId={post.account.img}
                                fullnameAccountId={post.account.fullname}
                                creatAt={post.createdAt}
                                userInfor={userInfor}
                                postId={post.postId}
                                postImg={post.img}
                                postDesc={post.desc}
                                authToken={authToken}
                                postLike={post.like}
                                postNumlike={post.numLike}
                              />
                            </>
                          );
                        })}
                  </Suspense>
                </section>
              </Grid>
            </Grid>
          </HomePage>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const HomePage = styled.section`
  min-height: 100vh;
  width: 100%;

  .comment_item:hover {
    background-color: #f5f5f5;
    margin-right: 20px;
  }
  #myTextarea {
    width: 100%;
    height: 60px;
    display: block;
    padding: 15px 90px 15px 15px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    max-height: 200px;
  }
  #myTextarea::-webkit-scrollbar {
    width: 0;
  }
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
  .containerComment {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    form {
      height: 50px;
      width: 100%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px;
    }
  }

  #textComment {
    width: 100%;
    height: 50px;
    padding: 15px 80px 15px 60px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-radius: 5px;
    max-height: 100px;
  }
  #textComment::-webkit-scrollbar {
    width: 0;
  }
  #textEditComment {
    width: 100%;
    height: 50px;
    padding: 15px 80px 15px 60px;
    line-height: 20px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: none;
    border-radius: 5px;
    background-color: white;
    max-height: 100px;
  }
  #textEditComment::-webkit-scrollbar {
    width: 0;
  }
  .container_img {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: red;
    border-top: 1px solid darkgray;
    padding: 15px;
  }
  button[disabled] {
    background-color: gray;
    color: white;
  }
  .btn_posts {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fc3208;
    color: white;
    font-weight: bold;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
const BtnEditComment = styled.section`
  background-color: #58a168;
  padding: 5px 10px;
  text-align: center;
  color: white;
  font-weight: bold;
  border: 1px solid #58a168;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #58a168;
  }
`;
export default Home;
