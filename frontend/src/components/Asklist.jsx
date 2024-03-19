import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import OpenApi from "./OpenApi";
import Footer from './Footer';
import { ClipLoader } from 'react-spinners';
import * as XLSX from 'xlsx';

const Asklist = () => {

    const userId = localStorage.getItem('userId')
    const [ask, setAsk] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()


    const fetchask = () => {
        setIsLoading(true);
        OpenApi.get('/fetchgiveask').then((res) => {
            console.log('res', res);
            let newAsk = res.data.details
                .filter(x => x.ask) // Filter out objects where 'x.give' is not present or falsy
                .map((x) => ({
                    ask: x.ask,
                    name: x.userdetails[0].name
                }));
            setAsk(newAsk);
            console.log('ask', ask);
        }).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            console.log('error in fetching', err);
            setIsLoading(false);
            if (err.response.status == 500) {
                toast.danger(err.response.data.message)
            }
            else if (err.response.status == 400) {
                toast.danger(err.response.data.message)
                localStorage.clear()
                navigate("/");
            }
            else if (err.response.status == 403) {
                toast.danger(err.response.data.message)
                localStorage.clear()
                navigate("/");
            }
        })
    }

    useEffect(() => {
        fetchask()
    }, [])

    const handleDownload = async () => {
        var tbl = document.getElementById('table');
        
        // Create a new workbook
        var wb = XLSX.utils.book_new();
        // Convert table to worksheet
        var ws = XLSX.utils.table_to_sheet(tbl);
        // Add the worksheet to the workbook with the desired sheet name
        XLSX.utils.book_append_sheet(wb, ws, "Ask List");
        XLSX.writeFile(wb, "Asks_EvoConnect.xlsx");
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
                                    <h3>Ask</h3>
                                    <a className="add-but">
                                    {userId==='65c47c1068e5b01ba5450c31' && 
                                    <i className="fas fa-download" onClick={handleDownload} data-toggle='tooltip' title='Download'></i>}
                                        &nbsp;&nbsp;
                                        <i class="fas fa-plus" onClick={() => navigate('/askform')} data-toggle='tooltip' title='Add'></i>
                                    </a>
                                </div>
                                {ask &&
                                    <div class="card-body">
                                        <table class="table" id='table'>
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">Sl. No.</th>
                                                    <th scope="col">Requirements</th>
                                                    <th scope="col">Created By</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ask.map((x, idx) => (
                                                    <tr key={idx}>
                                                        <th scope="row">{idx + 1}</th>
                                                        <td>{x.ask}</td>
                                                        <td><b>{x.name}</b></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            }


            <Footer />
        </div>
    )
}

export default Asklist
