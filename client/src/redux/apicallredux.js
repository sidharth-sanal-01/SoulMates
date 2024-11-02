import { loginError, loginStart, loginSuccess } from "./userslice";
import { api } from "../components/setupProxy";
import { useDispatch } from "react-redux";
import axios from "axios";

const login = async (userDetails,dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(api + "/api/auth/login", userDetails);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginError());
  }
};

export default login;
