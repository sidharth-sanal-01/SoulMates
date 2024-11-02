import React, { useState, useEffect, useContext, useRef } from "react";
import "./profileSidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {api} from "../setupProxy";
import SaveIcon from "@material-ui/icons/Save";
import {follow,unfollow} from "../../redux/userslice"
import { useDispatch, useSelector } from "react-redux";


function ProfileSidebar(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friendsList, setUserFriendsList] = useState([]);
  // const { user: currentUser, dispatch } = useContext(AuthContext);
  const [following, setFollowing] = useState(false);
  const [followers, setfollowers] = useState([]);
  const [edit, setedit] = useState(true);
  const [currentUserProfile, setcurrentUserProfile] = useState(true);
  const [submit, setSubmit] = useState(false);
  const dispatchRedux=useDispatch();
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [homeTown, setHometown] = useState("");
  const [rstatus, setRstatus] = useState("");
  const {userInfo}=useSelector(state=>state.user)

  useEffect(() => {
    const getUserFriends = async () => {
      try {
        const list = await axios.get(
         api+ "/api/user/" + props.user?._id + "/allfriends"
        );
        setUserFriendsList(list.data);
        setFollowing(userInfo.following.includes(props.user._id));
        setcurrentUserProfile(props.user._id === userInfo._id);
        // setfollowers(props.user.followers)
      } catch (err) {
        // console.log(err);
      }
    };
    getUserFriends();
  }, [props.user._id]);

  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handlejob = (e) => {
    setJob(e.target.value);
  };
  const handlerstatus = (e) => {
    setRstatus(e.target.value);
  };
  const handlehometown = (e) => {
    setHometown(e.target.value);
  };

  const handleFollowing = async (e) => {
    // try {
    //   await axios.put(
    //     "/api/user/" + e.target.innerText + "/" + currentUser._id,
    //     { userId: props.user._id }
    //   );
    //   setFollowing(!following);
    //   window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const fUser = { userId: props.user._id };
      if (following) {
        await axios.put(api+"/api/user/unfollow/" + userInfo._id, {
          userId: props.user._id,
        });
        dispatchRedux(follow(fUser));
      } else {
        await axios.put(api+"/api/user/follow/" + userInfo._id, {
          userId: props.user._id,
        });
        dispatchRedux(unfollow(fUser));

      }

      setFollowing(!following);
    } catch (err) {
      console.log(err);
    }
  };

  const editDetails = async (e) => {
    setedit(!edit);
    setSubmit(!submit);
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const editedDetails = {
      userId: userInfo._id,
      age: age,
      job: job,
      RelationshipStatus: rstatus,
      homeTown: homeTown,
    };
    try {
      axios.put(api+"/api/user/" + userInfo._id, editedDetails);
      // dispatch({ type: "EDIT_USER", payload: editedDetails });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setedit(!edit);
    setSubmit(!submit);
  };

  return (
    <div className="profileSidebarWrapper">
      <form className="userDetails" onSubmit={submitDetails}>
        <div className="followUser">
          <h2>User Details</h2>

          {props.user._id === userInfo._id ? (
            <div>
              {edit && (
                <IconButton onClick={editDetails}>
                  <EditIcon fontSize="large" />
                </IconButton>
              )}
              {submit && (
                <IconButton type="submit">
                  <SaveIcon fontSize="large" />
                </IconButton>
              )}
            </div>
          ) : (
            <button onClick={handleFollowing} className="followButton">
              {following ? "Unfollow" : "follow"}
            </button>
          )}
        </div>

        <div className="eachUserDetail">
          <span className="query">Age :-</span>
          {submit ? (
            <input
              className="inputDetails"
              type="text"
              value={age}
              onChange={handleAge}
            />
          ) : (
            <span className="userAnswer">
              {userInfo._id === props.user._id
                ? userInfo.age
                : props.user.age}
            </span>
          )}
        </div>
        <div className="eachUserDetail">
          <span className="query">Home Town :-</span>
          {submit ? (
            <input
              className="inputDetails"
              value={homeTown}
              type="text"
              onChange={handlehometown}
            />
          ) : (
            <span className="userAnswer">{userInfo._id === props.user._id
              ? userInfo.homeTown
              : props.user.homeTown}</span>
          )}
        </div>
        <div className="eachUserDetail">
          <span className="query">Job :- </span>
          {submit ? (
            <input
              className="inputDetails"
              value={job}
              type="text"
              onChange={handlejob}
            />
          ) : (
            <span className="userAnswer">{userInfo._id === props.user._id
              ? userInfo.job
              : props.user.job}</span>
          )}
        </div>
        <div className="eachUserDetail">
          <span className="query">Relationship Status :- </span>
          {submit ? (
            <input
              className="inputDetails"
              value={rstatus}
              type="text"
              onChange={handlerstatus}
            />
          ) : (
            <span className="userAnswer">{userInfo._id === props.user._id
              ? userInfo.RelationshipStatus
              : props.user.RelationshipStatus}</span>
          )}
        </div>
      </form>

      <div className="friendsListWrapper">
        <h2 className="friendsListHeading">Friends</h2>
        <div className="friendsList">
          {friendsList.map((friend) => {
            return (
              <div className="eachFriend">
                <Link
                  to={"/profile/" + friend._id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={
                      friend.profilePic
                        ?  friend.profilePic
                        : PF + "/avatars/noAvatar.png"
                    }
                    alt=""
                  />
                  <h3>{friend.username}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
