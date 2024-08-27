const express= require('express');
const app= express();
const morgan= require('morgan')
/* Middleware for logging HTTP requests */
app.use(morgan('common'))
app.use(req,res,next)=>{
    const{password}=req.query
}
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
/* when no route matches then this middleware comes to use */
app.use((req,res)=>{
    res.status(404).send('Not found');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });