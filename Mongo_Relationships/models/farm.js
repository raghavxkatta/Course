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
            enum:['spring','summer','fall','winter'],
        },
    });


    /* this is how a populate format is  */
    const farmSchema= new Schema({
        name:String,
        city:String,
        /* the type needs to be mongoose object id and in mongoose to type out object id we need to write full mongoose.schema.types.objectID */
        products:[{type: Schema.Types.ObjectId, ref:'Product' }]/* ref:product basically estabilishes a relationship with the product model, so we can populate this field with details of the referenced product later */
    })

    const Product= mongoose.model('Product', productSchema)
    const Farm= mongoose.model('Farm', farmSchema)

    /* adding multiple products at once */
    Product.insertMany([
        {name:'Goddess Melon',price:4.99,season:'Summer'},
        {name:'Sugar Baby Watermelon',price:4.99,season:'Summer'},
        {name:'Asparagus',price:3.99,season:'Spring'}
    ]).then(()=>console.log("Products inserted"))       

    /* creating a farm document */
const makeFarm= async()=>{  
const farm= new Farm({name:'Full Belly Farms',city:'Guinda, CA'})
const melon= await Product.findOne({name:'Goddess Melon'})
farm.products.push(melon)/* adds the product id of Goddess Melon to the products array */
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


farm.findOne({name:'Full Belly Farms'}).then(farm=>{console.log(farm)})
// before adding popular we were just getting object ids, now we're getting all the information about the products available in the products array of farms
.populate('products')
.then(farm=>console.log(farm))                                                                                                          