import React, { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email address.',
      }));
      formIsValid = false;
    } else if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      formIsValid = false;
    }

    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter your password.',
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      // Add your login logic here
      console.log('Form Data:', formData);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-discount-gradient">
      <form className="max-w-[400px] w-full bg-[#E8E8E8] p-8 rounded-lg bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md">
        <h2 className="font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris">SIGN IN</h2>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Email</label>
          <input
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label>Password</label>
          <input
            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="flex justify-between  py-2">
          <p className="flex items-center font-semibold text-gradient-label dark:text-white text-sm">
            <input type="checkbox" /> Remember Me
          </p>
          <p className="text-sm font-semibold text-gradient-label dark:text-white">Forgot Password?</p>
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
        <p className="font-semibold text-gradient-label dark:text-white text-center text-sm">
          <a href="/register">Don't Have an Account? Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
