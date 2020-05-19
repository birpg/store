const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品类别模型
const CategorySchema = new Schema({
    coding: String,
    name: String,
    sort: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Category = mongoose.model('category', CategorySchema)