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

// So now what we're trying to do is that we want to delete the farm but we also want to delete all the products associated with the farm and we'll console.log all the deleted products after they're deleted 

/* This is a post-middleware function and runs after a document is deleted */
farmSchema.post('findOneAndDelete',async function(farm){/* the farm parameter allows us to access fields like farm.products */
    /* checks if farm.products is an empty array or not, so ensuring that array has atleast one element */
    if(farm.products.length){
        const res=await Product.deleteMany({_id: {$in: farm.products}})
        console.log(res)
    }
})


const Farm=mongoose.model('Farm',farmSchema)


module.exports= Farm