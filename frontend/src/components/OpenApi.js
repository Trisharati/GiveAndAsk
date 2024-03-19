"use client";
import axios from "axios";

const setHeaders = async () => {
  let token = await localStorage.getItem("userToken");
  return {
    authorization: token,
  };
};

const OpenApi = axios.create({
  baseURL: 'https://give-and-ask-application.onrender.com',
  // baseURL: "http://localhost:2000",
  // imageURL:'https://intelligentappsolutionsdemo.com/img'
});

// Interceptor to set headers before request is sent
OpenApi.interceptors.request.use(async (config) => {
  config.headers = await setHeaders();
  return config;
});
export default OpenApi;
