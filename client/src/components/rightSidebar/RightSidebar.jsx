import React from "react";
import "./rightSidebar.css";
import Events from "../Events/Events";
import News from "../NewsEvent/News";
import AllUsers from "../allUsers/AllUsers";

function RightSidebar() {
  return (
    <div className="rightSidebarWrap">
      <div className="rightTop">
        <div>
          <span className="birthdayCake">🎂</span>
        </div>
        <div className="birthdayDetails">
          <span className="birthdayPerson">Malu </span>
          <span className="nonBirthdayText"> and </span>
          <span className="birthdayPerson">3 </span>
          <span className="nonBirthdayText">
            others have birthdays today. Go wish them !
          </span>
        </div>
      </div>
      <div className="adSection">
        <div className="adHeading">
          <h3>This is my ad.</h3>
        </div>
      </div>
      <Events/>
      <News />
      <AllUsers/>
    </div>
  );
}

export default RightSidebar;
