import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";


const LoginForm = () => {
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log("input", input);

    const formData = new FormData();
    formData.append("user_name", input.user_name);
    formData.append("password", input.password);

    OpenApi
      .post("/login", formData)
      .then((res) => {
        setInput({
          user_name: "",
          password: "",
        });
        setError({});
        console.log("res", res);
        const logout = async () => {
          localStorage.clear();
          toast.warning("Logged out");
          navigate("/");
        };
        if (res.data.status == 1) {
          navigate("/profiledetails");
          toast.success(res.data.message);
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("user_name", res.data.user_name);
          const tokenExpTime = Date.now() + 30 * 60 * 1000;
          localStorage.setItem("tokenExpTime", tokenExpTime);
          const getExpTime = localStorage.getItem("tokenExpTime");
          const currentTime = Date.now();
          const timeRemaining = getExpTime - currentTime;
          setTimeout(logout, timeRemaining);
        }
      })
      .catch((err) => {
        setInput({
          user_name: "",
          password: "",
        });

        console.log("err", err);
        if (err.response.status == 401) {
          toast.error(err.response.data.message);
        }
        // else if(err.response.status == 403){
        //   toast.warning(err.response.data.message)
        // }
        if (err.response.status == 422) {
          setError({});
          let arr = err.response.data.validationError;
          let errorData = {};
          arr.map((x) => {
            if (errorData[x.path] == undefined) {
              errorData[x.path] = x.msg;
              setError((error) => ({ ...error, [x.path]: x.msg }));
            }
          });
          {
            error && console.log("error", error);
          }
        }
      });
  };

  return (
    <div class="login-container">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="user_name"
            onChange={handleChange}
            autoComplete="username" 
          />
          <span style={{ color: "red" }}>{error.user_name}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <span style={{ color: "red" }}>{error.password}</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
