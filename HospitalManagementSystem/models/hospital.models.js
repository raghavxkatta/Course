const mongoose=require('mongoose')
const hospitalSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:true
    },
    addressline2:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    
})

module.exports= mongoose.model('Hospital',hospitalSchema)