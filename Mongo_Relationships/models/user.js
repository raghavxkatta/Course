const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mongo_relationship')
.then(()=>{
console.log("connection open");
})
.catch((err)=>{
    console.log("Connection error",err);
})

const userSchema= new mongoose.Schema({
    first:String,
    last:String,
    addresses:[
        {
street: String,
city:String,
State:String,
country:String
        }
    ]
})

