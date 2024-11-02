const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const argon2 = require('argon2');

const saltRounds = 10;




async function hashPassword(password) {
  return await argon2.hash(password);
}

async function verifyPassword(hash, password) {
  return await argon2.verify(hash, password);
}

router.post("/register", async function (req, res) {
  try {
    hashed_password = await argon2.hash(req.body.password)
    const newUser = new User({
        username: req.body.username,
        password: hashed_password,
        email: req.body.email,
      });
      const user = await newUser.save();

      res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});


router.post("/login",async function(req,res){
    try{
        const user= await User.findOne({username:req.body.username})
        !user && res.status(400).json("User not found");
        console.log(req.body)

        const validPassword = await argon2.verify(user.password, req.body.password)
        !validPassword && res.status(400).json("password incorrect");
        
        res.status(200).json(user)

    }
    catch(err){
        console.log(err) 
        res.status(402).json("IT was this")
    }

})

module.exports=router;
