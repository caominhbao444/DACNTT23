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
  CircularProgress,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  OutlinedInput,
  Skeleton,
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
  const [bao, setBao] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [passwordConfirm, setPasswordCofirm] = useState("");
  const [step, setStep] = useState(1);
  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberPhoneError, setNumberPhoneError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [educationError, setEducationError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

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
          img: imageUrl,
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
  const handleFullName = (e) => setFullName(e.target.value);
  const handlePwdInput = (e) => setPassWord(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordCofirm(e.target.value);
  const handleCityInput = (e) => setCity(e.target.value);
  const handleCountryInput = (e) => setCountry(e.target.value);
  const handleEducationInput = (e) => setEducation(e.target.value);
  const handleNumber = (e) => setNumberPhone(e.target.value);

  return (
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
            height: "10%",
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
            // backgroundColor: "red",
            height: "10%",
          }}
        >
          <li
            style={{
              height: "20px",
              textAlign: "center",
              width: "20px",
              lineHeight: "20px",
              boxSizing: "border-box",
              borderRadius: "50%",
              color: step === 1 || step === 2 || step === 3 ? "white" : "black",
              backgroundColor:
                step === 1 || step === 2 || step === 3 ? "black" : "white",
              border: "1px solid black",
              zIndex: 3,
            }}
          >
            1
          </li>
          <li
            style={{
              height: "20px",
              textAlign: "center",
              width: "20px",
              lineHeight: "20px",
              boxSizing: "border-box",
              borderRadius: "50%",
              color: step === 2 || step === 3 ? "white" : "black",
              backgroundColor: step === 2 || step === 3 ? "black" : "white",
              border: "1px solid black",
              zIndex: 3,
            }}
          >
            2
          </li>
          <li
            style={{
              height: "20px",
              textAlign: "center",
              width: "20px",
              lineHeight: "20px",
              boxSizing: "border-box",
              borderRadius: "50%",
              zIndex: 3,
              color: step === 3 ? "white" : "black",
              backgroundColor: step === 3 ? "black" : "white",
              border: "1px solid black",
            }}
          >
            3
          </li>
        </ul>
        <div
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              justifyContent:
                step === 2 || step === 3 ? "flex-start" : "center",
              gap: "20px",
            }}
          >
            <>
              {step === 1 ? (
                <>
                  {loading ? (
                    <div
                      style={{
                        width: "250px",
                        height: "200px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton
                        style={{
                          width: "250px",
                          height: "200px",
                        }}
                      ></Skeleton>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={imageUrl}
                        width={250}
                        height={200}
                        alt=""
                        style={{ objectFit: "cover" }}
                      ></img>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "0",
                          width: "230px",
                          height: "180px",
                          opacity: "0",
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )}
                  <p>Chọn ảnh đại diện của bạn</p>
                  <button
                    className="button"
                    onClick={() => {
                      setStep(2);
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      display:
                        loading ||
                        imageUrl ===
                          "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
                          ? "none"
                          : "block",
                    }}
                  >
                    Tiếp tục
                  </button>
                </>
              ) : step === 2 ? (
                <>
                  {/* <input
                    value={bao}
                    onChange={(e) => {
                      setBao(e.target.value);
                    }}
                  ></input>
                  <p>Chọn ảnh đại diện của bạn2</p> */}
                  <h4>Nhập thông tin của bạn</h4>
                  <div style={{ display: "flex" }} className="input-container">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="fullname">
                        Nhập họ và tên{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              fullnameError || !fullname ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        value={fullname}
                        onChange={handleFullName}
                        id="fullname"
                      ></input>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="email">
                        Nhập email{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display: emailError || !email ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        value={email}
                        onChange={handleEmailInput}
                        id="email"
                      ></input>
                    </div>
                  </div>
                  <div style={{ display: "flex" }} className="input-container">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="password">
                        Mật khẩu{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              passwordError || !password ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="passwordConfirm">
                        Nhập lại mật khẩu{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              passwordConfirmError || !passwordConfirm
                                ? "inline"
                                : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        id="passwordConfirm"
                        onChange={handlePasswordConfirm}
                        value={passwordConfirm}
                      ></input>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="button"
                      onClick={() => {
                        setStep(1);
                      }}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Quay lại
                    </button>
                    <button
                      className="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!fullname) {
                          setFullnameError(true);
                        } else if (!email) {
                          setEmailError(true);
                        } else if (!password) {
                          setPasswordError(true);
                        } else if (!passwordConfirm) {
                          setPasswordConfirmError(true);
                        } else {
                          setFullnameError(false);
                          setEmailError(false);
                          setPasswordError(false);
                          setPasswordConfirmError(false);
                          setStep(3);
                        }
                      }}
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
                </>
              ) : step === 3 ? (
                <>
                  <h4>Nhập thông tin của bạn</h4>
                  <div style={{ display: "flex" }} className="input-container">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="city">
                        Nhập thành phố{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display: cityError || !city ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        id="city"
                        value={city}
                        onChange={handleCityInput}
                      ></input>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="from">
                        Nhập quốc gia{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              countryError || !country ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        value={country}
                        onChange={handleCountryInput}
                        id="from"
                      ></input>
                    </div>
                  </div>{" "}
                  <div style={{ display: "flex" }} className="input-container">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="education">
                        Học vấn{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              educationError || !education ? "inline" : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        value={education}
                        onChange={handleEducationInput}
                        id="education"
                      ></input>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="phone">
                        Số điện thoại{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            display:
                              numberPhoneError || !numberPhone
                                ? "inline"
                                : "none",
                          }}
                        >
                          (Bắt buộc)
                        </span>
                      </label>
                      <input
                        value={numberPhone}
                        onChange={handleNumber}
                        id="phone"
                      ></input>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="button"
                      onClick={() => {
                        setStep(2);
                      }}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Quay lại
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 20px",
                        backgroundColor:
                          city && education && country && numberPhone
                            ? "black"
                            : "white",
                        color:
                          city && education && country && numberPhone
                            ? "white"
                            : "black",
                        border: "1px solid black",
                        borderRadius: "4px",
                        cursor:
                          city && education && country && numberPhone
                            ? "pointer"
                            : "default",
                      }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </>
              ) : null}
            </>
          </form>
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
  min-height: 100vh;
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
    min-height: calc(100vh - 100px);
    border-radius: 0 10px 10px 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-item: center;
    z-index: 2;
    padding: 10px;
    box-sizing: border-box;
    gap: 10px;
    .button {
      cursor: pointer;
    }
    .input-container {
      gap: 20px;
    }
    label {
      margin-bottom: 5px;
    }
    input {
      outline: none;
      padding: 10px;
    }
  }
  ul::after {
    content: "";
    background-color: black;
    width: 100px;
    height: 1px;
    position: absolute;
    z-index: 2;
  }
  @media screen and (max-width: 750px) {
    .left-area {
      display: none;
    }
    .right-area {
      width: 100%;
    }
    .left-part {
      display: none;
    }
    .right-part {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: #f6f6f6;
      z-index: 1;
    }
  }
  @media screen and (max-width: 550px) {
    .right-area {
      .input-container {
        gap: 10px;
        flex-direction: column;
      }
    }
    input {
      width: 50vw;
    }
  }
`;
export default Signup;
