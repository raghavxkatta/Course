/* Learnig How to send and parse cookies from User */

const express= require('express')
const app = express()

app.get('/greet',(req,res)=>{
    res.send("Hey There")
})


// Sending a Cookie
app.get('/setname',(req,res)=>{
    /* So basically what it does this sends a cookie to user wheneever the user goes on the link setname and once it goes even one time them this value stays there throughout, it is stored */
    /* If we now open any page this will be shown as the name, I mean whatever you wrote in the cookies as your name and if no name then it's Raghav */

    const{name="Raghav"}=req.cookies
    res.cookie('name','Henry')
    res.send(`Hey ${name} sent you a cookie`)
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000...")
})
