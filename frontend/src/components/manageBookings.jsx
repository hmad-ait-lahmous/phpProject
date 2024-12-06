import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function ManageBookings() {
    const [bookings, setBookings] = useState([]);

  
    const fetchBookings = async () => {
        try {
          const response = await axios.get("http://localhost:8081/Bookings");
          console.log("Fetched Bookings:", response.data.data);
          // Assuming the response structure has a 'res' field for the Bookings list
          if (response.data.data) {
            setBookings(response.data.data);
          } else {
            setBookings([]);
          }
        } catch (err) {
          console.error("Error fetching Bookings:", err);
          setMessage("An error occurred while fetching Bookings.");
        }
      }; 
    
      // UseEffect to fetch Bookings on initial render
      useEffect(() => {
        fetchBookings();
      }, []);
  return (
    <div>  <section className="booking-management">
    <h2>Manage Bookings</h2>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Car</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.user}</td>
            <td>{booking.car}</td>
            <td>{booking.date}</td>
            <td>{booking.confirmed ? 'Confirmed' : 'Pending'}</td>
            <td>
              {!booking.confirmed && (
                <button onClick={() => confirmBooking(booking.id)}>Confirm</button>
              )}
            </td>
          </tr> 
        ))}
      </tbody>
    </table>
  </section></div>
  )
}

