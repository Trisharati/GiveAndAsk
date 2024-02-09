import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const Matches = () => {

    const navigate = useNavigate()

    const [info, setInfo] = useState()
    const token = localStorage.getItem('userToken')
    console.log('token', token);


    let matchDetails = []
    const fetchMatches = async () => {
        axios.get('http://localhost:2000/matches', {
            headers: {
                'authorization': token
            }
        }).then((res) => {
            console.log('res', res);
            let arr = res.data.matchesFound
            let arr1 = arr.filter((x) => x.length > 0)
            console.log('arr1', arr1);

            arr1.map((x) => {
                x.map((y) => {
                    let userdetail = []
                    userdetail.push(
                        {
                            username: y.userdetails[0].username,
                            usermail: y.userdetails[0].mail
                        })

                    let obj = {
                        field: y.give,
                        user: userdetail

                    }
                    matchDetails.push(obj)
                    console.log('matchDetails',matchDetails);
                })
            })
            setInfo(res.data.MyInfo)
        }).catch((err) => {
            console.log('Error in displaying info', err);
            if (err.response.status == 500) {
                toast.error(err.response.data.message)
                navigate('/')
            }
            else if (err.response.status == 400) {
                toast.error(err.response.data.message)
                navigate('/')
            }
            else if (err.response.status == 403) {
                toast.error(err.response.data.message)
                navigate('/')
            }
        })
    }

    useEffect(() => {
        fetchMatches()
    }, [])


    return (
        <div>
            <Navbar />
            {matchDetails.length &&
                <div class="container">
                    <div class="row justify-content-center mt-5">
                        <div class="col-md-8">

                            {matchDetails.map((x) => (
                                <div class="card custom-card">
                                    <div className="card-header">
                                        {x.field}
                                    </div>
                                    <div class="card-body">
                                        <table class="table">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Email ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {x.map((y, idx) => (
                                                    <tr key={idx}>
                                                        <th scope="row">{idx + 1}</th>
                                                        <td>{y.username}</td>
                                                        <td>{x.usermail}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}






                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Matches
