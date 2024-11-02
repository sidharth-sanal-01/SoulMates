import React, { useState, useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import login from "../../redux/apicallredux";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const dispatchRedux = useDispatch();
  const { userInfo, error, pending } = useSelector((state) => state.user);

  function handleClick(e) {
    // console.log(email.current.value);
    e.preventDefault();
    // getLogin(email.current.value,password.current.value)
    // loginCall(
    //   { username: email.current.value, password: password.current.value },
    //   dispatch
    // );
    login(
      { username: email.current.value, password: password.current.value },
      dispatchRedux
    );
    console.log(userInfo);
  }

  return (
    <div className="LoginWrapper">
      <div className="loginMain">
        <div className="aboutBook">
          <h1>FreshBook</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            maximus nisl leo, at fringilla magna rutrum eget. Praesent quis leo
            enim.
          </p>
        </div>
        <form onSubmit={handleClick}>
          <div className="inputSection">
            <input
              type="text"
              placeholder="Username"
              required={true}
              min="6"
              ref={email}
            />
            <input
              type="password"
              min="8"
              max="20"
              placeholder="Password"
              required={true}
              ref={password}
            />
            <button type="submit" className="buttonLogin">
              {pending ? (
                <CircularProgress color="white" size="10px" />
              ) : (
                "Login"
              )}
            </button>
            {error && <h1>Ooops something went wrong !</h1>}
            <div className="signUptag">
              <Link to="/register" style={{textDecoration:"none",color:"black"}}>
                <h3>Sign Up</h3>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
