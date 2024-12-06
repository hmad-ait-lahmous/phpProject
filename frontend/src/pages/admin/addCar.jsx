// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

//    car_id	car_name	car_image	brand	model	fuel_type	daily_rate	availability	status	
const AddCarForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  
  const [cars, setCars] = useState([]);
 
  // Handle form submission for adding a car
 
  const handleSubmit = async (e) => {
    e.preventDefault();

   

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img_url", image);

    try {
      const response = await axios.post("http://localhost:8081/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        setMessage("Car added successfully!");
        fetchCars(); // Refresh car list after adding
      }
      else{
        console.log(response)
      }
    } catch (error) {
      console.error("Error adding car:", error);
      setMessage("An error occurred while adding the car.");
    }
  };



  // Fetch list of cars
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

  return (
    <div>
      <h1>Add a New Car</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Car Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="img_url">Car Image:</label>
          <input
            type="file"
            id="img_url"
            name="img_url"
            accept="image/*" // Ensure only image files can be selected
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Car</button>
      </form>
      <button onClick={fetchCars} style={{ marginTop: "10px" }}>
        Fetch Cars
      </button>
      {message && <p>{message}</p>}
      
      <h2>Car List</h2>
      <div>
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.car_id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <p><strong>Car Name:</strong> {car.name}</p>
              {car.img_url && (
                <img
                  src={car.img_url} // Assuming img_url is the correct path to the image
                  alt={car.name}
                  style={{ width: "200px", height: "auto" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default AddCarForm;
 