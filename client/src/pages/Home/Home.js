import { React, useEffect, useState, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import Feed from "../../components/feed/Feed";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import "./Home.css";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../components/setupProxy";
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useMediaQuery } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
const axios = require("axios");

function Home() {
  // const { user } = useContext(AuthContext);
  const { userInfo, error, pending } = useSelector((state) => state.user);
  console.log(userInfo);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isBigScreenOnMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  return (
    <>
     
      <Topbar user={userInfo} />
      <div className="homeContainer">
        <LeftSidebar />

        <Feed user={userInfo} home />

        <RightSidebar />
      </div>

      {/* {isPortrait && isBigScreenOnMobile && (
        <>
          <Topbar user={userData} />
          <div className="homeContainer">
            <LeftSidebar />

            <Feed user={userData} home />

            <RightSidebar />
          </div>
        </>
      )} */}
    </>
  );
}

export default Home;
