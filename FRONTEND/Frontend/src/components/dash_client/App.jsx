import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';
import ProfileForm from './pages/ProfileForm.jsx';
import Message from './pages/Message.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="message" element={<Message />} />
      </Route>
    </Routes>
  );
}

export default App;
