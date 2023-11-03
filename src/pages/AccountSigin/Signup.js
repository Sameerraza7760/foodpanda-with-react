import React from 'react'
import Header from '../../Components/Header/Header'
import { TextField } from '@mui/material'
import { SignupFirebase,swal,auth } from '../../Config/firebase/firebase'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate=useNavigate()
   async function signUp(){
  var userName=document.getElementById('username').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  try {
      await SignupFirebase({email,password,userName})
      await swal("Congratulations!","Sussesfully Signup", "success");
      navigate('/login')
  } catch (e) {
      await swal (e.message)
  }
}
  return (
    <>
    <Header/>
    <div className='Accounts-container' >
      
        <h1 className='accounts-h1'  style={{color:'#e21b70'}} >SIGIN  BY TYPING YOUR Username AND Email</h1>
       <TextField
       label="Enter Your username"
       style={{width:'90%',marginTop:'7%',fontFamily:'sans-serif'}}
       id='username'

       />
        <TextField
       label="Enter Your Email"
       style={{width:'90%',marginTop:'7%',fontFamily:'sans-serif'}}
       id='email'

       />
        <TextField
       label="Enter Your Password"
       style={{width:'90%',marginTop:'7%',fontFamily:'sans-serif'}}
       type='password'
       id='password'
        />
      <button type="button"  id='btn3' className="btn btn-primary" style={{color:'white',backgroundColor:'#e21b70',marginTop:'9%'}}  onClick={signUp} >Sign up</button>
    </div>
    </>
 
  )   
}
  
export default Signup