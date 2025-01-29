// Router is somewhat a mini-application that we combine with other routers to make a full application

const express= require('express')
const app=express()
const shelterRoutes= require('./Routes/shelters')
const dogRoutes=require('./Routes/dogs')
const adminRoutes=require('./Routes/admin')

/* Middleware that will only apply to these specific Routes,Adding Prefixes to the Routes */
app.use('/shelters',shelterRoutes)
app.use('/dogs',dogRoutes)
app.use('/admin',adminRoutes)


app.listen('3000',()=>{
    console.log("Serving app on localhost:3000")
})