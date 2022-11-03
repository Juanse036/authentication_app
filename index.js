const express = require('express')
const app = express()
const port = 5000
const path = require("path")
const cors = require("cors")



require('dotenv').config()

//Init Middleware
app.use(express.json({ extended: false}));
app.use(cors());


//Define Routes
app.use('/user', require('./routes/api/user'));
app.use('/upload', require('./routes/api/upload'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})