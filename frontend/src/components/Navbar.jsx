import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className='mobile-container d-flex'>
  <a className="navbar-brand" href="#"><img src="img/evo_connect.png" className="logo-img"/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
      </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="#" onClick={()=>navigate('/giveablelist')}>Give</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={()=>navigate('/asklist')}>Ask</a>
      </li> */}
    </ul>
    <ul className="navbar-nav ml-auto">
    {/* <i class="fas fa-user"></i>  */}
      <li className="nav-item dropdown">       
       <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {/* <p></p> */}
        {localStorage.getItem('user_name')} <i class="fas fa-user"></i>
  {/* <i class="fas fa-caret-down ml-1"></i> */}
          </a>
       
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#" onClick={()=>navigate('/profiledetails')}>Profile</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#" onClick={()=>{navigate('/matches')}}>Matches</a>
            <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#" onClick={()=>{localStorage.clear();
            toast.success('Logged out');navigate('/')}}>Logout</a>
        </div>
      </li>
    </ul>
  </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
