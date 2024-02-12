import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import { useParams } from "react-router-dom";

const MyGives = () => {
    const [give, setGive] = useState([]);
    const { userId } = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    let arr = [];
    const fetchMyGives = () => {
        OpenApi.get(`/my-give/${userId}`)
            .then((res) => {
                setGive(res.data.MyGives)
            }).catch((err) => {
                console.log("error in fetching", err);
                if (err.response.status == 500) {
                    toast.error(err.response.data.message);
                } else if (err.response.status == 400) {
                    toast.error(err.response.data.message);
                    localStorage.clear();
                    navigate("/");
                } else if (err.response.status == 403) {
                    toast.error(err.response.data.message);
                    localStorage.clear();
                    navigate("/");
                }
            });
    };

    useEffect(() => {
        fetchMyGives();
    }, []);

    return (
        <div>
            <Navbar />

            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="col-md-6">
                        <div class="card custom-card">
                            <div class="card-header ">
                                <b>My Gives</b>

                            </div>
                            {give && (
                                <div class="card-body">
                                    <table class="table">
                                        {/* <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Gives</th>

                                            </tr>
                                        </thead> */}
                                        <tbody>
                                            {give.map((x, idx) => (
                                                <tr key={idx}>
                                                    <th scope="row">{idx + 1}</th>
                                                    <td>{x.give}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyGives;
