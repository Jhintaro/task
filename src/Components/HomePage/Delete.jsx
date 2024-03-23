import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = () => {
  const [data, setData] = useState([]);
  const authToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmFtZSI6InVzZXIyIiwibmJmIjoxNzEwMTM4MTQ4LCJleHAiOjE3MTAxNDE3NDgsImlhdCI6MTcxMDEzODE0OH0.LnYS5BYTAC57rGXiEvaVyxTGkprK9XPdwPH28mF6KEE66B18LcHFH8F-L3BGwIbdYnFk1nsV5rdxwy-XKkZjKQ";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://207.180.235.145/Tasks', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://207.180.235.145/Tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Delete;

