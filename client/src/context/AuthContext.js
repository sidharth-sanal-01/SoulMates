import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// const INITIAL_STATE = {
//   user: {
//     _id: "612f0273c7ef45729465cb35",
//     profilePic: "Sidharth.jpg",
//     coverPic:
//       "cover1.jpg",
//     isAdmin: false,
//     username: "Sidharth",
//     password: "$2b$10$kYfHVAPa7NKckE17fZhcA.P30Ib05TIRV4vqLl.V1VDymVtMtqOt.",
//     email: "sidhu@gmail.com",
//     createdAt: "2021-09-01T04:32:51.777+00:00",
//     updatedAt: "2021-09-01T19:59:06.447+00:00",
//     __v: 0,
//     profileDescription: "Professional designer",
//   },
//   isFetching:false,
//   error:false
// };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));

    var hours = 1; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > 60*60*1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
