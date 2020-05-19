const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 商品品牌模型
const BrandSchema = new Schema({
    coding: String,
    name: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Brand = mongoose.model('brand', BrandSchema)