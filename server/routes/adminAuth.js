const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin_auth', { title: 'Parking Factory', page: 'Login Admin' });
});

router.post('/', function (req, res, next) {
  let body = req.body;
  const input_id = body.input_id;
  const input_pw = body.input_pw;
  const admin_id = 'minho1234';
  const admin_pw = '12341234';

  if (input_id != admin_id) {
    res.send('등록되어 있지 않은 계정입니다. :(');
  } else if (input_pw != admin_pw) {
    res.send('비밀번호를 잘못 입력했습니다. :(');
  } else {
    res.render('admin_page', { title: 'Parking Factory', page: 'Admin Page' });
  }
});

module.exports = router;
