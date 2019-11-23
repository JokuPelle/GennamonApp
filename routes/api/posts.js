const express = require("express");
const router = express.Router();

//User model
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route POST posts/new
// @desc  Create new Post
router.post("/new", (req, res) => {
    const newPost = new Post({
        username: req.body.username,
        message: req.body.message,
        date: Date.now()
    });
    newPost.save()
        .then(post => res.json({success: true, post}))
        .catch(err => res.json({success: false, error: err, message: "Saving a post failed"}));
});

// @route GET posts/new
// @desc  Get all posts
router.get("/load", (req, res) => {
    Post.find({},(err, posts) => {
        if (err) {
            res.json({success: false, error: err, message: "Error with finding posts"});
        }
        else if (posts.length < 1) {
            res.json({success: false, message: "No posts found"});
        }
    }).sort({date:-1}).then(posts => res.json({success: true, message: "Posts loaded", posts}));
});

module.exports = router;