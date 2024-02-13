import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import OpenApi from "./OpenApi";

const Asklist = () => {

    const [ask, setAsk] = useState()
    const [input, setInput] = useState();
    const navigate = useNavigate()
    const token = localStorage.getItem('userToken')

    const fetchask = () => {

        OpenApi.get('/fetchgiveask').then((res) => {
                console.log('res', res);
                let newAsk = res.data.details
                    .filter(x => x.ask) // Filter out objects where 'x.give' is not present or falsy
                    .map((x) => ({
                        ask: x.ask,
                        name: x.userdetails[0].name
                    }));
                setAsk(newAsk);
                console.log('ask', ask);
            }).catch((err) => {
                console.log('error in fetching', err);
                if (err.response.status == 500) {
                    toast.danger(err.response.data.message)
                }
                else if (err.response.status == 400) {
                    toast.danger(err.response.data.message)
                    localStorage.clear()
                    navigate("/");
                }
                else if (err.response.status == 403) {
                    toast.danger(err.response.data.message)
                    localStorage.clear()
                    navigate("/");
                }
            })
    }

    useEffect(() => {
        fetchask()
    }, [])
    return (
        <div>
            <Navbar />

            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="col-md-6">
                        <div class="card custom-card">
                            <div class="card-header">
                                <b>Ask</b>
                                <i class="fas fa-plus" style={{ marginLeft: '300px' }} onClick={() => navigate('/askform')}></i>
                            </div>
                            {ask &&
                                <div class="card-body">
                                    <table class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Requirements</th>
                                                <th scope="col">Created By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ask.map((x, idx) => (
                                                <tr key={idx}>
                                                    <th scope="row">{idx + 1}</th>
                                                    <td>{x.ask}</td>
                                                    <td>{x.name}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Asklist
