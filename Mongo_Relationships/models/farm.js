const mongoose = require("mongoose");
const {Schema}= mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/mongo_relationship")
    .then(() => {
        console.log("connection open");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });

    const productSchema=new Schema({
        name:String,
        price:Number,
        season:{
            type:String,
            enum:['Spring','Summer','Fall','Winter']
        }
    });


    /* this is how a populate format is  */
    const farmSchema= new Schema({
        name:String,
        city:String,
        /* the type needs to be mongoose object id and in mongoose to type out object id we need to write full mongoose.schema.types.objectID */
        products:[{type: Schema.Types.ObjectId, ref:'Product' }]
    })

    const Product= mongoose.model('Product', productSchema)
    const Farm= mongoose.model('Product', farmSchema)

    Product.insertMany([
        {name:'Goddess Melon',price:4.99,season:'Summer'},
        {name:'Sugar Baby Watermelon',price:4.99,season:'Summer'},
        {name:'Asparagus',price:3.99,season:'Spring'}
    ])

const makeFarm= async()=>{  
const farm= new Farm({name:'Full Belly Farms',city:'Guinda, CA'})
const melon= await product.findOne({name:'Goddess Melon'})
farm.products.push(melon)
console.log(farm)
}
makeFarm()

const addProduct= async()=>{
    const farm= await Farm.findOne({name:'Full Belly Farms'})
    const watermelon= await Product.findOne({name:'Sugar Baby Watermelon'})
    farm.products.push(watermelon)
    await farm.save()
    console.log(farm)
}

addProduct()