import React from 'react'
import '../App.css'
import {Box} from '@chakra-ui/react'
export default function SignUp() {
  return (
 <div className="parent vh-100 d-flex justify-content-center align-items-center" >


    <div className="login-box ">
      <p >Register</p>
      <form >
        <div className="user-box">
          <input
            required=""
            
            type="text"
       
          />
          <label>Instructor Name</label>
        </div>
        <div className="user-box">
          <input required="" type="password" />
          <label>Password</label>
        </div>
        <div>
          <button className="button1">SIGN UP</button>
        </div>
      </form>
      <p>
        have an account? <a href="/login" className="a2 text-white ">Login</a>
      </p>
    </div>
    </div>
  )
}
