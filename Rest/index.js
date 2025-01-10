const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))/* iss middleware se error nhi aata */
app.use(express.json())/* middleware to parse json data from incoming requests */
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))/* sets the directory for the views (templates) used in the app,combines the current directory name (__dirname) with the views folder */
app.set('view engine', 'ejs')

const comments = [
    {
        username: 'Todd',
        comment: 'lol that was so funny'
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'wooof woof woof'
    }
]

// Route to display all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })/* we are just gonna pass all the comments, so that file has access to all the comments */
})


// Route to display the form to add a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new')

})

// Route to handle the form submission to add a new comment
app.post('/comments', async (req, res) => {
    const { username, comment } = req.body // Extract the username and comment from the request body
    comments.push({ username, comment }) // Add the new comment to the comments array using the method
    res.redirect('/comments') // Redirect to the '/comments' route to display the updated comments
})

/* Route to show a particular comment */
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    comments.findById(id)
    res.render('commments/show', { comments })
})

/* Route to update a particular comment */
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comment.findById(id)
    res.render('comments/edit', { comment })
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newCommonText = req.body.comment
    const foundComment = comments.findById(id)
    foundComment.comment = newCommonText
    res.redirect('comments/index')
})

/* Route to delete a comment */
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments.findByIdAndDelete(id)

})
app.listen('3000', () => {
    console.log("server is running on port 3000")
})