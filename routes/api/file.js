const express = require('express')
const router = express.Router()
const passport = require('passport')

const File = require('../../models/commodity/File')

/**
 * $route POST api/file/add
 * @desc 新增档案信息接口
 * @access private
 */

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const fileFields = {}

    if (req.body.category) fileFields.category = req.body.category
    if (req.body.coding) fileFields.coding = req.body.coding
    if (req.body.name) fileFields.name = req.body.name
    if (req.body.brand) fileFields.brand = req.body.brand
    if (req.body.unit) fileFields.unit = req.body.unit
    if (req.body.price) fileFields.price = req.body.price
    if (req.body.lowest) fileFields.lowest = req.body.lowest
    if (req.body.guidePrice) fileFields.guidePrice = req.body.guidePrice
    if (req.body.cost) fileFields.cost = req.body.cost

    new File(fileFields).save().then(file => {
      res.json(file)
    })
  }
)

/**
 * $route GET api/file
 * @desc 获取所有档案信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    File.find()
      .then(file => {
        if (!file) {
          return res.status(404).json('没有任何内容')
        }
        res.json(file)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route GET api/file/:id
 * @desc 获取单个档案信息
 * @access private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    File.find({ _id: req.params.id })
      .then(file => {
        if (!file) {
          return res.status(404).json('没有任何内容')
        }
        res.json(file)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route POST api/file/edit/:id
 * @desc 编辑档案信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const fileFields = {}
    if (req.body.category) fileFields.category = req.body.category
    if (req.body.coding) fileFields.coding = req.body.coding
    if (req.body.name) fileFields.name = req.body.name
    if (req.body.brand) fileFields.brand = req.body.brand
    if (req.body.unit) fileFields.unit = req.body.unit
    if (req.body.price) fileFields.price = req.body.price
    if (req.body.lowest) fileFields.lowest = req.body.lowest
    if (req.body.guidePrice) fileFields.guidePrice = req.body.guidePrice
    if (req.body.cost) fileFields.cost = req.body.cost

    File.findOneAndUpdate(
      { _id: req.params.id },
      { $set: fileFields },
      { new: true }
    ).then(file => res.json(file))
  }
)

/**
 * $route DELETE api/file/delete/:id
 * @desc 删除档案信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    File.findOneAndRemove({ _id: req.params.id })
      .then(file => res.json(file))
      .catch(err => res.status(404).json('删除失败!'))
  }
)

/**
 * $route DELETE api/file/deleteAllSelected/:idArr
 * @desc 批量删除档案信息接口
 * @access private
 */

router.delete(
  '/deleteAllSelected/:idArr',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { idArr } = req.params
    const newIdArr = idArr.split(',')

    File.deleteMany({ _id: { $in: newIdArr } })
      .then(file => res.json(file))
      .catch(err => res.status(404).json('删除失败!'))
  }
)
module.exports = router
