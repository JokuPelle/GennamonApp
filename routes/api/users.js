const express = require("express");
const router = express.Router();

//User model
const User = require("../../models/User");

// @route GET api/items
// @desc  Get all users
router.get("/", (req, res) => {
    User.findOne({username: req.body.username})
        .then(theUser => {
            console.log(theUser);
            res.status(200).json(theUser);
        });
    
    /*User.find()
        .sort({username: 1})
        .then(users => res.json(users))*/
});

// @route POST api/items
// @desc  Create a new user
router.post("/", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save().then(user => res.json(user));
});

// @route DELETE api/items/:id
// @desc  Delete a user
router.delete("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;