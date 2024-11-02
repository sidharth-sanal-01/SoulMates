const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:10,
        max:30
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:20
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    profilePic:{
        type:String,
        default:""
    },
    profileDescription:{
        type:String,
        default:""      
    },
    coverPic:{
        type:String,
        default:""
    },
    age:{
        type:String,
        default:""
    },
    job:{
        type:String,
        default:""
    },
    homeTown:{
        type:String,
        default:""
    },
    RelationshipStatus:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }


},
{ timestamps: true })


module.exports=mongoose.model("User",UserSchema);