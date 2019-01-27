const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;