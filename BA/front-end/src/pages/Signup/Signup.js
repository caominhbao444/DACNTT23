import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import signup from "../../assets/signup.jpg";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  OutlinedInput,
  makeStyles,
} from "@mui/material";

function Signup() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [fullname, setFullName] = useState("");
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [Urlimg, setUrlimg] = useState(
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
  );
  const [passwordConfirm, setPasswordCofirm] = useState("");
  // const onSubmit = async (values) => {
  //   const { fullname, email, password, phone, city, from, education } = values;
  //   await axios
  //     .post("http://localhost:5001/api/accounts/register", {
  //       fullname: fullname,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       city: city,
  //       from: from,
  //       education: education,
  //     })
  //     .then((response) => {
  //       // Handle successful login
  //       console.log(response.data);
  //       localStorage.setItem("authToken", response.data.accessToken);
  //       window.location.href = "/";
  //     })
  //     .catch((error) => {
  //       // Handle failed login
  //       console.error(error.response.data);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5001/api/accounts/register", {
          fullname: fullname,
          email: email,
          password: password,
          phone: numberPhone,
          city: city,
          from: country,
          education: education,
          img: Urlimg,
        })
        .then((response) => {
          localStorage.setItem("authToken", response.data.accessToken);
          Swal.fire({
            title: "Thành công!",
            text: "Bạn đăng ký thành công!",
            icon: "success",
            confirmButtonColor: `${COLORS.main}`,
            confirmButtonText: "Tiếp tục",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        })
        .catch((err) => {
          if (err && err.response) console.log("Error", err);
        });
    } catch (error) {
      console.log("Error...");
    }
  };
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassWord(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordCofirm(e.target.value);
  const handleCityInput = (e) => setCity(e.target.value);
  const handleCountryInput = (e) => setCountry(e.target.value);
  const handleEducationInput = (e) => setEducation(e.target.value);
  const handleNumber = (e) => setNumberPhone(e.target.value);

  const upLoad = async () => {
    const { value: file } = await Swal.fire({
      title: "Chọn ảnh đại diện",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pzoe2lzh");
        axios
          .post(
            "https://api.cloudinary.com/v1_1/djhhzmcps/image/upload",
            formData
          )
          .then((response) => {
            Swal.fire({
              title: "Ảnh của bạn đã được đăng",
              imageUrl: response.data.url,
              imageAlt: "The uploaded picture",
            });
            setUrlimg(response.data.url);
          });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    // <SignupPage>
    //   <div className="container" style={{ backgroundColor: "ButtonFace" }}>
    //     <h2>Đăng ký</h2>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         gap: "20px",
    //       }}
    //     >
    //       <img
    //         src={`${Urlimg}`}
    //         alt=""
    //         width="80px"
    //         height="80px"
    //         style={{
    //           objectFit: "cover",
    //           objectPosition: "center",
    //           borderRadius: "50%",
    //         }}
    //       />
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <button onClick={upLoad} className="btn_upload">
    //           Chọn ảnh
    //         </button>
    //       </div>
    //     </div>
    //     <form
    //       onSubmit={handleSubmit}
    //       style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    //     >
    //       <Grid container style={{ backgroundColor: "", minHeight: "50vh" }}>
    //         <Grid item xs={6} md={6}>
    //           <div className="containerItem">
    //             <div className="inputGroup">
    //               <label className="label-input" for="fullname">
    //                 Họ và tên
    //               </label>
    //               <input
    //                 type="text"
    //                 autoComplete="off"
    //                 value={fullname}
    //                 onChange={handleFullName}
    //                 name="fullname"
    //                 placeholder="Nhập họ và tên của bạn"
    //                 id="fullname"
    //                 required
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //             <div className="inputGroup">
    //               <label className="label-input" for="email">
    //                 Email
    //               </label>
    //               <input
    //                 required
    //                 type="text"
    //                 autoComplete="off"
    //                 value={email}
    //                 onChange={handleEmailInput}
    //                 name="email"
    //                 id="email"
    //                 placeholder="Nhập email của bạn"
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //             <div className="inputGroup">
    //               <label className="label-input" for="password">
    //                 Mật khẩu
    //               </label>
    //               <div
    //                 style={{
    //                   height: "100%",
    //                   width: "80%",
    //                   position: "relative",
    //                 }}
    //               >
    //                 <input
    //                   required
    //                   type="password"
    //                   name="password"
    //                   autoComplete="off"
    //                   id="password"
    //                   value={password}
    //                   onChange={handlePwdInput}
    //                   style={{
    //                     boxSizing: "border-box",
    //                     height: "100%",
    //                     width: "100%",
    //                     paddingLeft: "5px",
    //                     border: "none",
    //                     outline: "none",
    //                   }}
    //                 />
    //                 <span
    //                   className="eyes"
    //                   onClick={() => {
    //                     var x = document.getElementById("password");
    //                     var y = document.getElementById("hide1");
    //                     var z = document.getElementById("hide2");
    //                     if (x.type === "password") {
    //                       x.type = "text";
    //                       y.style.display = "block";
    //                       z.style.display = "none";
    //                     } else {
    //                       x.type = "password";
    //                       y.style.display = "none";
    //                       z.style.display = "block";
    //                     }
    //                   }}
    //                 >
    //                   <ion-icon id="hide1" name="eye-outline"></ion-icon>
    //                   <ion-icon id="hide2" name="eye-off-outline"></ion-icon>
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="inputGroup">
    //               <label className="label-input" for="passwordConfirm">
    //                 Nhập lại mật khẩu
    //               </label>
    //               <div
    //                 style={{
    //                   height: "100%",
    //                   width: "80%",
    //                   position: "relative",
    //                 }}
    //               >
    //                 <input
    //                   type="password"
    //                   name="passwordConfirm"
    //                   id="passwordConfirm"
    //                   value={passwordConfirm}
    //                   onChange={handlePasswordConfirm}
    //                   style={{
    //                     boxSizing: "border-box",
    //                     height: "100%",
    //                     width: "100%",
    //                     padding: "5px 0 5px 5px",
    //                     border: "none",
    //                     outline: "none",
    //                   }}
    //                 />
    //                 <span
    //                   className="eyes"
    //                   onClick={() => {
    //                     var x = document.getElementById("password");
    //                     var y = document.getElementById("hide1");
    //                     var z = document.getElementById("hide2");
    //                     if (x.type === "password") {
    //                       x.type = "text";
    //                       y.style.display = "block";
    //                       z.style.display = "none";
    //                     } else {
    //                       x.type = "password";
    //                       y.style.display = "none";
    //                       z.style.display = "block";
    //                     }
    //                   }}
    //                 >
    //                   <ion-icon id="hide1" name="eye-outline"></ion-icon>
    //                   <ion-icon id="hide2" name="eye-off-outline"></ion-icon>
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </Grid>
    //         <Grid item xs={6} md={6}>
    //           <div className="containerItem1">
    //             <div className="inputGroup1">
    //               <label className="label-input" for="phone">
    //                 Số điện thoại
    //               </label>
    //               <input
    //                 type="text"
    //                 value={numberPhone}
    //                 onChange={handleNumber}
    //                 name="phone"
    //                 id="phone"
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //             <div className="inputGroup1">
    //               <label className="label-input" for="education">
    //                 Học vấn
    //               </label>
    //               <input
    //                 type="text"
    //                 value={education}
    //                 onChange={handleEducationInput}
    //                 name="education"
    //                 id="education"
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //             <div className="inputGroup">
    //               <label className="label-input" for="city">
    //                 Thành phố
    //               </label>
    //               <input
    //                 type="text"
    //                 name="city"
    //                 id="city"
    //                 value={city}
    //                 onChange={handleCityInput}
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //             <div className="inputGroup">
    //               <label className="label-input" for="from">
    //                 Quốc gia
    //               </label>
    //               <input
    //                 value={country}
    //                 onChange={handleCountryInput}
    //                 type="text"
    //                 name="from"
    //                 id="from"
    //                 style={{
    //                   boxSizing: "border-box",
    //                   height: "100%",
    //                   width: "80%",
    //                   padding: "5px 0 5px 5px",
    //                   border: "none",
    //                   outline: "none",
    //                 }}
    //               />
    //             </div>
    //           </div>
    //         </Grid>
    //         <Grid></Grid>
    //       </Grid>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <button
    //           type="submit"
    //           className="btn_upload"
    //           style={{ width: "90%" }}
    //         >
    //           Đăng ký
    //         </button>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           width: "50%",
    //           marginLeft: "50%",
    //           gap: "5px",
    //           padding: "10px",
    //         }}
    //       >
    //         <span>Bạn đã có tài khoản?</span>
    //         <Link to="/" style={{ textDecoration: "none", color: "black" }}>
    //           Đăng nhập
    //         </Link>
    //       </div>
    //     </form>
    //   </div>
    // </SignupPage>
    <SignupPage1>
      <section className="left-area">
        <div
          style={{
            width: "80%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
          }}
        ></div>
      </section>
      <section className="right-area">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Đăng ký</h3>
          <p>Chào mừng đến với mạng xã hội Instagram</p>
        </div>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            gap: "20px",
          }}
        >
          <li
            style={{
              height: "40px",
              textAlign: "center",
              width: "40px",
              lineHeight: "40px",
              boxSizing: "border-box",
              borderRadius: "50%",
              color: "white",
              backgroundColor: "black",
            }}
          >
            1
          </li>
          <li
            style={{
              height: "40px",
              textAlign: "center",
              width: "40px",
              lineHeight: "40px",
              boxSizing: "border-box",
              borderRadius: "50%",
              color: "white",
              backgroundColor: "black",
            }}
          >
            2
          </li>
          <li
            style={{
              height: "40px",
              textAlign: "center",
              width: "40px",
              lineHeight: "40px",
              boxSizing: "border-box",
              borderRadius: "50%",
              color: "white",
              backgroundColor: "black",
            }}
          >
            3
          </li>
        </ul>
        <div
          style={{
            height: "350px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "350px",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <img
              src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
              width={250}
              height={250}
              alt=""
            ></img>
            <p>Chọn ảnh đại diện của bạn</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </section>

      <div class="left-part"></div>
      <div class="right-part"></div>
    </SignupPage1>
  );
}

const SignupPage = styled.section`
  ${"" /* background-color: red; */}
  ${
    "" /* min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right bottom,
    #0064ff,
    #7b87ff,
    #afadff,
    #dad5ff,
    #ffffff */
  }
  box-sizing: border-box;
  padding: 20px 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    #0064ff,
    #7b87ff,
    #afadff,
    #dad5ff,
    #ffffff
  );
  h2 {
    margin: 0;
    padding-left: 15px;
  }
  width: 100%;
  .container {
    width: 80%;
    min-height: 80vh;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .error {
    color: red;
  }
  .buttonSend {
    outline: none;
    border: none;
    width: 80%;
    color: white;
    cursor: pointer;
    font-weight: bold;
    background-color: blue;
    border-radius: 10px;
  }
  .containerItem {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 20px;
  }
  .containerItem1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    height: 100%;
    box-sizing: border-box;
    padding-right: 10px;
    padding-top: 20px;
  }
  .inputGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
  }
  .inputGroup1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
  }
  .label-input {
    width: 80%;
    cursor: pointer;
    font-weight: 400;
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
  .btn_upload {
    background-color: #0000ff;
    color: white;
    cursor: pointer;
    outline: none;
    padding: 5px 10px;
    border: 1px solid #0000ff;
    border-radius: 3px;
    font-weight: bold;
  }
  .btn_upload:hover {
    color: #0000ff;
    background-color: white;
  }
`;
const SignupPage1 = styled.section`
  height: 100vh;
  padding: 50px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  display: flex;
  * {
    margin: 0;
    padding: 0;
  }
  .left-part {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(30% + 20px);
    height: 100%;
    background-color: #a2b3c3;
    z-index: 1;
  }
  .right-part {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(70% - 20px);
    height: 100%;
    background-color: #f6f6f6;
    z-index: 1;
  }
  .left-area {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    border-radius: 10px 0 0 10px;
    background-image: url(${signup});
    background-size: cover;
    background-color: rgba(0.5, 0, 0, 0.5);
    background-position: center;
    z-index: 2;
  }
  .right-area {
    width: 70%;
    height: 100%;
    border-radius: 0 10px 10px 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-item: center;
    z-index: 2;
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
  }
`;
export default Signup;
