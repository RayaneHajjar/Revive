const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Task = require('../models/task');
const Board = require('../models/board');

const getTasksByBoardId = async (req, res, next) => {
    //Get the board Id from the link's params
    const boardId = req.params.bid;
    //Get the board with that boardId
    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a board.',
            500
        );
        return next(error);
    }
    //If board doesn't exist
    if (!board) {
        const error = new HttpError(
            'Could not find board for the provided id.',
            404
        );
        return next(error);
    }
    //Get the tasks of the boardId
    let tasks;
    try {
        tasks = await Task.find({ boardId: boardId });
    } catch (err) {
        const error = new HttpError(
            'Fetching tasks failed, please try again later.',
            500
        );
        return next(error);
    }
    //Send tasks as response
    res.json({
        tasks: tasks.map((task) => task.toObject({ getters: true })),
    });
};

const createTask = async (req, res, next) => {
    //Check the validity of the body's inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    //Get the inputs from the body
    const { title, description, date, labels, boardId } = req.body;
    //Create a task object
    const createdTask = new Task({
        title,
        description,
        date,
        labels,
        boardId,
    });
    //Search for the board of this task
    let board;
    try {
        board = await Board.findById(boardId);
    } catch (err) {
        const error = new HttpError(
            'Creating task failed, please try again.',
            500
        );
        return next(error);
    }
    //If the board doesn't exist
    if (!board) {
        const error = new HttpError(
            'Could not find board for provided id.',
            404
        );
        return next(error);
    }
    //Check if the userId decoded from the token is not the userId of this board
    if (board.userId.toString() !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to create this task.',
            401
        );
        return next(error);
    }
    //Create the task and add it to the list of tasks in its board
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTask.save({ session: sess });
        board.tasks.push(createdTask);
        await board.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating task failed, please try again.',
            500
        );
        return next(error);
    }
    //Send the task created as response
    res.status(201).json({ task: createdTask });
};

const updateTask = async (req, res, next) => {
    //Check the validity of the body's inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    //Get the inputs from the body
    const { title, description, date, labels, boardId } = req.body;
    //Get the task Id from the link's params
    const taskId = req.params.tid;
    //Get the task with that taskId
    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update task.',
            500
        );
        return next(error);
    }
    //Search for the board of this task
    let board;
    try {
        board = await Board.findById(task.boardId);
    } catch (err) {
        const error = new HttpError(
            'Updating task failed, please try again.',
            500
        );
        return next(error);
    }
    //If the board doesn't exist
    if (!board) {
        const error = new HttpError(
            'Could not find board for provided id.',
            404
        );
        return next(error);
    }
    //Check if the userId decoded from the token is not the userId of this board
    if (board.userId.toString() !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to update this task.',
            401
        );
        return next(error);
    }
    //Update the task's fields
    task.title = title;
    task.description = description;
    task.date = date;
    task.labels = labels;
    task.boardId = boardId;
    //Save the task updated
    try {
        await task.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update task.',
            500
        );
        return next(error);
    }
    //Send the updated task as response
    res.status(200).json({ task: task.toObject({ getters: true }) });
};

const deleteTask = async (req, res, next) => {
    //Get the task Id from the link's params
    const taskId = req.params.tid;
    //Get the task with that taskId
    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete task.',
            500
        );
        return next(error);
    }
    //If the task doesn't exist
    if (!task) {
        const error = new HttpError('Could not find task for this id.', 404);
        return next(error);
    }
    //Search for the board of this task
    let board;
    try {
        board = await Board.findById(task.boardId);
    } catch (err) {
        const error = new HttpError(
            'Deleting task failed, please try again.',
            500
        );
        return next(error);
    }
    //If the board doesn't exist
    if (!board) {
        const error = new HttpError(
            'Could not find board for provided id.',
            404
        );
        return next(error);
    }
    //Check if the userId decoded from the token is not the userId of this board
    if (board.userId.toString() !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to create this task.',
            401
        );
        return next(error);
    }
    //Delete the task and remove it from the list of tasks in its board
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await task.remove({ session: sess });
        board.places.pull(task);
        await board.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete task.',
            500
        );
        return next(error);
    }
    //Send a done message as a response
    res.status(200).json({ message: 'Deleted task.' });
};

exports.getTasksByBoardId = getTasksByBoardId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
