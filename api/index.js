const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)

const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = `jbghfrheirufbcvfsjh47jh33hj4h32h25hjhh47hberbb47pajcncvbxnmxn`

app.use(cors({ credentials: true, origin: `http://localhost:5173` }))
app.use(express.json())
app.use(cookieParser())

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
    //res.status(200).json(userDoc._id)
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie(`token`, token).json({ email, id: userDoc._id })
    })
  } else {
    //not logged in
    res.status(400).json(`wrong credential`)
  }
})

app.get(`/profile`, (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
  res.json(req.cookies)
})

app.post(`/logout`, (req, res) => {
  res.cookie(`token`, ``).json(`ok`)
})
app.listen(4000)
