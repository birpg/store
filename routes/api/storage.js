const express = require('express')
const router = express.Router()
const passport = require('passport')

const Storage = require('../../models/inventory/Storage')

/**
 * $route POST api/storage/add
 * @desc 新增入库信息接口
 * @access private
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const storageFields = {}

    if (req.body.numbering) storageFields.numbering = req.body.numbering
    if (req.body.audit) storageFields.audit = req.body.audit
    if (req.body.store) storageFields.store = req.body.store
    if (req.body.type) storageFields.type = req.body.type
    if (req.body.personnel) storageFields.personnel = req.body.personnel
    if (req.body.remarks) storageFields.remarks = req.body.remarks
    if (req.body.table) storageFields.table = req.body.table
    if (req.body.total) storageFields.total = req.body.total
    if (req.body.ordrMakingStf)
      storageFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) storageFields.auditors = req.body.auditors
    if (req.body.date) storageFields.date = req.body.date

    new Storage(storageFields).save().then(storage => {
      res.json(storage)
    })
  }
)

/**
 * $route GET api/storage
 * @desc 获取所有入库信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Storage.find()
      .then(storage => {
        if (!storage) {
          return res.status(404).json('没有任何内容')
        }
        res.json(storage)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route GET api/storage/:id
 * @desc 获取单个入库信息
 * @access private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Storage.find({ _id: req.params.id })
      .then(storage => {
        if (!storage) {
          return res.status(404).json('没有任何内容')
        }
        res.json(storage[0])
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route POST api/storage/edit/:id
 * @desc 编辑入库信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const storageFields = {}

    if (req.body.numbering) storageFields.numbering = req.body.numbering
    if (req.body.audit) storageFields.audit = req.body.audit
    if (req.body.store) storageFields.store = req.body.store
    if (req.body.type) storageFields.type = req.body.type
    if (req.body.personnel) storageFields.personnel = req.body.personnel
    if (req.body.remarks) storageFields.remarks = req.body.remarks
    if (req.body.table) storageFields.table = req.body.table
    if (req.body.total) storageFields.total = req.body.total
    if (req.body.ordrMakingStf)
      storageFields.ordrMakingStf = req.body.ordrMakingStf
    if (req.body.auditors) storageFields.auditors = req.body.auditors
    if (req.body.date) storageFields.date = req.body.date

    Storage.findOneAndUpdate(
      { _id: req.params.id },
      { $set: storageFields },
      { new: true }
    ).then(storage => res.json(storage))
  }
)

/**
 * $route DELETE api/storage/delete/:id
 * @desc 删除入库信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Storage.findOneAndRemove({ _id: req.params.id })
      .then(storage => res.json(storage))
      .catch(err => res.status(404).json('删除失败!'))
  }
)

module.exports = router
