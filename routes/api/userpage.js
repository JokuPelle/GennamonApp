const express = require("express");
const router = express.Router();

//Models
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route GET userpage/check
// @desc  check if url user exists
router.get("/check/:id", (req, res) => {
    User.findOne({username: { $regex: new RegExp(decodeURIComponent(req.params.id), "i") } }, (err, foundUser) => {
        if (err) {res.status(404).json({success: false, message: "Error with user sweep"});}
        else if (!foundUser) {console.log("user ot found!"); res.status(404).json({success: false, message: "No such user found"});}
        else {
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
})

module.exports = router;
