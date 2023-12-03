import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import AppAdmin from './components/DashboardAdmin/layouts/admin/index.jsx'
import AppClient from './components/dash_client/App.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/*' element={<React.StrictMode>
        <App />
      </React.StrictMode>}></Route>
      <Route path='/admin/*' element={<React.StrictMode>
        <AppAdmin />
      </React.StrictMode>}></Route>
      <Route path='/login' element={<React.StrictMode>
        <SignIn />
      </React.StrictMode>}></Route>

      <Route path='/register' element={<React.StrictMode>
        <SignUp />
      </React.StrictMode>}></Route>
    
      <Route path='/client/*' element={<React.StrictMode>
        <AppClient/>
      </React.StrictMode>}></Route>
    </Routes>
  </BrowserRouter>

)
