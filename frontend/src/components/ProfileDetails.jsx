import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import OpenApi from "./OpenApi";
import Footer from "./Footer";

const ProfileDetails = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState();
  const token = localStorage.getItem("userToken");
  const fetchDetails = async () => {
    OpenApi.get("https://give-and-ask-application.onrender.com/getmyinfo")
      .then((res) => {
        console.log("res", res);
        setInfo(res.data.MyInfo);
      })
      .catch((err) => {
        console.log("Error in displaying info", err);
        if (err.response.status == 500) {
          toast.error(err.response.data.message);
          navigate("/");
        } else if (err.response.status == 400) {
          toast.error(err.response.data.message);
          localStorage.clear()
          navigate("/");
        } else if (err.response.status == 403) {
          toast.error(err.response.data.message);
          localStorage.clear()
          navigate("/");
        }
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);



  return (
    <div>
      <Navbar />
      {info && (
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-8">
              <div class="card custom-card">
                <div class="card-header">
                  <b>{info.name}</b>
                </div>
                <div class="card-body">
                  {/*  <img src={`https://give-and-ask-application.onrender.com/${info.image}`} alt="Not found" />
                  <img src='/public/vite.svg' alt="Not found" /> */}
                  <img src='/public/vite.svg' alt="Not found" />
                  <h5 class="card-title">Username</h5>
                  <span>{info.user_name}</span>
                  {/* {info.mail ? ( */}
                  <div>
                    <h5 class="card-title">Email ID</h5>
                    <span>{info.mail}</span>
                    <br />
                  </div>
                  {/* // ) : null} */}
                  <h5 class="card-title">Business Name</h5>
                  <span>{info.business_name}</span>
                  <h5 class="card-title">Category</h5>
                  <span>{info.category}</span>
                  <h5 class="card-title">Address</h5>
                  <span>{info.address}</span>
                  <br />
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/editprofile")}
                  >
                    Edit
                  </a>&nbsp;&nbsp;
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate(`/my-gives/${info._id}`)}
                  >
                    My Give
                  </a>&nbsp;&nbsp;
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate(`/my-asks/${info._id}`)}
                  >
                    My Ask
                  </a>
                  &nbsp;&nbsp;
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/matches")}
                  >
                    My Matches
                  </a>
                </div>
              </div>
            </div>
            
          </div>
   
        </div>
        
      )}
      <Footer/>
    </div>
  );
};

export default ProfileDetails;
