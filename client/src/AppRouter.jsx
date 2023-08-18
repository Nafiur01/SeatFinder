import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs';
import TermsOfService from './components/TermsOfService';
import App from './App';
import Navbar from './components/Navbar';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfService />}>
                <Route element={<Navbar />}></Route>
            </Route>
        </Routes>
        
    </BrowserRouter>
  )
}

export default AppRouter
