const mongoose=require('mongoose')
const Farm=mongoose.model('Farm',farmSchema)
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
    products:{
        type:Schema.Types.ObjectId,
        ref:'product'
            }
})

module.exports= Farm