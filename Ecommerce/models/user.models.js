const mongoose = require('mongoose')
const userSchema= new mongoose.schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    

}

},{timestamps:true})

module.exports=mongoose.model("User",userSchema)