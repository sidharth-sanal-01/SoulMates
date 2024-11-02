const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post.js");
const adminRoute= require("./routes/admin");
const path=require("path");
var cors = require('cors')

const app = express();
dotenv.config();


 
app.use(cors())
 
app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use("/images",express.static(path.join(__dirname,"public/images")));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to MongoDB database");
  }
);

const multer = require("multer");


app.use(express.json());
app.use(morgan("common"));
app.use(helmet());


//upload posts
const storagePosts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/posts");
  },
  filename: (req, file, cb) => {
    // const today=new Date()
    cb(null, req.body.name);
  },
});

const uploadPosts = multer({ storage: storagePosts });
app.post("/api/upload", uploadPosts.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});



//upload avatars
const storageAvatars = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatars");
  },
  filename: (req, file, cb) => {
    // const today=new Date()
    cb(null, req.body.name);
  },
});

const uploadAvatar = multer({ storage: storageAvatars });
app.post("/api/upload/avatar", uploadAvatar.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});




//upload coverpic

const storageCover = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/cover");
  },
  filename: (req, file, cb) => {
    // const today=new Date()
    cb(null, req.body.name);
  },
});

const uploadCover = multer({ storage: storageCover });
app.post("/api/upload/cover", uploadCover.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/admin", adminRoute);


app.get("/",(req,res)=>{
  res.status(200).json("backend is working.")
})

app.listen(process.env.PORT || 8800, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server has started at port 8800");
  }
});
