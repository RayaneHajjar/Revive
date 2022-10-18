const express = require('express');
const { check } = require('express-validator');

const tasksControllers = require('../controllers/tasks-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/board/:bid', tasksControllers.getTasksByBoardId);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('boardId')
      .not()
      .isEmpty(),
  ],
  tasksControllers.createTask
);

router.patch(
  '/:tid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('boardId')
      .not()
      .isEmpty(),
  ],
  tasksControllers.updateTask
);

router.delete('/:tid', tasksControllers.deleteTask);

module.exports = router;