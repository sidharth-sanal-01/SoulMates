import React from "react";
import "./leftSidebar.css";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import ChatIcon from "@material-ui/icons/Chat";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import HelpIcon from "@material-ui/icons/Help";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

function LeftSidebar() {
  return (
    <div className="leftSidebarWrap">
      <div className="topSection">
        <div className="eachLine">
          <div className="eachIcon">
            <RssFeedIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Feed</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <ChatIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Chat</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <PlayCircleFilledIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Video</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <BookmarksIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Posts</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <HelpIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Questions</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <ImportContactsIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Courses</h3>
          </div>
        </div>
        <div className="eachLine">
          <div className="eachIcon">
            <WorkOutlineIcon className="icon" />
          </div>
          <div className="iconText">
            <h3>Jobs</h3>
          </div>
        </div>
        <button className="showMore">Show more</button>
        <hr className="lineBreak" />
      </div>

      <div className="bottomSection">
        <div className="eachUser">
          <div className="profilePic">
            <img
              src="https://d27yqp28rsqhzg.cloudfront.net/dp/cb5b237d-3ad0-4426-a888-a78cac77718a.jpg"
              alt=""
            />
          </div>
          <div className="personName"><h3>Olaf
              </h3></div>
        </div>
        <div className="eachUser">
          <div className="profilePic">
            <img
              src="https://art.ngfiles.com/images/287000/287760_gregoryjramos_new-52-batman.jpg?f1391956685"
              alt=""
            />
          </div>
          <div className="personName"><h3>SpiderMan
              </h3></div>
        </div>
        <div className="eachUser">
          <div className="profilePic">
            <img
              src="https://avatarfiles.alphacoders.com/149/149117.jpg"
              alt=""
            />
          </div>
          <div className="personName"><h3>Batman
              </h3></div>
        </div>
        <div className="eachUser">
          <div className="profilePic">
            <img
              src="https://avatarfiles.alphacoders.com/193/193241.jpg"
              alt=""
            />
          </div>
          <div className="personName"><h3>Joker
              </h3></div>
        </div>
        <div className="eachUser">
          <div className="profilePic">
            <img
              src="https://vignette.wikia.nocookie.net/disney/images/9/95/Profile_-_Elsa.jpeg/revision/latest?cb=20190312015718"
              alt=""
            />
          </div>
          <div className="personName"><h3>Elsa
              </h3></div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
