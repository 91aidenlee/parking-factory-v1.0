const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
  let body = req.body;
  let query;
  let totalAmount = Number(body.total_amount);
  let inputAmount = Number(body.input_amount);
  let putSuccess = 0;
  if (totalAmount > inputAmount) {
    let requireAmount = totalAmount - inputAmount;
    res.send(`${requireAmount}원이 부족합니다. :( 투입 금액을 확인해주세요.)`);
  } else if (totalAmount < inputAmount) {
    let change = inputAmount - totalAmount;
    res.send(`정산 처리 완료되었습니다. 거스름돈은 ${change}원입니다. 안녕히 가세요. :)`);
  } else if (totalAmount === inputAmount) {
    res.send('정산 처리 완료되었습니다. 안녕히 가세요. :)');
  }
});

router.get('/', function (req, res, next) {
  res.render('payment', { title: 'Parking Factory', page: 'Payment' });
});
module.exports = router;
