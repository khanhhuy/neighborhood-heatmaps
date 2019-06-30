const express = require('express');
const router = express.Router();
const places = require('./places/router');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/api', places);

module.exports = router;
