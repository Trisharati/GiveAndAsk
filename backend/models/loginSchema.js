const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    user_name:String,
    mail:String,
    password:String,
    address:String,
    category:String,
    business_name:String
})
module.exports = mongoose.model('User',loginSchema,'User')