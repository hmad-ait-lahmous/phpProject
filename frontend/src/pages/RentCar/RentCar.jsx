import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RentCar.css';

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // Fetch cars from the database (mock data here)
  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8081/cars");
      console.log("Fetched cars:", response.data.data);
      // Assuming the response structure has a 'res' field for the cars list
      if (response.data.data) {
        setCars(response.data.data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
      setMessage("An error occurred while fetching cars.");
    }
  };

  // UseEffect to fetch cars on initial render
  useEffect(() => {
    fetchCars();
  }, []);

  // Navigate to the BookingPage with the selected car's ID
  const handleRentClick = (car_id) => {
    const selectedCar = cars.find((car) => car.car_id === car_id);
    navigate(`/booking/${car_id}`, { state: { car: selectedCar } });
  };
  

  return (
    <div className="rent-car-page">
      <h1 className="title">Our Car Catalog</h1>
      <div className="car-catalog">                      
        {cars.length>0?(
        cars.map((car) => (
          <div className="car-card" key={car.car_id}> 
            <img src={car.car_image} alt={car.car_name} className="car-image" />
            <div className="car-details"> 
              <h3>{car.car_name}</h3> 
              <p>{car.model}</p>
              <p className="price">${car.daily_rate} / day</p>
              <button
                className="rent-button"
                onClick={() => handleRentClick(car.car_id)}
              >
                Rent this car
              </button>
            </div>
          </div>
        ))):(
          <p>No car available</p>
        )}
      </div>
    </div>
  );
};

export default RentCar;
