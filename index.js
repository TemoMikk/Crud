const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const users = require('./user')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
MONGO_KEY = process.env.MONGO_KEY
mongoose.connect(MONGO_KEY, () => {
  console.log('ki')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', async (req, res) => {
  var body = req.body
  body.created_at = new Date()
  body.updated_at = new Date()

  const hashPassword = await bcrypt.hash(body.password, 16)
  body.password = hashPassword
  console.log(body)
  try {
    const user = await users.create(body)
    console.log('test')
  } catch (e) {
    console.log(e.message)
  }
})

app.delete('/delete', async (req, res) => {
  var deleted = await users.deleteOne({ _id: req.query.id })
})

app.get('/usersList', (req, res) => {
  users.find({}, (err, users) => {
    res.send(users)
  })
})

app.get('/getuser', async (req, res) => {
  var found = await users.find({ _id: req.query.id })
  console.log(found)
  res.send(found)
})

app.put('/update', async (req, res) => {
  var changed = await users.findOneAndUpdate(
    { _id: req.query.id },
    { name: 'test test' },
    {
      returnOriginal: false,
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
