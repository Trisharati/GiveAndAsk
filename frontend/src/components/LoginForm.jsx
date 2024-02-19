import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";


const LoginForm = () => {
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    phone: "",
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
    formData.append("phone", input.phone);
    formData.append("password", input.password);

    OpenApi
      .post("/login", formData)
      .then((res) => {
        setInput({
          phone: "",
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
          localStorage.setItem("name", res.data.name);
          localStorage.setItem('userId',res.data.userId)
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
          phone: "",
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
    <div class="full-width text-center">
      <img src="img/evo_connect.png" className="logo-img mb-3"/>
    <div class="login-container  text-left">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="username">Phone</label>
          <input
            className="form-control"
            
            id="phone"
            name="phone"
            onChange={handleChange}
            autoComplete="phone" 
          />
          <span style={{ color: "white" }}>{error.user_name}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            className="form-control"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="password"
          />
          <span style={{ color: "white" }}>{error.password}</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
