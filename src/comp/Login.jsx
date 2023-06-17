import React from 'react'
import '../App.css'
import {Box} from '@chakra-ui/react'
export default function Login() {
  return (
 <div className="parent vh-100 d-flex justify-content-center align-items-center" >


    <div className="login-box ">
      <p >Login</p>
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
          <button className="button1">Login</button>
        </div>
      </form>
      <p>
        dont have an account? <a href="/signup" className="a2 text-white ">Register</a>
      </p>
    </div>
    </div>
  )
}
