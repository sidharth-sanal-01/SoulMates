import React, { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./profileFeed.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { api } from "../setupProxy";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useMediaQuery } from "react-responsive";
import { logOut,updateProfilePic,updateCoverPic } from "../../redux/userslice";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function ProfileFeed(props) {
  // console.log(props.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user, dispatch } = useContext(AuthContext);
  const {userInfo}=useSelector(state=>state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profilefile, setprofilefile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [submitCover, setSubmitCover] = useState(false);

  // const [ifprofile, setifprofile] = useState(false)
  const open = Boolean(anchorEl);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isBigScreenOnMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const dispatchRedux=useDispatch();

  const uploadFiles = async (file) => {
    //
    if (!file) return;
    const presentTime = new Date().getTime();
    const fileName = String(presentTime) + file.name;
    console.log(fileName);
    const storageRef = ref(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // console.log(user);
  const submitProfilePicture = async (e) => {
    console.log(e.target.innerText);
    const profile = {
      userId: userInfo._id,
      // profilePic: fileName,
    };
    if (profilefile) {
      const imageURL = await uploadFiles(profilefile);
      profile.profilePic = imageURL;

      try {
        await axios.put(api + "/api/user/" + userInfo._id, profile);
        dispatchRedux(updateProfilePic(profile));
        // dispatch({ type: "UPDATE_PROFILE_PIC", payload: profile });
      } catch (err) {
        console.log(err);
      }
    }
    // window.location.reload();
    setSubmit(!submit);
  };

  const submitCoverPicture = async (e) => {
    // console.log(e.target.innerText)
    if (coverFile) {
      const cover = {
        userId: userInfo._id,
      };
      const imageURL = await uploadFiles(coverFile);
      cover.coverPic = imageURL;
      try {
        await axios.put(api + "/api/user/" + userInfo._id, cover);
        // dispatch({ type: "UPDATE_COVER_PIC", payload: cover });
        dispatchRedux(updateCoverPic(cover));
      } catch (err) {
        console.log(err);
      }
    }
    setSubmitCover(!submitCover);
  };
  const handleProfilePic = async (event) => {
    setSubmit(!submit);
    // console.log("clicked");
    setAnchorEl(null);
  };

  const handleCoverPic = async (event) => {
    setSubmitCover(!submitCover);
    // console.log("clicked");
    setAnchorEl(null);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // dispatch({ type: "LOGOUT" });
    dispatchRedux(logOut());
    window.location.reload();
    // <Redirect to="/login"/>
    setAnchorEl(null);
  };

  return (
    <div className="feedWrapper">
      <div className="coverImageSection">
        {userInfo._id === props.user._id ? (
          coverFile ? (
            <img
              src={URL.createObjectURL(coverFile)}
              alt=""
              className="coverImage"
            />
          ) : (
            <img
              src={userInfo.coverPic ? userInfo.coverPic : PF + "/cover/noCover.png"}
              alt=""
              className="coverImage"
            />
          )
        ) : (
          <img
            src={
              props.user.coverPic ? props.user.coverPic : PF + "/cover/noCover.png"
            }
            alt=""
            className="coverImage"
          />
        )}
        {props.user._id === userInfo._id && (
          <div className="more">
            <Button
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon className="coverImageMoreIcon" />
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <label htmlFor="profilefile">
                <MenuItem onClick={handleProfilePic}>
                  Change Profile Pic
                </MenuItem>
              </label>
              <input
                type="file"
                id="profilefile"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setprofilefile(e.target.files[0])}
              />
              <label htmlFor="coverFile">
                <MenuItem onClick={handleCoverPic}>Change Cover Pic</MenuItem>
              </label>

              <input
                type="file"
                id="coverFile"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setCoverFile(e.target.files[0])}
              />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        {submit && (
          <div>
            <button className="submitButton" onClick={submitProfilePicture}>
              Save
            </button>
          </div>
        )}

        {submitCover && (
          <div>
            <button className="submitButton" onClick={submitCoverPicture}>
              Save
            </button>
          </div>
        )}

        <div className="testing">
          <div className="imageProfile">
            {userInfo._id === props.user._id ? (
              profilefile ? (
                <img
                  src={URL.createObjectURL(profilefile)}
                  alt=""
                  // className="coverImage"
                />
              ) : (
                <img
                  src={
                    userInfo.profilePic
                      ? userInfo.profilePic
                      : PF + "/avatars/noAvatar.png"
                  }
                  alt=""
                  className=""
                />
              )
            ) : (
              <img
                src={
                  props.user.profilePic
                    ? props.user.profilePic
                    : PF + "/avatars/noAvatar.png"
                }
                alt=""
                className=""
              />
            )}
          </div>
          <div className="NameProfile">
            <h2>{props.user.username}</h2>
            <h3>{props.user.profileDescription}</h3>
          </div>
        </div>

        <div className="testingMobileView">
          <div >
            {userInfo._id === props.user._id ? (
              profilefile ? (
                <img
                  src={URL.createObjectURL(profilefile)}
                  alt=""
                  className="coverImageMobie"

                />
              ) : (
                <img
                  src={
                    userInfo.profilePic
                      ? userInfo.profilePic
                      : PF + "/avatars/noAvatar.png"
                  }
                  alt=""
                  className="coverImageMobie"

                />
              )
            ) : (
              <img
                src={
                  props.user.profilePic
                    ? props.user.profilePic
                    : PF + "/avatars/noAvatar.png"
                }
                alt=""
                className=""
              />
            )}
          </div>
          <div className="NameProfileMobileView">
            <h2>{props.user.username}</h2>
            <h3>{props.user.profileDescription}</h3>
          </div>
        </div>
      </div>
      <div className="feedBottom">
        <Feed user={props.user} profile />
       {isDesktopOrLaptop && <ProfileSidebar user={props.user} />}
      </div>
    </div>
  );
}

export default ProfileFeed;
