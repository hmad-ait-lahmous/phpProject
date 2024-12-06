import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllCars() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState();
  const [newImage, setNewImage] = useState(null); // State for the new image file

  // Fetch cars from API
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8081/cars');
      if (response.data.data) {
        setCars(response.data.data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle opening the update modal
  const openUpdateModal = (car) => {
    setSelectedCar(car);
    // console.log(selectedCar.car_image);
    setNewImage(null); // Reset the new image state
    setShowModal(true);
  };

  // Handle updating the car
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', selectedCar.car_name || '');
    formData.append('brand', selectedCar.brand || '');
    formData.append('model', selectedCar.model || '');
    formData.append('fuel_type', selectedCar.fuel_type || '');
    formData.append('daily_rate', selectedCar.daily_rate || '');
    formData.append('availability', selectedCar.availability);
  
    // Only append the new image if it's selected
    if (newImage) {
      formData.append('car_image', newImage);
    }
  
    console.log('Form data:', [...formData.entries()]);
  
    try {
      const response = await axios.post(
        `http://localhost:8081/update/${selectedCar.car_id}`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setShow(response.data.message); // Display response message
  
      if (response.status === 200) {
        console.log(response.data.message);
        alert('Car updated successfully');
        setShowModal(false);
        fetchCars(); // Refresh car list
      } else {
        console.log('Error:', response.data.message);
        alert('Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('An error occurred while updating the car.');
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:8081/delete/${id}`);
      if (response.status === 200) {
        alert(response.data.message);
        setCars((prevCars) => prevCars.filter((car) => car.car_id !== id));
      } else {
        alert("Failed to delete the car. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("An error occurred while deleting the car.");
    }
                    
    };

  return (
    <div>
      <section className="car-management">
        <h2>Manage Cars</h2>
        <table>
          <thead>
            <tr>
              <th>Car</th>
              <th>Name</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Price per Day</th>
              <th>Fuel Type</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car.car_id}>
                  <td>
                    {car.car_image && (
                      <img
                        src={car.car_image}
                        alt={car.name}
                        style={{ width: '200px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>{car.car_name}</td>
                  <td>{car.model}</td>
                  <td>{car.brand}</td>
                  <td>{car.daily_rate}MAD</td>
                  <td>{car.fuel_type}</td>
                  <td>{car.availability ? 'Available' : 'Not Available'}</td>
                  <td>
                    <button onClick={() => openUpdateModal(car)}  className="edit-button">Update</button>
                    <button
                      onClick={() => handleDelete(car.car_id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No cars found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {showModal && selectedCar && (
  <div className="modal">
    <form onSubmit={handleUpdate}>
      <h3>Update Car</h3>
      
      <label>
        Name:
        <input
          type="text"
          value={selectedCar.car_name || ''}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, car_name: e.target.value })
          }
        />
      </label>
      
      <label>
        Brand:
        <input
          type="text"
          value={selectedCar.brand || ''}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, brand: e.target.value })
          }
        />
      </label>
      
      <label>
        Model:
        <input
          type="text"
          value={selectedCar.model || ''}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, model: e.target.value })
          }
        />
      </label>
      
      <label>
        Fuel Type:
        <input
          type="text"
          value={selectedCar.fuel_type || ''}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, fuel_type: e.target.value })
          }
        />
      </label>
      
      <label>
        Daily Rate:
        <input
          type="number"
          value={selectedCar.daily_rate || ''}
          onChange={(e) =>
            setSelectedCar({ ...selectedCar, daily_rate: e.target.value })
          }
        />
      </label>
      
      <label>
        Availability:
        <select
          value={selectedCar.availability || ''}
          onChange={(e) =>
            setSelectedCar({
              ...selectedCar,
              availability: e.target.value === 'true',
            })
          }
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </label>
      
      <label>
        Change Image:
        <input
          type="file"
          name="car_image"
          className="img"
          accept="image/*"
          onChange={(e) =>
            setNewImage({
              ...selectedCar,
              car_image: e.target.files[0],
            })
          }
        />
      </label>
      
      <div className="buttons">
        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
}

export default AllCars;
