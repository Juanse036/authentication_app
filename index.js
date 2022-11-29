const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const path = require("path")
const cors = require("cors")

require('dotenv').config()

//Init Middleware
app.use(express.json({ extended: false}));
app.use(cors());


//Define Routes
app.use('/user', require('./routes/api/user'));
app.use('/upload', require('./routes/api/upload'));


app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", function(_, res){
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  )
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app;