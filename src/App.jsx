import HomePage from "./Components/HomePage/HomePage";
import SignUp from "./Components/SignUpPage/SignUpPage";
import LogIn from "./Components/LoginPage/LogInPage";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "antd/es/layout/layout";
import { useState,useEffect } from "react";
import ToDo from "./Components/ToDoForm/ToDoForm";
import axios from "axios";
import Edit from "./Components/Update/UpdateForm";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const handleSignin = () => {
    setIsSignedIn(false);
    setIsSignedOut(true);
    setIsSignedUp(false)
  };
  const [isSignedup, setIsSignedUp] = useState(true);
  const handleSignedUp = () => {
    setIsSignedUp(false);
    setIsSignedIn(true);
    setIsSignedOut(false);
  };
  const [isSignedOut, setIsSignedOut] = useState();
  const handleSignedOut = () => {
    setIsSignedIn(true);
    setIsSignedOut(false);
    setIsSignedUp(true);
  };
  
  return (
    <div>
      <Header className="header">
        {isSignedup && (
          <Link to="signup" className="headeritems" onClick={handleSignedUp}>
            Sign Up
          </Link>
        )}
        {isSignedIn && (
          <Link to="signin" className="headeritems" onClick={handleSignin}>
            Log In
          </Link>
        )}
        {isSignedOut && (
          <Link to="signin" className="headeritems" onClick={handleSignedOut}>
            Sign Out
          </Link>
        )}
        <Link to="home" className="headeritems">
          Home
        </Link>
      </Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="signin" element={<LogIn></LogIn>}></Route>
        <Route path="home/todo" element={<ToDo></ToDo>}></Route>
        <Route path ="home/update" element={<Edit></Edit>}></Route>
        <Route path="home" element={<HomePage></HomePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;