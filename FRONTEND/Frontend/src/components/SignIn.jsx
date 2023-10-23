import React, { useState } from 'react'; 
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from "../assets";



const SignIn = () => {

  const [formData, setFormData] = useState(
    {
      email: '',
      password: ''

    });

    const {email, password} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
      e.preventDefault();
    };
    return(



      <div onSubmit={e => onSubmit(e)} className="flex justify-center items-center h-screen bg-[#72898D]">
      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg">
        <h2 className="text-4xl text-[#466474] font-bold text-center">SIGN IN</h2>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>UserName</label>
          <input className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none" 
          type="text" 
          name="email" 
          value={email}
          onChange={e=> onChange(e)}
          required
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Password</label>
          <input className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none" 
          type="password" 
          name="password" 
          value={password}
          onChange={e=> onChange(e)}
          minLength='8'
          required
          />
        </div>
        <div className="flex justify-between text-[#BD9333] py-2">
          <p className="flex items-center text-sm"><input className="mr-2" type="checkbox" /> Remember Me</p>
          <p className="text-sm">Forgot Password?</p>
        </div>
        <button className="w-full my-5 py-2 bg-[#466474] shadow-lg hover:shadow-[#72898D] text-white" type='submit'>Sign In</button>
        <p className="text-[#BD9333] text-center text-sm"><a href="#">Don't Have an Account? Sign Up</a></p>
      </form>
    </div>
    
    
  );
    };
  
  // const mapStateToProps = state => ({

  // });
    
  export default connect(null, { })(SignIn);

    