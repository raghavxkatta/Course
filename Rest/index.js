const express= require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended:true}))
app.use(express.json())/* middleware to parse json data from incoming requests */
app.set('views',path.join(__dirname,'views'))/* sets the directory for the views (templates) used in the app,combines the current directory name (__dirname) with the views folder */
app.set('view engine','ejs')

const comments= [
    {
        username:'Todd',
        comment:'lol that was so funny'
    },
    {
        username:'Skyler',
        comment:'I like to go birdwatching with my dog'
    },
    {
        username:'Sk8erBoi',
        comment:'Plz delete your account, Todd'
    }, 
    {
        username:'onlysayswoof',
        comment:'wooof woof woof'
    }
]
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})/* we are just gonna pass all the comments, so that file has access to all the comments */
})
app.get('/comments/new',(req,res)=>{
res.render('comments/new')  

})

app.post('/comments',async(req,res)=>{
    const {username, comment}=req.body
    comments.push({username,comment})
    res.redirect('/comments')
})
app.listen('3000',()=>{
console.log("server is running on port 3000")
})