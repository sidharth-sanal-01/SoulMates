import React, { useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidepanel from "../sidepannelMobile/sidepanel";
import {Menu,Close} from "@material-ui/icons";

import { logOut } from "../../redux/userslice";

function Topbar(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user } = useContext(AuthContext);
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userProfilePic)

  const openMenu = () => {
    document.getElementById("menuContent").style.display = "block";
  };
  const closeMenu = () => {
    document.getElementById("menuContent").style.display = "none";
  };
  const dispatch = useDispatch();
  return (
    <>
      <div id="menuContent">
        <div className="menuItems">
          <div className="closeIconWrapper">
            <Close className="closeIcon" onClick={closeMenu} />
          </div>
          <div className="LeftBarProfilePic">
            <img src={userInfo.profilePic? userInfo.profilePic:PF+"/avatars/noAvatar.png"} alt="" />
          </div>
          <Link style={{ textDecoration: "none" }} to="/" onClick={closeMenu}>
            <h3>Home</h3>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={"/profile/" + userInfo._id}
          >
            <h3>Profile</h3>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/">
            <h3>Friends</h3>
          </Link>

          <h3
            onClick={() => {
              dispatch(logOut());
              window.location.reload();
            }}
          >
            LogOut
          </h3>
        </div>
      </div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <div className="menuIconWrapper">
            <Menu className="menuIcon" onClick={openMenu} />
          </div>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1 className="logoHeading">Fresh book</h1>
          </Link>
        </div>

        <div className="topbarMiddle">
          <div className="searchBar">
            <SearchIcon className="searchIcon" />
            <input type="text" placeholder="Search for users" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="timeLine">
            <h2>Timeline</h2>
          </div>
          <div className="iconsSection">
            <div className="icon">
              <PersonIcon className="eachIcon" />
              <div className="iconNo">
                <p>3</p>
              </div>
            </div>
            <div className="icon">
              <MessageIcon className="eachIcon" />
              <div className="iconNo">
                <p>3</p>
              </div>
            </div>
            <div className="icon">
              <NotificationsIcon className="eachIcon" />
              <div className="iconNo">
                <p>3</p>
              </div>
            </div>
          </div>
          <div>
            <Link to={"/profile/" + userInfo._id}>
              <img
                src={
                  userInfo.profilePic
                    ? userInfo.profilePic
                    : PF + "/avatars/noAvatar.png"
                }
                className="profileImage"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
