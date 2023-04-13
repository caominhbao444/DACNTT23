import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import { Grid } from "@mui/material";

function Friends() {
  return (
    <>
      <Navbar />
      <FriendsPage>
        <Grid container></Grid>
      </FriendsPage>
    </>
  );
}
const FriendsPage = styled.section`
  min-height: 100vh;
  width: 100%;
`;
export default Friends;
