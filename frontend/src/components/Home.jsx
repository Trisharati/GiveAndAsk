import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const Home = () => {

    const navigate = useNavigate()

  return (
    <div>
       
      <Navbar />

        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-8">
              <div class="card custom-card">
                <div class="card-body">
                <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/profiledetails")}
                  >
                    Profile
                  </a>&nbsp;&nbsp;
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/giveablelist")}
                  >
                    Give
                  </a>
                  <br /><br />
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/asklist")}
                  >
                    Ask
                  </a>&nbsp;&nbsp;
                  <a
                    href="#"
                    class="btn btn-primary"
                    onClick={() => navigate("/matches")}
                  >
                    Matches
                  </a>
                </div>
                </div>
                </div>
                </div>
                </div>
<Footer/>
    </div>
  )
}

export default Home
