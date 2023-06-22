const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const Post = require('./models/post');

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', () => {
  console.log('MongoDB에 연결되었습니다.');
});

const app = express();
app.use(express.json());

// 블로그 포스트 라우터 연결
app.use('/posts', postRoutes);

// 인증 라우터 연결
app.use('/auth', authRoutes);

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
