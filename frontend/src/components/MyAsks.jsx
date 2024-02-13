import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import OpenApi from "./OpenApi";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const MyAsks = () => {
    const [ask, setAsk] = useState([]);
    const { userId } = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    let arr = [];
    const fetchMyAsks = () => {
        OpenApi.get(`/my-ask/${userId}`)
            .then((res) => {
                setAsk(res.data.MyAsks)
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
        fetchMyAsks();
    }, []);

    return (
        <div>
            <Navbar />

            <div class="mobile-container">
                <div class="row justify-content-center mt-5">
                    <div class="col-md-12">
                        <div class="card custom-card overflow-auto">
                            <div class="card-header ">
                                <h3>My Asks</h3>

                            </div>
                            {ask && (
                                <div class="card-body">
                                    <table class="table">
                                        {/* <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Gives</th>

                                            </tr>
                                        </thead> */}
                                        <tbody>
                                            {ask.map((x, idx) => (
                                                <tr key={idx}>
                                                    <th scope="row">{idx + 1}</th>
                                                    <td>{x.ask}</td>
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
            <Footer/>
        </div>
    );
};

export default MyAsks;
