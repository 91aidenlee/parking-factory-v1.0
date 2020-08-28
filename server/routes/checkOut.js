const express = require('express');
const router = express.Router();
const Logger = require('../controller/Logger');
const Members = require('../controller/Members');

router.get('/', function (req, res, next) {
  res.render('check_out', {
    title: 'Parking Factory',
    page: 'Check Out',
  });
});

router.post('/', function (req, res, next) {
  let { log_car_number } = req.body;
  let putSuccess = 0;
  let isMember = 0;
  const logger = new Logger();
  const member = new Members();

  member.checkRegular(log_car_number).then((result) => {
    isMember = result;
    console.log(isMember);
    if (isMember) {
      logger.checkOutCar(log_car_number).then((result) => {
        putSuccess = result;
        if (putSuccess === 0) {
          res.send('입차 기록이 없는 차량 번호입니다. 차량 번호를 다시 입력하세요.');
        }
        res.send('Members님 안녕히 가세요 :)');
      });
    } else {
      logger.checkOutCar(log_car_number).then((result) => {
        putSuccess = result;
        if (putSuccess === 0) {
          res.send('입차 기록이 없는 차량 번호입니다. 차량 번호를 다시 입력하세요.');
        }
        res.render('payment', { title: 'Parking Factory', page: 'Payment', button: 'Payment Request' });
      });
    }
  });
});

module.exports = router;
