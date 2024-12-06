import React, { useState } from 'react';
import axios from 'axios';

const DataSender = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const sendData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send the form data to CodeIgniter backend
    axios.post('http://localhost:8081/send', { name })  
      .then(response => {
        console.log('Data sent successfully', response);
      })
      .catch(error => {
        setError('There was an error sending data!');
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <h1>Send Name</h1>
      <form onSubmit={sendData}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DataSender;
