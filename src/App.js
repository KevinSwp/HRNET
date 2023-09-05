import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CurrentEmployeesPage from './pages/currentEmployees';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/current-employees" element={<CurrentEmployeesPage />} /> 
    </Routes>
  );
}

export default App;
