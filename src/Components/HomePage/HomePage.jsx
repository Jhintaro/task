import "./HomePage.css";
import Cards from "./Card";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import SignUp from "../SignUpPage/SignUpPage";
import CardList from "./CardList";
import ToDo from "../ToDoForm/ToDoForm";
const { Content, Footer } = Layout;

function HomePage() {
  return (
    <div>
      <Layout>
        <div className="divcontainer">
          <Link className="headeritems" to="todo">
            Add Task
          </Link>
        </div>
        <Content className="container content">
          <CardList></CardList>
        </Content>
      </Layout>
      <Footer className="container"></Footer>
    </div>
  );
}

export default HomePage;
