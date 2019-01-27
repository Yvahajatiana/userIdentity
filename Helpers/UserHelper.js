exports.formatUser = function(x, req) {
    return {
        id: x._id,
        userName: x.userName,
        email: x.password,
        url: req.protocol + "://" + req.hostname + ":3000" + req.baseUrl + "/" + x._id
    };
};