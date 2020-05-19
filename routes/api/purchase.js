const express = require('express')
const router = express.Router()
const passport = require('passport')

const Purchase = require('../../models/purchase/Purchase')

/**
 * $route POST api/purchase/add
 * @desc 新增采购单信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const purchaseFields = {}

    if (req.body.purchaseNumber) purchaseFields.purchaseNumber = req.body.purchaseNumber
    if (req.body.audit) purchaseFields.audit = req.body.audit
    if (req.body.store) purchaseFields.store = req.body.store
    if (req.body.supplier) purchaseFields.supplier = req.body.supplier
    if (req.body.personnel) purchaseFields.personnel = req.body.personnel
    if (req.body.remarks) purchaseFields.remarks = req.body.remarks
    if (req.body.table) purchaseFields.table = req.body.table
    if (req.body.ordrMakingStf) purchaseFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.total) purchaseFields.total = req.body.total
    if (req.body.auditors) purchaseFields.auditors = req.body.auditors
    if (req.body.date) purchaseFields.date = req.body.date


    new Purchase(purchaseFields).save().then(purchase => {
        res.json(purchase)
    })
})

/**
 * $route GET api/purchase
 * @desc 获取所有采购单信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Purchase.find()
        .then(purchase => {
            if (!purchase) {
                return res.status(404).json('没有任何内容')
            }
            res.json(purchase)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route GET api/purchase/:id
 * @desc 获取单个采购单信息
 * @access private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Purchase.findOne({ _id: req.params.id })
        .then(purchase => {
            if (!purchase) {
                return res.status(404).json('没有任何内容')
            }
            res.json(purchase)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/purchase/edit/:id
 * @desc 编辑采购单信息接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const purchaseFields = {}

    if (req.body.purchaseNumber) purchaseFields.purchaseNumber = req.body.purchaseNumber
    if (req.body.audit) purchaseFields.audit = req.body.audit
    if (req.body.store) purchaseFields.store = req.body.store
    if (req.body.supplier) purchaseFields.supplier = req.body.supplier
    if (req.body.personnel) purchaseFields.personnel = req.body.personnel
    if (req.body.remarks) purchaseFields.remarks = req.body.remarks
    if (req.body.table) purchaseFields.table = req.body.table
    if (req.body.ordrMakingStf) purchaseFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.total) purchaseFields.total = req.body.total
    if (req.body.auditors) purchaseFields.auditors = req.body.auditors
    if (req.body.date) purchaseFields.date = req.body.date

    Purchase.findOneAndUpdate(
        { _id: req.params.id },
        { $set: purchaseFields },
        { new: true }
    ).then(purchase => res.json(purchase))
})

/**
 * $route DELETE api/purchase/delete/:id
 * @desc 删除采购单信息接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Purchase.findOneAndRemove({ _id: req.params.id })
        .then(purchase => res.json(purchase))
        .catch(err => res.status(404).json('删除失败!'))
})

module.exports = router