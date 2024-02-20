import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';
import OpenApi from "./OpenApi";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const MyAsks = () => {
  const [ask, setAsk] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyAsks = () => {
    setIsLoading(true);
    OpenApi.get(`/my-ask/${userId}`)
      .then((res) => {
        console.log('res.data.MyAsks',res.data.MyAsks);
        setAsk(res.data.MyAsks);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error in fetching", err);
        
          setIsLoading(false);
        
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

  const handleDelete = (askId) => {
    OpenApi.get(`/delete-my-ask/${userId}/${askId}`)
      .then((res) => {
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchMyAsks();
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
        {ask.length ? 
        <div class="card custom-card overflow-auto">
        <div class="card-header ">
          <h3>My Asks</h3>
        </div>
        
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
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => navigate(`/editmyask/${x._id}`)}
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
        
      </div> : <div><b>You have not added any asks</b></div>
        }
        
      </div>
    </div>
  </div>
    }
      
      
     
      <Footer />
    </div>
  );
};

export default MyAsks;
