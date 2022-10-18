const express = require('express');
const mongoose = require('mongoose');

const boardsRoutes = require('./routes/boards-routes');
const tasksRoutes = require('./routes/tasks-routes');
const HttpError = require('./models/http-error');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/boards', boardsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

mongoose
    .connect(
        'mongodb+srv://<username>:<password>@cluster0.zequ0w0.mongodb.net/revive_tasks?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(3001);
    })
    .catch((err) => console.log(err));
