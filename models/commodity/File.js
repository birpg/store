const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品档案模型
const FileSchema = new Schema({
    category: String,
    coding: Number,
    name: String,
    brand: String,
    unit: String,
    price: Number,
    lowest: Number,
    guidePrice: Number,
    cost: Number,
    number: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = File = mongoose.model('file', FileSchema)