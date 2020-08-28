const express = require('express');
const router = express.Router();
const Member = require('../controller/Members');

router.get('/', function (req, res, next) {
  res.render('members', { title: 'Parking Factory', page: 'Join Members' });
});

router.post('/', function (req, res, next) {
  let body = req.body;
  let totalAmount = Number(body.total_amount);
  let inputAmount = Number(body.input_amount);
  // let inputNumber = Number(body.phone_number);
  let putSuccess = 0;
  const member = new Member();
  if (totalAmount > inputAmount) {
    let requireAmount = totalAmount - inputAmount;
    res.send(`${requireAmount}원이 부족합니다. :( 투입 금액을 확인해주세요.`);
  } else if (totalAmount < inputAmount) {
    let change = inputAmount - totalAmount;
    member.joinMember(body.name, body.phone_number, body.my_car_number).then((result) => {
      putSuccess = result;
      if (putSuccess === 0) {
        res.send('이미 등록된 차량 번호입니다.');
      }
      res.send(`${body.name}님 환영합니다. 거스름돈은 ${change}원입니다. 확인해주세요. :)`);
    });
  } else if (totalAmount === inputAmount) {
    member.joinMember(body.name, body.phone_number, body.my_car_number).then((result) => {
      putSuccess = result;
      if (putSuccess === 0) {
        res.send('차량번호 또는 전화번호가 이미 등록된 번호입니다. 확인홰주세요. :(');
      }
      res.send(`${body.name}님 환영합니다. :)`);
    });
  }
});
module.exports = router;
