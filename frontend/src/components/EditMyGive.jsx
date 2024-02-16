import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import OpenApi from "./OpenApi";
import Footer from "./Footer";


const EditMyGive = () => {
  const [error, setError] = useState({});
  const [input, setInput] = useState({});
  const [give, setGive] = useState();
  const navigate = useNavigate();
  const { giveId } = useParams();
  const userId = localStorage.getItem("userId");
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log("input", input);

    if (!Object.keys(input).length) {
      toast.error("You have not made any change");
    } else {
      const formData = new FormData();
      formData.append("give", input.give?input.give:give.give);

      OpenApi.post(`/update-my-give/${userId}/${giveId}`, formData)
        .then((res) => {
          
          console.log("res", res);
          if (res.data.status == 1) {
            toast.success(res.data.message);
            navigate(`/my-gives/${userId}`);
          }
        })
        .catch((err) => {
          
          console.log("err", err);
        
          if (err.response.status == 500) {
            toast.danger(err.response.data.message);
          } else if (err.response.status == 400) {
            toast.danger(err.response.data.message);
            localStorage.clear();
            navigate("/");
          } else if (err.response.status == 403) {
            toast.danger(err.response.data.message);
            localStorage.clear();
            navigate("/");
          }
        });
    }
  };

  const fetchSingleGive = () => {
    OpenApi.get(`/fetchsinglegive/${userId}/${giveId}`)
      .then((res) => {
        setGive(res.data.editGive);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    fetchSingleGive();
  }, []);

  return (
    <div>
      <Navbar />
      {give && (
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-4">
              <h3>Update My Give</h3>
              <hr />
              <form id="login-form" onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="give"
                    defaultValue={give.give}
                    onChange={handleChange}
                  />
                  {/* <span style={{ color: "red" }}>{error.give}</span> */}
                  <br />
                  <input type="submit" className="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EditMyGive;
