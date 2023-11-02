const express = require(`express`)
const cors = require(`cors`)
// const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

// mongoose.connect(
//   'mongodb+srv://ikendu:11111234Aa@cluster0.wj5o5ps.mongodb.net/?retryWrites=true&w=majority'
// )

app.get(`/test`, (req, res) => {
  res.json(`express`)
})

app.post(`/register`, (req, res) => {
  const { name, email, password } = req.body
  res.json({ requestData: { name, email, password } })
})

app.listen(4000)
