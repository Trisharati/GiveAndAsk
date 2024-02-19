import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OpenApi from "./OpenApi";


const PrivateRoute = ({ Component }) => {
    // const {Component} = props
    const token = localStorage.getItem('userToken')
    

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


    return (
        <Component />
    )

}

export default PrivateRoute