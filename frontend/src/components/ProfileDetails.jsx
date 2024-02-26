import React, { useEffect, useState, } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import Footer from "./Footer";
import { ClipLoader } from 'react-spinners';

const ProfileDetails = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [finishStatus, setfinishStatus] = useState(false);

  const fetchDetails = async () => {
    setIsLoading(true);
    OpenApi.get("/getmyinfo")
      .then((res) => {
        console.log("res", res);
        setInfo(res.data.MyInfo);
        {
          info && console.log("info", info);
        }
      })
      .then(() => {
        setIsLoading(false);
      }).catch((err) => {
        console.log("Error in displaying info", err);
        setIsLoading(false);
        if (err.response.status == 500) {
          toast.error(err.response.data.message);
          navigate("/");
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


  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go to login window ?")) {
        setfinishStatus(true)
        navigate("/");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false)
      }
    }
  }
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  });


  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', top: '10%', left: '45%' }}>
        {isLoading && <p style={{ fontSize: 20, color: '#AE0000' }}>Loading...</p>}
        <ClipLoader color={'#123abc'} loading={isLoading} size={100} />
      </div>
      {info && (
        <>
          <div className="mobile-container d-flex justify-content-center ">
            <div className=" pb-5 custom-card" style={{marginBottom:'120px'}}>
              <div className="card p-3 py-4">
                <a
                  href="#"
                  class="edit-butt"
                  onClick={() => navigate("/editprofile")}
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

                  <h3 className="mt-2">{info.name}</h3>
                  <span className="mt-1 clearfix">{info.mail}</span>
                  <span className="mt-1 clearfix">{info.phone}</span>
                  <div className="row mt-3 mb-3  align-items-center justify-content-center">
                    <div className="col-md-6">
                      <h5>Business Name</h5>
                      <span className="num">{info.business_name}</span>
                    </div>

                    <div className="col-md-6">
                      <h5>Category</h5>
                      <span className="num">{info.category}</span>
                    </div>
                    <div className="col-md-6">
                      <h5>Address</h5>
                      <span className="num">{info.address}</span>
                    </div>
                  </div>
                  <hr className="line" />

                  <div className="social-buttons mt-1">
                    <a
                      href="#"
                      class="link-butt"
                      onClick={() => navigate(`/my-gives/${info._id}`)}
                    >
                      My Give
                    </a>
                    &nbsp;&nbsp;
                    <a
                      href="#"
                      class="link-butt"
                      onClick={() => navigate(`/my-asks/${info._id}`)}
                    >
                      My Ask
                    </a>
                    &nbsp;&nbsp;
                    <a
                      href="#"
                      class="link-butt"
                      onClick={() => navigate("/matches")}
                    >
                      My Matches
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProfileDetails;
