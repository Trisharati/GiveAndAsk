import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import OpenApi from "./OpenApi";

const Giveableslist = () => {
  const [give, setGive] = useState([]);
  const [input, setInput] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  let arr = [];
  const fetchGiveables = () => {
    OpenApi
      .get("/fetchgiveask")
      .then((res) => {
        console.log("res", res);
        let newGive = res.data.details
          .filter((x) => x.give)
          .map((x) => ({
            give: x.give,
            user_name: x.userdetails[0].user_name,
          }));
        setGive(newGive);
        console.log("give", give);
      })
      .catch((err) => {
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
    fetchGiveables();
  }, []);

  return (
    <div>
      <Navbar />

      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-md-6">
            <div class="card custom-card">
              <div class="card-header">
                <b>Giveables</b>
                <i
                  class="fas fa-plus"
                  style={{ marginLeft: "300px" }}
                  onClick={() => navigate("/giveableform")}
                ></i>
              </div>
              {give && (
                <div class="card-body">
                  <table class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Giveable</th>
                        <th scope="col">Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {give.map((x, idx) => (
                        <tr key={idx}>
                          <th scope="row">{idx + 1}</th>
                          <td>{x.give}</td>
                          <td>{x.user_name}</td>
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

export default Giveableslist;
