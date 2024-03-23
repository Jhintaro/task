import { Button, Card, Space } from "antd";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

const Cards = ({ title, description, completed, dueDate }) => {
  const descriptionArray = Array.isArray(description) ? description : [description];
  return (
    <Space direction="vertical" size={16}>
      <Card
        title={title}
        extra={<Link to={`update`}>Edit</Link>}
        style={{
          width: 300,
          height: 400,
        }}
      >
        {descriptionArray.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
        <p>{dueDate}</p>
        <p>{completed}</p>
        <Button>Delete</Button>
      </Card>
    </Space>
  );
};
Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  completed: PropTypes.bool,
  dueDate: PropTypes.string,
};
export default Cards;
