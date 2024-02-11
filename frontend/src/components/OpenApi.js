"use client"
import axios from 'axios';

const headers = {
    // 'Content-Type': 'multipart/form-data'
    // 'Content-Type': 'application/javasript'
};

const OpenApi = axios.create({
    baseURL: 'https://give-and-ask-application.onrender.com',
    headers: headers
});

export default OpenApi;