import React, { useState } from 'react';
import axios from 'axios';

const ProxyComponent = ({ url }) => {
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = url; // Use the passed URL as the target

    try {
      const response = await axios.get(proxyUrl + targetUrl);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
    </div>
  );
};

export default ProxyComponent;
