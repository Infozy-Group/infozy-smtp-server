const express = require('express');
const router = express.Router();

router.use('/mailing', require('./mailing'));

router.get(/\//, (req, res) => {
  res.send('This is Infozy SMTP Server');
});

module.exports = router;
