const express = require('express');
const router = express.Router();
const user = require('../../services/user')

router.post('/data', async function(req, res, next) {
    
   console.log(req.body)
});

module.exports = router;