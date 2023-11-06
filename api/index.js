const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require(`./models/Post`)
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)
const multer = require(`multer`)
const uploadMd = multer({ dest: `uploads/` })
const fs = require(`fs`)
const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = `jbghfrheirufbcvfsjh47jh33hj4h32h25hjhh47hberbb47pajcncvbxnmxn`

app.use(cors({ credentials: true, origin: `http://localhost:5173` }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

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
})

app.post(`/logout`, (req, res) => {
  res.cookie(`token`, ``).json(`ok`)
})

app.post(`/create`, uploadMd.single(`file`), async (req, res) => {
  const { originalname, path } = req.file
  const part = originalname.split(`.`)
  const ext = part[part.length - 1].toLowerCase()
  const filePath = path + `.` + ext
  fs.renameSync(path, filePath)

  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const { title, summary, content } = req.body
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: filePath,
      author: info.id,
    })
    res.json(postDoc)
  })
})

app.get(`/post`, async (req, res) => {
  res.json(await Post.find().populate(`author`, ['name']).sort({ createdAt: -1 }).limit(20))
})
app.listen(4000)
