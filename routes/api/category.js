const express = require('express')
const router = express.Router()
const passport = require('passport')

const Category = require('../../models/commodity/Category')

/**
 * $route POST api/category/add
 * @desc 新增类别信息接口
 * @access private
 */

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const categoryFields = {}

    if (req.body.coding) categoryFields.coding = req.body.coding
    if (req.body.name) categoryFields.name = req.body.name
    if (req.body.sort) categoryFields.sort = req.body.sort

    new Category(categoryFields).save().then(category => {
      res.json(category)
    })
  }
)

/**
 * $route GET api/category
 * @desc 获取所有类别信息
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.find()
      .then(category => {
        if (!category) {
          return res.status(404).json('没有任何内容')
        }
        res.json(category)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route GET api/category/:id
 * @desc 获取单个类别信息
 * @access private
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.find({ _id: req.params.id })
      .then(category => {
        if (!category) {
          return res.status(404).json('没有任何内容')
        }
        res.json(category)
      })
      .catch(err => res.status(404).json(err))
  }
)

/**
 * $route POST api/category/edit/:id
 * @desc 编辑类别信息接口
 * @access private
 */
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const categoryFields = {}
    if (req.body.coding) categoryFields.coding = req.body.coding
    if (req.body.name) categoryFields.name = req.body.name
    if (req.body.sort) categoryFields.sort = req.body.sort

    Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: categoryFields },
      { new: true }
    ).then(category => res.json(category))
  }
)

/**
 * $route DELETE api/category/delete/:id
 * @desc 删除类别信息接口
 * @access private
 */
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findOneAndRemove({ _id: req.params.id })
      .then(category => res.json(category))
      .catch(err => res.status(404).json('删除失败!'))
  }
)

module.exports = router
