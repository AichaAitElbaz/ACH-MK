import React from 'react';
import styles from "./style";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { GenerateForm, Footer, Navbar, Hero, SignIn,SignUp, AboutUs } from "./components";
import { Provider } from 'react-redux';
import store from './store';
const App
  = () => (
<Provider store={store}>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<GenerateForm/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    <Footer /> 
  </Router>
</Provider>
    );
  

export default App
