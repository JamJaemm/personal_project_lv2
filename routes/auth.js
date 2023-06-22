const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 로그인
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 인증
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공
    res.json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 회원가입
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 중복된 사용자명 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: '이미 존재하는 사용자명입니다.' });
    }

    // 사용자 생성
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});


module.exports = router;
