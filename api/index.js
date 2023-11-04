const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://blog:33AvNrvMD2pajN2l@cluster0.8fgl6wb.mongodb.net/?retryWrites=true&w=majority'
)

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userDoc = await User.create({ name, email, password })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }

  //res.json({ requestData: { name, email, password } })
})

app.listen(4000)
