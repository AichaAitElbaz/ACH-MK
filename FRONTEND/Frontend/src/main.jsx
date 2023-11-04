import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import AppAdmin from './components/DashboardAdmin/layouts/admin/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<React.StrictMode>
        <App />
      </React.StrictMode>}></Route>
      <Route path='/admin/*' element={<React.StrictMode>
        <AppAdmin />
      </React.StrictMode>}></Route>
    </Routes>
  </BrowserRouter>

)
