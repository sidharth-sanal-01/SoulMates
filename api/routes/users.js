const router = require("express").Router();
const User = require("../models/User");
const saltRounds = 10;


//edit user
router.put("/:id", async function (req, res) {
  if (req.params.id == req.body.userId) {
    if (req.body.password) {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        await bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
          req.body.password = hash;
        });
      });
    }
    await User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json("Sucessfully Updated");
      }
    });
  } else {
    res.status(400).json("User not found");
  }
});


//delete user
router.delete("/:id", async function (req, res) {
  if (req.params.id == req.body.userId) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Sucessfully deleted the user");
  } else {
    res.status(400).json("User not found");
  }
});


//get user
router.get("/:id", async function (req, res) {
  try {
    await User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json(user);
      }
    });
  } catch (err) {
      console.log(err);
  }
});


//get all friends
router.get("/:id/allfriends",async (req,res)=>{
  try{
    const currentUser=await User.findById(req.params.id);
    const friends=await Promise.all(currentUser.following.map((friendId)=>{
           return User.findById(friendId);
    }))
    const friendsList=[]

    await Promise.all(friends.map(friend =>{
      friendsList.push({_id:friend._id,
        profilePic:friend.profilePic,
        username:friend.username
      })
    }))
    res.status(200).json(friendsList)

  }catch(err){
    res.status(400).json(err);
  }
})


//follow user
router.put("/follow/:id", async function (req, res) {
  try {
    const currentUser = await User.findById(req.params.id);
    const userToFollow = await User.findById(req.body.userId);
    if (currentUser.following.includes(req.body.userId)) {
      res.status(200).json("You already follow this user");
    } else {

        await userToFollow.updateOne({$push:{followers:req.params.id}})
        await currentUser.updateOne({$push:{following:req.body.userId}})
        res.status(200).json("Followed Sucessfully");
    }
  } catch (err) {
    console.log(err);
  }
});

//unfollow user
router.put("/unfollow/:id",async function(req,res){
    try {
        const currentUser = await User.findById(req.params.id);
        const userToUnFollow = await User.findById(req.body.userId);
        if (!currentUser.following.includes(req.body.userId)) {
          res.status(200).json("You don't follow this user");
        } else {
    
            await userToUnFollow.updateOne({$pull:{followers:req.params.id}})
            await currentUser.updateOne({$pull:{following:req.body.userId}})
            res.status(200).json("unFollowed Sucessfully");
        }
      } catch (err) {
        console.log(err);
      }
    });


module.exports = router;
