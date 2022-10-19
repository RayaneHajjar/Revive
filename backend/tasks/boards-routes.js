const express = require('express');
const { check } = require('express-validator');

const boardsControllers = require('./boards-controllers');
const checkAuth = require('./middlewares/check-auth');

const router = express.Router();

router.get('/user/:uid', boardsControllers.getBoardsByUserId);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
  ],
  boardsControllers.createBoard
);

router.delete('/:bid', boardsControllers.deleteBoard);

router.post(
  '/card',
  [
    check('title')
      .not()
      .isEmpty(),
    check('boardId')
      .not()
      .isEmpty(),
  ],
  boardsControllers.createCard
);

router.patch(
  '/card/:cid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('boardId')
      .not()
      .isEmpty(),
  ],
  boardsControllers.updateCard
);

router.delete('/card/:cid',
  [
    check('boardId')
      .not()
      .isEmpty(),
  ],
  boardsControllers.deleteCard
);

module.exports = router;