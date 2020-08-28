const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
  let body = req.body;
  let query;
  let totalAmount = Number(body.total_amount);
  let inputAmount = Number(body.input_amount);

  if (totalAmount > inputAmount) {
    let requireAmount = totalAmount - inputAmount;
    const notEnoughMoney = `${requireAmount}원이 부족합니다. :( 투입 금액을 확인해주세요.`;
    res.render('payment_error', { title: 'Parking Factory', page: 'Payment', button: 'Payment Request', message: notEnoughMoney });
    // res.send(`${requireAmount}원이 부족합니다. :( 투입 금액을 확인해주세요.)`);
  } else if (totalAmount < inputAmount) {
    let change = inputAmount - totalAmount;
    const checkChange = `정산 처리 완료되었습니다. 거스름돈은 ${change}원입니다. 안녕히 가세요. :)`;
    res.render('payment_success', { title: 'Parking Factory', page: 'Payment', button: 'Payment Request', message: checkChange });
    // res.send(`정산 처리 완료되었습니다. 거스름돈은 ${change}원입니다. 안녕히 가세요. :)`);
  } else if (totalAmount === inputAmount) {
    const checkOutFinish = '정산 처리 완료되었습니다. 안녕히 가세요. :)';
    res.render('payment_success', { title: 'Parking Factory', page: 'Payment', button: 'Payment Request', message: checkOutFinish });
    // res.send('정산 처리 완료되었습니다. 안녕히 가세요. :)');
  }
});

router.get('/', function (req, res, next) {
  res.render('payment', { title: 'Parking Factory', page: 'Payment' });
});
module.exports = router;
