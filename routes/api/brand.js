const express = require('express')
const router = express.Router()
const passport = require('passport')

const Brand = require('../../models/commodity/Brand')

/**
 * $route POST api/brand/add
 * @desc 新增品牌信息接口
 * @access private
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const brandFields = {}

    if (req.body.coding) brandFields.coding = req.body.coding
    if (req.body.name) brandFields.name = req.body.name

    new Brand(brandFields).save().then((brand) => {
      res.json(brand)
    })
  }
)

/**
 * $route GET api/brand
 * @desc 获取所有品牌信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Brand.find()
      .then((brand) => {
        if (!brand) {
          return res.status(404).json('没有任何内容')
        }
        res.json(brand)
      })
      .catch((err) => res.status(404).json(err))
  }
)

/**
 * $route GET api/brand/:id
 * @desc 获取单个品牌信息
 * @access private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Brand.find({ _id: req.params.id })
      .then((brand) => {
        if (!brand) {
          return res.status(404).json('没有任何内容')
        }
        res.json(brand)
      })
      .catch((err) => res.status(404).json(err))
  }
)

/**
 * $route POST api/brand/edit/:id
 * @desc 编辑品牌信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const brandFields = {}
    if (req.body.coding) brandFields.coding = req.body.coding
    if (req.body.name) brandFields.name = req.body.name

    Brand.findOneAndUpdate(
      { _id: req.params.id },
      { $set: brandFields },
      { new: true }
    ).then((brand) => res.json(brand))
  }
)

/**
 * $route DELETE api/brand/delete/:id
 * @desc 删除品牌信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Brand.findOneAndRemove({ _id: req.params.id })
      .then((brand) => res.json(brand))
      .catch((err) => res.status(404).json('删除失败!'))
  }
)

module.exports = router
