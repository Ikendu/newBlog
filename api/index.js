const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)

const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = `jbghfrheirufbcvfsjh47jh33hj4h32h25hjhh47hberbb47pajcncvbxnmxn`

app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://blog:33AvNrvMD2pajN2l@cluster0.8fgl6wb.mongodb.net/?retryWrites=true&w=majority'
)

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc)
  } catch (e) {
    console.log(e)
    res.status(400).json(e)
  }

  //res.json({ requestData: { name, email, password } })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    //logged in
    //res.status(200).json(`logged in`)
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie(`token`, token).json(`ok`)
    })
  } else {
    //not logged in
    res.status(400).json(`wrong credential`)
  }
})

app.listen(4000)
