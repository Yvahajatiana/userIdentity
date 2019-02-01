const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const errorHandler = require('./Helpers/ErrorHandler');
const userController = require('./Controllers/UserController');

const app = express();
mongoose.connect('mongodb://yva:didimoon69@ds040309.mlab.com:40309/userindentity', {useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/users", userController);

app.use(errorHandler);

module.exports = app;