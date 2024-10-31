const express= require('express');
const app= express();
const morgan= require('morgan')

const AppError=require('./AppError')
app.use(morgan('common'))/* Middleware for logging HTTP requests */
app.use((req,res,next)=>{
    req.requestTime=Date.now()
    console.log(req.method.toUpperCase(),req.path)
next()  
})


const verifyPassword=((req,res,next)=>{
    const{password}=req.query
    if(password==='chickennugget'){/* the correct password is chickenNugget */
   return next();
}
throw new AppError('password require',401)

})

app.get('/',(req,res)=>{
    console.log(`Request Date:${req.requestTime}`)
    res.send('HOME PAGE')
    
})
app.get('/dogs',(req,res)=>{
    console.log(`Request Date:${req.requestTime}`)
    res.send('WOOF WOOF!')
})
app.get('/secret',verifyPassword,(req,res)=>{/* this route will only run when secret is the route and you have entered the correct password as query string */
    res.send("I have many secrets")
    chicken.fly()/* There is no method by the name of fly and therefore that would cause an error which would run the error handling middleware */
    
})

app.get('/admin',(req,res)=>{
    throw new AppError('You are not an admin!',403)
})

/* when no route matches then this middleware comes to use */
app.use((err,req,res,next)=>{
    const {status=500, message='something went very Wrong'}=err
res.status(status).send(message)
})


app.get('/error',(err,req,res,next)=>{
    console.log("errrrorororo")
    console.log("ERROR")
    next(err)/* this will run the built in express error handler */
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});