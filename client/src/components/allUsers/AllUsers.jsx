import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./allUsers.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../setupProxy";
import { useSelector } from "react-redux";

function AllUsers() {
  const { userInfo } = useSelector((state) => state.user);

  const [users, SetUsers] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(api + "/api/admin/allusers");
        // console.log(res.data);
        SetUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  function EachUser({ user }) {
    return (
      <div className="eachUser">
        <div className="profilePic">
          <Link to={"/profile/" + user._id} style={{ textDecoration: "none" }}>
            <img
              src={
                user.profilePic ? user.profilePic : PF + "/avatars/noAvatar.png"
              }
              alt=""
            />
          </Link>
        </div>
        <div className="personName">
          <h3>{user.username}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="friendsSection">
      <h1 className="allfriendsHeading">Find friends</h1>
      {users.map((user) => {
        // console.log(user);
        if (userInfo._id === user._id) {
        } else {
          return <EachUser user={user} key={user._id} />;
        }
      })}
    </div>
  );
}

export default AllUsers;
