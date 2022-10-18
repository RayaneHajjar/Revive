const { validationResult } = require('express-validator');
const axios = require('axios');

const HttpError = require('../models/http-error');
const Board = require('../models/board');

const getBoardsByUserId = async (req, res, next) => {
  //Get the user Id from the link params
  const userId = req.params.uid;
  //Check if the userId is valid
  let user;
  axios.get("http://localhost:5000/api/users/" + userId).then((response) => {
    user = response.data.user;
    if(!user){
      const error = new HttpError('This userId is not valid.', 404);
      return next(error);
    }
  }).catch((err) => {
    const error = new HttpError(
      'Fetching boards failed, please try again.',
      500
    );
    return next(error);
  });
  //Get the boards of the userId
  let boards;
  try {
    boards = await Board.find({ userId:userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching boards failed, please try again later.',
      500
    );
    return next(error);
  }
  //Send boards as response
  res.json({
    boards: boards.map(board =>
      board.toObject({ getters: true })
    )
  });
};


const createBoard = async (req, res, next) => {
  //Check the validity of the body inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  //Get the title from the body and the userId from the token
  const title = req.body.title;
  const userId = req.userData.userId;
  //Create a Board object
  const createdBoard = new Board({
    title,
    userId,
    tasks: []
  });
  //Check if the userId is valid
  let user;
  axios.get("http://localhost:5000/api/users/" + userId).then((response) => {
    user = response.data.user;
    if(!user){
      const error = new HttpError('Could not find user.', 404);
      return next(error);
    }
  }).catch((err) => {
    const error = new HttpError(
      'Creating board failed, please try again.',
      500
    );
    return next(error);
  });
  //Save the createdBoard
  try {
    await createdBoard.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create board.',
      500
    );
    return next(error);
  }
  //Send the createdBoard as response
  res.status(201).json({ board: createdBoard });
};


const deleteBoard = async (req, res, next) => {
  //Get the board Id from the link params
  const boardId = req.params.bid;
  //Get the board with that boardId
  let board;
  try {
    board = await Board.findById(boardId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete board.',
      500
    );
    return next(error);
  }
  //If board doesn't exist
  if (!board) {
    const error = new HttpError('Could not find board for this id.', 404);
    return next(error);
  }
  //Check if the userId decoded from the token is not the userId of this board
  if (board.userId.toString() !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this board.',
      401
    );
    return next(error);
  }
  //Delete the board
  try {
    await board.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete board.',
      500
    );
    return next(error);
  }
  //Send a done message as a response
  res.status(200).json({ message: 'Deleted board.' });
};

exports.getBoardsByUserId = getBoardsByUserId;
exports.createBoard = createBoard;
exports.deleteBoard = deleteBoard;