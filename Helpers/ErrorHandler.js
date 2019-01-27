module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if(typeof error === "string"){

        return res.status(400).json({
            message: error
        });
    }

    if(err.name === "UnauthorizedError") {

        return res.status(401).json({
            message: "Invalid token"
        });
    }

    return res.status(500).json({
        message: err.message
    });
}