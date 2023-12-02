import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout.jsx';
import Register from 'C:/Users/userpc/Desktop/ACH_MK/ACH-MK/FRONTEND/Frontend/src/components/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
