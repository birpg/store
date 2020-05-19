const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 身份模型
const IdentitySchema = new Schema({
    coding: String,
    name: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Identity = mongoose.model('identity', IdentitySchema)