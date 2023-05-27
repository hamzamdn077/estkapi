const express=require('express');
// const fs = require('fs')
// const https=require('https')
const app = express();
const helmet=require('helmet')
const compression=require('compression')
const bodyParser =require('body-parser')
const mongoose = require('mongoose')
const teacherRouter = require('./routes/teacherRoute')
const studentRouter = require('./routes/studentRoute')
const adminRouter = require('./routes/adminRoute')
const studentLoginRouter = require('./routes/login/student')
const teacherLoginRouter = require('./routes/login/teacher')
const adminLoginRouter = require('./routes/login/admin')
const validation = require('./routes/validator/validationMW')
// const options = {
// key : fs.readFileSync('hostkey.pem'),
// cert : fs.readFileSync('hostcert.pem'),
// }
app.use(bodyParser.urlencoded({extended :true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(compression())
app.use('/login/student',validation,studentLoginRouter)
app.use('/login/teacher',validation,teacherLoginRouter)
app.use('/login/admin',validation,adminLoginRouter)
app.use('/admin',adminRouter)
app.use('/teacher',teacherRouter)
app.use('/student',studentRouter)
// const server = https.createServer(options,app)
mongoose.connect('mongodb+srv://hamza:a1a23456789@cluster0.kowm6nx.mongodb.net/ESTK').then((results)=>{
app.listen(4040);
console.log('connected')
}).catch(err=>{
    console.log('failed')
})
