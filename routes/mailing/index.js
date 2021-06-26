const express = require('express');
const router = express.Router();

router.use('/feedback', require('./feedback'));

module.exports = router;
