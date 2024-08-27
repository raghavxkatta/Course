const express= require('express');
const app= express();
const morgan= require('morgan')
/* Middleware for logging HTTP requests */
app.use(morgan('common'))
const verifyPassword=((req,res,next)=>{
    const{password}=req.query
if(password==='chickennugget'){/* the correct password is chickenNugget */
   return next();
}
return res.send("Sorry but you need a password")/* without the correct password in the query string, this will be the only thing being displayed and you won't be able to move ahead */
})
app.use((req,res,next)=>{
    req.requestTime=Date.now()
    console.log(req.method.toUpperCase(),req.path)
next()  
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
    
})
/* when no route matches then this middleware comes to use */
app.use((req,res)=>{
    res.status(404).send('Not found');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });