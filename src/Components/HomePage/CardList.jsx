import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Card';
import { Space } from 'antd';

const CardList = () => {
  const [data, setData] = useState([]);
  const authToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmFtZSI6InVzZXIyIiwibmJmIjoxNzEwMTM4MTQ4LCJleHAiOjE3MTAxNDE3NDgsImlhdCI6MTcxMDEzODE0OH0.LnYS5BYTAC57rGXiEvaVyxTGkprK9XPdwPH28mF6KEE66B18LcHFH8F-L3BGwIbdYnFk1nsV5rdxwy-XKkZjKQ";
    const authTokenWithBearer = `Bearer ${authToken}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://207.180.235.145/Tasks/list' , {
          headers: {
            Authorization: authTokenWithBearer
          }
        });
        setData(response.data); // Assuming the response is an array of objects
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []) // Empty dependency array ensures this effect runs only once after initial render
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://207.180.235.145/Tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // Remove the deleted entry from the local state
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  return(
    <Space direction="vertical" size={16}>
      {data.map(item => (
        <Cards
        key={item.id}
        title={item.title}
        description={item.description}
        dueDate={item.dueDate}
        completed={item.completed}
        style={{
          width: 300,
        }}
        // Add other props as needed
      >
      </Cards>
      ))}
      </Space>
  )};

export default CardList;