import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import Footer from "./Footer";

const Matches = () => {
  const navigate = useNavigate();

  const [match, setMatch] = useState([]);
  const token = localStorage.getItem("userToken");
  console.log("token", token);

  let matchDetails = [];
  const fetchMatches = async () => {
    OpenApi
      .get("/matches")
      .then((res) => {
        console.log("res", res);
        let arr = res.data.matchesFound;
        let arr1 = arr.filter((x) => x.length > 0);
        console.log("arr1", arr1);

        arr1.map((x) => {
          let userdetail = [];
          let obj = {};
          x.map((y) => {
           
            obj.field = y.give,
              userdetail.push({
                name: y.userdetails[0].name,
                usermail: y.userdetails[0].mail,
              });
            obj.users = userdetail;
          });
          matchDetails.push(obj);
          console.log("matchDetails", matchDetails);
        });
        setMatch(matchDetails);
        console.log('match',match);
      })
      .catch((err) => {
        console.log("Error in displaying info", err);
        if (err.response.status == 500) {
          toast.error(err.response.data.message);
          navigate("/");
        } else if (err.response.status == 400) {
          toast.error(err.response.data.message);
          navigate("/");
        } else if (err.response.status == 403) {
          toast.error(err.response.data.message);
          navigate("/");
        }
      });
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div>
      <Navbar />
      {match.length ? (
        <div class="mobile-container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-12">
              {match.map((x, index) => (
                <div  key={index}>
                  <div class="card custom-card">
                    <div className="card-header">{x.field}</div>
                    <div class="card-body">
                      <table class="table">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {x.users.map((y, idx) => (
                            <tr key={idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{y.name}</td>
                              <td>{y.usermail}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <h3 style={{textAlign:'center'}}>No matches found</h3>
      }
      <Footer/>
    </div>
  );
};

export default Matches;
