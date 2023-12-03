
import React, { useState } from 'react';
import styles, { layout } from "../style";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      formData.firstName === '' ||
      formData.lastName === '' ||
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
    <div className="flex justify-center items-center h-screen bg-discount-gradient">
      <form className=" max-w-[400px]   bg-white border-2  border-schemes rounded-[10px] py-[20px] px-4 shadow-md">
        <h2 className="font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris">SIGN UP</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex flex-col  py-2">
  <div className="flex">
    <div className=" flex-col mr-2">
      <label className={`${styles.labelCheck}`}>First Name</label>
      <input
        className={`${styles.input}`}
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
    </div>
    <div className="flex flex-col">
      <label className={`${styles.labelCheck}`}>Last Name</label>
      <input
        className={`${styles.input}`}
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
    </div>
  </div>
</div>


        <div className="flex flex-col  py-2">
          <label className={`${styles.labelCheck}`}>Email</label>
          <input
            className={`${styles.input}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col  py-2">
          <label className={`${styles.labelCheck}`}>Password</label>
          <input
            className={`${styles.input}`}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col  py-2">
          <label className={`${styles.labelCheck}`}>Confirm Password</label>
          <input
            className={`${styles.input}`}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex items-center justify-center">
          <button
            className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        
        <p className="font-semibold text-gradient-label dark:text-white text-center text-sm">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
