import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './signup.css';

export default function Signup  (){
  const fistNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const cinRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  
 
  const hanldeSubmit=async(e)=>{
    e.preventDefault();
      const firstname=fistNameRef.current.value.trim();
      const lastname=lastNameRef.current.value.trim();
      const phoneNumber=phoneNumberRef.current.value.trim();
      const cin=cinRef.current.value.trim();
      const email=emailRef.current.value.trim();
      const password=passwordRef.current.value.trim();

     
     const response = await axios.post('http://localhost:8081/signup', {
      // header: 'content-type/json',
      first_name: firstname,
      last_name:lastname,
      phone_number:phoneNumber,
      id_card:cin,
      email:email,
      password:password,
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.status === 'success') {
        navigate('/');
      } else {
        console.error('Sign-up failed:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error during sign-up:', error);
      console.log('the submitted data is :  ', firstname,lastname,phoneNumber,cin,email,password);
    });

    
  }
  return (
    <div className="signup-container">
      {/* Left Signup Form */}
      <div className="form-container">
       <form action="" onSubmit={hanldeSubmit}>
       <h2>First name</h2>
        <input type="text" placeholder="First name" name='firstname' className="input" ref={fistNameRef}/>
        <h2>Last name</h2>
        <input type="text" placeholder="Last name" name='lastname' className="input" ref={lastNameRef}/>
        <h2>Telephone</h2>
        <input type="text" placeholder="Telephone" name='telephone' className="input" ref={phoneNumberRef} />
        <h2>CIN</h2>
        <input type="text" placeholder="CIN" name='cin' className="input"  ref={cinRef}/>
        <h2>Email</h2>
        <input type="email" placeholder="Email" name='email' className="input" ref={emailRef}/>
        <h2>Password</h2>
        <input type="password" placeholder="Password" name='password' className="input"  ref={passwordRef}/>
        <button className="button">Create account</button>
       </form>
      </div>

      {/* Right Welcome Section */}
      <div className="welcome-container">
        <h1>Welcome to Locavo</h1>
        <p className="link-text">
          Already a user? <a href="/">Log In</a>
        </p>
      </div>
    </div>
  );
};

