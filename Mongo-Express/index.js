/* index.js=Main express application */
/* models-product.js= Mongoose schema and model */
/* seeds.js= database seeding script */
/* views-products-
index.ejs=Template for displaying all products
show.ejs=Template for displaying a single product */

/* Product- Mongoose model representing the products collection in MongoDB= represents the structure of the model and allows the user to interact with the database */
/* products-Variable holding an array of all product documents (e.g., used in the /products route). */
/* product-Variable representing a single product document (e.g., used in the /products/:id route). */


// Query Middlewares- where "This" refers to query
// Document Middlwares- where "This" refers to document


/* Flash messages are quickly gone once the webpage refreshes  */

const express = require('express');
const app = express();
const path = require('path')
const Product = require('./models/product')/*basically Product is productSchema AND WOULD HELP YOU TO DO CRUD DOCUMENTS FROM THE PRODUCT COLLECTION*/
const mongoose = require('mongoose');
const methodOverride = require('method-override');/* Need to require this so that we are able to update items with put or patch request even though we are using forms */
const Farm = require('./models/farm');
const req = require('express/lib/request');
const session=require('express-session')
const flash =require('connect-flash')


mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
console.log("Mongo connection open!!!");
})
.catch((err) => {
console.log("Mongo Connection error!!!", err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use((req,res,next)=>{
res.locals.messages=req.flash('success')
next()
})


/* Farm Routes */

/* Route to display all farms */
app.get('/farms',async(req,res)=>{
    const farms = await Farm.find({})
    /* because we were redirected here by the post route that's why the flash thingy */
    res.render('farms/index',{farms})
})

/* Route to add new Product  */
app.get('/farms/new',(req,res)=>{
    res.render('farms/new',{Farm})
})

/*Route for Form for new Product  */
app.post('/farms',async(req,res)=>{
    const newFarm = new Farm(req.body)
    await newFarm.save()
    console.log(newFarm)
    /* Flash mesasges always just before redirect messages */
    req.flash('success','Successfully made a new farm')
    res.redirect(`/farm/${newFarm._id}`)
})
/* Route to add a product and relate it to a farm */
app.get('/farms/:_id/products/new',async(req,res)=>{
    const {id}=req.params
    const farm =await Farm.findById(id)/* so that we can add the farm name while adding a new product */
    res.render('products/new',{categories,id,farm})
})
app.post('/farms/:id/products',async(req,res)=>{
    const {id}=req.params
    const farm =await Farm.findById(id)
    const {name,price,category}=req.body
    const product= new Product({name,price,category})
    farm.products.push(product)/* Product will be added to the product list of the farm */
    await farm.save()
    products.farm=farm/* products ke farm waali field mein iss farm ko store kar rhe, cuz yeh dono ki collection mein dikhna chahiye na */
    await product.save()
    res.redirect(`/farms/${farm._id}`)
})
/* Route to display a single Route */
app.get('/farms/:id',async(req,res)=>{
    const {id}=req.params
    const foundFarm= await Farm.findById(id)
    console.log(foundFarm)
    res.render('farms/show',{farm:foundFarm})
})

/* Route to update an existing product */
app.get('/farm/:id/edit',async(req,res)=>{/* we have to have this get route becase w/o this the user will not get prefilled info whhile editing */
const {id}=req.params
const foundFarm=await Product.findById(id)
})
app.put('/farm/:id/edit',async(req,res)=>{
    const updatedFarm = Product.findByIdAndUpdate(id,req.params,)
})



/* Route to delete  */

app.delete('/farms/:id',async(req,res)=>{
    console.log("Deleting...")
    const farm= await Farm.findByIdAndDelete(req.params.id)/* so since we've set middleware for findOneAndDelete it will run that even though here we're running findByIDandDelete */
    res.redirect('/farms')
})


//  Product Routes 
const categories = ['vegetable', 'fruit', 'dairy', 'baked goods']

app.get('/products/new', (req, res) => {/* since we don't have to do anything asynchronus here that's why we don't add async and await */
res.render('products/new', { categories })/* .get is when the express checks if that particular url has a .get route and then runs it's code. res.render is to create a webpage using a template */
})

// Route to create a new product
app.post('/products', async (req, res) => {/* well in this case we don't have access to req.body, I mean we do but it's just undefined, there's nothing there it needs to be parsed */
const newProduct = new Product(req.body)/* the data that we submit in the "new " route, when we click submit it is going to create a new product using that data */
await newProduct.save()
console.log(newProduct)
res.redirect(`/products/${newProduct._id}`)/* this will redirect to the page which will have the data of the new product we just entered */
})

// Route to display a single product
app.get('/products/:id', async (req, res) => {/* we could have taken name as part of the url but because some names can be same and that can be problematic, we don't take it*/
const { id } = req.params/* req.params is used when you want to extract something from the url basically {destructuring the ID from the request parameter} */
const foundProduct = await Product.findById(id).populate('farm','name')
console.log(foundProduct)
res.render('products/show', { product: foundProduct })/* you need to pass the array that you will use in the particular file */

})






// Route to update an existing product
app.get('/products/:id/edit', async (req, res) => {
const { id } = req.params
const product = await Product.findById(id)
res.render('products/edit', { product, categories })
})
app.put('/products/:id/edit', async (req, res) => {/* PUT AND PATCH REQUESTS ARE USED TO UPDATE EXISTING DATA */
const { id } = req.params/* THE PROBLEM IS THAT WE CAN'T ACTUALLY MAKE A PUT OR A PATCH REQUEST FROM A FORM, THE REASON WHY WE USED methodOverride */
const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })/* runValidators because mongoose methods forgoes the validators */

// Alternate way to do the above:
res.redirect(`/products/${product._id}`)/* we could have just referenced id but that would have broke the code because there is a await in the former line and therefore we have added product._id so that it awaits until product is found and then redirects */
})




/* Route to delete a product */
app.delete('/products/:id', async (req, res) => {/* so now because of method override we can now add DELETE request in an HTML file */
const { id } = req.params;
const deletedProduct = await Product.findByIdAndDelete(id)
res.redirect('/products')
})
app.get('/products', async (req, res) => {
const { category } = req.query/* this is because to filter we usually add the stuff after the question mark as a query */
if (category) {// Find products by category
const products = await Product.find({ category })
/* * we are passing category too because it needs to be displayed during filtering */
}
else{
const products= await Product.find({})

}
res.render('products/index',{products,category:category||'All'})
})




app.listen(3000, () => {
console.log("APP IS LISTENING ON PORT 3000!")
})

