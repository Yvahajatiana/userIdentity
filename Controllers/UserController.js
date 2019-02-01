const config = require('../Config.json');

const express = require('express');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const user = require('../Models/User');
const userHelper = require('../Helpers/UserHelper');
const authorize = require('../Helpers/Authorize');
const Roles = require('../Helpers/Roles');
const accessServices = require('../Services/AccessServices');

const router = express.Router();

router.get("/", authorize(Roles.Admin),(req, res, next) => {
    user.find({}, '_id userName email')
        .exec()
        .then(users => {
            res.status(200).json({
                code: "ALL_USERS",
                count: users.length,
                users: users.map(x => userHelper.formatUser(x,req))
            });
        })
        .catch(err => {
            res.status(500).json({
                code: "ERROR",
                message: "The systen can't get all users, please see the below error",
                error: err
            });
        });
});

router.get("/:userId", (req, res, next) => {
    user.findOne({
            _id: req.params.userId
        }, '_id userName email')
        .exec()
        .then(result => {
            res.status(200).json(result);
        });
});

router.post("/", (req, res, next) => {
    const newUser = new user(req.body);
    newUser.save()
        .then(result => {
            res.status(200).json({
                code: "USER_CREATED",
                message: "The new user has been registred with success",
                user: result
            });
        })
        .catch(err => {
            res.status(500).json({
                code: "REGISTRATION_FAILED",
                message: "The systen can't create a new user, please see the below error",
                error: err
            });
        })
});

router.post("/authenticate", (req, res, next) => {
    user.findOne({userName: req.body.userName, password: req.body.password})
    .exec()
    .then(result =>{
        if(result) {
            let refreshToken = randtoken.uid(256)
            const token = jwt.sign({sub: result._id, role: req.body.role}, config.secret, { expiresIn: 60 * 1 });
            accessServices.SaveRefreshToken({
                userName: result.userName,
                refreshToken
            });

            res.status(200).json({
                token,
                userName: req.body.userName,
                refreshToken
            });
        }
    })
    .catch(err => {
        next(err);
    })
})

router.post("/token", (req, res, next) => {
    const result = accessServices.GetStoredRefreshToken(req.body.refreshToken, req.body.userName);
    result.then(result => {
        if(Object.keys(result).length === 0) {
            res.status(401).json({
                message: 'Invalid refresh token'
            });
        }

        const token = jwt.sign({sub: result._id, role: req.body.role}, config.secret, { expiresIn: 60 * 1 });
        res.status(200).json({
            token,
            userName: req.body.userName,
            refreshToken: req.body.refreshToken
        });
    })
    .catch(err => {
        next(err);
    })
    
});

module.exports = router;