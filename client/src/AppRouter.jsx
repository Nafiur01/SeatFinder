import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs';
import TermsOfService from './components/TermsOfService';
import App from './App';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegPage from './components/RegPage';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfService />}>
                {/* <Route element={<Navbar />}></Route> */}

            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<RegPage/>} />
        </Routes>
        
    </BrowserRouter>
  )
}

export default AppRouter
