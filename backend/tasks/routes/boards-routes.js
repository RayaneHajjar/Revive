const express = require('express');
const { check } = require('express-validator');

const boardsControllers = require('../controllers/boards-controllers');
const checkAuth = require('../middlewares/check-auth');

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

module.exports = router;