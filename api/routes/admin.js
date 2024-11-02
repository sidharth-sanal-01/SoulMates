const router = require("express").Router();
const User = require("../models/User.js");


router.get("/allusers",async (req,res)=>{
    try{
        const Users= await User.find({});
        // res.status(200).json(allUsers);
        allUsers=[]
        Promise.all(Users.map(eachUser =>{
            allUsers.push({
                _id:eachUser._id,
                profilePic:eachUser.profilePic,
                username:eachUser.username})
        }));
        res.status(200).json(allUsers);
    }catch(err){
        res.status(400).json("You not Admin")
    }
   
})


module.exports = router;
