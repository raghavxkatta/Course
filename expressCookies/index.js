/* Learning How to send and parse cookies from User */


/* There is something */

const express= require('express')
const app = express()
const cookieParser=require ('cookie-parser')
/* Cookie Parser will now use this to check, it will basically compare the cookie that user sent with what the client stored */
app.use(cookieParser('thisismysecret'))
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



/* Signed Cookies */
/* It is a way of verifying something,so basically it's just check if the cookie is in the exact same situation as it was when it was just sent, so for eg if we take the example of the below cookie there we took grape a fruit as a cookie, now if someone tampers with that cookie and changes it to something else, it would'n't display it as while comparing it finds that this is not the same as original and that is signed cookies for you */
    
app.get('/verify',(req,res)=>{
    res.cookies('fruit','grape',{signed:true})/* Stored the fruit as a grape in the form of cookie in the browser and signed it as well */
    res.send("Okay sent your fruit cookie")
})

app.get('/verifyfruit',(req,res)=>{
    console.log(req.Cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000...")
})
