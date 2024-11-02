import { React, useContext, useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import "./post.css";
import { format } from "timeago.js";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../setupProxy";
import { useSelector } from "react-redux";

const axios = require("axios");

function Post(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userInfo } = useSelector((state) => state.user);

  // const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isLiked, setisLiked] = useState(false);
  const [userData, setuserData] = useState({});
  const [likeNo, setlikeNo] = useState(props.post.likes.length);

  const handleShare = (async) => {
    // const postId
  };

  const handleDelete = async () => {
    // console.log(props.post._id)
    const postToDelete = {
      postId: props.post._id,
    };
    console.log(postToDelete);
    await axios.delete(api + "/api/post/" + props.post._id, postToDelete);
    await window.location.reload();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function getUser() {
    try {
      const response = await axios.get(api + "/api/user/" + props.post.userId);
      await setuserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [props.post.userId]);

  useEffect(() => {
    setisLiked(props.post.likes.includes(userInfo._id));
  }, [userInfo._id, props.post.likes.length]);

  // console.log(props.post)

  const handleLike = () => {
    try {
      axios.put(api + "/api/post/" + props.post._id + "/like", {
        userId: userInfo._id,
      });
    } catch (err) {
      console.log(err);
    }
    setlikeNo(isLiked ? likeNo - 1 : likeNo + 1);
    setisLiked(!isLiked);
  };

  return (
    <>
      <div className="PostWrap">
        <div className="postTop">
          <div className="postTopLeft">
            <div className="postProfileimage">
              <Link to={"/profile/" + userData._id}>
                <img
                  src={
                    userInfo._id === userData._id
                      ? userInfo.profilePic
                        ? userInfo.profilePic
                        : PF + "/avatars/noAvatar.png"
                      : userData.profilePic
                      ? userData.profilePic
                      : PF + "/avatars/noAvatar.png"
                  }
                />
                
              </Link>
            </div>

            <div className="postprofileName">
              <h3>{userData.username}</h3>
              <h4>{format(props.post.createdAt)}</h4>
            </div>
          </div>
          <div>
            <Button
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon className="moreIcon" />
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={handleClose}>Save</MenuItem>
              {props.post.userId === userInfo._id ? (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              ) : (
                <MenuItem onClick={handleShare}>Follow</MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <div className="postDescription">
          <h3>{props.post.description}</h3>
        </div>
        <div className="postImage">
          <img src={props.post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomIconSection">
            <div className="postBottomIcon" onClick={handleLike}>
              <FavoriteIcon className="BottomIcon loveIcon" />
            </div>
            <div className="postBottomIcon">
              <ChatBubbleIcon className="BottomIcon comments" />
            </div>
            <div className=" likesNo">{likeNo + " Likes"}</div>
          </div>
          <div className="totalcomments">
            <h4>{props.post.comments}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
