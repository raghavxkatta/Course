const express= require('express')
const mongoose= require('mongoose')
const url = 'mongodb://localhost/EmployeeDB' /* Yeh Humari url hogyi aur ismein EmployeeDB database ka naam hogya */
const app = express()
mongoose.connect(url) /* The url which the database is connected to  */
.then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));




const employeeRouter= require('./Routers/employee')/* A middleware which redirects to employeeRouter if '/employee' is mentioned */
app.use(express.json())/* this middleware lets use json format */
app.use('/employee',employeeRouter)








app.listen(3000,()=>{
    console.log("Server started..")
})
