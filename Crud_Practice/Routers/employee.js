const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const employees = require("../models/employees");

/* To display all items */
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.send("Error" + err);
    }
});

/* To access a particular item */
router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);/* since we're extracting the id from URl we're saying params not body */
        res.json(employee);
    } catch (err) {
        res.send("Error" + err);
    }
});

/* To create an item */
router.post("/", async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        tech: req.body.tech,
        subscription: req.body.subscription,
    });
    try {
        const a1 = await employee.save();
        res.json(a1);
    } catch (err) {
        res.send("Error" + err);
    }
});

/* to update an item */
router.patch('/:id',async(req,res)=>{
    try{
const updatedEmployee= await Employee.findByIdAndUpdate(req.params.id,
    {
        name:req.body.name,
        tech: req.body.tech,
        subscription: req.body.subscription,
    },
    {new:true}/* so that the new item gets updated */
)
res.json(updatedEmployee)
    }
    catch (err) {
        res.send("Error" + err);
    }
    
})


/* to delete an item */
router.delete('/:id',async(req,res)=>{
    try{
        const employee=await Employee.findByIdAndDelete(req.params.id)
        if(!employee){
            return res.send("Employee not found")
        }
            }
    catch (err) {
        res.send("Error" + err);
    }
})

module.exports = router;
