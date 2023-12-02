import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import AppClient from './components/dash_client/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<React.StrictMode>
        <App />
      </React.StrictMode>}></Route>
    
      <Route path='/client/*' element={<React.StrictMode>
        <AppClient/>
      </React.StrictMode>}></Route>
    </Routes>
  </BrowserRouter>

)
