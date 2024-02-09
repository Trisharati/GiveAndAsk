const mongoose = require('mongoose')
const giveAndAskSchema = new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    give:String,
    ask:String
})
module.exports = mongoose.model('give_ask',giveAndAskSchema,'give_ask')