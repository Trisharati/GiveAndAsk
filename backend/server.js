const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
const app = express()

const port = 2000
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const router=require('./router/routes')
app.use(router)
app.use(express.static(path.join(__dirname,'public/img')));
// app.use(express.static('public/img'));
mongoose.connect(process.env.DATABASE_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    app.listen(port,()=>{
        console.log(`server connected at ${port}`);
        // console.log(process.env.DATABASE_STRING);
    })
}).catch((err) => {
    console.log('Error in connecting Database', err)
})
