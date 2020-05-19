const express = require('express')
const router = express.Router()
const passport = require('passport')

const Order = require('../../models/promotion/Order')

/**
 * $route POST api/order/add
 * @desc 新增订单促销信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const orderFields = {}

    if (req.body.coding) orderFields.coding = req.body.coding
    if (req.body.store) orderFields.store = req.body.store
    if (req.body.promDt) orderFields.promDt = req.body.promDt
    if (req.body.promTm) orderFields.promTm = req.body.promTm
    if (req.body.cycle) orderFields.cycle = req.body.cycle
    if (req.body.full) orderFields.full = req.body.full
    if (req.body.discount) orderFields.discount = req.body.discount
    if (req.body.handsel) orderFields.handsel = req.body.handsel
    if (req.body.personnel) orderFields.personnel = req.body.personnel
    if (req.body.remarks) orderFields.remarks = req.body.remarks
    if (req.body.audit) orderFields.audit = req.body.audit
    if (req.body.table) orderFields.table = req.body.table
    if (req.body.ordrMakingStf) orderFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) orderFields.auditors = req.body.auditors
    if (req.body.auditDate) orderFields.auditDate = req.body.auditDate


    new Order(orderFields).save().then(order => {
        res.json(order)
    })
})

/**
 * $route GET api/order
 * @desc 获取所有订单促销信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Order.find()
        .then(order => {
            if (!order) {
                return res.status(404).json('没有任何内容')
            }
            res.json(order)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route GET api/order/:id
 * @desc 获取单个出库信息
 * @access private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Order.findOne({ _id: req.params.id })
        .then(order => {
            if (!order) {
                return res.status(404).json('没有任何内容')
            }
            res.json(order)
        })
        .catch(err => res.status(404).json(err))
})

/**
 * $route POST api/order/edit/:id
 * @desc 编辑订单促销信息接口
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const orderFields = {}

    if (req.body.coding) orderFields.coding = req.body.coding
    if (req.body.store) orderFields.store = req.body.store
    if (req.body.promDt) orderFields.promDt = req.body.promDt
    if (req.body.promTm) orderFields.promTm = req.body.promTm
    if (req.body.cycle) orderFields.cycle = req.body.cycle
    if (req.body.full) orderFields.full = req.body.full
    if (req.body.discount) orderFields.discount = req.body.discount
    if (req.body.handsel) orderFields.handsel = req.body.handsel
    if (req.body.personnel) orderFields.personnel = req.body.personnel
    if (req.body.remarks) orderFields.remarks = req.body.remarks
    if (req.body.audit) orderFields.audit = req.body.audit
    if (req.body.table) orderFields.table = req.body.table
    if (req.body.ordrMakingStf) orderFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) orderFields.auditors = req.body.auditors
    if (req.body.auditDate) orderFields.auditDate = req.body.auditDate


    Order.findOneAndUpdate(
        { _id: req.params.id },
        { $set: orderFields },
        { new: true }
    ).then(order => res.json(order))

})

/**
 * $route DELETE api/order/delete/:id
 * @desc 删除订单促销信息接口
 * @access private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Order.findOneAndRemove({ _id: req.params.id })
        .then(order => res.json(order))
        .catch(err => res.status(404).json('删除失败!'))
})

module.exports = router