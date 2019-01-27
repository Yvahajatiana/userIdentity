const refreshTokenModel = require('../Models/RefreshToken');

exports.GetStoredRefreshToken = function (refreshToken, userName) {
    return  refreshTokenModel.findOne({refreshToken: refreshToken, userName: userName}).exec();
};

exports.SaveRefreshToken = function (data) {
    const dataToSave = new refreshTokenModel(data);
    dataToSave.save();
}