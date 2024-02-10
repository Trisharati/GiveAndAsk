"use client"
import axios from 'axios';

const headers = {
    'Content-Type': 'multipart/form-data'
};

const OpenApi = axios.create({
    baseURL: 'https://give-and-ask-application.onrender.com',
    headers: headers
});

export default OpenApi;