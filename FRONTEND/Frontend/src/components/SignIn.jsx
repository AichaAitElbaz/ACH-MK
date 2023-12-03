import React from 'react' 

import { login } from "../assets";
import styles, { layout } from "../style";


const SignIn = () => {
    return(


      <div className="flex justify-center items-center h-screen bg-discount-gradient">
      <form className="max-w-[400px] w-full  bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md">
        <h2 className="font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris">SIGN IN</h2>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label className={`${styles.labelCheck}`}>Email</label>
          <input  className={`${styles.input}`} type="email" />
        </div>
        <div className="flex flex-col text-[#2A3240] py-2">
          <label className={`${styles.labelCheck}`}>Password</label>
          <input  className={`${styles.input}`} type="password" />
        </div>
        <div className="flex justify-between  py-2">
          <p className="flex items-center font-semibold text-gradient-label dark:text-white text-sm"><input className="mr-2" type="checkbox" /> Remember Me</p>
          <p className="text-sm font-semibold text-gradient-label dark:text-white">Forgot Password?</p>
        </div>
        <div className="flex  items-center justify-center ">
        <button className="w-56 py-3 px-8 m-7  font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px]">Sign In</button>
        </div>
        <p className="font-semibold text-gradient-label dark:text-white text-center text-sm"><a href="/register">Don't Have an Account? Sign Up</a></p>
      </form>
    </div>
     
      
  );
    };
    
  export default SignIn;

    