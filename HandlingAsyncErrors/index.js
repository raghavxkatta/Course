/* index.js=Main express application */
/* models-product.js= Mongoose schema and model */
/* seeds.js= database seeding script */
/* views-products-
index.ejs=Template for displaying all products
show.ejs=Template for displaying a single product */

/* Product- Mongoose model representing the products collection in MongoDB= represents the structure of the model and allows the user to interact with the database */
/* products-Variable holding an array of all product documents (e.g., used in the /products route). */
/* product-Variable representing a single product document (e.g., used in the /products/:id route). */



/* SO BASICALLY THIS IS A PATTERN WHERE IN AN ASYNCHRONUS FUNCTIONS , WE HAVE TO CALL NEXT WHICH WE WILL HAVE TO ADD NEXT AS A PARAMETER, WE CAN PASS ANYTHING INSIDE NEXT AND IF THERE IS A VALUE PASSED IN IT AT ALL, IT WILL TRIGGER THE NEXT ERROR HANDLER */



const express = require('express');
const app = express();
const path = require('path')
const Product = require('./models/product')/*basically Product is productSchema AND WOULD HELP YOU TO DO CRUD DOCUMENTS FROM THE PRODUCT COLLECTION*/
const mongoose = require('mongoose');
const methodOverride = require('method-override')/* Need to require this so that we are able to update items with put or patch request even though we are using forms */
const AppError = require('./AppError')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
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

const categories = ['vegetable', 'fruit', 'dairy', 'baked goods']

app.get('/products/new', (req, res) => {/* since we don't have to do anything asynchronus here that's why we don't add async and await */
    res.render('products/new', { categories })/* .get is when the express checks if that particular url has a .get route and then runs it's code. res.render is to create a webpage using a template */
})

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

// Route to display a single product
app.get('/products/:id', wrapAsync(async (req, res, next) => {/* we could have taken name as part of the url but because some names can be same and that can be problematic, we don't take it*/

    const { id } = req.params/* req.params is used when you want to extract something from the url basically {destructuring the ID from the request parameter} */
    const foundProduct = await Product.findById(id)
    console.log(foundProduct)
    if (!foundProduct) {
        next(new AppError('Product not found', 404))/* so instead of throwing the error you'll have to put it in next and that is how the error handler works.*/
    }
    res.render('products/show', { product: foundProduct })/* you need to pass the array that you will use in the particular file */
}))


// Route to display the form for editing an existing product
app.post('/products', wrapAsync(async (req, res, next) => {/* well in this case we don't have access to req.body, I mean we do but it's just undefined, there's nothing there it needs to be parsed */

    const newProduct = new Product(req.body)/* the data that we submit in the "new " route, when we click submit it is going to create a new product using that data */
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)/* this will redirect to the page which will have the data of the new product we just entered */


}))


// Route to update an existing product
app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const foundProduct = await Product.findById(id)
    if (!foundProduct) {
        next(new AppError('Product not found', 404))/* so instead of throwing the error you'll have to put it in next and that is how the error handler works.*/
    }
    res.render('products/edit', { product: foundProduct, categories })
}))
app.put('/products/:id/edit', wrapAsync(async (req, res, next) => {/* PUT AND PATCH REQUESTS ARE USED TO UPDATE EXISTING DATA */


    const { id } = req.params/* THE PROBLEM IS THAT WE CAN'T ACTUALLY MAKE A PUT OR A PATCH REQUEST FROM A FORM, THE REASON WHY WE USED methodOverride */
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })/* runValidators because mongoose methods forgoes the validators */
    // Alternate way to do the above:

    res.redirect(`/products/${product._id}`)/* we could have just referenced id but that would have broke the code because there is a await in the former line and therefore we have added product._id so that it awaits until product is found and then redirects */

    // catch (e) {/* so if there is some error like if the person forgets to fill a box while editing a campground then it would trigger the catch which leads to the next and the next goes to the next middleware error handler */
    //     next(e)
    // }
}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {/* so now because of method override we can now add DELETE request in an HTML file */

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')

    // catch (e) {
    //     next(e)
    // }
}))
app.get('/products', wrapAsync(async (req, res, next) => {

    const { category } = req.query/* this is because to filter we usually add the stuff after the question mark as a query */
    let products
    if (category) {// Find products by category
        products = await Product.find({ category })
        /* * we are passing category too because it needs to be displayed during filtering */
    }
    else {
        products = await Product.find({})

    }
    res.render('products/index', { products, category: category || 'All' })
}))

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err
    res.status(status).send(message)
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

