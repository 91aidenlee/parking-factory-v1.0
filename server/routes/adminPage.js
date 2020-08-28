const express = require('express');
const router = express.Router();
const DBConnector = require('../models/DBConnector');
const Logger = require('../controller/Logger');
const Members = require('../controller/Members');

// 관리자 페이지 구현중...

router.get('/', function (req, res, next) {
  res.render('admin_page', { title: 'Parking Factory', page: 'Admin Page' });
});

router.get('/admin_parking_log', function (req, res, next) {});

router.post('/', function (req, res, next) {
  const db = new DBConnector();
  const logger = new Logger();

  logger.deleteAll().then((result) => {
    res.render('admin_delete_log', { title: 'Parking Factory', page: 'Admin Page' });
  });
});

module.exports = router;
