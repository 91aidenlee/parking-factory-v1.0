const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin_page', { title: 'Parking Factory', page: 'Admin Page' });
});

router.post('/', function (req, res, next) {});

module.exports = router;
