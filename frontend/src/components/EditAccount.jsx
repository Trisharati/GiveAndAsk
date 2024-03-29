import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";

import OpenApi from "./OpenApi";
import Footer from "./Footer";
const EditAccount = () => {
  const [info, setInfo] = useState();
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const {accountId} = useParams()

  const navigate = useNavigate();

  const fetchAccount = async () => {
    OpenApi.get(`/getaccount/${accountId}`)
      .then((res) => {
        console.log("res", res);
        setInfo(res.data.AccountInfo);
      })
      .catch((err) => {
        console.log("Error in displaying info", err);
        if (err.response.status == 500) {
          toast.error(err.response.data.message);
        } else if (err.response.status == 400) {
          localStorage.clear();
          navigate("/");
          toast.error(err.response.data.message);
        } else if (err.response.status == 403) {
          toast.error(err.response.data.message);
          localStorage.clear();
          navigate("/");
        }
      });
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (e.target.files) {
      setInput({ ...input, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    console.log("input", input);

    if (!Object.keys(input).length) {
      toast.error("You have not made any change");
    } else {
      const formData = new FormData();
      formData.append('userId',info._id)
      formData.append(
        "business_name",
        input.business_name ? input.business_name : info.business_name
      );
      formData.append(
        "category",
        input.category ? input.category : info.category
      );
      formData.append("address", input.address ? input.address : info.address);
      if (input.mail || info.mail) {
        formData.append("mail", input.mail ? input.mail : info.mail);
      }
      if (input.phone || info.phone) {
        formData.append("phone", input.phone ? input.phone : info.phone);
      }
      formData.append("password", input.password ? input.password : "");
      formData.append("image", input.image);
      OpenApi.post("/updateprofile", formData)
        .then((res) => {
          if (res.data.status == 1) {
            toast.success(res.data.message);
            navigate("/allaccounts");
          }
        })
        .catch((err) => {
          if (err.response.status == 500) {
            toast.error(err.response.data.message);
          } else if (err.response.status == 400) {
            localStorage.clear();
            navigate("/");
            toast.error(err.response.data.message);
          } else if (err.response.status == 403) {
            toast.error(err.response.data.message);
            localStorage.clear();
            navigate("/");
          } else if (err.response.status == 422) {
            console.log("error valid", err);
            let arr = err.response.data.validationError;
            arr.map((x) => {
              setError((prev)=>({...prev, [x.path]: x.msg }));
            });
            setInput({})
          } 
        });
    }
  };

  return (
    <div>
      <Navbar />
      {info && (
        <div class="mobile-container">
          <div class="row justify-content-center mt-2 pb-5">
            <div class="col-md-12">
              <div className="custom-card overflow-auto">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      defaultValue={info.name}
                      disabled
                    />
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Email ID</label>
                    <input
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="mail"
                      defaultValue={info.mail ? info.mail : ""}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error && error.mail}</span>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Contact Number</label>
                    <input
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="phone"
                      defaultValue={info.phone ? info.phone : ""}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error && error.phone}</span>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail1">Business Name</label>
                    <input
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="business_name"
                      defaultValue={info.business_name}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error && error.business_name}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Category</label>
                    <input
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="category"
                      defaultValue={info.category}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error && error.category}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="address"
                      defaultValue={info.address}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error && error.address}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div class="form-group">
                    <label for="exampleInputPassword1">Profile Picture</label>
                    <input
                      type="file"
                      class="form-control"
                      id="exampleInputPassword1"
                      name="image"
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{error.image}</span>
                  </div> */}
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EditAccount;
