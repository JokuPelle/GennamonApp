const express = require("express");
const router = express.Router();

//User model
const User = require("../../models/User");
const Session = require("../../models/UserSession");
//
// @route POST login/login
// @desc  Login, creates a userSession and cookie
router.post("/login", (req, res) => {
    if (req.cookies.userSession) res.json({success: false, message: "Someone is already logged in!"});
    User.findOne({username: { $regex: new RegExp(req.body.username, "i") } } )
        .then(foundUser => {
            if (foundUser === null) {
                res.status(404).json({success: false, message: "Error: User not found"});
            }
            else if (req.body.password === foundUser.password) {
                //console.log(foundUser.id);
                const userSession = new Session({
                    userId: foundUser.id,
                    timeStamp: Date.now(),
                    isDeleted: false
                });
                userSession.save().then(savedSession => {
                    if (!savedSession) res.json({success: false, message: "Failed to create a session"});
                    res.status(200).cookie("userSession", foundUser.id).json({success: true, message: "Valid sign in", token: savedSession.id});
                });
            }
            else {
                res.status(200).json({success: false, message: "Error: Wrong password"});
            }
        });
});

// @route GET login/verify
// @desc  Verifies which user is logged in from cookies
router.get("/verify", (req, res) => {
    //console.log(req.cookies.userSession);
    if (!req.cookies.userSession) {
        res.json({success: false, message: "No one is logged in"});
    } else {
        User.findOne({_id: req.cookies.userSession})
            .then(founduser => {
                //console.log(founduser);
                if (!founduser) {
                    res.json({success: false, message: "Error: Invalid"});
                } else res.json({success: true, user: founduser.username, message: "All good"});
        }).catch(err => console.log("Error: Error with verification", err));
    }
});

// @route GET login/logout
// @desc  Deletes the cookie
router.get("/logout", (req, res) => {
    //console.log("All cookies: "+req.headers.cookie);
    //console.log("One cookie: "+req.cookies.userSession);
    Session.deleteOne({userId: req.cookies.userSession}, (err) => {
        if (err) res.json({success: false, message: "Logout failed"});
    })
        .then(value => {
            //console.log(value);
            res.clearCookie("userSession").json({success: true, message: "Logged out"});
        });
});

// @route POST login/new
// @desc  Create a new user
router.post("/new", (req, res) => {
    User.findOne({username: { $regex: new RegExp(req.body.username, "i") } }, (err, existingUser) => {
        if (err) { res.json({success: false, message: "User Sweep failed"}); }
        else if (existingUser) { 
            console.log("user found!");
            res.json({success: false, message: "User already exists"}); 
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save().then(user => res.json({success: true, user}));
        }
    });
});

module.exports = router;