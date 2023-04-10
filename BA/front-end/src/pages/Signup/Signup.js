import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const history = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [fullname, setFullName] = useState("");
  const [passwordConfirm, setPasswordCofirm] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/accounts/register", {
        username: fullname,
        email: username,
        password: password,
      });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailInput = (e) => setUserName(e.target.value);
  const handlePwdInput = (e) => setPassWord(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordCofirm(e.target.value);
  return (
    <>
      <SignupPage>
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
            <h2 style={{ fontWeight: "bold" }}>Đăng ký</h2>
            <form
              onSubmit={handleSubmit}
              class="form"
              style={{
                padding: "0 32px 32px 32px",
                width: "70%",
              }}
            >
              <div class="input-group">
                <label className="label-input" for="fullname">
                  Họ và tên
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
                    name="person-outline"
                  ></ion-icon>
                  <input
                    onChange={handleFullName}
                    value={fullname}
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Cao Minh Bao"
                  />
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="username">
                  Tên đăng nhập
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
                  <svg
                    style={{ position: "absolute", top: "2px", left: "5px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      stroke="#141B34"
                      d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                    ></path>
                    <path
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="#141B34"
                      d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                    ></path>
                  </svg>
                  <input
                    onChange={handleEmailInput}
                    value={username}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="minhbao@gmail.com"
                  />
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="password">
                  Mật khẩu
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
                    name="lock-closed-outline"
                  ></ion-icon>
                  <input
                    onChange={handlePwdInput}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mật khẩu"
                  />
                  <span
                    className="eyes"
                    onClick={() => {
                      var x = document.getElementById("password");
                      var y = document.getElementById("hide1");
                      var z = document.getElementById("hide2");
                      if (x.type === "password") {
                        x.type = "text";
                        y.style.display = "block";
                        z.style.display = "none";
                      } else {
                        x.type = "password";
                        y.style.display = "none";
                        z.style.display = "block";
                      }
                    }}
                  >
                    <ion-icon id="hide1" name="eye-outline"></ion-icon>
                    <ion-icon id="hide2" name="eye-off-outline"></ion-icon>
                  </span>
                </div>
              </div>
              <div class="input-group">
                <label className="label-input" for="passwordConfirm">
                  Nhập lại mật khẩu
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
                    name="lock-closed-outline"
                  ></ion-icon>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder="Nhập lại mật khẩu"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirm}
                  />
                  <span
                    className="eyes"
                    onClick={() => {
                      var x = document.getElementById("passwordConfirm");
                      var y = document.getElementById("hide12");
                      var z = document.getElementById("hide22");
                      if (x.type === "password") {
                        x.type = "text";
                        y.style.display = "block";
                        z.style.display = "none";
                      } else {
                        x.type = "password";
                        y.style.display = "none";
                        z.style.display = "block";
                      }
                    }}
                  >
                    <ion-icon id="hide12" name="eye-outline"></ion-icon>
                    <ion-icon id="hide22" name="eye-off-outline"></ion-icon>
                  </span>
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
      </SignupPage>
    </>
  );
}

const SignupPage = styled.section`
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
export default Signup;
