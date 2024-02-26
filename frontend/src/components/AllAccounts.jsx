import React, { useEffect, useState, } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import Footer from "./Footer";
import { ClipLoader } from 'react-spinners';

const AllAccounts = () => {
    const navigate = useNavigate();

    const [info, setInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState([])

    const getAllAccounts = async () => {
        setIsLoading(true);
        OpenApi.get("/getallaccounts")
            .then((res) => {
                console.log("res", res);
                setAccount(res.data.allAccounts);
            })
            .then(() => {
                setIsLoading(false);
            }).catch((err) => {
                console.log("Error in displaying info", err);
                setIsLoading(false);
                if (err.response.status == 500) {
                    toast.error(err.response.data.message);
                    navigate("/profiledetails");
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
        getAllAccounts();
    }, []);

    return (
        <div style={{marginBottom:'120px'}}>
            <Navbar />
            <div style={{ position: 'relative', top: '10%', left: '45%' }}>
                {isLoading && <p style={{ fontSize: 20, color: '#AE0000' }}>Loading...</p>}
                <ClipLoader color={'#123abc'} loading={isLoading} size={100} />
            </div>
            {account && account.map((x, index) => (

                <div className="mobile-container d-flex justify-content-center" key={index}>
                    <div className="overflow-auto pb-5 custom-card">
                        <div className="card p-3 py-4">
                            <a
                                href="#"
                                class="edit-butt"
                                onClick={() => navigate(`/editaccount/${x._id}`)}
                            >
                                <i className="far fa-edit"></i>
                            </a>
                            <div className="text-center">
                                <img src="/img/evo_connect.png" width={100} className="rounded-circle" />
                                {/* {`${OpenApi.defaults.imageURL}/evo_connect`!== '' ?
                    <img
                      src={`${OpenApi.defaults.baseURL}/${info.image}`}
                      width={100}
                      height={100}
                      className="rounded-circle"
                    /> :
                    <img src="/vite.svg" width={100} className="rounded-circle" />} */}

                                <h3 className="mt-2">{x.name}</h3>
                                <span className="mt-1 clearfix">{x.mail}</span>
                                <span className="mt-1 clearfix">{x.phone}</span>
                                <div className="row mt-3 mb-3  align-items-center justify-content-center">
                                    <div className="col-md-6">
                                        <h5>Business Name</h5>
                                        <span className="num">{x.business_name}</span>
                                    </div>

                                    <div className="col-md-6">
                                        <h5>Category</h5>
                                        <span className="num">{x.category}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Address</h5>
                                        <span className="num">{x.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            ))
            }
            <Footer />
        </div>
    );
};

export default AllAccounts;
