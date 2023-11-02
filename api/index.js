const express = require(`express`)
const cors = require(`cors`)

const app = express()

app.use(cors())
app.use(express.json())

app.get(`/test`, (req, res) => {
  res.json(`express`)
})

app.post(`/register`, (req, res) => {
  const { name, email, password } = req.body
  res.json({ requestData: { name, email, password } })
})

app.listen(4000)
