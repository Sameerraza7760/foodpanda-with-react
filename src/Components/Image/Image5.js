import React from 'react'
import './../style.css'
import { useNavigate } from 'react-router-dom'
function Image5() {
  const navigate=useNavigate()
  return (
    <>
    <div className='background-image5'>
   <div className='inner-div'>
     <h1 className='main-h1' >Foodpanda for business</h1>
  <p>Order lunch or fuel for work-from-home, late nights in the office, corporate events, client meetings, and much more.</p>
 
      
   <button  onClick={()=>navigate('/SignupR')} >Get started</button>
   
   
    </div>
    </div>
    
 </>
  )
}

export default Image5