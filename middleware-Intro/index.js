const express= require('express');
const app= express();
const morgan= require('morgan')
/* Middleware for logging HTTP requests */
app.use(morgan('common'))
/* custom middleware to log a message */
app.use((req,res,next)=>{
    console.log("this is my first Middleware")
    next();/* next moves to the next middleware */
    console.log("this is my second middleware-after the first middleware")
})
app.use((req,res,next)=>{
    console.log("this is my second middleware")
    next();
})
app.get('/',(req,res)=>{
    res.send("Home Page");
console.log("this is my third middleware")
})
app.get('/dogs',(req,res)=>{
    res.send("Home Page")
})

app.listen(3000,()=>{
    console.log("App is running on Port 3000")
})