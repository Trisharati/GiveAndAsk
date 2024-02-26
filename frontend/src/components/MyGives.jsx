import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { ClipLoader } from 'react-spinners';

const MyGives = () => {
  const [give, setGive] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();


  const fetchMyGives = () => {
    setIsLoading(true);
    OpenApi.get(`/my-give/${userId}`)
      .then((res) => {
        console.log("res.data.MyGives", res.data.MyGives);
        setGive(res.data.MyGives);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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

  const handleDelete = (giveId) => {
    OpenApi.get(`/delete-my-give/${userId}/${giveId}`)
      .then((res) => {
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchMyGives();
        }
      })
      .catch((err) => {
        console.log("error in deleting", err);
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

  return (
    <div>
      <Navbar />
      {isLoading ?
        <div style={{ position: 'relative', top: '10%', left: '45%' }}>
          <p style={{ fontSize: 20, color: '#AE0000' }}>Loading...</p>
          <ClipLoader color={'#123abc'} loading={isLoading} size={100} />
        </div>
        :
        <div class="mobile-container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-12">
              {give.length ?
                <div class="card custom-card overflow-auto" style={{marginBottom:'120px'}}>
                  <div class="card-header ">
                    <h3>My Gives</h3>
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        {give.map((x, idx) => (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{x.give}</td>
                            <td>
                              <i
                                className="fas fa-edit"
                                onClick={() => navigate(`/editmygive/${x._id}`)}
                              ></i>
                            </td>
                            <td>
                              <i
                                className="fas fa-trash"
                                onClick={() => handleDelete(x._id)}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> : <div className="row justify-content-center"><b>You have not added any gives</b></div>
              }

            </div>
          </div>
        </div>
      }


      <Footer />
    </div>
  );
};

export default MyGives;
