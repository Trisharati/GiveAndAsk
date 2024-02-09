import React, { useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Giveableform = () => {


    const [error, setError] = useState({});
    const [input, setInput] = useState({ give: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken')


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        console.log("input", input);

        const formData = new FormData();
        formData.append('give', input.give);


        axios
            .post("http://localhost:2000/creategiveable", formData,
                {
                    headers: {
                        'authorization': token
                    }
                })
            .then((res) => {
                setError({});
                console.log('res', res);
                if (res.data.status == 1) {
                    toast.success(res.data.message)
                    navigate('/giveablelist')
                }
            })
            .catch((err) => {
                setError({});
                console.log("err", err);
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
                if (err.response.status == 500) {
                    toast.danger(err.response.data.message)
                }
                else if (err.response.status == 400) {
                    toast.danger(err.response.data.message)
                }
                else if (err.response.status == 403) {
                    toast.danger(err.response.data.message)
                }
            });
        // setInput();
    };
    return (
        <div>
            <Navbar />
            <div class="container" >
                <div class="row justify-content-center mt-5">
                    <div class="col-md-4">
                        <h3>Add Giveable</h3>
                        <hr />
                        <form id="login-form" onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    name='give' onChange={handleChange} />
                                <span style={{ color: "red" }}>{error.give}</span>
                                <br />
                                <input type="submit" className='btn btn-primary' />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Giveableform
