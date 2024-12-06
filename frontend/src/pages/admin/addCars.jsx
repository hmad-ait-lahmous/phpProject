import React, { useState } from 'react';
import axios from 'axios';
import './home/adminHome.css';

 export default function AdminAddCar() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState(""); 
  const [fuelType, setFuelType] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCar =async (e) => {
    e.preventDefault();
    if (!name || !image ||!brand||!model ||!fuelType||!dailyRate || !availability ) {
        setMessage("Please provide all required fields.");
        return;
      }
    const carData = {
      name,
      image,
      brand,
      model,
      fuelType,
      dailyRate,
      availability,
    };

    console.log(carData);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("car_image", image);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("fuel_type", fuelType); 
    formData.append("daily_rate", dailyRate); 
    formData.append("availability", availability);

      console.log(formData);  
    const response = await axios.post('http://localhost:8081/add-car',formData,{
        //header of the request to allow backend to receive the multipart request, not a json 
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });

    console.log(response);
    if (response.data.status === "success") {
        setMessage("Car added successfully!");
      }
      else{
        console.log(response)
      }
  };

  return (
    <div className='addCar'>
      <section className="add-car-form">
        <h2>Add New Car</h2>
        <form onSubmit={handleAddCar}>
          <label>
            Car Name:
            <input
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          
          <label htmlFor="img_url">Car Image:</label>
          <input
            type="file"
            id="car_image"
            name="car_image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <label>
            Brand:
            </label>
            <input
              type="text"
              name='brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
        

          <label>
            Model:
            <input
              type="text"
              name='model'
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </label>

          <label>
            Fuel Type:
            <input
              type="text"
              name='fule_type'
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            />
          </label>

          <label>
            Price per Day:
            <input
              type="number"
              name='daily_rate'
              value={dailyRate}
              onChange={(e) => setDailyRate(e.target.value)}
              required
            />
          </label>

          <label>
            Availability:
            <select name='availability'
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Availability
              </option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
          <button type="submit">Add Car</button>
        </form>
      </section>
    </div>
  );
}


