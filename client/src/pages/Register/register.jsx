import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { api } from "../../components/setupProxy";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      await axios.post(api + "/api/auth/register", user);
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
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
              required
              min="6"
              max="20"
              ref={username}
            />
            <input
              type="email"
              min="8"
              max="20"
              placeholder="Email"
              required
              min="6"
              max="20"
              ref={email}
            />
            <input
              type="password"
              min="8"
              max="20"
              placeholder="Password"
              required
              min="6"
              max="20"
              ref={password}
            />

            <button className="buttonRegister" type="submit">
              Register
            </button>
            <div className="signUptag">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>Login</h3>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
