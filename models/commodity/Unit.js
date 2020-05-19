const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品单位模型
const UnitSchema = new Schema({
    coding: String,
    name: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Unit = mongoose.model('unit', UnitSchema)