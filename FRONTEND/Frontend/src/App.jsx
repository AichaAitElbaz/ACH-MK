import React from 'react'
import styles from "./style";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AboutUs,ContactUs, Footer, Navbar,  Hero } from "./components";

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
    <Routes>
      <Route path='/' element={<Hero/>}></Route>
      <Route path='/aboutUs' element={<AboutUs/>}></Route>
      <Route path='/services' element={<Hero/>}></Route>
      <Route path='/projects' element={<Hero/>}></Route>
      <Route path='/contactUs' element={<ContactUs/>}></Route>
    </Routes>
    </div>
    </div>

    <div className={`  ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} `}>
        <Footer/>
      </div>
    </div>
  </div>
    );
  

export default App