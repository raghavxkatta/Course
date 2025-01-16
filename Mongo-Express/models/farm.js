const mongoose=require('mongoose')
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

const Farm=mongoose.model('Farm',farmSchema)
module.exports= Farm