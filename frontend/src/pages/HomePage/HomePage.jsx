import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import { FaCar, FaRegHandshake, FaDollarSign, FaClock } from "react-icons/fa";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [latestCar, setLatestCar] = useState([]);
  const [reversedCars, setReversedCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8081/cars");
      if (response.data.data) {
        setCars(response.data.data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Reverse the cars array to display from the last one


  useEffect(() => {
    if (cars.length > 0) {
      const carsReverse = [...cars].reverse();
      setReversedCars(carsReverse);
      const carIds = cars.map((car) => Number(car.car_id));
      const maxCarId = Math.max(...carIds);
      const lastCar = cars.find((car) => Number(car.car_id) === maxCarId);
      setLatestCar(lastCar || null);
    }
  }, [cars]);
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="content-container">
          {/* Text Section */}
          <div className="text-content">
            <h1>
              Rent a <span className="highlight">car</span> and find great deals
              with us
            </h1>
            <p>
              Choose from a variety of brand-new cars at unbeatable prices.
              Your adventure starts here!
            </p>
            <Link to="/rent" className="book-now-btn">Book Online Now!</Link>
          </div>

          {/* Image Section */}
          {/* <div className="image-content">
            <img
              src="https://via.placeholder.com/500x300.png?text=Car+Image"
              alt="Car"
              className="car-image"
            /> 
          </div> */ }
          <div className="image-content">
              <img
                src={latestCar.car_image} 
                alt={latestCar.car_name}
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
              />  
            </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="featured-vehicles">
        <h2>Featured Vehicles</h2> 
        <p> Check out our top-rated cars chosen by travelers worldwide. </p>
        <div className="vehicle-cards">
          {reversedCars.slice(1, 4).map((car, index) => (
            <div key={index} className="vehicle-card">
              <img
                src={car.car_image} 
                alt={car.car_name}
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
              />
              <h3>{car.car_name}</h3>
              <p>{car.model}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us"> 
        <h2>Why Choose Us?</h2>
        <p>Discover the benefits of renting with us, and why we're a top choice for customers worldwide.</p>
        <div className="choose-us-grid">
          <div className="choose-us-item">
            <FaCar className="icon" />
            <h3>Wide Selection of Cars</h3>
            <p>
              Whether you're looking for a compact city car or a spacious family SUV, we have the perfect car for your needs.
            </p>
          </div>
          <div className="choose-us-item">
            <FaDollarSign className="icon" />
            <h3>Affordable Prices</h3>
            <p>
              We provide transparent, budget-friendly pricing that gives you the best value for your money.
            </p>
          </div>
          <div className="choose-us-item">
            <FaClock className="icon" />
            <h3>Quick & Easy Booking</h3>
            <p>
              Reserve your vehicle in just a few clicks with our intuitive booking system.
            </p>
          </div>
          <div className="choose-us-item">
            <FaRegHandshake className="icon" />
            <h3>Trust & Reliability</h3>
            <p>
              With years of experience, we provide reliable cars and exceptional service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
