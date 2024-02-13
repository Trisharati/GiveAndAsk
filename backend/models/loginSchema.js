const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    name:String,
    user_name:String,
    mail:String,
    phone:String,
    password:String,
    address:String,
    category:String,
    business_name:String,
    image:String
})
module.exports = mongoose.model('User',loginSchema,'User')