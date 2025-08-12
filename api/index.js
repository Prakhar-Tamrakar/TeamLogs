import express from 'express' 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import employeeRouter from "./routes/employee.route.js"

dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json())


app.use('/api/employee' , employeeRouter)

app.listen(3000 , ()=>{
    console.log("server is running on port 3000!!!")
})
