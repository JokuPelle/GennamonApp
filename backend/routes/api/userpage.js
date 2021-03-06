const express = require("express");
const router = express.Router();

//Models
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route GET userpage/api/find/:id
// @desc  finds all users based on given id
router.get("/find/:id", (req, res) => {
    User.find({username: { $regex: new RegExp(decodeURIComponent(req.params.id), "i")}}, (err, foundUsers) => {
        if (err) {res.status(500).json({success: false, message: "Error with user sweep"});
        } else if (!foundUsers || !foundUsers[0]) {
            console.log("users not found!");
            res.status(404).json({success: false, message: "No users found!"});
        } else {
            console.log("user(s) found!");
            let userList = [];
            for (let i=0; i<foundUsers.length; i++) {
                userList[i] = foundUsers[i].username;
            }
            res.json({success: true, users: userList, message: "Users found!"});
        }
    });
});

// @route GET userpage/api/check/:id
// @desc  check if url user exists
router.get("/check/:id", (req, res) => {
    User.findOne({username: { $regex: new RegExp(decodeURIComponent(req.params.id), "i") } }, (err, foundUser) => {
        if (err) {
            res.status(404).json({success: false, message: "Error with user sweep"});
        } else if (!foundUser) {
            console.log("user not found!");
            res.status(404).json({success: false, message: "No such user found"});
        } else {
            console.log("user found");
            if (req.cookies.userSession) {
                if (req.cookies.userSession === foundUser.id) {
                    console.log("you are this");
                    res.json({success: true, user: foundUser.username, isThisUser: true})
                } else {
                    res.json({success: true, user: foundUser.username, isThisUser: false});
                }
            } else {
                res.json({success: true, user: foundUser.username, isThisUser: false});
            }
        }
    });
});

// @route POST userpage/api/changePassword
// @desc  change password
router.post("/changepassword", (req, res) => {
    User.findOneAndUpdate({
        username: req.body.user,
        password: req.body.old
    }, {
        password: req.body.new
    }, (err, foundUser) => {
        if (err) {
            res.status(404).json({success: false, error: 1, message: "Error with changing password"});
        } else if (!foundUser) {
            console.log("password was wrong!");
            res.json({success: false, error: 2, message: "Wrong old password!"});
        } else {
            res.json({success: true, message: "Password changed"});
        }
    })
})

module.exports = router;
