import ReactDOM from 'react-dom/client'; 
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    
    {/* <NavBar/> */}
       <App />
      {/* <Booking/> */}
      {/* <AdminAddCar/> */}
      {/* <AllCars/> */}
      {/* <AddCarForm/> */}
    {/* <Footer/> */}
  
    {/* <LoginPage/> */}
    {/* <AdminHome/>      */}
     {/* <HomePage/>  */}
    {/* <BookingPage/> */}
    {/* <RentCar/> */}
     

  </BrowserRouter>,
);
