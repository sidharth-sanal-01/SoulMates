import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile/ProfilePage";
import Login from "./pages/Login/login";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/Register/register";
import { useSelector } from "react-redux";

function App() {
  const {userInfo}=useSelector(state=>state.user);
  // const { user } = useContext(AuthContext);

  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {userInfo ? <Home /> : <Login/>}
      </Route>
      <Route path="/login">{userInfo ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">{userInfo ? <Redirect to="/" /> : <Register />}</Route>
      <Route path="/profile/:id">
        {userInfo ? <Profile />:<Redirect to="/login"/>}
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
