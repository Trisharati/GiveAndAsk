import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenApi from "./OpenApi";
import Footer from "./Footer";
import { ClipLoader } from 'react-spinners';
import * as XLSX from 'xlsx';


const Giveableslist = () => {
  
  const userId = localStorage.getItem('userId')
  const [give, setGive] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchGiveables = () => {
    setIsLoading(true);
    OpenApi
      .get("/fetchgiveask")
      .then((res) => {
        console.log("res", res);
        let newGive = res.data.details
          .filter((x) => x.give)
          .map((x) => ({
            give: x.give,
            name: x.userdetails[0].name,
          }));
        setGive(newGive);
        console.log("give", give);
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
    fetchGiveables();
  }, []);


  const handleDownload = async () => {
    var tbl = document.getElementById('table');
    // Create a new workbook
    var wb = XLSX.utils.book_new();
    // Convert table to worksheet
    var ws = XLSX.utils.table_to_sheet(tbl);
    // Add the worksheet to the workbook with the desired sheet name
    XLSX.utils.book_append_sheet(wb, ws, "Giveable List");
    XLSX.writeFile(wb, "Giveables_EvoConnect.xlsx");
  }



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
          <div class="row justify-content-center mt-3">
            <div class="col-md-12">
              <div class="card custom-card overflow-auto" style={{ marginBottom: '90px' }}>
                <div class="card-header d-flex justify-content-space-between align-items-center">
                  <h3>Giveables</h3>
                  <a className="add-but">
                    {userId==='65c47c1068e5b01ba5450c31' && 
                    <i className="fas fa-download" onClick={handleDownload} data-toggle='tooltip' title='Download'></i>}
                    &nbsp;&nbsp;
                    <i class="fas fa-plus"
                      onClick={() => navigate("/giveableform")} data-toggle='tooltip' title='Add'></i>
                  </a>

                </div>
                {give && (
                  <div class="card-body">
                    <table class="table" id='table'>
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
                            <td><b>{x.name}</b></td>
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
      }


      <Footer />
    </div>
  );
};

export default Giveableslist;
