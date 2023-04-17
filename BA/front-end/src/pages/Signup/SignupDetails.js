import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupDetails() {
  const history = useNavigate();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const authToken = localStorage.getItem("authToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/api/users/",
        {
          phone: numberPhone,
          city: city,
          from: country,
          education: education,
        },
        {}
      );
      history("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCityInput = (e) => setCity(e.target.value);
  const handleCountryInput = (e) => setCountry(e.target.value);
  const handleEducationInput = (e) => setEducation(e.target.value);
  const handleNumber = (e) => setNumberPhone(e.target.value);
  return (
    <>
      <SignupDetailsPage>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid
            style={{
              backgroundColor: "#FFFFFF",
              padding: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "10px",
            }}
            item
            xs={8}
            md={5}
          >
            <h2 style={{ fontWeight: "bold" }}>Nhập thông tin chi tiết</h2>
            <form
              onSubmit={handleSubmit}
              class="form"
              style={{
                padding: "0 32px 32px 32px",
                width: "70%",
              }}
            >
              <div class="input-group">
                <label className="label-input" for="education">
                  Trường học
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    marginTop: "2px",
                  }}
                >
                  <ion-icon
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "5px",
                      width: "24px",
                      height: "24px",
                    }}
                    name="book-outline"
                  ></ion-icon>
                  <input
                    onChange={handleEducationInput}
                    value={education}
                    type="text"
                    name="education"
                    id="education"
                    placeholder="Trường Đại Học Tôn Đức Thắng"
                  />
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="numberPhone">
                  Sô điện thoại
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    marginTop: "2px",
                  }}
                >
                  <ion-icon
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "5px",
                      width: "24px",
                      height: "24px",
                    }}
                    name="book-outline"
                  ></ion-icon>
                  <input
                    onChange={handleNumber}
                    value={numberPhone}
                    type="text"
                    name="numberPhone"
                    id="numberPhone"
                    placeholder="Trường Đại Học Tôn Đức Thắng"
                  />
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="city">
                  Thành phố
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    marginTop: "2px",
                  }}
                >
                  <ion-icon
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "5px",
                      width: "24px",
                      height: "24px",
                    }}
                    name="location-outline"
                  ></ion-icon>
                  <input
                    onChange={handleCityInput}
                    value={city}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Sài gòn"
                  />
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="country">
                  Quốc gia
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    marginTop: "2px",
                  }}
                >
                  <ion-icon
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "5px",
                      width: "24px",
                      height: "24px",
                    }}
                    name="compass-outline"
                  ></ion-icon>
                  <input
                    onChange={handleCountryInput}
                    value={country}
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Việt Nam"
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  style={{ backgroundColor: COLORS.mainColor }}
                  class="sign"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
      </SignupDetailsPage>
    </>
  );
}

const SignupDetailsPage = styled.section`
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    #0064ff,
    #7b87ff,
    #afadff,
    #dad5ff,
    #ffffff
  );
  .input-group {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    padding-bottom: 2px;
  }
  .label-input {
    cursor: pointer;
  }
  input {
    width: 100%;
    padding: 5px 5px 5px 40px;
    height: 100%;

    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
  input:focus {
    border-color: none;
  }
  .forgot {
    width: 100%;
    text-align: right;
    padding: 0.5em 0;
  }
  .sign {
    padding: 1em 1em;
    cursor: pointer;
    width: 100%;
    border: none;
    font-weight: bold;
    color: white;
  }
  .eyes {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }
  #hide12 {
    display: none;
  }
  #hide1 {
    display: none;
  }
`;
export default SignupDetails;
