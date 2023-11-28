import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
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

  const onSubmit = e => {
      e.preventDefault();

      if (password === re_password) {
          signup(firstname, lastname, email, password, re_password);
          setAccountCreated(true);
      }
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

  if (isAuthenticated) {
      navigate('/')
  }
  if (accountCreated) {
      navigate('/login')
  }



  return (
    <div className="flex justify-center items-center h-screen bg-[#72898D]">
      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg"
      onSubmit={e => onSubmit(e)}>
        <h2 className="text-4xl text-[#466474] font-bold text-center">SIGN UP</h2>
       <p className="text-red-500"></p>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Firstname</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="text"
            name="firstname"
            value={firstname}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Lastname</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="text"
            name="lastname"
            value={lastname}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Email</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Password</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength='8'
            required
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Confirm Password</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="password"
            name="re_password"
            value={re_password}
            onChange={e => onChange(e)}
            minLength='8'
            required
          />
        </div>
        <button
          className="w-full my-5 py-2 bg-[#466474] shadow-lg hover:shadow-[#72898D] text-white"
          type='submit'
        >
          Sign Up
        </button>
        <p className="text-[#BD9333] text-center text-sm">
          Already have an account? <a href="#">Sign In</a>
        </p>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { signup })(SignUp);
