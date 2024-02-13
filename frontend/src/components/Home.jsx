import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const Home = () => {

    const navigate = useNavigate()

  return (
    <div>
       
      <Navbar />

        <div class="mobile-container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-12">
              <div className='d-flex home-page-buts'>
                <a
                    href="#"
                    class="home-link"
                    onClick={() => navigate("/profiledetails")}
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    class="home-link"
                    onClick={() => navigate("/giveablelist")}
                  >
                    Give
                  </a>
                  
                  <a
                    href="#"
                    class="home-link"
                    onClick={() => navigate("/asklist")}
                  >
                    Ask
                  </a>
                  <a
                    href="#"
                    class="home-link"
                    onClick={() => navigate("/matches")}
                  >
                    Matches
                  </a>
                </div>
            </div>
          </div>
       </div>
<Footer/>
    </div>
  )
}

export default Home
