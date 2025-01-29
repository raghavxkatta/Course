const express= require('express')
const router= express.router()

/* we have applied this middleware instead of index.js so that we don't stop other routes because then all routes won't be able to function because they do not have admin in their query string */


router.use((req,res,next)=>{
    if(req.query.isAdmin){
        next()
    }
    res.send("Sorry not an admin")
})

router.get('/topsecret',(req,res)=>{
    res.send("This is topsecret")
})

router.get('/deleteEverything',(req,res)=>{
    res.send("Delete Everything")
})

module.exports=router