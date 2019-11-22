const express = require("express");
const router = express.Router();

//User model
const User = require("../../models/User");

// @route POST login
// @desc  Login
router.post("/", (req, res) => {
    User.findOne({username: req.body.username})
        .then(foundUser => {
            if (foundUser === null) {
                res.status(404).json({success: false, found: false});
            }
            else if (req.body.password === foundUser.password) {
                res.status(200).json({success: true, found: true});
            }
            else {
                res.status(200).json({success: false, found: true});
            }
        });
});

// @route POST login/new
// @desc  Create a new user
router.post("/new", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save().then(user => res.json(user));
});

module.exports = router;