const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 采购单模型
const PurchaseSchema = new Schema({
    purchaseNumber: String,
    audit: String,
    store: String,
    supplier: String,
    personnel: String,
    remarks: String,
    table: [
        {
            coding: Number,
            name: String,
            unit: String,
            number: {
                type: Number,
                default: 0
            },
            cost: Number,
            subtotal: Number
        }
    ],
    total: String,
    ordrMakingStf: String,
    auditors: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Purchase = mongoose.model('purchase', PurchaseSchema)