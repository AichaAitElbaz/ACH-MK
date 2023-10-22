import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      formData.username === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.confirmPassword === ''
    ) {
      setError('Please fill out all fields.');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#72898D]">
      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg">
        <h2 className="text-4xl text-[#466474] font-bold text-center">SIGN UP</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Username</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Email</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Password</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Confirm Password</label>
          <input
            className="rounded-lg bg-[#F6F6F6] mt-2 p-2 focus:outline-none"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="w-full my-5 py-2 bg-[#466474] shadow-lg hover:shadow-[#72898D] text-white"
          onClick={handleSubmit}
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

export default SignUp;
