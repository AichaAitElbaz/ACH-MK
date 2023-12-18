import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import AppClient from './components/dash_client/App.jsx'
import AboutUs from './components/AboutUs.jsx'
import AppAdmin from './components/DashboardAdmin/layouts/admin/index.jsx'
import ContactUs from './components/ContactUs.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Provider } from 'react-redux';
import store from './store';
import ProtectedRoutes from './PrivateRoute.jsx';
import ProtectedAdminRoutes from './PrivateAdminRoute.jsx'
import NotFound from './components/NotFound.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<React.StrictMode>
        <App />
      </React.StrictMode>}></Route>

      <Route path='/aboutUs' element={<React.StrictMode>
        <Navbar />
        <AboutUs />
        <Footer />
      </React.StrictMode>}></Route>

      <Route path='/contactUs' element={<React.StrictMode>
        <Navbar />
        <ContactUs />
        <Footer />
      </React.StrictMode>}></Route>  

      <Route path='/login' element={<React.StrictMode>
        <SignIn />
      </React.StrictMode>}></Route>

      <Route path='/register' element={<React.StrictMode>
        <SignUp />
      </React.StrictMode>}></Route>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/client/*' element={
      <React.StrictMode>
        <AppClient/>
      </React.StrictMode>}>
        
      </Route>
      </Route>
     
      <Route element={<ProtectedAdminRoutes/>}>
      <Route path='/admin/*' element={<React.StrictMode>
        <AppAdmin />
      </React.StrictMode>}>
      </Route>
      /</Route>
     
      <Route path="*" element={<React.StrictMode><NotFound /></React.StrictMode>} />
    </Routes>
  </BrowserRouter>
  </Provider>

)
