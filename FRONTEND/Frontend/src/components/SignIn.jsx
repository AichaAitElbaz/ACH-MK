import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles, { layout } from "../style";


const SignIn = ({ login, isAuthenticated, role}) => {
  
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  
    if (isAuthenticated && role === 'user') {
      navigate("/client");
    } else if (isAuthenticated && role === 'admin') {
      navigate("/admin");
    } else {
      toast.error('Error');
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


      <div className="flex justify-center items-center h-screen bg-discount-gradient">
              <ToastContainer/>

      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md"
      onSubmit={e => onSubmit(e)}>
        <h2 className="font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris">SIGN IN</h2>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label className={`${styles.labelCheck}`}>Email</label>
          <input  className={`${styles.input}`} type="email" 
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required/>
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label className={`${styles.labelCheck}`}>Password</label>
          <input  className={`${styles.input}`} type="password" 
          name='password'
          value={password}
          onChange={e => onChange(e)}
          minLength='6'
          required/>
        </div>
        <div className="flex justify-between  py-2">
          <p className="flex items-center font-semibold text-gradient-label dark:text-white text-sm"><input className="mr-2" type="checkbox" /> Remember Me</p>
          <p className="text-sm font-semibold text-gradient-label dark:text-white">Forgot Password?</p>
        </div>
        <div className="flex  items-center justify-center ">
        <button className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]" type='submit'>Sign In</button>
        </div>
        <p className="font-semibold text-gradient-label dark:text-white text-center text-sm"><a href="/register">Don't Have an Account? Sign Up</a></p>
      </form>
    </div>
     
      
  );
    };
  

  const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated,
      role : state.auth.role,
      
  });
  
  export default connect(mapStateToProps,{login})(SignIn);
    