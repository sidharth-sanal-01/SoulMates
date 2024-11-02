import { React, useContext, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import "./profile.css";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../components/setupProxy";
import { useMediaQuery } from "react-responsive";
const axios = require("axios");

function Profile() {
  const [userData, setuserData] = useState({});
  const { id } = useParams();

  // const loggedInUser=useContext(AuthContext);
  // console.log(id);
  async function getUser() {
    try {
      const response = await axios.get(api + "/api/user/" + id);
      response && setuserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isBigScreenOnMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  return (
    <>
     
          <Topbar user={userData} profile />
          <div className="loginPageMain">
            <LeftSidebar />
            <ProfileFeed user={userData} id={id} />
            {/* <Feed/>
            <RightSidebar/> */}
          </div>
    

    </>
  );
}

export default Profile;
