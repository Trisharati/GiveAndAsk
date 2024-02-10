import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OpenApi from "./OpenApi";

import axios from 'axios'



const PrivateRoute = ({ Component }) => {
    // const {Component} = props
    const token = localStorage.getItem('userToken')
    const getExpTime = localStorage.getItem('tokenExpTime')

    const navigate = useNavigate()
    




    const logout = async () => {

        console.log('from private route',token);
        const formData = new FormData()
        formData.append('token', token)
        OpenApi.post('/verifytoken', formData).then((res)=>{
           
        }).catch((err)=>{
            if (err.response.data.status == 0 || err.response.data.status == -1) {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    useEffect(() => {
        logout()
    }, [])

    
    // const getExpTime = localStorage.getItem('tokenExpTime')
    // const currentTime = Date.now()
    // const timeRemaining = getExpTime - currentTime
    // useEffect(() => {
    //     setTimeout(logout, timeRemaining)
    // }, [])

    return (
        <Component />
    )

}

export default PrivateRoute