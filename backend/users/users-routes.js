const express = require('express');

const  usersControllers = require('./users-controllers');

const router = express.Router();

router.post('/register', usersControllers.register);
router.post('/login', usersControllers.login);
router.get('/:uid', usersControllers.getUserById);

module.exports = router;