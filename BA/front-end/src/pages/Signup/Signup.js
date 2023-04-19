import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/Color";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
  const history = useNavigate();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [fullname, setFullName] = useState("");
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

  const onSubmit = async (values) => {
    const { fullname, email, password, phone, education, city, from } = values;
    try {
      await axios
        .post("http://localhost:5001/api/accounts/register", {
          fullname: fullname,
          email: email,
          password: password,
          phone: phone,
          city: city,
          from: from,
          education: education,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("authToken", response.data.accessToken);
          window.location.href = "/";
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
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      education: "",
      city: "",
      from: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Bắt buộc")
        .min(4, "Tên của bạn phải ít nhất 4 kí tự"),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Nhập địa chỉ email của bạn"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "Mật khẩu của bạn phải nhiều hơn 7 ký tự "
        ),
      passwordConfirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must be matched"),
    }),
    onSubmit,
  });
  return (
    <SignupPage>
      {/* <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
              <label className="label-input" for="email">
                Email
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
                  value={email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="minhbao@gmail.com"
                />
              </div>
            </div>
            <div class="input-group">
              <label className="label-input" for="username">
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
                  onChange={handleEducationInput}
                  value={education}
                  type="text"
                  name="education"
                  id="education"
                  placeholder="minhbao@gmail.com"
                />
              </div>
            </div>
            <div class="input-group">
              <label className="label-input" for="username">
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
                  onChange={handleNumber}
                  value={numberPhone}
                  type="text"
                  name="numberPhone"
                  id="numberPhone"
                  placeholder="minhbao@gmail.com"
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
                  onChange={handleCityInput}
                  value={city}
                  type="text"
                  name="city"
                  id="city"
                  placeholder="minhbao@gmail.com"
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
                  onChange={handleCountryInput}
                  value={country}
                  type="text"
                  name="country"
                  id="country"
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
      </Grid> */}
      {/* <h1>Sign up</h1>
      <FormGroup className="formStyle">
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Full Name</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Email</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label=""
          />
          <InputLabel>Phonenumber</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Full Name</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Full Name</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Full Name</InputLabel>
        </FormControl>
        <FormControl>
          <OutlinedInput
            id="my-input"
            aria-describedby="my-helper-text"
            label="Email"
          />
          <InputLabel>Full Name</InputLabel>
        </FormControl>
        <Button>Send</Button>
      </FormGroup> */}
      <div className="container" style={{ backgroundColor: "ButtonFace" }}>
        <h2>Đăng ký</h2>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Grid container style={{ backgroundColor: "", minHeight: "50vh" }}>
            <Grid item xs={6} md={6}>
              <div className="containerItem">
                <div className="inputGroup">
                  <label className="label-input" for="fullname">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    name="fullname"
                    placeholder="Nhập họ và tên của bạn"
                    id="fullname"
                    required
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                  {formik.errors.fullname && (
                    <span className="error">{formik.errors.fullname}*</span>
                  )}
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="email">
                    Email
                  </label>
                  <input
                    required
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                  {formik.errors.email && (
                    <span className="error">{formik.errors.email}*</span>
                  )}
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="password">
                    Mật khẩu
                  </label>
                  <div
                    style={{
                      height: "100%",
                      width: "80%",
                      position: "relative",
                    }}
                  >
                    <input
                      required
                      type="password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      style={{
                        boxSizing: "border-box",
                        height: "100%",
                        width: "100%",
                        paddingLeft: "5px",
                        border: "none",
                        outline: "none",
                      }}
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
                    {formik.errors.password && (
                      <span className="error">{formik.errors.password}*</span>
                    )}
                  </div>
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="passwordConfirm">
                    Nhập lại mật khẩu
                  </label>
                  <div
                    style={{
                      height: "100%",
                      width: "80%",
                      position: "relative",
                    }}
                  >
                    <input
                      type="password"
                      name="passwordConfirm"
                      id="passwordConfirm"
                      value={formik.values.passwordConfirm}
                      onChange={formik.handleChange}
                      style={{
                        boxSizing: "border-box",
                        height: "100%",
                        width: "100%",
                        padding: "5px 0 5px 5px",
                        border: "none",
                        outline: "none",
                      }}
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
                    {formik.errors.passwordConfirm && (
                      <span className="error">
                        {formik.errors.passwordConfirm}*
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={6}>
              <div className="containerItem">
                <div className="inputGroup">
                  <label className="label-input" for="phone">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                    id="phone"
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="education">
                    Học vấn
                  </label>
                  <input
                    type="text"
                    value={formik.values.education}
                    onChange={formik.handleChange}
                    name="education"
                    id="education"
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="city">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="inputGroup">
                  <label className="label-input" for="from">
                    Quốc gia
                  </label>
                  <input
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    type="text"
                    name="from"
                    id="from"
                    style={{
                      boxSizing: "border-box",
                      height: "100%",
                      width: "80%",
                      padding: "5px 0 5px 5px",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              style={{ padding: "5px 10px", backgroundColor: "" }}
              className="buttonSend"
            >
              Đăng ký
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            marginLeft: "50%",
            gap: "5px",
            marginTop: "10px",
            paddingRight: "10px",
          }}
        >
          <span>Do you have account?</span>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Login
          </Link>
        </div>
      </div>
    </SignupPage>
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
  height: 100vh;
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
  .inputGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    padding: 5px;
  }
  .label-input {
    cursor: pointer;
    font-weight: 400;
  }
  ${
    "" /* .input-group {
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
  } */
  };
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
