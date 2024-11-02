const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/create", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(404).json(err);
  }
});

//edit post
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.postId) {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json("Sucessfully updated the post");
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.status(400).json("You can only update your post");
  }
});

//delete post
router.delete("/:id", async (req, res) => {
 
    try {
      await Post.findByIdAndRemove(req.params.id);
      res.status(200).json("Sucessfully deleted the post");
    } catch (err) {
      res.status(400).json(err);
    }
  } 
);

//like a post || unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("like removed");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You liked the Post");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all profile posts

router.get("/:id/profile", async (req, res) => {
  // const userPosts=[];
    try {
      const user = await User.findById(req.params.id);
      const userPosts = await Post.find({ userId: user.id });
      res.status(200).json(userPosts);
    } catch (err) {
      res.status(400).json(err);
    }
});

// get all time line posts

router.get("/:id/timeline", async (req, res) => {
  // const otherPosts = [];
  try {
    const user = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: user.id });
    const friendsPosts = await Promise.all(
      user.following.map((id) => {
        return Post.find({ userId: id });
        // console.log(posts);
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
