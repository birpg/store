const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const compression = require('compression')

app.use(compression())

// 引入数据库
const db = require('./config/keys').mongoURI

// 连接数据库
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

mongoose.set('useFindAndModify', false)

// 引入routes
const users = require('./routes/api/users')
const brand = require('./routes/api/brand')
const category = require('./routes/api/category')
const unit = require('./routes/api/unit')
const file = require('./routes/api/file')
const supplier = require('./routes/api/supplier')
const purchase = require('./routes/api/purchase')
const department = require('./routes/api/department')
const identity = require('./routes/api/identity')
const storage = require('./routes/api/storage')
const outbound = require('./routes/api/outbound')
const order = require('./routes/api/order')

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 初始化passport
app.use(passport.initialize())
require('./config/passport')(passport)

// 使用routes
app.use('/api/users', users)
app.use('/api/brand', brand)
app.use('/api/category', category)
app.use('/api/unit', unit)
app.use('/api/file', file)
app.use('/api/supplier', supplier)
app.use('/api/purchase', purchase)
app.use('/api/department', department)
app.use('/api/identity', identity)
app.use('/api/storage', storage)
app.use('/api/outbound', outbound)
app.use('/api/order', order)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port${port}`)
})
