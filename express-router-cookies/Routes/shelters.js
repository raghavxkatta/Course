const express= require('express')
/* Adding Router Functionality */
const router =express.Router()

router.get('/',async(req,res)=>{
    res.send("All Shelter")
})

router.post('/',async(req,res)=>{
    res.send("Creating Shelters")
})

router.get('/:id',async(req,res)=>{
    res.send("Viewing one Shelter")
})

router.get('/:id/edit',async(req,res)=>{
    res.send("Editing one Shelter")
})


module.exports = router