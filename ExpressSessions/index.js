const express=require('express')
const app= express()
const sesson=require('app-express')


app.use(session({secret:'thisisnotagoodsecret'}))

app.get('/viewcount',(req,res)=>{
   if(req.session.count){
    req.session.count+=1
   }
   else{
req.session.count=1
   }
   res.send(`You have viewed this page ${req.session.count} times`)
})


app.listen(3000,()=>{
    console.log("Server Running on Port 3000")
})