import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import loginImg from "../../assets/login.jpg";
import io from "socket.io-client";
const socket = io("http://localhost:5002");
function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [hide, setHide] = useState(true);
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/accounts/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle successful login
        console.log(response.data);
        localStorage.setItem("authToken", response.data.accessToken);
        window.location.href = "/home";
      })
      .catch((error) => {
        // Handle failed login
        console.error(error.response.data);
      });
  };
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassWord(e.target.value);
  return (
    // <LoginComponent>
    //   <Grid
    //     container
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       height: "100vh",
    //     }}
    //   >
    //     <Grid
    //       style={{
    //         backgroundColor: "#FFFFFF",
    //         padding: "32px",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         flexDirection: "column",
    //         borderRadius: "10px",
    //       }}
    //       item
    //       xs={8}
    //       md={5}
    //     >
    //       <h2 style={{ fontWeight: "bold" }}>Đăng nhập</h2>
    //       <form
    //         onSubmit={handleSubmit}
    //         class="form"
    //         style={{ padding: "0 32px 32px 32px", width: "70%" }}
    //       >
    //         <div class="input-group">
    //           <label className="label-input" for="username">
    //             Tên đăng nhập
    //           </label>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               height: "100%",
    //               position: "relative",
    //               width: "100%",

    //               marginTop: "2px",
    //             }}
    //           >
    //             <svg
    //               style={{ position: "absolute", top: "2px", left: "5px" }}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               height="24"
    //               width="24"
    //               xmlns="http://www.w3.org/2000/svg"
    //               class="icon"
    //             >
    //               <path
    //                 stroke-linejoin="round"
    //                 stroke-linecap="round"
    //                 stroke-width="1.5"
    //                 stroke="#141B34"
    //                 d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
    //               ></path>
    //               <path
    //                 stroke-linejoin="round"
    //                 stroke-width="1.5"
    //                 stroke="#141B34"
    //                 d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
    //               ></path>
    //             </svg>
    //             <input
    //               onChange={handleEmailInput}
    //               value={username}
    //               type="text"
    //               name="username"
    //               id="username"
    //               placeholder="minhbao@gmail.com"
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div class="input-group">
    //           <label className="label-input" for="password">
    //             Mật khẩu
    //           </label>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               height: "100%",
    //               position: "relative",
    //               width: "100%",
    //               marginTop: "2px",
    //             }}
    //           >
    //             <svg
    //               style={{ position: "absolute", top: "2px", left: "5px" }}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               height="24"
    //               width="24"
    //               xmlns="http://www.w3.org/2000/svg"
    //               class="icon"
    //             >
    //               <path
    //                 stroke-linecap="round"
    //                 stroke-width="1.5"
    //                 stroke="#141B34"
    //                 d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
    //               ></path>
    //               <path
    //                 stroke-linejoin="round"
    //                 stroke-linecap="round"
    //                 stroke-width="1.5"
    //                 stroke="#141B34"
    //                 d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
    //               ></path>
    //               <path
    //                 fill="#141B34"
    //                 d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
    //               ></path>
    //             </svg>
    //             <input
    //               value={password}
    //               type="password"
    //               name="password"
    //               id="password"
    //               placeholder="Password"
    //               onChange={handlePwdInput}
    //               required
    //             />
    //             <span
    //               className="eyes"
    //               onClick={() => {
    //                 var x = document.getElementById("password");
    //                 var y = document.getElementById("hide1");
    //                 var z = document.getElementById("hide2");
    //                 if (x.type === "password") {
    //                   x.type = "text";
    //                   y.style.display = "block";
    //                   z.style.display = "none";
    //                 } else {
    //                   x.type = "password";
    //                   y.style.display = "none";
    //                   z.style.display = "block";
    //                 }
    //               }}
    //             >
    //               <ion-icon id="hide1" name="eye-outline"></ion-icon>
    //               <ion-icon id="hide2" name="eye-off-outline"></ion-icon>
    //             </span>
    //           </div>
    //         </div>
    //         <div
    //           style={{
    //             marginTop: "10px",
    //             display: "flex",
    //             justifyContent: "flex-end",
    //           }}
    //         >
    //           <button
    //             style={{ backgroundColor: COLORS.mainColor }}
    //             class="sign"
    //           >
    //             Đăng nhập
    //           </button>
    //         </div>
    //       </form>
    //       <div
    //         style={{ width: "50%", height: "2px", background: "black" }}
    //       ></div>
    //       <div style={{ padding: "5px" }}>
    //         Bạn chưa có tài khoản?{" "}
    //         <Link
    //           to="/signup"
    //           style={{
    //             fontWeight: "bold",
    //             color: "black",
    //             textDecoration: "none",
    //           }}
    //         >
    //           Đăng ký
    //         </Link>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </LoginComponent>
    <LoginComponent1>
      <section className="left-area">
        <form className="container-login" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "5px",
              padding: "10px",
              borderBottom: "1px solid #928b83",
            }}
          >
            <span
              style={{
                backgroundColor: "black",
                lineHeight: "18px",
                fontWeight: "bold",
              }}
            >
              B
            </span>
            <span style={{ lineHeight: "18px", fontWeight: "bold" }}>
              Instagram
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <h4
                style={{
                  fontSize: "30px",
                  lineHeight: "30px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Đăng nhập
              </h4>
              <p style={{ color: "#928b83" }}>
                Chào mừng đến với mạng xã hội Instagram
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <div className="input-container">
                <label htmlFor="email">Nhập email của bạn</label>
                <input
                  type="text"
                  id="email"
                  onChange={handleEmailInput}
                  value={email}
                ></input>
              </div>
              <div className="input-container" style={{ position: "relative" }}>
                <label htmlFor="password">Nhập mật khẩu của bạn</label>
                <input
                  onChange={handlePwdInput}
                  value={password}
                  id="password"
                  type={hide ? "password" : "text"}
                  style={{}}
                ></input>
                <ion-icon
                  name={hide ? "eye-off-outline" : "eye-outline"}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (hide) {
                      setHide(false);
                    } else {
                      setHide(true);
                    }
                  }}
                ></ion-icon>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button className="btn_login">Đăng nhập</button>
              <span style={{ color: "#928b83" }}>
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "black",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Đăng ký
                </Link>
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",

              padding: "10px",
              borderTop: "1px solid #928b83",
            }}
          >
            <span style={{ color: "#928b83", fontSize: "13px" }}>
              Copyright © 2023
            </span>
          </div>
        </form>
      </section>
      <section className="right-area"></section>
    </LoginComponent1>
  );
}

// const LoginComponent = styled.section`
//   min-height: 100vh;
//   width: 100%;
//   background-image: linear-gradient(
//     to right bottom,
//     #0064ff,
//     #7b87ff,
//     #afadff,
//     #dad5ff,
//     #ffffff
//   );
//   .input-group {
//     width: 100%;
//     margin-bottom: 5px;
//     box-sizing: border-box;
//     border-bottom: 1px solid black;
//     padding-bottom: 2px;
//     margin-bottom: 10px;
//   }
//   .label-input {
//     cursor: pointer;
//   }
//   input {
//     width: 100%;
//     padding: 5px 5px 5px 40px;
//     height: 100%;

//     width: 100%;
//     box-sizing: border-box;
//     border: none;
//     outline: none;
//   }
//   input:focus {
//     border-color: none;
//   }
//   .forgot {
//     width: 100%;
//     text-align: right;
//     padding: 0.5em 0;
//   }
//   .sign {
//     padding: 1em 1em;
//     cursor: pointer;
//     width: 100%;
//     border: none;
//     font-weight: bold;
//     color: white;
//   }
//   .eyes {
//     position: absolute;
//     right: 5px;
//     top: 5px;
//     cursor: pointer;
//   }
//   #hide1 {
//     display: none;
//   }
// `;
const LoginComponent1 = styled.section`
  height: 100vh;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f8f8f8;
  display: flex;
  * {
    margin: 0;
    padding: 0;
  }
  .left-area {
    width: 50%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-item: center;

    .container-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .input-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 5px;
      box-sizing: border-box;
      label {
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
      }
      input {
        outline: none;
        padding: 10px;
      }
    }
    .btn_login {
      padding: 10px 20px;
      background-color: black;
      border: 1px solid black;
      cursor: pointer;
      color: white;
      border-radius: 4px;
    }
    .btn_login:hover {
      color: black;
      background-color: white;
    }
  }
  .right-area {
    width: 50%;
    height: calc(100vh - 40px);
    border-radius: 0 10px 10px 0;
    background-image: url(${loginImg});
    background-size: cover;
    background-position: center;
  }
  @media screen and (max-width: 750px) {
    .left-area {
      width: 100%;
    }
    .right-area {
      display: none;
    }
  }
`;
export default Login;
