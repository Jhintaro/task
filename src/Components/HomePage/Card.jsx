import { Button, Card, Space } from "antd";

import { Link } from "react-router-dom";

const Cards = ({ title, description, completed, dueDate }) => {
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
        <p>{description}</p>
        <p>{dueDate}</p>
        <p>{completed}</p>
        <Button>Delete</Button>
      </Card>
    </Space>
  );
};

export default Cards;
