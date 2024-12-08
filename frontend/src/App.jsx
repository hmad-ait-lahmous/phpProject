import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/navBar';
import LoginPage from './pages/authentification/login/Login';
import AdminHome from './pages/admin/home/adminHome';
import Signup from './pages/authentification/register/signUp';
import HomePage from './pages/HomePage/HomePage';
import BookingPage from './pages/BookingPage/BookingPage';
import AdminLogin from './pages/admin/adminLog';
import AllCars from './components/allCars';
import RentCar from './pages/RentCar/RentCar';
import AdminAddCar from './pages/admin/addCars';
import PleaseSignIn from './pages/PleaseSignIn';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);

  return (
    <>
      {/* Conditionally render Navbar */}
      

       {user?<Navbar />:''} 

      <Routes>
        {/* Redirect unauthenticated users */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Authenticated User Routes */}
        {user ? (
          <>
            <Route path="/admin/auth" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminHome />}>
              <Route path="dashboard" element={<AllCars />} />
              <Route path="add-car" element={<AdminAddCar />} />
            </Route>
            <Route path="/booking/:car_id" element={<BookingPage />} />
            <Route path="/rent" element={<RentCar />} />
            <Route path="/home" element={<HomePage />} />
          </>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
    </>
  );
}

export default App;
