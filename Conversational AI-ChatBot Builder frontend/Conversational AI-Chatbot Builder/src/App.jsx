//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Playground from './pages/Playground';
import AdminPanel from './pages/AdminPanel';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/adminpanel" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;