import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingPage.css";
import { useLocation,useNavigate } from "react-router-dom";

const BookingPage = () => {
  const { state } = useLocation();
  const passedCar = state?.car || null; // Get the passed car details
  const [selectedCar, setSelectedCar] = useState(passedCar);
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
const navigate= useNavigate(); 
  const fetchCars = async () => { 
    try {
      const response = await axios.get("http://localhost:8081/cars");
      setCars(response.data.data );
      console.log('cars received ',response.data.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
    // if (!passedCar) fetchCars(); // Fetch all cars if no car is passed
  }, []);

  const handleDateChange = () => {
    const pickupDate = new Date(document.getElementById("pickup-date").value);
    const returnDate = new Date(document.getElementById("return-date").value);

    if (pickupDate && returnDate && returnDate > pickupDate) {
      const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
      setRentalDays(days);
      if (selectedCar) setTotalPrice(days * selectedCar.daily_rate);
    } else {
      setRentalDays(0);
      setTotalPrice(0);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!selectedCar || rentalDays <= 0) {
      alert("Please select a car and valid dates.");
      return;
    }
    setShowModal(true); // Show the modal
  };

  const handleConfirmBooking = () => {
    setShowModal(false);
    alert(`You have successfully booked the ${selectedCar.car_name} for ${rentalDays} days.`);
  };

  const handleCancelBooking = () => {
    setShowModal(false);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Booking Form */}
        <div className="booking-form">
          <h2>Book Your Car</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="car">Select Car</label>
              <select
                  id="car"
                  value={selectedCar?.car_id || ""}
                  onChange={(e) => {
                    // Ensure the value is converted to a number
                    const selectedCarId = Number(e.target.value);
                    const selectedCar = cars.find((car) => Number(car.car_id) === selectedCarId);

                    setSelectedCar(selectedCar);
                    
                    if (selectedCar) {
                      navigate(`/booking/${selectedCar.car_id}`);
                    }
                  }}
                >
                <option value="null" >
                  Select a car
                </option>
                {cars.length>0 ?(
                   cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.car_name} (${car.daily_rate}/day)
                    </option>
                ) ) ):(
                    <option value={'null'}>
                      no car found
                    </option>
                  
                )
                  }
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pickup-date">Pickup Date</label>
              <input type="date" id="pickup-date" onChange={handleDateChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="return-date">Return Date</label>
              <input type="date" id="return-date" onChange={handleDateChange} required />
            </div>

            {rentalDays > 0 && selectedCar && (
              <div className="form-group">
                <p>
                  <strong>Rental Days:</strong> {rentalDays}
                </p>
                <p>
                  <strong>Total Price:</strong> ${totalPrice}
                </p>
              </div>
            )}

            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Your Booking</h2>
              <div className="modal-content">
                <h3>{selectedCar?.car_name}</h3>
                <p>Model: {selectedCar?.model}</p>
                <p>Daily Rate: ${selectedCar?.daily_rate}</p>
                <p>
                  <strong>Total Days:</strong> {rentalDays}
                </p>
                <p>
                  <strong>Total Price:</strong> ${totalPrice}
                </p>
               
              </div>
              <div className="modal-actions">
                <button onClick={handleConfirmBooking} className="confirm-btn">
                  Confirm
                </button>
                <button onClick={handleCancelBooking} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Info Section */}
        <div className="booking-info">
          <h2>Your Journey Starts Here</h2>
          <p>
            Rent your dream car today and explore the world at your own pace. With competitive
            pricing and a wide selection of vehicles, we are here to make your journey unforgettable.
          </p>
          <img
                  src={selectedCar?.car_image}
                  alt={selectedCar?.car_name}
                  className="car-image-modal"
                />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
