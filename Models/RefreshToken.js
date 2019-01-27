const mongoose = require('mongoose');

var refreshTokenSchema = mongoose.Schema({
    refreshToken: String,
    userName: String
});

var refreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = refreshTokenModel;