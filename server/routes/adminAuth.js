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
  const admin_pw = '7777';
  const incorrectId = '등록되어 있지 않은 계정입니다. :(';
  const incorrectPw = '비밀번호를 잘못 입력했습니다. :(';

  // 관리자 페이지 로그인
  if (input_id != admin_id) {
    res.render('admin_auth_error', { title: 'Parking Factory', page: 'Login Admin', message: incorrectId });
  } else if (input_pw != admin_pw) {
    res.render('admin_auth_error', { title: 'Parking Factory', page: 'Login Admin', message: incorrectPw });
  } else {
    res.render('admin_page', { title: 'Parking Factory', page: 'Admin Page' });
  }
});

module.exports = router;
