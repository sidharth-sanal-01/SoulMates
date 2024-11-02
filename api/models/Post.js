const mongoose=require("mongoose");

const PostSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    description:{
        type:String,
        max:100
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,  
        default:[]
    }
},
{timestamps:true})

module.exports=mongoose.model("Post",PostSchema);