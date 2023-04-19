import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import axios from "axios";
function PrivateComponents() {
  let navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [data, setData] = useState({});
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:5001/api/accounts/current", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          // console.log((window.myAppData = response.data[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return authToken ? <Outlet /> : <Login />;
}

export default PrivateComponents;
