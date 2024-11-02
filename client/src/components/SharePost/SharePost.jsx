import React, { useContext, useRef, useState } from "react";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import ImageIcon from "@material-ui/icons/Image";
import LinkIcon from "@material-ui/icons/Link";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import "./sharePost.css";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../setupProxy";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useSelector } from "react-redux";

function SharePost(props) {
  // const { user } = useContext(AuthContext);
  const {userInfo}=useSelector(state=>state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [url, setUrl] = useState();
  const [file, setFile] = useState(null);
  const uploadFiles = async (file) => {
    //
    if (!file) return;
    const presentTime=new Date().getTime();
    const fileName=String(presentTime)+file.name;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: userInfo._id,
      description: desc.current.value,
      // image:url
    };

    if (file) {
      const imageURL = await uploadFiles(file);
      newPost.image = imageURL;
      try {
        await axios.post(api + "/api/post/create", newPost);
        window.location.reload();
        // console.log(url);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form className="sharePost" onSubmit={handleSubmit}>
      <div className="shareTop">
        <div className="profilePic">
          <Link to={"/profile/" + userInfo._id}>
            <img
              // src="https://d27yqp28rsqhzg.cloudfront.net/dp/cb5b237d-3ad0-4426-a888-a78cac77718a.jpg"
              src={
                userInfo.profilePic
                  ? userInfo.profilePic
                  : PF + "/avatars/noAvatar.png"
              }
              alt=""
            />
          </Link>
        </div>
        <textarea
         
          id=""
          placeholder={"Type something " + userInfo.username + "...."}
          ref={desc}
        ></textarea>
      </div>
      <div className="sharedImage">
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </div>

      <hr className="sharepostLineBreak" />
      <div className="shareBottom">
        <div className="eachIconSection">
          <label htmlFor="file" className="ShareIcons">
            <ImageIcon className="sharePostIcon image" />
          </label>
          <div className="textBelowIcon">
            <h3>Image</h3>
          </div>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="eachIconSection">
          <div className="ShareIcons">
            <VideoLibraryIcon className="sharePostIcon video" />
          </div>
          <div className="textBelowIcon">
            <h3>videos</h3>
          </div>
        </div>
        <div className="eachIconSection">
          <div className="ShareIcons">
            <LinkIcon className="sharePostIcon link" />
          </div>
          <div className="textBelowIcon">
            <h3>Link</h3>
          </div>
        </div>
        <div className="eachIconSection">
          <div className="ShareIcons">
            <LiveTvIcon className="sharePostIcon live" />
          </div>
          <div className="textBelowIcon">
            <h3>Go live</h3>
          </div>
        </div>
        <div className="eachIconSection">
          <div className="ShareIcons">
            <LocationOnIcon className="sharePostIcon location" />
          </div>
          <div className="textBelowIcon">
            <h3>Location</h3>
          </div>
        </div>
        <div className="shareButton">
          <button type="submit">Share</button>
        </div>
      </div>
    </form>
  );
}

export default SharePost;
