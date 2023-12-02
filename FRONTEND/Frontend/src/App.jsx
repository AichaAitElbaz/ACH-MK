import React from 'react';
import styles from "./style";

import { GenerateForm, Footer, Navbar, Hero, SignIn, AboutUs, ContactUs, SignUp } from "./components";


const App
  = () => (
    <div className=" w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter} `}>
      <div className={`${styles.boxWidth} `}> 
        <Navbar/>
      </div>
    </div>

    <div className={` ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`  ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} `}>
        <GenerateForm/>
        <Footer/> 
      </div>
    </div>
  </div>
    );
  

export default App
