import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '' 
});

const { email, password } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(email, password);
    if (isAuthenticated) {
      toast.success("Good !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log('Login failed');
      // Display error toast
      toast.error("Email or password incorrect!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    // Display error toast
    toast.error('An error occurred during login');
  }
};

const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

        window.location.replace(res.data.authorization_url);
    } catch (err) {

    }
};

const continueWithFacebook = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

        window.location.replace(res.data.authorization_url);
    } catch (err) {

    }
};

    return(



      <div className="flex justify-center items-center h-screen bg-[#72898D]">
      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg"
      onSubmit={e => onSubmit(e)}>
        <h2 className="text-4xl text-[#466474] font-bold text-center">SIGN IN</h2>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>UserName</label>
          <input className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none" type="email" 
           name='email'
           value={email}
           onChange={e => onChange(e)}
           required/>
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Password</label>
          <input className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none" type="password"
           name='password'
           value={password}
           onChange={e => onChange(e)}
           minLength='6'
           required />
        </div>
        <div className="flex  items-center justify-center ">
        <button className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]">Sign In</button>
        </div>
        <button className="w-full my-5 py-2 bg-[#466474] shadow-lg hover:shadow-[#72898D] text-white" type='submit'>Sign In</button>
        <p className="text-[#BD9333] text-center text-sm">Don't Have an Account? Sign Up</p>
      </form>
      <ToastContainer />
    </div>
     
      
  );
    };
  
  const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated
  });
    
  export default connect(mapStateToProps,{login})(SignIn);

    