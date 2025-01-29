const express=require('express')
/* Adding Router Functionality */
const router=express.router()

router.get('/',async(req,res)=>{
    res.send("Viewing All Dogs")
})

router.post('/',async(req,res)=>{
    res.send("Creating a new Dog")
})

router.get('/:id',async(req,res)=>{
    res.send("Viewing a Dog")
})
router.get('/:id/edit',async(req,res)=>{
    res.send("Editing a Dog")
})