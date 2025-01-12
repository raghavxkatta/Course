const mongoose=require('mongoose')

/* orderItem ka schema */
const orderItemSchema=new mongoose.Schema({
item:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
},
quantity:{
    type:Number,
    required:true
}
})


const orderSchema= new mongoose.Schema({
ordrePrice:{
    type:Number,
    required:true
},
customer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
/* Now since we need to know both quantity and what order we ordered so yaha humne array ke andar ek miniSchema daaldiya jismei dono hai */
orderItems:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'orderItemSchema'
},
address:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["PENDING","CANCELLED","DELIVERED"],
    default:"PENDING"
}
},{timestamps:true})




module.exports= mongoose.model("Order",orderSchema)