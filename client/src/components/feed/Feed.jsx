import { React, useContext, useEffect, useState } from "react";
import "./feed.css";
import Post from "../post/Post";
import SharePost from "../SharePost/SharePost";
import { AuthContext } from "../../context/AuthContext";
// import { User, Posts } from "../../dummydata";
import {api} from "../setupProxy";
import { useSelector } from "react-redux";

const axios = require("axios");

function Feed(props) {
  // const ourPost = Posts.filter((post) => post.userId == 1 || post.userId==2));
  // const ourUser = User.filter((user) => user.id == 1)[0];
  const [timeLinePosts, settimeLinePosts] = useState([]);
  const [userData, setuserData] = useState({});
  const userID = props.user?._id;
  
  const { userInfo } = useSelector((state) => state.user);
  
  // console.log(props.user);

  const [profile, setprofile] = useState(false)
  async function getTimeLinePosts() {
    try {
      if (props.profile) {
        const response = userID
          ? await axios.get(api+"/api/post/" + props.user._id + "/profile")
          : await axios.get(api+"/api/post/" + userInfo._id + "/profile");

        response.data&&settimeLinePosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } else {
        const response = 
           await axios.get(api+"/api/post/" + userInfo._id + "/timeline")

        settimeLinePosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setprofile(userID === userInfo._id)
    getTimeLinePosts();
  }, [props.user?._id, userInfo?._id]);


  
    
  
  // console.log(timeLinePosts)
  return (
    <div className="mainFeed">
       
      {(profile|| props.home) ? <SharePost user={userInfo}/> :null }
      {timeLinePosts.map((eachPost) => {
        // console.log(eachPost);
        // const user=User.filter((user) =>user.id == eachPost.userId)
        return <Post post={eachPost} key={eachPost._id} user={props.user}/>;
      })}
    </div>
  );
}

export default Feed;
