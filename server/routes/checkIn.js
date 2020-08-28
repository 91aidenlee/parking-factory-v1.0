const express = require('express');
const Logger = require('../controller/Logger');
const Members = require('../controller/Members');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('check_in', {
    title: 'Parking Factory',
    page: 'Check In',
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
    logger.checkInCar(log_car_number).then((result) => {
      putSuccess = result;
      if (putSuccess === 0) {
        // res.send('유효하지 않은 차량 번호 입니다. 다시 입력해주세요.');
        res.render('check_in_error', {
          title: 'Parking Factory',
          page: 'Check In',
          car_number: log_car_number,
        });
      }
      // res.send(isMember ? 'MEMBERS님 환영합니다. :)' : 'GUEST님 환영합니다. :)');
      else if (isMember) {
        res.render('check_in_success', {
          title: 'Parking Factory',
          page: 'Check In',
          user: log_car_number,
        });
      } else {
        res.render('check_in_success', {
          title: 'Parking Factory',
          page: 'Check In',
          user: 'GUEST',
        });
      }
    });
  });
});
module.exports = router;
