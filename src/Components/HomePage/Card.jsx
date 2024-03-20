import { Button, Card, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cards = ({ id, title, description, completed, dueDate }) => {
  const [data, setData] = useState([]);
  const authToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmFtZSI6InVzZXIyIiwibmJmIjoxNzEwMTM4MTQ4LCJleHAiOjE3MTAxNDE3NDgsImlhdCI6MTcxMDEzODE0OH0.LnYS5BYTAC57rGXiEvaVyxTGkprK9XPdwPH28mF6KEE66B18LcHFH8F-L3BGwIbdYnFk1nsV5rdxwy-XKkZjKQ";
  const authTokenWithBearer = `Bearer ${authToken}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://207.180.235.145/Tasks/list', {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://207.180.235.145/Tasks/${id}`, {
        headers: {
          Authorization: authTokenWithBearer,
        },
      });
      // Remove the deleted entry from the local state
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Space direction="vertical" size={16}>
      <Card
        title={title}
        extra={<Link to={`update`}>Edit</Link>}
        style={{
          width: 300,
          height: 400
        }}
      >
        <p>{description}</p>
        <p>{dueDate}</p>
        <p>{completed}</p>
        <Button onClick={handleDelete}>Delete</Button>
      </Card>
    </Space>
  );
}

export default Cards;
