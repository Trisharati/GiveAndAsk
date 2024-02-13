import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

const navigate = useNavigate()

  return (
   
      <footer>
      <div className='mobile-container'>
        <div className='d-flex foot-link'>
          <a><i class="fas fa-home" onClick={()=>navigate('/home')}></i><br/>Home</a>
          <a><i class="fas fa-hands" onClick={()=>navigate('/giveablelist')}></i><br/>Give</a>
          <a><i class="fas fa-hand-point-up" onClick={()=>navigate('/asklist')}></i><br/>Ask</a>
          <a><i class="fas fa-handshake" onClick={()=>navigate('/matches')}></i><br/>Matches</a>
        </div>
        </div>
      </footer>
   
  )
}

export default Footer
