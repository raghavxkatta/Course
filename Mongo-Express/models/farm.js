const mongoose=require('mongoose')
const Product= require('./product')
const { Schema }=  mongoose /* destructuring so that don't have to include mongoose.schema everywhere */


const farmSchema=new Schema({
    name:{
        type:String,
        required:[true,'Farm must have a name']
    },
    city:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,'Email required']
    },
    /* This is a one-one relationship as both of them are not in an array */
    products:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }
})

// Document Middlewares

/* This is a pre-middleware function and runs before a document is deleted */
farmSchema.pre('deleteOne',async function(data){
    console.log("PRE MIDDLEWARE")
    console.log(data)
})
/* This is a post-middleware function and runs before a document is deleted */
farmSchema.post('findOneAndDelete',async function(data){
    console.log("POST MIDDLEWARE")
    console.log(data)
})

const Farm=mongoose.model('Farm',farmSchema)


module.exports= Farm