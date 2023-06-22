const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// 댓글 작성
router.post('/', async (req, res) => {
  const { postId, content } = req.body;

  try {
    const newComment = new Comment({ postId, content });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 댓글 조회
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 댓글 삭제
router.delete('/:id', async (req, res) => {
  const commentId = req.params.id;

  try {
    await Comment.findByIdAndDelete(commentId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
