const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./users-routes');
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

app.use('/api/users', usersRoutes);
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

mongoose
    .connect(
        'mongodb+srv://<username>:<password>@cluster0.zequ0w0.mongodb.net/revive_users?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));
