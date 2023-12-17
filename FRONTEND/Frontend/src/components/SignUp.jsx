import React, { useState } from 'react';
import styles, { layout } from "../style";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const SignUp = ({ signup, isAuthenticated }) => {
  const navigate = useNavigate();
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    re_password: ''
  });
  const { firstname, lastname, email, password, re_password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = e => {
    e.preventDefault();
    signup(firstname, lastname, email, password, re_password);
    setAccountCreated(true);
    
};



const continueWithGoogle = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google`)


        window.location.replace(res.data.authorization_url);
    } catch (err) {


    }
};
const continueWithFacebook = async () => {
  try {
      const res = await axios.get(`http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook`)


      window.location.replace(res.data.authorization_url);
  } catch (err) {


  }
};



  return (
    <div className="flex justify-center items-center h-screen bg-discount-gradient">
      <form className=" max-w-[400px]   bg-white border-2  border-schemes rounded-[10px] py-[20px] px-4 shadow-md"
      onSubmit={e => onSubmit(e)}>
        <h2 className="font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris">SIGN UP</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex flex-col  py-2">
  <div className="flex">
    <div className=" flex-col mr-2">
      <label className={`${styles.labelCheck}`}>First Name</label>
      <input
        className={`${styles.input}`}
        type="text"
        name="firstname"
        value={firstname}
        onChange={e => onChange(e)}
        required
      />
    </div>
    <div className="flex flex-col">
      <label className={`${styles.labelCheck}`}>Last Name</label>
      <input
        className={`${styles.input}`}
        type="text"
        name="lastname"
        value={lastname}
        onChange={e => onChange(e)}
        required
      />
    </div>
  </div>
</div>

        <div className="flex flex-col py-2">
          <label className={`${styles.labelCheck}`}>Email</label>
          <input
            className={`${styles.input}`}
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="flex flex-col py-2">
          <label className={`${styles.labelCheck}`}>Password</label>
          <input
            className={`${styles.input}`}
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}            
            minLength='8'
            required
          />
        </div>
        <div className="flex flex-col py-2">
          <label className={`${styles.labelCheck}`}>Confirm Password</label>
          <input
            className={`${styles.input}`}
            type="password"
            name="re_password"
            value={re_password}
            onChange={e => onChange(e)}
            minLength='8'
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]"
           type='submit'
          >
            Sign Up
          </button>
        </div>

        <p className="font-semibold text-gradient-label dark:text-white text-center text-sm">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </form>
      <ToastContainer/>

    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { signup })(SignUp);