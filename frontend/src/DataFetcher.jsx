import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make the API call to CodeIgniter backend
    axios.get('http://localhost:8081/api/endpoint')
      .then(response => {
        // Update the state with the response data
        setData(response.data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        setError('There was an error fetching data!');
        console.error('There was an error!', error);
      });
  }, []); // Empty dependency array to run only on component mount

  return (
    <div>
      <h1>Fetched Data</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataFetcher;
