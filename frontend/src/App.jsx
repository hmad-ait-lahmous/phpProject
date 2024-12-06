import React from 'react';
import { useState,useEffect } from 'react';
import NavBar from './components/Navbar/navBar';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/authentification/login/Login';
import { FaBeer } from 'react-icons/fa';
import DataSender from './DataSender'; 
import DataFetcher from './DataFetcher';
import AdminHome from './pages/admin/home/adminHome';
import Users from './pages/admin/users';
import Signup from './pages/authentification/register/signUp';
import HomePage from './pages/HomePage/HomePage';
import BookingPage from './pages/BookingPage/BookingPage';
import AdminLogin from './pages/admin/adminLog';
import AllCars from './components/allCars'
import RentCar from './pages/RentCar/RentCar';

import AdminAddCar from './pages/admin/addCars';

function App() {
 

  // Check localStorage on component mount

  return (
    <>
      
      
      <Routes>
          {/* Admin routes Routes */}
        <Route path="/" element={<LoginPage  />} />

        
        <Route path="/admin/auth" element={<AdminLogin  />} />
        <Route path="/admin" element={<AdminHome/>} />

        <Route path="/admin/auth" element={< AdminLogin />} />

        
        
        <Route path="/admin" element={<AdminHome />}>
          <Route path="dashboard" element={<AllCars />} />
          <Route path="add-car" element={<AdminAddCar />} />
          {/* <Route path="bookings" element={<ManageBookings />} /> */}
        </Route>
       {/* // User routes /> */}
       <Route path="/booking/:car_id" element={<BookingPage />} />
       {/* <Route path="/booking/:car_id" element={<BookingPage />} /> */}


        <Route path="/rent" element={<RentCar/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin/dashboard" element={<AllCars/>} />

        {/* <Route path="/send" element={<DataSender/>} /> */}
      </Routes>  
    </>
  );
}

export default App;
