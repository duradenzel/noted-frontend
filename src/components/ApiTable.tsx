import React, { useState, useEffect } from 'react';

interface ApiTableProps {
  endpoint: string;
}

const ApiTable: React.FC<ApiTableProps> = ({ endpoint }) => {
  const [data, setData] = useState<any>(null); 
  const baseUrl = "http://localhost:5065/api/";
  console.log(data);

  useEffect(() => {
    fetch(`${baseUrl}${endpoint}`)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error('Error fetching data:', error));
  }, [endpoint]);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Data from API Gateway: {data ? data.message : 'Loading...'}</p>
    </div>
  );
};

export default ApiTable;