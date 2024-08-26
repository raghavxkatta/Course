const express=require("express")
const app= express()
app.use((req,res)=>{
    console.log("we got a request")
    res.send({bot:'baby',
jatt:'tero'
    })
})
app.listen(3000,()=>{
    console.log("hello guyss")
})
