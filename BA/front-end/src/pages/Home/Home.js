import React from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Paper } from "@mui/material";
function Home() {
  return (
    <>
      <Navbar />
      <HomePage>
        {/* Left */}
        <section className="left-component">
          <Link to="" className="profile-component">
            <div className="profile-photo">
              <img src="https://images.unsplash.com/photo-1680726621439-85ee92b6eeb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60" />
            </div>
          </Link>
        </section>
        {/* Main */}
        <section className="main-component"></section>
        {/* Right */}
        <section className="right-component"></section>
      </HomePage>
    </>
  );
}

const HomePage = styled.section`
  min-height: 100vh;
  width: 100%;
`;
export default Home;
