import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import { ClipLoader } from 'react-spinners';



const LoginForm = () => {
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.clear()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    e.target.reset();
    console.log("input", input);

    const formData = new FormData();
    formData.append("phone", input.phone);
    formData.append("password", input.password);

    OpenApi
      .post("/login", formData)
      .then((res) => {
        // console.log('location', location);       
        setInput({
          phone: "",
          password: "",
        });
        setError({});
        console.log("res", res);

        if (res.data.status == 1) {
          navigate("/profiledetails");
          toast.success(res.data.message);
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem('userId', res.data.userId)
        }
      })
      .then(() => {
        setIsLoading(false);
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
        setError({phone:'',password:''});
        setIsLoading(false);
        if (err.response.status == 422) {
          
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
    <div>
      <div style={{ position:'relative',top:'10%',left:'45%'}}>
        {isLoading && <p style={{fontSize:20,color:'#AE0000'}}>Logging In...</p>}
      <ClipLoader color={'#123abc'} loading={isLoading} size={100} />
      </div>
      
      <div class="full-width text-center">
      <img src="img/evo_connect.png" className="logo-img mb-3" />
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
            <span style={{ color: "white" }}>{error.phone}</span>
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
    </div>
    
  );
};

export default LoginForm;
