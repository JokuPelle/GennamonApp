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

// Used by GET posts/load
// if viewing a user's page, query string will be passed with a id paramater.
// If so, then give Post.fin() method a filter 
const userFilter = (request) => {
    if (request.query.id) {
        console.log("id given "+request.query.id);
        return({username: request.query.id});
    } else {
        console.log("no id given");
        return({});
    }
}
// @route GET posts/load
// @desc  Get all posts
router.get("/load/", (req, res) => {
    Post.find(userFilter(req),(err, posts) => {
        if (err) {
            res.json({success: false, error: err, message: "Error with finding posts"});
        }
        else if (posts.length < 1) {
            res.json({success: false, message: "No posts found"});
        }
    }).sort({date:-1}).then(posts => res.json({success: true, message: "Posts loaded", posts}));
});

module.exports = router;