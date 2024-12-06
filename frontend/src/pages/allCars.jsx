import React from 'react'
import axios from 'axios';

function AllCars() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    setNewImage(null); // Reset the new image state
    setShowModal(true);
  };

  // Handle updating the car
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', selectedCar.car_name);
    formData.append('brand', selectedCar.brand);
    formData.append('model', selectedCar.model);
    formData.append('fuel_type', selectedCar.fuel_type);
    formData.append('daily_rate', selectedCar.daily_rate);
    formData.append('availability', selectedCar.availability);

    // Add the new image file to the form data if selected
    if (newImage) {
      formData.append('car_image', newImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/update/${selectedCar.car_id}`,
        formData
      );

      if (response.status === 200) {
        alert('Car updated successfully');
        setShowModal(false);
        fetchCars(); // Refresh car list
      } else {
        alert('Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      alert('An error occurred while updating the car.');
    }
  };

  return (
    <div>
       <section className="car-management">
            <h2>Manage Cars</h2>
            <table>
              <thead>
                <tr>
                  <th>car</th>
                  <th>name</th>
                  <th>Model</th>
                  <th>brand</th>
                  <th>Price per Day</th>
                  <th>fuel type</th>
                  <th>availability</th>
                 
                </tr>
              </thead>
              <tbody>
                {cars.length > 0 ? (
                cars.map((car) => (
                  <tr key={car.car_id}>
                    <td> {car.car_image && (
                          <img
                          src={car.car_image} 
                          alt={car.name}
                          style={{ width: "200px", height: "auto" }}
                          />
                       )}
                      </td>
                    <td>{car.car_name}</td>
                    <td>{car.model}</td>
                    <td>{car.brand}</td>
                    <td>${car.daily_rate}</td>
                    <td>${car.fuel_type}</td>
                    <td>{car.availability ? 'Available' : 'Not Available'}</td>
                    <td>
                      <button onClick={() => toggleAvailability(car.id)}>
                        {car.availability ? 'Mark as Unavailable' : 'Mark as Available'}
                      </button>
                      <button onClick={() => handleDelete(car.car_id)} className='delete-button'>Delete</button>
                      <button className='update-button'>Update</button> 
                      {/* onClick={() => handleUpdate(car.car_id)}  */}
                    </td>
                  </tr>
                ))):(
                  <tr>No car available</tr>
                )}
              </tbody>
            </table>
          </section>
    
  </div>
  )
}

export default AllCars;
